import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import CrazyGLWrapper, { useContent, useHeroAnimationFrame, useHeroReady, createDeterministicRandom } from '@crazygl/core';
import metadata from './metadata.json';
import './style.css';
/* ─────────────────────────────────────────────────────────────────────────
   Rain on Glass — droplets sliding on a frosted pane.

   Physics statement
     Each droplet is a small spherical cap resting on a flat glass pane.
     Surface tension holds it until gravity overcomes pinning; small drops
     stay, large drops slide.  When a drop slides it leaves a thin moisture
     trail along its path: the trail is a strip where the frosted surface
     has been wiped clear, so it samples the SHARP bg with a slight
     vertical surface tilt (a half-cylinder cross-section) rather than the
     blurred bg.

     Refraction inside a drop uses Snell's law at both glass→water and
     water→air interfaces.  Modelling the cap as a half-sphere of radius
     R, the height field on the pane is
         h(d) = sqrt(R² - d²) - sqrt(R² - r²)  for d ≤ r (clipped at the pane)
     and the 2D gradient of h gives the surface tilt.  At small angles
     Snell's law collapses to a screen-space sample shift:
         shift = hGrad * (1 - 1/IOR)
     biconvex (entry + exit) doubles this.  IOR_water = 1.33.  Per-RGB
     channel uses slightly different IOR (1.328 / 1.333 / 1.339) for
     chromatic dispersion at the rim — the "rainbow edge" you see on real
     water droplets.

     When two drops overlap they MERGE: the larger absorbs the smaller and
     its new radius preserves area (sqrt(r1²+r2²)).  Bigger drop ⇒ falls
     faster (gravity ∝ mass ∝ r³, drag ∝ r² so terminal-velocity ∝ r).

   Algorithm
     - CPU droplet array: { x, y, r, vy, age, tailLen }, capped at
       MAX_DROPS.  Uniform-fed to the shader as vec4(x, y, r, tailLen)
       in CANVAS pixels (Y up; gl_FragCoord-space).
     - Background: two textures — a sharp copy and a Canvas2D blurred
       copy (frosted look).  Cover-fit UV remap so non-matching aspects
       don't stretch.
     - Per fragment, compute:
         body  = blurred bg (frosted everywhere)
         trail = sharp bg, sampled along a slightly tilted half-cylinder
                 normal where the drop has wiped a strip clear
         drop  = sharp bg sampled with biconvex refraction + per-channel
                 chromatic offset; plus rim spec + soft inner shadow.
     - Drops are simulated on the CPU; merging is O(n²) but n ≤ 150.

   Reference
     - Snell's law / refraction shift: github.com/ybouane/liquidglass
       (the glass-panels hero in this repo uses the same biconvex pattern).
     - Spherical-cap normal field: standard CG textbook trick.
     - iq water shadertoys for the trail / pane idea.

   Coordinate spaces in this shader:
     fragCoord  — pixels [0..res.x] × [0..res.y]; Y up
     sUV        — fragCoord / resolution, [0..1]; Y up (we flip when
                  sampling texture, which is Y-down)
     dropPx     — drop centre in fragCoord pixels (Y up)
     u_input    — runtime pointer in 0..1 (top-left origin), unused here
   ───────────────────────────────────────────────────────────────────────── */
const MAX_DROPS = 150;
const VERT = `#version 300 es
in vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;
const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform sampler2D u_bgSharp;
uniform sampler2D u_bgBlur;
uniform vec2  u_resolution;
uniform vec2  u_bgSize;
uniform float u_refraction;
uniform float u_trailStrength;
uniform float u_chroma;
uniform float u_count;
// Each drop: vec4(x, y, r, tailLen)  — all in screen pixels (Y up).
uniform vec4  u_drops[${MAX_DROPS}];

// Cover-fit (object-fit: cover) UV remap. Horizontal overflow stays centered;
// vertical overflow is anchored to the bottom of the source image.
vec2 coverUV(vec2 uv) {
	float bgAspect = u_bgSize.x / max(u_bgSize.y, 1.0);
	float canvasAspect = u_resolution.x / max(u_resolution.y, 1.0);
	vec2 scale = vec2(1.0);
	if (bgAspect > canvasAspect) scale.x = canvasAspect / bgAspect;
	else                          scale.y = bgAspect / canvasAspect;
	vec2 offset = vec2((1.0 - scale.x) * 0.5, 1.0 - scale.y);
	return uv * scale + offset;
}
vec3 sampleSharp(vec2 uv) {
	vec2 c = coverUV(uv);
	return texture(u_bgSharp, vec2(c.x, 1.0 - c.y)).rgb;
}
vec3 sampleBlur(vec2 uv) {
	vec2 c = coverUV(uv);
	return texture(u_bgBlur,  vec2(c.x, 1.0 - c.y)).rgb;
}
// Single-channel sharp sample (used for per-channel chromatic offset).
float sampleSharpR(vec2 uv) { vec2 c = coverUV(uv); return texture(u_bgSharp, vec2(c.x, 1.0 - c.y)).r; }
float sampleSharpG(vec2 uv) { vec2 c = coverUV(uv); return texture(u_bgSharp, vec2(c.x, 1.0 - c.y)).g; }
float sampleSharpB(vec2 uv) { vec2 c = coverUV(uv); return texture(u_bgSharp, vec2(c.x, 1.0 - c.y)).b; }

void main() {
	vec2 fragPx = gl_FragCoord.xy;
	vec2 sUV = fragPx / u_resolution;
	vec2 pxToUV = 1.0 / u_resolution;

	// Frosted glass everywhere — the body of the pane.
	vec3 col = sampleBlur(sUV);

	int count = int(u_count);

	// ── Wet trail strips ────────────────────────────────────────────────
	// Each sliding drop has wiped a vertical strip of the frosted surface
	// clear behind it.  We model that strip as a half-cylinder cross
	// section (curved across X, flat along Y): the normal still tilts in
	// X so we offset the sharp bg sample horizontally, but the strip is
	// otherwise nearly-flat glass.  This gives the trail a subtle
	// horizontal warp where it crosses contrasty bg features — the
	// canonical "this water trail is *actually* refracting" tell.
	float trailMask = 0.0;
	vec2 trailRefr = vec2(0.0);
	for (int i = 0; i < ${MAX_DROPS}; i++) {
		if (i >= count) break;
		vec4 dr = u_drops[i];
		float r = dr.z;
		if (r <= 0.0) continue;
		float tail = dr.w;
		if (tail <= 0.0) continue;
		// Trail extends ABOVE the drop in fragCoord (Y up) — drops fall
		// in -Y, so the wake is what they have crossed.
		float dy = fragPx.y - dr.y;
		if (dy > 0.0 && dy < tail) {
			float tT = dy / tail;                       // 0 at drop, 1 at far end
			float widthAt = r * (0.55 - tT * 0.4);
			float dx = (fragPx.x - dr.x);
			float adx = abs(dx);
			if (adx < widthAt) {
				// Gaussian across-strip profile so the trail has soft edges.
				float prof = exp(-pow(dx / max(widthAt * 0.62, 1.0), 2.0));
				float fadeT = 1.0 - tT;                 // older end of trail fades
				float w = prof * fadeT;
				trailMask = max(trailMask, w);
				// Half-cylinder normal across X: shift sharp bg by a
				// small horizontal amount proportional to dx/widthAt.
				float nx = dx / max(widthAt, 1.0);
				trailRefr.x += nx * widthAt * 0.6 * u_refraction * w;
			}
		}
	}
	if (trailMask > 0.0) {
		vec3 trailCol = sampleSharp(sUV + trailRefr * pxToUV);
		col = mix(col, trailCol, clamp(trailMask * u_trailStrength * 0.85, 0.0, 1.0));
	}

	// ── Drops: spherical-cap biconvex refraction + chromatic dispersion ──
	for (int i = 0; i < ${MAX_DROPS}; i++) {
		if (i >= count) break;
		vec4 dr = u_drops[i];
		float r = dr.z;
		if (r <= 0.0) continue;
		vec2 dp = fragPx - dr.xy;                       // vector centre→pixel, px
		float d = length(dp);
		if (d > r + 1.0) continue;

		// Anti-aliased drop silhouette.
		float mask = 1.0 - smoothstep(r - 1.5, r + 0.5, d);

		// Spherical cap surface height h(d) = sqrt(R² - d²).  The 2D
		// gradient of h is (-dp/sqrt(R²-d²)) — points DOWN the slope
		// (toward the rim).  In screen-space (small-angle approx) the
		// refraction shift is hGrad · (1 - 1/IOR).  Multiply by 2 for
		// biconvex (entry + exit).  Refractive power IS the inverse-IOR
		// term — bigger IOR ⇒ stronger bend.
		float clamped = clamp(d / max(r, 1e-3), 0.0, 0.995);
		float zCap = sqrt(max(1.0 - clamped * clamped, 1e-4));  // unit-sphere normal-z
		vec2 hGrad = -dp / max(r * zCap, 1e-3);          // shape gradient, pixel-units / px

		// Per-channel IOR for chromatic dispersion at the rim. Real water
		// disperses ~0.011 across the visible spectrum (1.339 blue,
		// 1.333 green, 1.328 red).  Boost the spread visibly via
		// u_chroma so it's perceivable on a sub-pixel offset.
		float iorR = 1.328;
		float iorG = 1.333;
		float iorB = 1.339;
		float refrPowR = 1.0 - 1.0 / iorR;
		float refrPowG = 1.0 - 1.0 / iorG;
		float refrPowB = 1.0 - 1.0 / iorB;

		// Strength factor blends in toward the rim (where curvature ⇒
		// dispersion is visible) and falls to ~zero at the centre.
		float rim = clamped;                             // 0 centre, 1 rim
		float caBoost = mix(1.0, 3.5, rim) * u_chroma;
		// Biconvex (entry+exit) refraction in pixel units.
		float biconvex = 2.0 * r * u_refraction;
		vec2 dispBase = hGrad * biconvex;
		vec2 dispR = dispBase * refrPowR + hGrad * caBoost * 1.5;
		vec2 dispG = dispBase * refrPowG;
		vec2 dispB = dispBase * refrPowB - hGrad * caBoost * 1.5;

		vec2 uvR = sUV + dispR * pxToUV;
		vec2 uvG = sUV + dispG * pxToUV;
		vec2 uvB = sUV + dispB * pxToUV;
		vec3 lensed = vec3(sampleSharpR(uvR), sampleSharpG(uvG), sampleSharpB(uvB));

		// Rim highlight — light from above-left (small soft disc at upper-left).
		vec2 nrm = dp / max(r, 1e-3);
		vec2 hl = nrm - vec2(-0.42, 0.42);
		float spec = pow(max(0.0, 1.0 - length(hl) * 1.4), 5.0);
		lensed += vec3(1.0, 0.98, 0.94) * spec * 0.55;

		// Secondary tighter pin-point glint right at the apex.
		vec2 hl2 = nrm - vec2(-0.18, 0.55);
		float spec2 = pow(max(0.0, 1.0 - length(hl2) * 2.6), 8.0);
		lensed += vec3(1.0) * spec2 * 0.75;

		// Soft inner shadow on the bottom-right rim (away from the key light).
		vec2 sh = nrm - vec2(0.55, -0.55);
		float shadow = pow(max(0.0, 1.0 - length(sh) * 1.35), 3.0);
		lensed *= 1.0 - shadow * 0.22;

		// Outer dark ring just outside the silhouette — the contact line
		// where the drop meets the pane, slightly darker than the bg.
		float ringOut = smoothstep(r + 0.5, r - 1.5, d);
		lensed *= 1.0 - (1.0 - ringOut) * 0.0;          // (kept for symmetry; main mask handles it)

		col = mix(col, lensed, mask);
	}

	outColor = vec4(col, 1.0);
}`;
function makeFallbackBG() {
    const W = 1280, H = 800;
    const cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1a3a55');
    grad.addColorStop(1, '#06101a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 80; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        const a = Math.random() * 0.05 + 0.02;
        ctx.fillStyle = `rgba(120, 200, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, 8 + Math.random() * 60, 0, Math.PI * 2);
        ctx.fill();
    }
    return cv;
}
function makeBlurredCopy(src, blurPx) {
    const w = src.width || src.naturalWidth || 1024;
    const h = src.height || src.naturalHeight || 640;
    const cv = document.createElement('canvas');
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext('2d');
    ctx.filter = `blur(${Math.max(0, blurPx)}px)`;
    ctx.drawImage(src, 0, 0, w, h);
    ctx.filter = 'none';
    return cv;
}
function compile(gl, t, s) {
    const sh = gl.createShader(t);
    gl.shaderSource(sh, s);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('[rain-on-glass]', gl.getShaderInfoLog(sh));
        throw new Error('compile');
    }
    return sh;
}
function RainOnGlassHero(props) {
    const { size, seed, reducedMotion, backgroundImage = 'https://crazygl.com/samples/nature5.avif', fallbackBackgroundImage, blur = 14, dropCount = 50, dropSize = 1, fallSpeed = 1, refraction = 1, trailStrength = 1, chroma = 1, } = props;
    const content = useContent(props);
    const [assetsReady, setAssetsReady] = React.useState(false);
    useHeroReady(props, { until: assetsReady });
    const canvasRef = React.useRef(null);
    const glRef = React.useRef(null);
    const programRef = React.useRef(null);
    const uRef = React.useRef({});
    const sharpTexRef = React.useRef(null);
    const blurTexRef = React.useRef(null);
    const bgSizeRef = React.useRef({ w: 1280, h: 800 });
    const dropsRef = React.useRef([]);
    // Float32Array sent to shader: (x, y, r, tailLen) per drop. Allocated once.
    const dropsBufRef = React.useRef(new Float32Array(MAX_DROPS * 4));
    // RNG, allocated once and reused for spawn-on-recycle. Stable across resizes
    // because we re-seed from `seed` whenever it changes.
    const rngRef = React.useRef(createDeterministicRandom(typeof seed === 'number' ? seed : 1));
    React.useEffect(() => {
        const c = canvasRef.current;
        if (!c)
            return;
        const gl = c.getContext('webgl2', { antialias: false, alpha: false });
        if (!gl)
            return;
        glRef.current = gl;
        try {
            const p = gl.createProgram();
            gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
            gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, FRAG));
            gl.linkProgram(p);
            if (!gl.getProgramParameter(p, gl.LINK_STATUS))
                throw new Error('link');
            programRef.current = p;
            gl.useProgram(p);
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
            const loc = gl.getAttribLocation(p, 'a_position');
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
            for (const n of ['u_bgSharp', 'u_bgBlur', 'u_resolution', 'u_bgSize', 'u_refraction', 'u_trailStrength', 'u_chroma', 'u_count']) {
                uRef.current[n] = gl.getUniformLocation(p, n);
            }
            uRef.current['u_drops[0]'] = gl.getUniformLocation(p, 'u_drops[0]');
            // Sampler-to-unit binding — once, at init.
            gl.uniform1i(uRef.current.u_bgSharp, 0);
            gl.uniform1i(uRef.current.u_bgBlur, 1);
            sharpTexRef.current = gl.createTexture();
            blurTexRef.current = gl.createTexture();
            for (let unit = 0; unit < 2; unit++) {
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, unit === 0 ? sharpTexRef.current : blurTexRef.current);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
        }
        catch { }
    }, []);
    React.useEffect(() => {
        const gl = glRef.current;
        if (!gl)
            return;
        const sharp = sharpTexRef.current, blr = blurTexRef.current;
        const upload = (src) => {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, sharp);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, blr);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, makeBlurredCopy(src, blur));
            const w = src.width || src.naturalWidth || 1;
            const h = src.height || src.naturalHeight || 1;
            bgSizeRef.current = { w, h };
        };
        if (backgroundImage) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => { if (glRef.current)
                upload(img); setAssetsReady(true); };
            img.onerror = () => {
                upload(makeFallbackBG());
                setAssetsReady(true);
            };
            img.src = backgroundImage;
        }
        else {
            upload(makeFallbackBG());
            setAssetsReady(true);
        }
    }, [backgroundImage, blur]);
    React.useEffect(() => {
        const c = canvasRef.current, gl = glRef.current;
        if (!c || !gl)
            return;
        const dpr = Math.min(size.dpr, 2);
        const w = Math.max(1, Math.floor(size.width * dpr)), h = Math.max(1, Math.floor(size.height * dpr));
        if (c.width !== w)
            c.width = w;
        if (c.height !== h)
            c.height = h;
        gl.viewport(0, 0, w, h);
    }, [size.width, size.height, size.dpr]);
    // Build/refresh drop array when count, size, or seed changes.
    React.useEffect(() => {
        rngRef.current = createDeterministicRandom(typeof seed === 'number' ? seed : 1);
        const rng = rngRef.current;
        const w = Math.max(1, size.width), h = Math.max(1, size.height);
        const n = Math.min(MAX_DROPS, Math.max(10, Math.floor(dropCount)));
        dropsRef.current = Array.from({ length: n }, () => ({
            x: rng.range(0, 1) * w,
            // y in screen pixel space (gl_FragCoord-up): 0 at bottom, h at top.
            y: rng.range(0, 1) * h,
            r: (6 + rng.range(0, 1) * 10) * dropSize,
            vy: rng.range(12, 34) * dropSize,
            age: rng.range(0, 5),
            tailLen: rng.range(8, 40) * dropSize,
        }));
    }, [seed, dropCount, dropSize, size.width, size.height]);
    const eff = reducedMotion ? 0 : fallSpeed;
    useHeroAnimationFrame(props.rootRef, ({ delta }) => {
        const gl = glRef.current, p = programRef.current, c = canvasRef.current;
        const sharp = sharpTexRef.current, blr = blurTexRef.current;
        if (!gl || !p || !c || !sharp || !blr)
            return;
        const w = size.width, h = size.height;
        if (!w || !h)
            return;
        const drops = dropsRef.current;
        const dpr = c.width / Math.max(1, w);
        const dt = Math.min(0.05, delta);
        const rng = rngRef.current;
        // ── Simulate ────────────────────────────────────────────────────
        for (let i = 0; i < drops.length; i++) {
            const d = drops[i];
            d.age += dt;
            // Terminal velocity ∝ r (mass/drag ratio).  Slide threshold is
            // the pinning radius: below it the drop clings to surface tension.
            const radiusPx = d.r;
            const slideThreshold = 4 * dropSize;
            const sliding = radiusPx > slideThreshold;
            if (sliding && eff > 0) {
                d.vy += radiusPx * 8 * eff * dt;
                d.vy *= 0.97; // drag
                d.y -= d.vy * dt;
                d.tailLen = Math.min(120, d.tailLen + d.vy * dt * 1.2);
            }
            else {
                // Tail fades when not moving.
                d.tailLen *= Math.pow(0.5, dt / 0.4);
            }
            // Recycle off the bottom of the pane.
            if (d.y < -radiusPx * 2) {
                d.x = rng.range(0, 1) * w;
                d.y = h + radiusPx * 2 + rng.range(0, h * 0.35);
                d.r = (6 + rng.range(0, 1) * 10) * dropSize;
                d.vy = rng.range(12, 34) * dropSize;
                d.tailLen = rng.range(8, 40) * dropSize;
                d.age = 0;
            }
        }
        // ── Merge overlapping drops ─────────────────────────────────────
        // O(n²) collision check. n ≤ 150 so ~22k pairs/frame — cheap.
        for (let i = 0; i < drops.length; i++) {
            const a = drops[i];
            if (a.r <= 0)
                continue;
            for (let j = i + 1; j < drops.length; j++) {
                const b = drops[j];
                if (b.r <= 0)
                    continue;
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist < a.r + b.r) {
                    // Larger absorbs smaller.  New radius preserves area
                    // (volume per unit thickness, i.e. mass conservation).
                    const big = a.r >= b.r ? a : b;
                    const small = a.r >= b.r ? b : a;
                    big.r = Math.sqrt(big.r * big.r + small.r * small.r);
                    big.vy = Math.max(big.vy, small.vy);
                    small.r = 0;
                    // Respawn the absorbed drop at the top.
                    small.x = rng.range(0, 1) * w;
                    small.y = h + 30 + rng.range(0, h * 0.35);
                    small.r = (6 + rng.range(0, 1) * 10) * dropSize;
                    small.vy = rng.range(12, 34) * dropSize;
                    small.tailLen = rng.range(8, 40) * dropSize;
                    small.age = 0;
                }
            }
        }
        // ── Pack uniforms (in CANVAS pixel coords, accounting for DPR) ──
        const arr = dropsBufRef.current;
        const maxR = 30 * dropSize;
        for (let i = 0; i < MAX_DROPS; i++) {
            const off = i * 4;
            if (i >= drops.length) {
                arr[off] = arr[off + 1] = arr[off + 2] = arr[off + 3] = 0;
                continue;
            }
            const d = drops[i];
            const r = Math.min(d.r, maxR);
            arr[off + 0] = d.x * dpr;
            arr[off + 1] = d.y * dpr;
            arr[off + 2] = r * dpr;
            arr[off + 3] = d.tailLen * dpr;
        }
        gl.useProgram(p);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sharp);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, blr);
        const u = uRef.current;
        gl.uniform2f(u.u_resolution, c.width, c.height);
        gl.uniform2f(u.u_bgSize, bgSizeRef.current.w, bgSizeRef.current.h);
        gl.uniform1f(u.u_refraction, refraction);
        gl.uniform1f(u.u_trailStrength, trailStrength);
        gl.uniform1f(u.u_chroma, chroma);
        gl.uniform1f(u.u_count, drops.length);
        gl.uniform4fv(u['u_drops[0]'], arr);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    return (_jsxs(_Fragment, { children: [_jsx("crazygl-stage", { style: { backgroundImage: fallbackBackgroundImage ? `url(${fallbackBackgroundImage})` : undefined, backgroundColor: '#050807', backgroundPosition: 'bottom center', backgroundSize: 'cover' }, children: _jsx("canvas", { ref: canvasRef, className: "crazygl-rain-canvas", style: { opacity: assetsReady ? 1 : 0, transition: 'opacity 450ms ease' }, "aria-hidden": "true" }) }), _jsx("crazygl-content", { children: content.node })] }));
}
export default function RainOnGlass(props) {
    return _jsx(CrazyGLWrapper, { hero: RainOnGlassHero, metadata: metadata, ...props });
}
export { metadata };

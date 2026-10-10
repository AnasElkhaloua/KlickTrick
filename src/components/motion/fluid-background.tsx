"use client";

import {useEffect, useRef} from "react";
import {cn} from "@/lib/utils/cn";

// Domain-warped fbm noise tinted with the brand blue; the cursor pushes the flow away and adds a soft light.
const FRAGMENT = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_hover;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 3.1; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = uv * aspect * 1.7;
  vec2 mp = u_mouse * aspect * 1.7;
  // Soft circular zone around the cursor: the flow swells gently and brightens a touch, no hard point.
  float zone = u_hover * (1.0 - smoothstep(0.0, 0.95, length(p - mp)));
  p += zone * 0.12 * (p - mp);

  float t = u_time;
  vec2 q = vec2(fbm(p + t * 0.05), fbm(p + vec2(5.2, 1.3) - t * 0.04));
  vec2 w = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.07), fbm(p + 4.0 * q + vec2(8.3, 2.8) - t * 0.06));
  float f = fbm(p + 4.0 * w);

  vec3 blue = vec3(0.337, 0.651, 0.847);
  vec3 col = mix(vec3(0.012), blue * 0.5, smoothstep(0.38, 0.95, f));
  col += blue * 0.4 * smoothstep(0.55, 1.1, length(w)) * f;
  col += blue * 0.1 * zone;
  col *= 1.0 - smoothstep(0.3, 1.0, length((uv - vec2(0.5, 0.3)) * vec2(0.9, 1.3)));
  col *= 1.0 - 0.45 * smoothstep(0.35, 0.85, uv.y); // calmer near the top where headlines sit
  gl_FragColor = vec4(col, 1.0);
}`;

const VERTEX = "attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }";

// ponytail: renders at half resolution and caps DPR at 1; the noise is soft enough that nobody sees the difference.
export function FluidBackground({className}: {className?: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", {antialias: false, alpha: false, powerPreference: "low-power"});
    if (!canvas || !gl) return; // CSS gradient on the wrapper stays as the fallback

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uHover = gl.getUniformLocation(program, "u_hover");

    const scale = 0.5;
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse target vs. eased position: the lag is what makes it feel liquid.
    const target = {x: 0.5, y: 0.6, hover: 0};
    const eased = {x: 0.5, y: 0.6, hover: 0};
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      target.hover = inside && e.pointerType === "mouse" ? 1 : 0;
      if (inside) {
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height;
      }
    };
    window.addEventListener("pointermove", onMove, {passive: true});

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const frame = (now: number) => {
      eased.x += (target.x - eased.x) * 0.035;
      eased.y += (target.y - eased.y) * 0.035;
      eased.hover += (target.hover - eased.hover) * 0.04;
      gl.uniform1f(uTime, still ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, eased.x, eased.y);
      gl.uniform1f(uHover, still ? 0 : eased.hover);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still && visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(86,166,216,.18),transparent_70%)] [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]", className)}>
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}

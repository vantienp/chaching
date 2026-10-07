"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hasSpikes: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

interface ContrailParticle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
}

interface DreamParticle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedY: number;
  speedX: number;
  color: string;
}

export function SkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // ==================== 1. STARS INITIALIZATION ====================
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 14000); // Responsive count
      for (let i = 0; i < starCount; i++) {
        // Concentrate stars mostly in the upper 45% of the sky
        const y = Math.random() * (height * 0.48);
        const x = Math.random() * width;
        const radius = Math.random() * 1.6 + 0.5;
        const baseAlpha = Math.random() * 0.6 + 0.3;
        stars.push({
          x,
          y,
          radius,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
          hasSpikes: Math.random() > 0.88,
        });
      }
    };
    initStars();

    // ==================== 2. SHOOTING STARS ====================
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * (width * 0.7),
        y: Math.random() * (height * 0.28),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 9 + 11,
        angle: Math.PI / 6 + (Math.random() - 0.5) * 0.1, // ~30 deg downward right
        opacity: 1,
        active: true,
      });
    };

    // ==================== 3. CONTRAIL PARTICLES (VỆT KHÓI PHẢN LỰC) ====================
    const contrailParticles: ContrailParticle[] = [];

    // ==================== 4. DREAM STARDUST PARTICLES ====================
    const dreamParticles: DreamParticle[] = [];
    const colors = [
      "rgba(254, 215, 226, ", // Soft rose
      "rgba(253, 230, 138, ", // Warm gold
      "rgba(224, 231, 255, ", // Lavender
      "rgba(255, 255, 255, ", // Pure white
    ];

    for (let i = 0; i < 40; i++) {
      dreamParticles.push({
        x: Math.random() * width,
        y: height * 0.45 + Math.random() * (height * 0.5),
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // ==================== MOUSE PARALLAX ====================
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ==================== ANIMATION LOOP ====================
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const offsetX = (mouseX / width - 0.5) * 18;
      const offsetY = (mouseY / height - 0.5) * 12;

      // ---------- A. TWINKLING STARS ----------
      for (const s of stars) {
        const currentAlpha =
          s.baseAlpha +
          Math.sin(frame * s.twinkleSpeed + s.twinkleOffset) * 0.35;
        const clampedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.fillStyle = `rgba(255, 255, 255, ${clampedAlpha})`;
        ctx.beginPath();
        const drawX = s.x + offsetX * 0.3;
        const drawY = s.y + offsetY * 0.3;
        ctx.arc(drawX, drawY, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Lens flare spike for prominent stars
        if (s.hasSpikes && clampedAlpha > 0.6) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${clampedAlpha * 0.6})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(drawX - s.radius * 3.5, drawY);
          ctx.lineTo(drawX + s.radius * 3.5, drawY);
          ctx.moveTo(drawX, drawY - s.radius * 3.5);
          ctx.lineTo(drawX, drawY + s.radius * 3.5);
          ctx.stroke();
        }
      }

      // ---------- B. SHOOTING STARS ----------
      if (frame - lastShootingStarTime > 240 + Math.random() * 200) {
        spawnShootingStar();
        lastShootingStarTime = frame;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.012;

        if (star.opacity <= 0 || star.y > height * 0.65 || star.x > width) {
          star.active = false;
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.7, `rgba(255, 220, 240, ${star.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        // Glowing star head
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---------- C. AIRPLANE & CONTRAIL (VỆT KHÓI ĐỘNG CƠ PHẢN LỰC) ----------
      // Center position of the plane matching reference image coordinates
      const jetBaseX = width * 0.518 + offsetX * 0.7;
      const jetBaseY = height * 0.492 + Math.sin(frame * 0.025) * 3.5 + offsetY * 0.7;

      // Spawn new contrail particles behind the engines
      if (frame % 2 === 0) {
        contrailParticles.push({
          x: jetBaseX - 22,
          y: jetBaseY + (Math.random() - 0.5) * 2,
          radius: Math.random() * 2.5 + 2,
          opacity: 0.85,
          speedX: -(Math.random() * 1.2 + 0.8),
          speedY: (Math.random() - 0.5) * 0.15,
          life: 0,
          maxLife: 220, // Long lingering vapor trail
        });
      }

      // Render contrail particles expanding & dispersing
      for (let i = contrailParticles.length - 1; i >= 0; i--) {
        const p = contrailParticles[i];
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;
        p.radius += 0.08; // Vapor expands
        p.opacity = (1 - p.life / p.maxLife) * 0.75;

        if (p.life >= p.maxLife || p.x < width * 0.2) {
          contrailParticles.splice(i, 1);
          continue;
        }

        const pGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 2
        );
        pGrad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.9})`);
        pGrad.addColorStop(0.5, `rgba(255, 240, 250, ${p.opacity * 0.4})`);
        pGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Continuous high-speed vapor core beam
      const trailStartX = jetBaseX - 16;
      const trailEndX = Math.max(width * 0.22, trailStartX - 280);
      const coreGrad = ctx.createLinearGradient(trailEndX, jetBaseY, trailStartX, jetBaseY);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGrad.addColorStop(0.4, "rgba(255, 245, 252, 0.4)");
      coreGrad.addColorStop(0.85, "rgba(255, 255, 255, 0.85)");
      coreGrad.addColorStop(1, "rgba(255, 255, 255, 0.95)");

      ctx.strokeStyle = coreGrad;
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(trailEndX, jetBaseY);
      ctx.lineTo(trailStartX, jetBaseY);
      ctx.stroke();

      // Additional upper/lower high-altitude thin stream lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(trailStartX - 180, jetBaseY - 2.5);
      ctx.lineTo(trailStartX - 5, jetBaseY - 1.5);
      ctx.moveTo(trailStartX - 140, jetBaseY + 2.5);
      ctx.lineTo(trailStartX - 5, jetBaseY + 1.5);
      ctx.stroke();

      // Jet Engine Exhaust Glow Pulse
      const engineGlow = ctx.createRadialGradient(
        jetBaseX - 8,
        jetBaseY,
        0,
        jetBaseX - 8,
        jetBaseY,
        14 + Math.sin(frame * 0.1) * 3
      );
      engineGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      engineGlow.addColorStop(0.4, "rgba(224, 242, 254, 0.5)");
      engineGlow.addColorStop(1, "rgba(224, 242, 254, 0)");
      ctx.fillStyle = engineGlow;
      ctx.beginPath();
      ctx.arc(jetBaseX - 8, jetBaseY, 16, 0, Math.PI * 2);
      ctx.fill();

      // Crisp White Jet Airliner Silhouette
      ctx.save();
      ctx.translate(jetBaseX, jetBaseY);
      // Subtle aerodynamic pitch angle
      ctx.rotate(Math.sin(frame * 0.025) * 0.015);

      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
      ctx.shadowBlur = 8;

      ctx.beginPath();
      // Nose cone
      ctx.moveTo(14, 0);
      // Fuselage top & wing root
      ctx.lineTo(4, -2.5);
      // Left swept wing tip
      ctx.lineTo(-4, -13);
      ctx.lineTo(-7, -13);
      // Wing trailing edge
      ctx.lineTo(-3, -2.5);
      // Rear fuselage
      ctx.lineTo(-12, -2);
      // Tail horizontal stabilizer
      ctx.lineTo(-17, -7);
      ctx.lineTo(-19, -7);
      ctx.lineTo(-16, -1);
      // Tail cone
      ctx.lineTo(-18, 0);
      // Lower tail stabilizer
      ctx.lineTo(-16, 1);
      ctx.lineTo(-19, 7);
      ctx.lineTo(-17, 7);
      ctx.lineTo(-12, 2);
      // Right wing trailing edge
      ctx.lineTo(-3, 2.5);
      // Right swept wing tip
      ctx.lineTo(-7, 13);
      ctx.lineTo(-4, 13);
      // Right wing leading edge
      ctx.lineTo(4, 2.5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // ---------- D. DREAM STARDUST PARTICLES (BỤI SAO BAY LÊN) ----------
      for (const dp of dreamParticles) {
        dp.y += dp.speedY;
        dp.x += dp.speedX;

        // Reset if ascends past upper twilight
        if (dp.y < height * 0.15) {
          dp.y = height * 0.65 + Math.random() * (height * 0.3);
          dp.x = Math.random() * width;
        }

        ctx.fillStyle = `${dp.color}${dp.opacity})`;
        ctx.beginPath();
        ctx.arc(dp.x + offsetX * 0.5, dp.y + offsetY * 0.5, dp.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}

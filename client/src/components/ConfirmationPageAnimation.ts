import { useMantineTheme } from '@mantine/core';

function initBackgroundAnimation() {
  const theme = useMantineTheme();
  const canvas = document.createElement('canvas');
  const customSvgPath =
    'M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 9.66h-6a1 1 0 0 0 -1 1v.05a3.975 3.975 0 0 0 3.777 3.97l.227 .005a4.026 4.026 0 0 0 3.99 -3.79l.006 -.206a1 1 0 0 0 -1 -1.029zm-5.99 -5l-.127 .007a1 1 0 0 0 .117 1.993l.127 -.007a1 1 0 0 0 -.117 -1.993zm6 0l-.127 .007a1 1 0 0 0 .117 1.993l.127 -.007a1 1 0 0 0 -.117 -1.993z';

  canvas.style.position = 'fixed';
  canvas.style.zIndex = '-1';
  canvas.style.top = '0';
  canvas.style.left = '0';
  document.body.appendChild(canvas);

  const ctx: CanvasRenderingContext2D = canvas.getContext(
    '2d'
  ) as CanvasRenderingContext2D;
  let particles: Particle[] = [];

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(
      x: number,
      y: number,
      size: number,
      speedX: number,
      speedY: number
    ) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 6) this.size -= 0.045;
    }

    async draw() {
      const path = new Path2D(customSvgPath);
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 4.4, this.size / 4.4);
      ctx.lineWidth = 1;
      ctx.strokeStyle = theme.colors.blue[4];
      ctx.stroke(path);
      ctx.restore();
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  async function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    await Promise.all(
      particles.map((particle) => {
        particle.update();
        return particle.draw();
      })
    );

    requestAnimationFrame(animateParticles);
  }

  function createParticle() {
    const posX = canvas.width / 2;
    const posY = canvas.height / 2;

    const size = 27;
    const speedX = (Math.random() - 0.5) * 4.3;
    const speedY = (Math.random() - 0.6) * 4.3;

    particles.push(new Particle(posX, posY, size, speedX, speedY));
  }

  resizeCanvas();
  animateParticles();
  window.addEventListener('resize', resizeCanvas);

  for (let i = 0; i < 30; i++) {
    createParticle();
  }
}

export default initBackgroundAnimation;

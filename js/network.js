/**
 * NEXON Technological Network Engine (Zero emojis, pure vector geometry)
 * Visualizes: CLIENT → NEXON CORE → DIGITAL TALENT → QUALITY CONTROL → DELIVERY
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroNetworkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Architecture Nodes (Coordinates normalized 0-1)
  const nodes = [
    { id: 'client', label: 'CLIENT', sub: 'Inquiry', x: 0.12, y: 0.5, radius: 22, color: '#38bdf8' },
    { id: 'nexon', label: 'NEXON', sub: 'Hub', x: 0.38, y: 0.5, radius: 32, color: '#00f2fe' },
    { id: 't_dev', label: 'Engineering', sub: 'Verified', x: 0.64, y: 0.22, radius: 17, color: '#8b5cf6' },
    { id: 't_des', label: 'Design & UI', sub: 'Verified', x: 0.68, y: 0.41, radius: 17, color: '#c084fc' },
    { id: 't_ai', label: 'AI & Automations', sub: 'Verified', x: 0.68, y: 0.61, radius: 17, color: '#38bdf8' },
    { id: 't_mkt', label: 'Growth & SEO', sub: 'Verified', x: 0.64, y: 0.79, radius: 17, color: '#06b6d4' },
    { id: 'qa', label: 'QA & QC', sub: 'Auditing', x: 0.84, y: 0.5, radius: 21, color: '#3b82f6' },
    { id: 'delivery', label: 'DELIVERY', sub: 'Production', x: 0.94, y: 0.5, radius: 19, color: '#00f2fe' }
  ];

  // Structural Links
  const links = [
    { from: 'client', to: 'nexon' },
    { from: 'nexon', to: 't_dev' },
    { from: 'nexon', to: 't_des' },
    { from: 'nexon', to: 't_ai' },
    { from: 'nexon', to: 't_mkt' },
    { from: 't_dev', to: 'qa' },
    { from: 't_des', to: 'qa' },
    { from: 't_ai', to: 'qa' },
    { from: 't_mkt', to: 'qa' },
    { from: 'qa', to: 'delivery' }
  ];

  // Moving Data Packets / Pulses
  const pulses = [];
  for (let i = 0; i < 16; i++) {
    pulses.push({
      linkIndex: Math.floor(Math.random() * links.length),
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.006,
      size: 2.5
    });
  }

  // Ambient Floating Constellation Particles
  const ambientParticles = [];
  for (let i = 0; i < 24; i++) {
    ambientParticles.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.25 + 0.08
    });
  }

  let mouseX = -100;
  let mouseY = -100;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = -100;
    mouseY = -100;
  });

  let frame = 0;

  function render() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    // Draw ambient particles
    ambientParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1;
      if (p.y > 1) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();
    });

    function getNodePos(node) {
      const oscX = Math.sin(frame * 0.02 + node.y * 8) * 2.5;
      const oscY = Math.cos(frame * 0.02 + node.x * 8) * 2.5;
      return {
        x: node.x * width + oscX,
        y: node.y * height + oscY
      };
    }

    // Draw Links
    links.forEach(link => {
      const fromNode = nodes.find(n => n.id === link.from);
      const toNode = nodes.find(n => n.id === link.to);
      const p1 = getNodePos(fromNode);
      const p2 = getNodePos(toNode);

      const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      grad.addColorStop(1, 'rgba(139, 92, 246, 0.25)');

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.25;
      ctx.stroke();
    });

    // Draw Dynamic Pulses
    pulses.forEach(pulse => {
      pulse.progress += pulse.speed;
      if (pulse.progress > 1) {
        pulse.progress = 0;
        pulse.linkIndex = Math.floor(Math.random() * links.length);
      }

      const link = links[pulse.linkIndex];
      const fromNode = nodes.find(n => n.id === link.from);
      const toNode = nodes.find(n => n.id === link.to);
      const p1 = getNodePos(fromNode);
      const p2 = getNodePos(toNode);

      const curX = p1.x + (p2.x - p1.x) * pulse.progress;
      const curY = p1.y + (p2.y - p1.y) * pulse.progress;

      ctx.save();
      ctx.beginPath();
      ctx.arc(curX, curY, pulse.size, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    });

    // Draw Nodes
    nodes.forEach(node => {
      const pos = getNodePos(node);
      const distToMouse = Math.hypot(pos.x - mouseX, pos.y - mouseY);
      const isHovered = distToMouse < node.radius + 10;

      // Glow halo
      ctx.save();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, node.radius + (isHovered ? 6 : 3), 0, Math.PI * 2);
      ctx.fillStyle = node.id === 'nexon' ? 'rgba(0, 242, 254, 0.16)' : 'rgba(59, 130, 246, 0.1)';
      ctx.fill();

      // Node Body
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, node.radius, 0, Math.PI * 2);
      if (node.id === 'nexon') {
        const radGrad = ctx.createRadialGradient(pos.x, pos.y, 2, pos.x, pos.y, node.radius);
        radGrad.addColorStop(0, '#00f2fe');
        radGrad.addColorStop(0.65, '#2563eb');
        radGrad.addColorStop(1, '#7c3aed');
        ctx.fillStyle = radGrad;
      } else {
        ctx.fillStyle = '#0a0f1e';
      }
      ctx.fill();

      // Node Ring Border
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, node.radius, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? '#00f2fe' : (node.id === 'nexon' ? '#ffffff' : node.color);
      ctx.lineWidth = node.id === 'nexon' ? 2 : 1.5;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isHovered ? 16 : 6;
      ctx.stroke();
      ctx.restore();

      // Node Center Dot / Core Ring
      ctx.save();
      if (node.id === 'nexon') {
        ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('NEXON', pos.x, pos.y);
      } else {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#00f2fe' : node.color;
        ctx.fill();
      }

      // Subtitle & Label below node
      ctx.font = '600 8.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, pos.x, pos.y + node.radius + 11);
      ctx.font = '500 7.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(node.sub, pos.x, pos.y + node.radius + 20);
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
});

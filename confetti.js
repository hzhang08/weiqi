class Confetti {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#FFD700', '#FF6B4A', '#4A90E2', '#50E3C2', '#FF8A65'];
        this.heroSection = null;
        this.heroContent = null;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.heroSection = document.querySelector('.hero-section');
        this.heroContent = document.querySelector('.hero-content');
        if (!this.heroSection || !this.heroContent) {
            console.error('Required elements not found');
            return;
        }

        // Set up the canvas
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        
        // Insert canvas as first child of hero section
        this.heroSection.insertBefore(this.canvas, this.heroSection.firstChild);
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
        this.createParticles();
        this.animate();
    }

    resizeCanvas() {
        if (!this.heroSection) return;
        
        // Match canvas size to hero section
        this.canvas.width = this.heroSection.offsetWidth;
        this.canvas.height = this.heroSection.offsetHeight;
    }

    createParticles() {
        const numParticles = 15;
        for (let i = 0; i < numParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        if (!this.heroContent) return null;

        // Get the position of hero content
        const heroRect = this.heroContent.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Calculate burst origin point above the hero content
        const originX = this.canvas.width / 2;
        const originY = (heroRect.top - canvasRect.top) - 20;

        // Create a more circular burst pattern
        const angle = (Math.random() * 360) * Math.PI / 180;
        const speed = Math.random() * 0.8 + 0.6;

        return {
            x: originX,
            y: originY,
            size: Math.random() * 4 + 2,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            gravity: 0.02,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            opacity: 1,
            fadeSpeed: Math.random() * 0.002 + 0.002
        };
    }

    animate() {
        if (!this.heroSection || !this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            if (!p) continue;
            
            // Update position
            p.x += p.speedX * 0.7;
            p.y += p.speedY * 0.7;
            p.speedY += p.gravity;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.fadeSpeed;

            // Draw particle
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();

            // Remove faded particles and create new ones
            if (p.opacity <= 0) {
                this.particles.splice(i, 1);
                this.particles.push(this.createParticle());
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener('load', () => {
    new Confetti();
});

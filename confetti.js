class Confetti {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#FFD700', '#FF6B4A', '#4A90E2', '#50E3C2', '#FF8A65'];
        this.badge = null;
        this.badgeRect = null;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.badge = document.querySelector('.ai-badge');
        if (!this.badge) {
            console.error('AI badge not found');
            return;
        }

        // Set up the canvas
        this.canvas.style.position = 'absolute';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        // Insert canvas into the same parent as the badge
        this.badge.parentElement.appendChild(this.canvas);
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
        this.createParticles();
        this.animate();
    }

    resizeCanvas() {
        if (!this.badge) return;
        
        const padding = 20;
        const extraHeight = 100; // Extra height for higher burst
        const computedStyle = window.getComputedStyle(this.badge);
        const top = parseInt(computedStyle.top);
        const right = parseInt(computedStyle.right);
        
        // Position canvas to match badge position, but taller
        this.canvas.style.top = (top - padding - extraHeight) + 'px';
        this.canvas.style.right = (right - padding) + 'px';
        this.canvas.width = this.badge.offsetWidth + (padding * 2);
        this.canvas.height = this.badge.offsetHeight + (padding * 2) + extraHeight;
    }

    createParticles() {
        const numParticles = 15;
        for (let i = 0; i < numParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        // Calculate burst origin point at bottom center
        const originX = this.canvas.width / 2;
        const originY = this.canvas.height - 15;

        // Create a more circular burst pattern
        const angle = (Math.random() * 80 - 40) * Math.PI / 180;
        const speed = Math.random() * 0.8 + 2.2; // Increased base speed for higher burst

        return {
            x: originX,
            y: originY,
            size: Math.random() * 4 + 2,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            speedX: Math.sin(angle) * speed,
            speedY: -Math.cos(angle) * speed,
            gravity: 0.025, // Reduced gravity to allow higher rise
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            opacity: 1,
            fadeSpeed: Math.random() * 0.005 + 0.005
        };
    }

    animate() {
        if (!this.badge || !this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position with slower movement
            p.x += p.speedX * 0.5;
            p.y += p.speedY * 0.5;
            p.speedY += p.gravity;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.fadeSpeed;

            // Draw particle
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            
            // Draw a small star shape
            this.ctx.beginPath();
            this.ctx.fillStyle = p.color;
            for (let j = 0; j < 5; j++) {
                const angle = (j * 72) * Math.PI / 180;
                const x = Math.cos(angle) * p.size;
                const y = Math.sin(angle) * p.size;
                j === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
            }
            this.ctx.closePath();
            this.ctx.fill();
            
            this.ctx.restore();

            // Reset particle if it's out of bounds or fully faded
            if (p.y > this.canvas.height + 10 || p.y < -10 || 
                p.x < -10 || p.x > this.canvas.width + 10 ||
                p.opacity <= 0) {
                this.particles[i] = this.createParticle();
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener('load', () => {
    new Confetti();
});

<script lang="ts">
	import { onMount } from 'svelte';
	import { Download, Github, Linkedin, Mail } from 'lucide-svelte';
	
	let heroElement: HTMLElement;
	
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
	
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('fade-in-up');
					}
				});
			},
			{ threshold: 0.1 }
		);
		
		if (heroElement) {
			observer.observe(heroElement);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="hero" class="hero" bind:this={heroElement}>
	<div class="container">
		<div class="hero-content">
			<div class="hero-text">
				<h1 class="hero-title">
					Olá, eu sou
					<span class="name">Ginaldo Laranjeiras Junior</span>
				</h1>
				<h2 class="hero-subtitle">Desenvolvedor Full Stack</h2>
				<p class="hero-description">
					Apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
					Especializado em TypeScript, React, Node.js e tecnologias modernas.
				</p>
				
				<div class="hero-actions">
					<button class="btn btn-primary" on:click={() => scrollToSection('contact')}>
						<Mail size={20} />
						Entrar em Contato
					</button>
					<a href="/GINALDO LARANJEIRAS JUNIOR.pdf" download class="btn btn-outline">
						<Download size={20} />
						Baixar CV
					</a>
				</div>
				
				<div class="social-links">
					<a href="https://github.com/ginaldolaranjeiras" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						<Github size={24} />
					</a>
					<a href="https://www.linkedin.com/in/ginaldolaranjeiras" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
						<Linkedin size={24} />
					</a>
					<a href="https://productgino.medium.com/" target="_blank" rel="noopener noreferrer" aria-label="Medium">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
							<path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
						</svg>
					</a>
				</div>
			</div>
			
			<div class="hero-image">
				<div class="image-container">
					<div class="profile-image">
						<div class="image-placeholder">
							<span>GL</span>
						</div>
					</div>
					<div class="floating-elements">
						<div class="floating-element element-1">💻</div>
						<div class="floating-element element-2">🚀</div>
						<div class="floating-element element-3">⚡</div>
						<div class="floating-element element-4">🎯</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="scroll-indicator">
		<div class="scroll-arrow"></div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 8rem 0 4rem;
		position: relative;
		overflow: hidden;
	}
	
	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
		pointer-events: none;
	}
	
	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		position: relative;
		z-index: 1;
	}
	
	.hero-text {
		max-width: 600px;
	}
	
	.hero-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}
	
	.name {
		display: block;
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: gradient-shift 3s ease-in-out infinite;
	}
	
	@keyframes gradient-shift {
		0%, 100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
	
	.hero-subtitle {
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 600;
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
	}
	
	.hero-description {
		font-size: 1.2rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 2rem;
	}
	
	.hero-actions {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}
	
	.social-links {
		display: flex;
		gap: 1rem;
	}
	
	.social-links a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		color: var(--text-primary);
		transition: var(--transition);
		backdrop-filter: blur(10px);
	}
	
	.social-links a:hover {
		background: var(--primary-color);
		border-color: var(--primary-color);
		color: white;
		transform: translateY(-3px) scale(1.1);
	}
	
	.hero-image {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.image-container {
		position: relative;
		width: 400px;
		height: 400px;
	}
	
	.profile-image {
		width: 300px;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		padding: 4px;
		animation: rotate 20s linear infinite;
	}
	
	.image-placeholder {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: linear-gradient(135deg, #f8f9fa, #e9ecef);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4rem;
		font-weight: 700;
		color: var(--primary-color);
		box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
	}
	
	@keyframes rotate {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
	
	.floating-elements {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.floating-element {
		position: absolute;
		font-size: 2rem;
		animation: float 6s ease-in-out infinite;
	}
	
	.element-1 {
		top: 10%;
		left: 10%;
		animation-delay: 0s;
	}
	
	.element-2 {
		top: 20%;
		right: 10%;
		animation-delay: 1.5s;
	}
	
	.element-3 {
		bottom: 20%;
		left: 5%;
		animation-delay: 3s;
	}
	
	.element-4 {
		bottom: 10%;
		right: 15%;
		animation-delay: 4.5s;
	}
	
	@keyframes float {
		0%, 100% {
			transform: translateY(0px) rotate(0deg);
		}
		33% {
			transform: translateY(-20px) rotate(5deg);
		}
		66% {
			transform: translateY(10px) rotate(-5deg);
		}
	}
	
	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		animation: bounce 2s infinite;
	}
	
	.scroll-arrow {
		width: 2px;
		height: 30px;
		background: linear-gradient(to bottom, var(--primary-color), transparent);
		position: relative;
	}
	
	.scroll-arrow::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 8px solid var(--primary-color);
	}
	
	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translateX(-50%) translateY(0);
		}
		40% {
			transform: translateX(-50%) translateY(-10px);
		}
		60% {
			transform: translateX(-50%) translateY(-5px);
		}
	}
	
	@media (max-width: 768px) {
		.hero {
			padding: 6rem 0 2rem;
			min-height: 90vh;
		}
		
		.hero-content {
			grid-template-columns: 1fr;
			gap: 2rem;
			text-align: center;
		}
		
		.hero-text {
			order: 2;
		}
		
		.hero-image {
			order: 1;
		}
		
		.image-container {
			width: 250px;
			height: 250px;
		}
		
		.profile-image {
			width: 200px;
			height: 200px;
		}
		
		.image-placeholder {
			font-size: 3rem;
		}
		
		.hero-actions {
			justify-content: center;
		}
		
		.social-links {
			justify-content: center;
		}
	}
</style>
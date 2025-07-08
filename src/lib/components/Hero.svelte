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
					<a href="#about" class="name-link" on:click={() => scrollToSection('about')}>
						<span class="name">Gino</span>
					</a>
				</h1>
				<h2 class="hero-subtitle">Product Manager</h2>
				<p class="hero-description">
					Especialista em gestão de produtos digitais com foco em inovação e experiência do usuário.
					Combino visão estratégica, análise de dados e conhecimento técnico para criar produtos que geram valor real.
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
					<a href="https://github.com/oginoino" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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
						<img src="/Profile.jpg" alt="Ginaldo Laranjeiras Junior" class="profile-img" />
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
		padding: var(--spacing-4xl) 0 var(--spacing-3xl);
		position: relative;
		overflow: hidden;
		background: var(--bg-white);
	}
	
	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 80%, rgba(66, 66, 66, 0.02) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(66, 66, 66, 0.03) 0%, transparent 50%);
		pointer-events: none;
	}
	
	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
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
		margin-bottom: var(--spacing-md);
		color: var(--text-primary);
	}
	
	.name-link {
		text-decoration: none;
		display: block;
		transition: var(--transition);
		border-radius: var(--border-radius);
		padding: var(--spacing-xs) var(--spacing-sm);
		margin: calc(-1 * var(--spacing-xs)) calc(-1 * var(--spacing-sm));
	}
	
	.name-link:hover {
		background: rgba(66, 66, 66, 0.05);
		transform: var(--transform-hover-lift);
		box-shadow: 0 4px 12px rgba(66, 66, 66, 0.1);
	}
	
	.name {
		display: block;
		color: var(--primary-color);
		font-weight: 900;
		letter-spacing: -0.02em;
		transition: var(--transition);
	}
	
	.name-link:hover .name {
		color: var(--secondary-color);
		transform: scale(1.02);
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
		margin-bottom: var(--spacing-lg);
	}
	
	.hero-description {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--spacing-xl);
	}
	
	.hero-actions {
		display: flex;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
		flex-wrap: wrap;
	}
	
	.social-links {
		display: flex;
		gap: var(--spacing-md);
	}
	
	.social-links a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background: var(--bg-white);
		border: 2px solid var(--border-light);
		border-radius: 50%;
		color: var(--text-primary);
		transition: var(--transition);
		box-shadow: var(--shadow);
	}
	
	.social-links a:hover {
		background: var(--primary-color);
		border-color: var(--primary-color);
		color: white;
		transform: var(--transform-hover-lift-lg) scale(1.1);
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
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
		padding: var(--spacing-xs);
		box-shadow: var(--shadow-strong);
		transition: var(--transition);
	}
	
	.profile-img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--bg-white);
		transition: var(--transition);
	}
	
	.profile-image:hover {
		transform: translate(-50%, -50%) scale(1.05);
		box-shadow: var(--shadow-hover);
	}
	
	.profile-image:hover .profile-img {
		transform: scale(1.02);
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
		font-size: var(--font-size-2xl);
		animation: float 6s ease-in-out infinite;
		background: var(--bg-white);
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow);
		border: 2px solid var(--border-light);
		transition: var(--transition);
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
	
	.floating-element:hover {
		transform: scale(1.1);
		box-shadow: var(--shadow-hover);
		border-color: var(--primary-color);
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
		background: var(--primary-color);
		position: relative;
		opacity: 0.7;
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
			padding: var(--spacing-3xl) 0 var(--spacing-xl);
			min-height: 90vh;
		}
		
		.hero-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
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
		
		.hero-actions {
			justify-content: center;
		}
		
		.social-links {
			justify-content: center;
		}
	}
</style>
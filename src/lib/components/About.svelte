<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Coffee, Lightbulb, Users } from 'lucide-svelte';
	
	let aboutElement: HTMLElement;
	
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
		
		if (aboutElement) {
			observer.observe(aboutElement);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="about" class="section about" bind:this={aboutElement}>
	<div class="container">
		<div class="section-title">
			<h2>Sobre Mim</h2>
			<p>Conheça um pouco mais sobre minha jornada e paixão pela tecnologia</p>
		</div>
		
		<div class="about-content">
			<div class="about-text">
				<div class="text-content">
					<h3>Desenvolvedor Full Stack Apaixonado</h3>
					<p>
						Sou um desenvolvedor full stack com experiência sólida em tecnologias modernas 
						como TypeScript, React, Node.js e muito mais. Minha paixão pela programação 
						começou há alguns anos e desde então tenho me dedicado a criar soluções 
						inovadoras e eficientes.
					</p>
					<p>
						Acredito que a tecnologia tem o poder de transformar vidas e negócios. 
						Por isso, estou sempre em busca de novos desafios e oportunidades para 
						aplicar meus conhecimentos e continuar aprendendo.
					</p>
					<p>
						Quando não estou codificando, gosto de compartilhar conhecimento através 
						de artigos no Medium e contribuir para projetos open source no GitHub.
					</p>
				</div>
				
				<div class="stats">
					<div class="stat-item">
						<div class="stat-number">3+</div>
						<div class="stat-label">Anos de Experiência</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">50+</div>
						<div class="stat-label">Projetos Concluídos</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">15+</div>
						<div class="stat-label">Tecnologias</div>
					</div>
				</div>
			</div>
			
			<div class="about-features">
				<div class="feature-card">
					<div class="feature-icon">
						<Code size={32} />
					</div>
					<h4>Código Limpo</h4>
					<p>Escrevo código limpo, bem documentado e seguindo as melhores práticas da indústria.</p>
				</div>
				
				<div class="feature-card">
					<div class="feature-icon">
						<Lightbulb size={32} />
					</div>
					<h4>Soluções Inovadoras</h4>
					<p>Busco sempre encontrar soluções criativas e eficientes para problemas complexos.</p>
				</div>
				
				<div class="feature-card">
					<div class="feature-icon">
						<Users size={32} />
					</div>
					<h4>Trabalho em Equipe</h4>
					<p>Colaboro efetivamente em equipes multidisciplinares e valorizo a comunicação clara.</p>
				</div>
				
				<div class="feature-card">
					<div class="feature-icon">
						<Coffee size={32} />
					</div>
					<h4>Aprendizado Contínuo</h4>
					<p>Estou sempre aprendendo novas tecnologias e me mantendo atualizado com as tendências.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: var(--bg-light);
		position: relative;
	}
	
	.about::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.02) 0%, transparent 50%),
			radial-gradient(circle at 20% 80%, rgba(0, 0, 0, 0.01) 0%, transparent 50%);
		pointer-events: none;
	}
	
	.about-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
		position: relative;
		z-index: 1;
	}
	
	.about-text {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.text-content h3 {
		color: var(--primary-color);
		margin-bottom: 1.5rem;
		font-size: 1.8rem;
	}
	
	.text-content p {
		margin-bottom: 1.5rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}
	
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		padding: 2rem;
		background: var(--bg-white);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		border: 1px solid var(--border-light);
	}
	
	.stat-item {
		text-align: center;
	}
	
	.stat-number {
		font-size: 2.5rem;
		font-weight: 900;
		color: var(--primary-color);
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}
	
	.stat-label {
		color: var(--text-secondary);
		font-weight: 500;
		font-size: 0.9rem;
	}
	
	.about-features {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
	
	.feature-card {
		background: var(--bg-white);
		padding: 2rem;
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		transition: var(--transition);
		text-align: center;
		border: 1px solid var(--border-light);
	}
	
	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-hover);
		border-color: var(--primary-color);
	}
	
	.feature-icon {
		width: 70px;
		height: 70px;
		margin: 0 auto 1.5rem;
		background: var(--primary-color);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: var(--transition);
	}
	
	.feature-card:hover .feature-icon {
		transform: scale(1.1) rotate(5deg);
	}
	
	.feature-card h4 {
		color: var(--text-primary);
		margin-bottom: 1rem;
		font-size: 1.2rem;
	}
	
	.feature-card p {
		color: var(--text-secondary);
		line-height: 1.6;
		font-size: 0.95rem;
	}
	
	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.stats {
			grid-template-columns: repeat(3, 1fr);
			padding: 1.5rem;
			gap: 1rem;
		}
		
		.stat-number {
			font-size: 2rem;
		}
		
		.stat-label {
			font-size: 0.8rem;
		}
		
		.about-features {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		
		.feature-card {
			padding: 1.5rem;
		}
		
		.feature-icon {
			width: 60px;
			height: 60px;
			margin-bottom: 1rem;
		}
	}
</style>
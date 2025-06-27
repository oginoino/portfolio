<script lang="ts">
	import { onMount } from 'svelte';
	import { Target, Coffee, Lightbulb, Users } from 'lucide-svelte';
	
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
			<p>Conheça um pouco mais sobre minha jornada e paixão por produtos digitais</p>
		</div>
		
		<div class="about-content">
			<div class="about-text">
				<div class="text-content">
					<h3>Product Manager Estratégico</h3>
					<p>
						Sou um Product Manager com experiência sólida em gestão de produtos digitais, 
						estratégia de negócios e inovação tecnológica. Minha paixão por produtos 
						começou através da combinação entre visão técnica e entendimento de mercado, 
						sempre focando em criar soluções que geram valor real para usuários e negócios.
					</p>
					<p>
						Acredito que produtos excepcionais nascem da intersecção entre tecnologia, 
						design e estratégia de negócios. Por isso, estou sempre em busca de novos 
						desafios para aplicar metodologias ágeis, análise de dados e visão estratégica 
						na criação de produtos inovadores.
					</p>
					<p>
						Quando não estou desenvolvendo estratégias de produto, gosto de compartilhar 
						insights sobre gestão de produtos no Medium e contribuir para a comunidade 
						de Product Management através de projetos e discussões no GitHub.
					</p>
				</div>
				
				<div class="stats">
					<div class="stat-item">
						<div class="stat-number">5+</div>
						<div class="stat-label">Anos de Experiência</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">30+</div>
						<div class="stat-label">Produtos Lançados</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">10+</div>
						<div class="stat-label">Metodologias</div>
					</div>
				</div>
			</div>
			
			<div class="about-features">
				<div class="feature-card">
					<div class="feature-icon">
						<Target size={32} />
					</div>
					<h4>Visão Estratégica</h4>
					<p>Desenvolvo estratégias de produto alinhadas aos objetivos de negócio e necessidades dos usuários.</p>
				</div>
				
				<div class="feature-card">
					<div class="feature-icon">
						<Lightbulb size={32} />
					</div>
					<h4>Inovação de Produtos</h4>
					<p>Identifico oportunidades de mercado e transformo ideias em produtos digitais de sucesso.</p>
				</div>
				
				<div class="feature-card">
					<div class="feature-icon">
						<Users size={32} />
					</div>
					<h4>Liderança de Equipes</h4>
					<p>Lidero equipes multidisciplinares, facilitando a colaboração entre design, desenvolvimento e negócios.</p>
				</div>
				
				<div class="feature-card">
					<div class="feature-icon">
						<Coffee size={32} />
					</div>
					<h4>Análise de Dados</h4>
					<p>Utilizo métricas e análise de dados para tomar decisões informadas e otimizar produtos.</p>
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
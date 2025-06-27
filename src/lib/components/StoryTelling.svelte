<script>
	import { onMount } from 'svelte';

	let currentSection = 0;
	let isVisible = false;
	let timelineRef;

	const sections = [
		{
			id: 'despertar',
			title: 'O Despertar para a Tecnologia',
			year: '2011-2013',
			company: 'Banco Banese',
			role: 'Estagiário',
			description: 'Nos corredores do Banco Banese, um jovem estudante de Administração descobriu que sua paixão estava na forma como a tecnologia poderia transformar a experiência das pessoas.',
			insight: '"E se pudéssemos tornar isso mais simples?"',
			icon: '🏦'
		},
		{
			id: 'alicerces',
			title: 'A Construção dos Alicerces',
			year: '2013-2015',
			company: 'Megga Distribuidora',
			role: 'Analista de Logística',
			description: 'Transição audaciosa para logística, desenvolvendo visão sistêmica fundamental. Paralelamente, formação em Direito e experiência no Ministério Público de Sergipe.',
			insight: 'Desenvolvendo habilidades analíticas e de resolução de problemas',
			icon: '📚'
		},
		{
			id: 'primeiro-voo',
			title: 'O Primeiro Voo Solo',
			year: '2018',
			company: 'CONNAT Soluções',
			role: 'Co-fundador & CTO',
			description: 'Co-fundação de startup de consultoria especializada em design thinking e transformação digital. Descoberta da verdadeira vocação na intersecção entre tecnologia, negócios e UX.',
			insight: 'Laboratório de experimentação e cultura de inovação',
			icon: '🚀'
		},
		{
			id: 'escalada',
			title: 'A Escalada Corporativa',
			year: '2019-2021',
			company: 'Accenture',
			role: 'Product Owner',
			description: 'Liderança de projetos para grandes corporações como Itaú Cartões e Drogaria São Paulo. Consolidação da expertise em metodologias ágeis e gestão de equipes multidisciplinares.',
			insight: 'Navegando pela complexidade mantendo foco no valor real',
			icon: '🏢'
		},
		{
			id: 'transformacao',
			title: 'O Momento da Transformação Digital',
			year: '2021-2023',
			company: 'FinanZero',
			role: 'Product Manager',
			description: 'Orquestração de crescimento impressionante: diversificação de portfólio, inteligência de ofertas, redesign de UX. Resultados: otimização de cross/up-selling e aumento drástico de conversão.',
			insight: 'Sinfonia de crescimento e inovação',
			icon: '💳'
		},
		{
			id: 'visao-empreendedora',
			title: 'A Visão Empreendedora',
			year: '2021-Presente',
			company: 'Tá no Plano',
			role: 'Product Manager',
			description: 'Transformação de como micro e pequenas empresas desenvolvem estratégias. Liderança no desenvolvimento de plataforma SaaS inovadora adaptada ao cotidiano das PMEs.',
			insight: 'Democratizando estratégias de negócio',
			icon: '📊'
		},
		{
			id: 'profissional-hoje',
			title: 'O Profissional de Hoje',
			year: 'Presente',
			company: 'Nova Geração',
			role: 'Product Manager',
			description: 'Representante de uma nova geração de PMs: compreensão profunda de tecnologia e negócios, navegação entre startups e corporações, usuário sempre no centro das decisões.',
			insight: 'Arquiteto de transformações e tradutor entre mundos',
			icon: '🎯'
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (timelineRef) {
			observer.observe(timelineRef);
		}

		return () => {
			if (timelineRef) {
				observer.unobserve(timelineRef);
			}
		};
	});

	function setCurrentSection(index) {
		currentSection = index;
	}
</script>

<section class="storytelling-section" bind:this={timelineRef}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">A Jornada de Ginaldo Laranjeiras</h2>
			<p class="section-subtitle">Do Direito ao Product Management</p>
			<div class="title-decoration"></div>
		</div>

		<div class="story-container" class:visible={isVisible}>
			<!-- Timeline Navigation -->
			<div class="timeline-nav">
				{#each sections as section, index}
					<button 
						class="timeline-dot" 
						class:active={currentSection === index}
						on:click={() => setCurrentSection(index)}
						title={section.title}
					>
						<span class="dot-year">{section.year.split('-')[0]}</span>
						<span class="dot-icon">{section.icon}</span>
					</button>
				{/each}
				<div class="timeline-line"></div>
			</div>

			<!-- Story Content -->
			<div class="story-content">
				{#each sections as section, index}
					<div 
						class="story-card" 
						class:active={currentSection === index}
						class:visible={isVisible}
						style="--delay: {index * 0.1}s"
					>
						<div class="card-header">
							<div class="card-icon">{section.icon}</div>
							<div class="card-meta">
								<h3 class="card-title">{section.title}</h3>
								<div class="card-details">
									<span class="card-year">{section.year}</span>
									<span class="card-company">{section.company}</span>
									<span class="card-role">{section.role}</span>
								</div>
							</div>
						</div>
						<div class="card-content">
							<p class="card-description">{section.description}</p>
							<blockquote class="card-insight">
								<span class="quote-mark">"</span>
								{section.insight}
								<span class="quote-mark">"</span>
							</blockquote>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Final Quote -->
		<div class="final-quote" class:visible={isVisible}>
			<blockquote>
				<span class="quote-large">"</span>
				A verdadeira inovação acontece quando conseguimos ver conexões onde outros veem apenas diferenças.
				<span class="quote-large">"</span>
				<cite>— Ginaldo Laranjeiras Junior</cite>
			</blockquote>
		</div>
	</div>
</section>

<style>
	.storytelling-section {
		padding: 6rem 0;
		background: var(--gradient-subtle);
		position: relative;
		overflow: hidden;
	}

	.storytelling-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 20%, rgba(66, 66, 66, 0.03) 0%, transparent 50%),
			radial-gradient(circle at 80% 80%, rgba(66, 66, 66, 0.03) 0%, transparent 50%);
		pointer-events: none;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
		position: relative;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		color: var(--text-primary);
		margin-bottom: 0.5rem;
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.section-subtitle {
		font-size: 1.25rem;
		color: var(--text-tertiary);
		margin-bottom: 2rem;
		font-weight: 500;
	}

	.title-decoration {
		width: 80px;
		height: 4px;
		background: var(--gradient-dark);
		margin: 0 auto;
		border-radius: 2px;
	}

	.story-container {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
		align-items: start;
		opacity: 0;
		transform: translateY(30px);
		transition: var(--transition-slow);
	}

	.story-container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.timeline-nav {
		position: sticky;
		top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: relative;
	}

	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 2px;
		background: var(--border-medium);
		transform: translateX(-50%);
		z-index: 0;
	}

	.timeline-dot {
		position: relative;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 3px solid var(--border-light);
		background: var(--bg-white);
		cursor: pointer;
		transition: var(--transition);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		z-index: 1;
		box-shadow: var(--shadow-light);
	}

	.timeline-dot:hover {
		transform: scale(1.1);
		box-shadow: var(--shadow);
		border-color: var(--primary-color);
	}

	.timeline-dot.active {
		border-color: var(--primary-color);
		background: var(--primary-color);
		color: var(--text-white);
		box-shadow: var(--shadow-medium);
		transform: scale(1.15);
	}

	.dot-year {
		font-size: 0.75rem;
		font-weight: 600;
		line-height: 1;
	}

	.dot-icon {
		font-size: 1.25rem;
		line-height: 1;
	}

	.story-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.story-card {
		background: var(--bg-white);
		border-radius: var(--border-radius-large);
		padding: 2rem;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-light);
		transition: var(--transition);
		opacity: 0.3;
		transform: translateX(20px);
		position: relative;
		overflow: hidden;
	}

	.story-card::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: var(--gradient-dark);
		transform: scaleY(0);
		transform-origin: top;
		transition: var(--transition);
	}

	.story-card.visible {
		opacity: 0.6;
		transform: translateX(0);
		animation: slideInRight 0.6s ease-out forwards;
		animation-delay: var(--delay);
	}

	.story-card.active {
		opacity: 1;
		box-shadow: var(--shadow-medium);
		border-color: var(--border-medium);
		transform: translateX(0) scale(1.02);
	}

	.story-card.active::before {
		transform: scaleY(1);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.card-icon {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: var(--bg-gray-light);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		border: 2px solid var(--border-light);
	}

	.card-meta {
		flex: 1;
	}

	.card-title {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
		font-weight: 700;
	}

	.card-details {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}

	.card-year {
		background: var(--primary-color);
		color: var(--text-white);
		padding: 0.25rem 0.75rem;
		border-radius: var(--border-radius-small);
		font-size: 0.875rem;
		font-weight: 600;
	}

	.card-company {
		color: var(--text-secondary);
		font-weight: 600;
		font-size: 0.95rem;
	}

	.card-role {
		color: var(--text-tertiary);
		font-size: 0.9rem;
		font-style: italic;
	}

	.card-content {
		line-height: 1.7;
	}

	.card-description {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		font-size: 1.05rem;
	}

	.card-insight {
		background: var(--bg-gray-light);
		border-left: 4px solid var(--primary-color);
		padding: 1rem 1.5rem;
		margin: 0;
		border-radius: 0 var(--border-radius) var(--border-radius) 0;
		color: var(--text-tertiary);
		font-style: italic;
		position: relative;
	}

	.quote-mark {
		color: var(--primary-color);
		font-size: 1.2em;
		font-weight: bold;
	}

	.final-quote {
		margin-top: 4rem;
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: var(--transition-slow);
		transition-delay: 0.5s;
	}

	.final-quote.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.final-quote blockquote {
		background: var(--bg-white);
		border-radius: var(--border-radius-large);
		padding: 3rem;
		margin: 0;
		box-shadow: var(--shadow-medium);
		border: 1px solid var(--border-light);
		position: relative;
		max-width: 800px;
		margin: 0 auto;
	}

	.quote-large {
		font-size: 3rem;
		color: var(--primary-color);
		font-weight: bold;
		line-height: 1;
	}

	.final-quote blockquote {
		font-size: 1.25rem;
		color: var(--text-primary);
		font-style: italic;
		line-height: 1.6;
	}

	.final-quote cite {
		display: block;
		margin-top: 1.5rem;
		color: var(--text-tertiary);
		font-size: 1rem;
		font-style: normal;
		font-weight: 600;
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 0.6;
			transform: translateX(0);
		}
	}

	/* Responsividade */
	@media (max-width: 768px) {
		.storytelling-section {
			padding: 4rem 0;
		}

		.story-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.timeline-nav {
			position: static;
			flex-direction: row;
			overflow-x: auto;
			padding: 1rem 0;
			gap: 1rem;
		}

		.timeline-line {
			left: 0;
			right: 0;
			top: 50%;
			bottom: auto;
			height: 2px;
			width: auto;
			transform: translateY(-50%);
		}

		.timeline-dot {
			width: 70px;
			height: 70px;
			flex-shrink: 0;
		}

		.story-card {
			padding: 1.5rem;
		}

		.card-header {
			flex-direction: column;
			text-align: center;
			gap: 0.75rem;
		}

		.card-details {
			justify-content: center;
		}

		.final-quote blockquote {
			padding: 2rem;
		}
	}
</style>
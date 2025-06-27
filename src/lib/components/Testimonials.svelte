<script>
	import { onMount } from 'svelte';

	let currentCategory = 'all';
	let isVisible = false;
	let testimonialsRef;

	const testimonials = [
		{
			id: 1,
			name: 'Daniel Renatino',
			role: 'Product Designer',
			company: 'FinanZero',
			date: 'Julho de 2023',
			category: 'lideranca',
			avatar: 'DR',
			testimonial: 'Muito dedicado na organização de Backlog, Roadmap de Produto e entregas, está sempre procurando atualizar os conhecimentos que já tem e aprender novos, incluindo lógica de programação, UX/UI e Product Discovery. Também é um cara que joga junto, se empolga em trazer bons resultados, incentiva pessoas, independentemente do time, a expor ideias e pensamentos. É analítico e prático, sem ficar dando voltas em explicações, mas sempre disposto a explicar quantas vezes for necessário. Acima de tudo, mantém a resiliência como uma das principais palavras do dia a dia.',
			highlights: ['Organização', 'Aprendizado Contínuo', 'Resiliência']
		},
		{
			id: 2,
			name: 'Gabriel Toledo',
			role: 'Sênior Software Frontend',
			company: 'FinanZero',
			date: 'Junho de 2022',
			category: 'lideranca',
			avatar: 'GT',
			testimonial: 'Antes de falar das competências do Gino, acredito que devo primeiro dizer as características que fazem dele um profissional capaz de guiar qualquer time: Prioriza com calma e clareza as prioridades da squad; Sabe se comunicar com as pessoas e intermediar comunicação. Como PO é organizado, sabe lidar com situações caóticas, sempre em busca de conhecimento técnico para entender melhor os requisitos. Um amigo de confiança e amado por toda empresa.',
			highlights: ['Comunicação', 'Organização', 'Liderança']
		},
		{
			id: 3,
			name: 'Simão Timóteo',
			role: 'Consultor em Finanças e Negócios',
			company: 'CONNAT Soluções',
			date: 'Fevereiro de 2023',
			category: 'inovacao',
			avatar: 'ST',
			testimonial: 'Ginaldo é um excelente profissional, o qual tive a honra de trabalhar, nos projetos de consultorias, onde o seu brilhantismo e expertise em Gestão Ágil de Projetos trouxe inovação nos processos, melhorando a entrega de resultados, e reinventando toda a maneira com a qual a empresa trabalhava.',
			highlights: ['Gestão Ágil', 'Inovação', 'Resultados']
		},
		{
			id: 4,
			name: 'Leonardo Assef Coelho',
			role: 'Sênior Full Stack Developer',
			company: 'FinanZero',
			date: 'Novembro de 2022',
			category: 'equipe',
			avatar: 'LA',
			testimonial: 'Gino é um profissional maravilhoso. Sempre atento às necessidades do time e super disposto a ajudar a qualquer momento. Além de ótimo profissional é um excelente colega, divertido e atencioso.',
			highlights: ['Colaboração', 'Atenção', 'Disponibilidade']
		},
		{
			id: 5,
			name: 'Rafael Vilarinho Raiol',
			role: 'Software/DevOps Engineer',
			company: 'FinanZero',
			date: 'Junho de 2022',
			category: 'equipe',
			avatar: 'RV',
			testimonial: 'Excelente profissional e companheiro de equipe, estando sempre pronto para ajudar seus colegas e inovar seus produtos.',
			highlights: ['Companheirismo', 'Inovação', 'Colaboração']
		},
		{
			id: 6,
			name: 'Ingrid C.',
			role: 'Especialista em Projetos e Metodologias Ágeis',
			company: 'FinanZero',
			date: 'Junho de 2022',
			category: 'negocios',
			avatar: 'IC',
			testimonial: 'O Gino é uma pessoa super receptiva e acessível sobre a frente do negócio! Sempre disposto a ajudar, trazer melhorias e proativo em demandas diversas, seja aquela que está sob seu controle ou não. Sempre traz a necessidade do negócio para compartilhar junto ao time e discute sobre para identificar pontos do qual precisam de sua atuação. Indico o Gino de olhos fechados!',
			highlights: ['Proatividade', 'Visão de Negócio', 'Melhorias']
		},
		{
			id: 7,
			name: 'Marcelo Henrique Dória Figueiredo',
			role: 'Analista de Dados',
			company: 'Universidade',
			date: 'Agosto de 2021',
			category: 'academica',
			avatar: 'MH',
			testimonial: 'Tive a oportunidade de estudar com Ginaldo e ele sempre se mostrou uma pessoa dedicada, esforçada e acima de tudo muito bom no que faz, sempre contribuindo com conhecimento em sala de aula, além disso é uma pessoa que se dá muito bem em trabalhos em equipe e do pouco tempo que tive a oportunidade de estudar com ele se mostrou um grande líder. Ginaldo se mostra um profissional com excelentes qualidades.',
			highlights: ['Dedicação', 'Conhecimento', 'Liderança Acadêmica']
		}
	];

	const categories = [
		{ id: 'all', name: 'Todos', icon: '👥' },
		{ id: 'lideranca', name: 'Liderança', icon: '👑' },
		{ id: 'inovacao', name: 'Inovação', icon: '💡' },
		{ id: 'equipe', name: 'Trabalho em Equipe', icon: '🤝' },
		{ id: 'negocios', name: 'Visão de Negócios', icon: '📈' },
		{ id: 'academica', name: 'Liderança Acadêmica', icon: '🎓' }
	];

	$: filteredTestimonials = currentCategory === 'all' 
		? testimonials 
		: testimonials.filter(t => t.category === currentCategory);

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

		if (testimonialsRef) {
			observer.observe(testimonialsRef);
		}

		return () => {
			if (testimonialsRef) {
				observer.unobserve(testimonialsRef);
			}
		};
	});

	function setCategory(categoryId) {
		currentCategory = categoryId;
	}

	function getAvatarColor(name) {
		const colors = [
			'var(--primary-color)',
			'var(--accent-color)',
			'var(--primary-light)',
			'var(--accent-light)',
			'var(--primary-dark)'
		];
		const index = name.charCodeAt(0) % colors.length;
		return colors[index];
	}
</script>

<section class="testimonials-section" bind:this={testimonialsRef}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">Depoimentos dos Colegas</h2>
			<p class="section-subtitle">O que dizem os profissionais que trabalharam comigo</p>
			<div class="title-decoration"></div>
		</div>

		<!-- Category Filters -->
		<div class="category-filters" class:visible={isVisible}>
			{#each categories as category}
				<button 
					class="category-btn" 
					class:active={currentCategory === category.id}
					on:click={() => setCategory(category.id)}
				>
					<span class="category-icon">{category.icon}</span>
					<span class="category-name">{category.name}</span>
				</button>
			{/each}
		</div>

		<!-- Testimonials Grid -->
		<div class="testimonials-grid" class:visible={isVisible}>
			{#each filteredTestimonials as testimonial, index (testimonial.id)}
				<div 
					class="testimonial-card"
					style="--delay: {index * 0.1}s; --avatar-color: {getAvatarColor(testimonial.name)}"
				>
					<div class="card-header">
						<div class="avatar">
							{testimonial.avatar}
						</div>
						<div class="author-info">
							<h3 class="author-name">{testimonial.name}</h3>
							<p class="author-role">{testimonial.role}</p>
							<div class="author-meta">
								<span class="company">{testimonial.company}</span>
								<span class="date">{testimonial.date}</span>
							</div>
						</div>
						<div class="quote-mark">"</div>
					</div>

					<div class="card-content">
						<blockquote class="testimonial-text">
							{testimonial.testimonial}
						</blockquote>
					</div>

					<div class="card-footer">
						<div class="highlights">
							{#each testimonial.highlights as highlight}
								<span class="highlight-tag">{highlight}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Stats Section -->
		<div class="stats-section" class:visible={isVisible}>
			<div class="stats-grid">
				<div class="stat-item">
					<div class="stat-number">7</div>
					<div class="stat-label">Depoimentos</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">5</div>
					<div class="stat-label">Empresas</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">100%</div>
					<div class="stat-label">Recomendação</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.testimonials-section {
		padding: 6rem 0;
		background: var(--bg-light);
		position: relative;
		overflow: hidden;
	}

	.testimonials-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 30% 20%, rgba(66, 66, 66, 0.02) 0%, transparent 50%),
			radial-gradient(circle at 70% 80%, rgba(66, 66, 66, 0.02) 0%, transparent 50%);
		pointer-events: none;
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
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

	.category-filters {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 3rem;
		opacity: 0;
		transform: translateY(20px);
		transition: var(--transition-slow);
	}

	.category-filters.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.category-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border: 2px solid var(--border-light);
		background: var(--bg-white);
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: var(--transition);
		font-weight: 500;
		color: var(--text-secondary);
	}

	.category-btn:hover {
		border-color: var(--primary-color);
		color: var(--primary-color);
		transform: translateY(-2px);
		box-shadow: var(--shadow-light);
	}

	.category-btn.active {
		background: var(--primary-color);
		color: var(--text-white);
		border-color: var(--primary-color);
		box-shadow: var(--shadow);
	}

	.category-icon {
		font-size: 1.1rem;
	}

	.category-name {
		font-size: 0.95rem;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
		transition: var(--transition-slow);
		transition-delay: 0.2s;
	}

	.testimonials-grid.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.testimonial-card {
		background: var(--bg-white);
		border-radius: var(--border-radius-large);
		padding: 2rem;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-light);
		transition: var(--transition);
		position: relative;
		overflow: hidden;
		opacity: 0;
		transform: translateY(20px);
		animation: slideInUp 0.6s ease-out forwards;
		animation-delay: var(--delay);
	}

	.testimonial-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--avatar-color);
		transform: scaleX(0);
		transform-origin: left;
		transition: var(--transition);
	}

	.testimonial-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-hover);
		border-color: var(--border-medium);
	}

	.testimonial-card:hover::before {
		transform: scaleX(1);
	}

	.card-header {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.5rem;
		position: relative;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: var(--avatar-color);
		color: var(--text-white);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.25rem;
		border: 3px solid var(--bg-white);
		box-shadow: var(--shadow);
		flex-shrink: 0;
	}

	.author-info {
		flex: 1;
	}

	.author-name {
		font-size: 1.25rem;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
		font-weight: 700;
	}

	.author-role {
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
		font-weight: 500;
		font-size: 1rem;
	}

	.author-meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.company {
		color: var(--text-tertiary);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.date {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.quote-mark {
		font-size: 3rem;
		color: var(--avatar-color);
		font-weight: bold;
		line-height: 1;
		opacity: 0.3;
		position: absolute;
		top: -10px;
		right: 0;
	}

	.card-content {
		margin-bottom: 1.5rem;
	}

	.testimonial-text {
		color: var(--text-secondary);
		line-height: 1.7;
		font-size: 1.05rem;
		margin: 0;
		font-style: italic;
	}

	.card-footer {
		border-top: 1px solid var(--border-light);
		padding-top: 1rem;
	}

	.highlights {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.highlight-tag {
		background: var(--bg-gray-light);
		color: var(--text-tertiary);
		padding: 0.25rem 0.75rem;
		border-radius: var(--border-radius-small);
		font-size: 0.85rem;
		font-weight: 500;
		border: 1px solid var(--border-light);
	}

	.stats-section {
		opacity: 0;
		transform: translateY(30px);
		transition: var(--transition-slow);
		transition-delay: 0.4s;
	}

	.stats-section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		background: var(--bg-white);
		border-radius: var(--border-radius-large);
		padding: 2rem;
		box-shadow: var(--shadow);
		border: 1px solid var(--border-light);
	}

	.stat-item {
		text-align: center;
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--primary-color);
		margin-bottom: 0.5rem;
		line-height: 1;
	}

	.stat-label {
		color: var(--text-tertiary);
		font-weight: 500;
		font-size: 1rem;
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsividade */
	@media (max-width: 768px) {
		.testimonials-section {
			padding: 4rem 0;
		}

		.category-filters {
			gap: 0.5rem;
		}

		.category-btn {
			padding: 0.5rem 1rem;
			font-size: 0.9rem;
		}

		.category-name {
			display: none;
		}

		.testimonials-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.testimonial-card {
			padding: 1.5rem;
		}

		.card-header {
			flex-direction: column;
			text-align: center;
			gap: 0.75rem;
		}

		.author-meta {
			align-items: center;
		}

		.quote-mark {
			position: static;
			margin-bottom: 1rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			padding: 1.5rem;
		}

		.stat-number {
			font-size: 2rem;
		}
	}
</style>
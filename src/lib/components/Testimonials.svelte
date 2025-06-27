<script>
	import { onMount } from 'svelte';

	let currentCategory = 'all';
	let isVisible = false;
	let testimonialsRef;
	let currentSlide = 0;
	let autoplayInterval;
	let isAutoplayPaused = false;
	let carouselContainer;

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
			highlights: [
				{ text: 'Organização', icon: '📋' },
				{ text: 'Aprendizado Contínuo', icon: '📚' },
				{ text: 'Resiliência', icon: '💪' }
			]
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
			highlights: [
				{ text: 'Comunicação', icon: '💬' },
				{ text: 'Organização', icon: '📋' },
				{ text: 'Liderança', icon: '👑' }
			]
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
			highlights: [
				{ text: 'Gestão Ágil', icon: '⚡' },
				{ text: 'Inovação', icon: '💡' },
				{ text: 'Resultados', icon: '🎯' }
			]
		},
		{
			id: 4,
			name: 'Leonardo Assef',
			role: 'Sênior Full Stack Developer',
			company: 'FinanZero',
			date: 'Novembro de 2022',
			category: 'equipe',
			avatar: 'LA',
			testimonial: 'Gino é um profissional maravilhoso. Sempre atento às necessidades do time e super disposto a ajudar a qualquer momento. Além de ótimo profissional é um excelente colega, divertido e atencioso.',
			highlights: [
				{ text: 'Colaboração', icon: '🤝' },
				{ text: 'Atenção', icon: '👁️' },
				{ text: 'Disponibilidade', icon: '🕐' }
			]
		},
		{
			id: 5,
			name: 'Rafael Vilarinho',
			role: 'Software/DevOps Engineer',
			company: 'FinanZero',
			date: 'Junho de 2022',
			category: 'equipe',
			avatar: 'RV',
			testimonial: 'Excelente profissional e companheiro de equipe, estando sempre pronto para ajudar seus colegas e inovar seus produtos.',
			highlights: [
				{ text: 'Companheirismo', icon: '🤗' },
				{ text: 'Inovação', icon: '💡' },
				{ text: 'Colaboração', icon: '🤝' }
			]
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
			highlights: [
				{ text: 'Proatividade', icon: '🚀' },
				{ text: 'Visão de Negócio', icon: '📈' },
				{ text: 'Melhorias', icon: '⬆️' }
			]
		},
		{
			id: 7,
			name: 'Marcelo Figueiredo',
			role: 'Analista de Dados',
			company: 'Universidade',
			date: 'Agosto de 2021',
			category: 'academica',
			avatar: 'MH',
			testimonial: 'Tive a oportunidade de estudar com Ginaldo e ele sempre se mostrou uma pessoa dedicada, esforçada e acima de tudo muito bom no que faz, sempre contribuindo com conhecimento em sala de aula, além disso é uma pessoa que se dá muito bem em trabalhos em equipe e do pouco tempo que tive a oportunidade de estudar com ele se mostrou um grande líder. Ginaldo se mostra um profissional com excelentes qualidades.',
			highlights: [
				{ text: 'Dedicação', icon: '🎯' },
				{ text: 'Conhecimento', icon: '🧠' },
				{ text: 'Liderança Acadêmica', icon: '🎓' }
			]
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

	$: totalSlides = Math.ceil(filteredTestimonials.length / getItemsPerSlide());

	function getItemsPerSlide() {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 768) return 1;
			if (window.innerWidth < 1024) return 2;
			return 3;
		}
		return 3;
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						startAutoplay();
					} else {
						stopAutoplay();
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (testimonialsRef) {
			observer.observe(testimonialsRef);
		}

		// Reset slide when category changes
		currentSlide = 0;

		// Handle window resize
		const handleResize = () => {
			currentSlide = 0;
		};
		window.addEventListener('resize', handleResize);

		return () => {
			if (testimonialsRef) {
				observer.unobserve(testimonialsRef);
			}
			stopAutoplay();
			window.removeEventListener('resize', handleResize);
		};
	});

	function setCategory(categoryId) {
		currentCategory = categoryId;
		currentSlide = 0;
	}

	function startAutoplay() {
		if (autoplayInterval) return;
		autoplayInterval = setInterval(() => {
			if (!isAutoplayPaused && totalSlides > 1) {
				nextSlide();
			}
		}, 4000);
	}

	function stopAutoplay() {
		if (autoplayInterval) {
			clearInterval(autoplayInterval);
			autoplayInterval = null;
		}
	}

	function pauseAutoplay() {
		isAutoplayPaused = true;
	}

	function resumeAutoplay() {
		isAutoplayPaused = false;
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
	}

	function prevSlide() {
		currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
	}

	function goToSlide(index) {
		currentSlide = index;
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

<section id="testimonials" class="testimonials-section" bind:this={testimonialsRef}>
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

		<!-- Testimonials Carousel -->
		<div class="carousel-wrapper" class:visible={isVisible}>
			<!-- Navigation Arrows -->
			{#if totalSlides > 1}
				<button 
					class="carousel-nav prev" 
					on:click={prevSlide}
					aria-label="Depoimento anterior"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<button 
					class="carousel-nav next" 
					on:click={nextSlide}
					aria-label="Próximo depoimento"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			{/if}

			<!-- Carousel Container -->
			<div 
				class="carousel-container" 
				bind:this={carouselContainer}
				on:mouseenter={pauseAutoplay}
				on:mouseleave={resumeAutoplay}
				role="region"
				aria-label="Carrossel de depoimentos"
			>
				<div 
					class="testimonials-track"
					style="transform: translateX(-{currentSlide * 100}%)"
				>
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
										<span class="highlight-tag">
											<span class="highlight-icon">{highlight.icon}</span>
											<span class="highlight-text">{highlight.text}</span>
										</span>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Carousel Indicators -->
			{#if totalSlides > 1}
				<div class="carousel-indicators">
					{#each Array(totalSlides) as _, index}
						<button 
							class="indicator" 
							class:active={currentSlide === index}
							on:click={() => goToSlide(index)}
							aria-label="Ir para slide {index + 1}"
						></button>
					{/each}
				</div>
			{/if}

			<!-- Autoplay Control -->
			{#if totalSlides > 1}
				<div class="autoplay-control">
					<button 
						class="autoplay-btn" 
						class:paused={isAutoplayPaused}
						on:click={() => isAutoplayPaused ? resumeAutoplay() : pauseAutoplay()}
						aria-label={isAutoplayPaused ? 'Retomar autoplay' : 'Pausar autoplay'}
					>
						{#if isAutoplayPaused}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<polygon points="5,3 19,12 5,21" fill="currentColor"/>
							</svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<rect x="6" y="4" width="4" height="16" fill="currentColor"/>
								<rect x="14" y="4" width="4" height="16" fill="currentColor"/>
							</svg>
						{/if}
					</button>
					<span class="autoplay-text">
						{isAutoplayPaused ? 'Pausado' : 'Autoplay'}
					</span>
				</div>
			{/if}
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

	.carousel-wrapper {
		position: relative;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
		transition: var(--transition-slow);
		transition-delay: 0.2s;
	}

	.carousel-wrapper.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.carousel-container {
		overflow: hidden;
		border-radius: var(--border-radius-large);
		position: relative;
	}

	.testimonials-track {
		display: flex;
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		width: 100%;
	}

	.carousel-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		background: var(--bg-white);
		border: 2px solid var(--border-light);
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: var(--transition);
		color: var(--text-secondary);
		box-shadow: var(--shadow);
	}

	.carousel-nav:hover {
		background: var(--primary-color);
		color: var(--text-white);
		border-color: var(--primary-color);
		transform: translateY(-50%) scale(1.1);
		box-shadow: var(--shadow-hover);
	}

	.carousel-nav.prev {
		left: -25px;
	}

	.carousel-nav.next {
		right: -25px;
	}

	.carousel-indicators {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 2rem;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid var(--border-light);
		background: var(--bg-white);
		cursor: pointer;
		transition: var(--transition);
	}

	.indicator:hover {
		border-color: var(--primary-color);
		transform: scale(1.2);
	}

	.indicator.active {
		background: var(--primary-color);
		border-color: var(--primary-color);
		transform: scale(1.3);
	}

	.autoplay-control {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.autoplay-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid var(--border-light);
		background: var(--bg-white);
		color: var(--text-secondary);
		cursor: pointer;
		transition: var(--transition);
	}

	.autoplay-btn:hover {
		background: var(--primary-color);
		color: var(--text-white);
		border-color: var(--primary-color);
	}

	.autoplay-btn.paused {
		background: var(--accent-color);
		color: var(--text-white);
		border-color: var(--accent-color);
	}

	.autoplay-text {
		font-size: 0.85rem;
		color: var(--text-tertiary);
		font-weight: 500;
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
		flex: 0 0 calc(100% / 3);
		margin-right: 2rem;
		opacity: 1;
		transform: translateY(0);
		display: flex;
		flex-direction: column;
		height: auto;
		min-height: 400px;
		max-height: 600px;
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
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.testimonial-text {
		color: var(--text-secondary);
		line-height: 1.7;
		font-size: 1.05rem;
		margin: 0;
		font-style: italic;
		display: -webkit-box;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		max-height: 10.2em;
	}

	.card-footer {
		border-top: 1px solid var(--border-light);
		padding-top: 1rem;
		margin-top: auto;
	}

	.highlights {
		display: flex;
		flex-wrap: wrap;
		gap: 0.625rem;
		animation: fadeInUp 0.6s ease-out;
		animation-delay: 0.3s;
		animation-fill-mode: both;
	}

	.highlight-tag {
		background: linear-gradient(135deg, var(--bg-gray-light) 0%, var(--bg-white) 100%);
		color: var(--text-secondary);
		padding: 0.5rem 0.875rem;
		border-radius: var(--border-radius);
		font-size: 0.85rem;
		font-weight: 600;
		border: 1px solid var(--border-light);
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		transition: var(--transition);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		position: relative;
		overflow: hidden;
	}

	.highlight-tag::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		transition: var(--transition);
	}

	.highlight-tag:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-color: var(--primary-color);
		color: var(--primary-color);
	}

	.highlight-tag:hover::before {
		left: 100%;
	}

	.highlight-icon {
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.highlight-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 120px;
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

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(15px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
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

		.testimonial-card {
			flex: 0 0 100%;
			margin-right: 1rem;
		}

		.carousel-nav {
			width: 40px;
			height: 40px;
		}

		.carousel-nav.prev {
			left: -20px;
		}

		.carousel-nav.next {
			right: -20px;
		}

		.testimonial-card {
			padding: 1.5rem;
			min-height: 350px;
			max-height: 500px;
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

		.testimonial-text {
			-webkit-line-clamp: 5;
			max-height: 8.5em;
			font-size: 1rem;
		}

		.highlight-text {
			max-width: 100px;
		}

		.highlights {
			justify-content: center;
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

	@media (min-width: 768px) and (max-width: 1023px) {
		.testimonial-card {
			flex: 0 0 calc(50% - 1rem);
		}
	}

	@media (min-width: 1024px) {
		.testimonial-card {
			flex: 0 0 calc(33.333% - 1.333rem);
		}
	}
</style>
<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const dispatch = createEventDispatcher();

	let currentSection = 0;
	let isVisible = false;
	let timelineRef;
	let storyCards = [];
	let isScrolling = false;
	let scrollTimeout;
	let isAutoPlaying = false;
	let autoPlayInterval;
	let progressBar;
	let isHovering = false;
	let touchStartY = 0;
	let touchStartX = 0;

	// Progress tracking with smooth animation
	const progress = tweened(0, {
		duration: 300,
		easing: cubicOut
	});

	// Reading progress for current section
	const readingProgress = tweened(0, {
		duration: 100,
		easing: cubicOut
	});

	// Auto-play progress
	const autoPlayProgress = tweened(0, {
		duration: 5000,
		easing: (t) => t
	});

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

	// Update progress when section changes
	$: {
		const progressValue = (currentSection / (sections.length - 1)) * 100;
		progress.set(progressValue);
		
		// Update CSS custom property for mobile timeline progress
		if (typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--progress-width', `${progressValue}%`);
		}
	}

	onMount(() => {
		// Observer for section visibility and progress bar control
		const visibilityObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						startReadingProgress();
					} else {
						// Hide progress bar when section is not visible
						isVisible = false;
						stopAutoPlay();
					}
				});
			},
			{ threshold: 0.1 }
		);

		// Observer for automatic section detection based on scroll
		const cardObserver = new IntersectionObserver(
			(entries) => {
				if (isScrolling) return;
				
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
						const cardIndex = parseInt(entry.target.dataset.index);
						if (cardIndex !== currentSection) {
							currentSection = cardIndex;
						}
					}
				});
			},
			{ 
				threshold: [0.3, 0.5, 0.7],
				rootMargin: '-20% 0px -20% 0px'
			}
		);

		if (timelineRef) {
			visibilityObserver.observe(timelineRef);
		}

		// Observe all story cards for scroll-based selection
		setTimeout(() => {
			storyCards.forEach((card, index) => {
				if (card) {
					card.dataset.index = index;
					cardObserver.observe(card);
				}
			});
		}, 100);

		// Handle window resize for timeline sync
		const handleResize = () => {
			// Re-sync timeline scroll when window is resized
			setTimeout(() => {
				syncTimelineScroll(currentSection);
			}, 100);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			if (timelineRef) {
				visibilityObserver.unobserve(timelineRef);
			}
			storyCards.forEach(card => {
				if (card) cardObserver.unobserve(card);
			});
			window.removeEventListener('resize', handleResize);
		};
	});

	function setCurrentSection(index) {
		currentSection = index;
		scrollToSection(index);
	}

	function scrollToSection(index) {
		if (storyCards[index]) {
			isScrolling = true;
			
			// Clear any existing timeout
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}
			
			storyCards[index].scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest'
			});
			
			// Sync timeline scroll on mobile
			syncTimelineScroll(index);
			
			// Reset scrolling flag after animation completes
			scrollTimeout = setTimeout(() => {
				isScrolling = false;
			}, 1000);
		}
	}

	// Sync timeline scroll with active section
	function syncTimelineScroll(index) {
		const timelineNav = document.querySelector('.timeline-nav');
		const timelineDots = document.querySelectorAll('.timeline-dot');
		
		if (timelineNav && timelineDots[index]) {
			// Check if we're on mobile (timeline is horizontal)
			const isMobile = window.innerWidth <= 768;
			
			if (isMobile) {
				// Scroll timeline horizontally to center the active dot
				const dotElement = timelineDots[index];
				const timelineRect = timelineNav.getBoundingClientRect();
				const dotRect = dotElement.getBoundingClientRect();
				
				const scrollLeft = timelineNav.scrollLeft + 
					(dotRect.left - timelineRect.left) - 
					(timelineRect.width / 2) + 
					(dotRect.width / 2);
				
				timelineNav.scrollTo({
					left: scrollLeft,
					behavior: 'smooth'
				});
			}
		}
	}

	// Enhanced data filtering and selection
	function getFilteredSections(filter = 'all') {
		switch (filter) {
			case 'early':
				return sections.filter((_, index) => index < 3);
			case 'corporate':
				return sections.filter(section => 
					section.company.includes('Accenture') || 
					section.company.includes('FinanZero')
				);
			case 'entrepreneurial':
				return sections.filter(section => 
					section.role.includes('Co-fundador') || 
					section.company.includes('CONNAT') ||
					section.company.includes('Tá no Plano')
				);
			case 'recent':
				return sections.filter((_, index) => index >= 4);
			default:
				return sections;
		}
	}

	// Keyboard navigation with enhanced UX
	function handleKeydown(event) {
		if (!isVisible) return;
		
		// Stop auto-play on user interaction
		stopAutoPlay();
		
		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowLeft':
				event.preventDefault();
				if (currentSection > 0) {
					setCurrentSection(currentSection - 1);
					provideHapticFeedback();
				}
				break;
			case 'ArrowDown':
			case 'ArrowRight':
				event.preventDefault();
				if (currentSection < sections.length - 1) {
					setCurrentSection(currentSection + 1);
					provideHapticFeedback();
				}
				break;
			case 'Home':
				event.preventDefault();
				setCurrentSection(0);
				provideHapticFeedback();
				break;
			case 'End':
				event.preventDefault();
				setCurrentSection(sections.length - 1);
				provideHapticFeedback();
				break;
			case ' ':
			case 'Space':
				event.preventDefault();
				toggleAutoPlay();
				break;
		}
	}

	// Auto-play functionality
	function startAutoPlay() {
		if (isAutoPlaying) return;
		
		isAutoPlaying = true;
		autoPlayProgress.set(0);
		
		autoPlayInterval = setInterval(() => {
			if (currentSection < sections.length - 1) {
				setCurrentSection(currentSection + 1);
				autoPlayProgress.set(0);
			} else {
				stopAutoPlay();
			}
		}, 5000);
		
		autoPlayProgress.set(100);
	}

	function stopAutoPlay() {
		isAutoPlaying = false;
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
			autoPlayInterval = null;
		}
		autoPlayProgress.set(0);
	}

	function toggleAutoPlay() {
		if (isAutoPlaying) {
			stopAutoPlay();
		} else {
			startAutoPlay();
		}
	}

	// Reading progress simulation
	function startReadingProgress() {
		readingProgress.set(0);
		setTimeout(() => readingProgress.set(100), 2000);
	}

	// Haptic feedback for supported devices
	function provideHapticFeedback() {
		if ('vibrate' in navigator) {
			navigator.vibrate(50);
		}
	}

	// Touch gesture handling
	function handleTouchStart(event) {
		touchStartY = event.touches[0].clientY;
		touchStartX = event.touches[0].clientX;
		stopAutoPlay();
	}

	function handleTouchEnd(event) {
		const touchEndY = event.changedTouches[0].clientY;
		const touchEndX = event.changedTouches[0].clientX;
		const deltaY = touchStartY - touchEndY;
		const deltaX = touchStartX - touchEndX;
		const minSwipeDistance = 50;

		// Vertical swipe detection
		if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
			if (deltaY > 0 && currentSection < sections.length - 1) {
				// Swipe up - next section
				setCurrentSection(currentSection + 1);
				provideHapticFeedback();
			} else if (deltaY < 0 && currentSection > 0) {
				// Swipe down - previous section
				setCurrentSection(currentSection - 1);
				provideHapticFeedback();
			}
		}
	}

	// Enhanced section change with analytics
	function setCurrentSectionEnhanced(index, source = 'manual') {
		const previousSection = currentSection;
		currentSection = index;
		scrollToSection(index);
		startReadingProgress();
		
		// Dispatch analytics event
		dispatch('sectionChange', {
			from: previousSection,
			to: index,
			source,
			section: sections[index]
		});
		
		// Update progress
		progress.set((index / (sections.length - 1)) * 100);
	}

	// Mouse enter/leave for auto-play pause
	function handleMouseEnter() {
		isHovering = true;
		if (isAutoPlaying) {
			autoPlayProgress.set($autoPlayProgress, { duration: 0 });
		}
	}

	function handleMouseLeave() {
		isHovering = false;
		if (isAutoPlaying) {
			autoPlayProgress.set(100);
		}
	}
</script>

<section 
	class="storytelling-section" 
	bind:this={timelineRef} 
	aria-label="Timeline da jornada profissional"
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchEnd}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<div class="container">


		<div class="section-header">
			<h2 class="section-title">A Jornada de Ginaldo Laranjeiras</h2>
			<p class="section-subtitle">Do Direito ao Product Management</p>
			<div class="title-decoration"></div>
			
			<!-- Enhanced Controls -->
			<div class="controls-container" class:visible={isVisible}>
				<!-- Auto-play Controls -->
				<div class="autoplay-controls">
					<button 
						class="autoplay-btn" 
						class:active={isAutoPlaying}
						on:click={toggleAutoPlay}
						aria-label={isAutoPlaying ? 'Pausar reprodução automática' : 'Iniciar reprodução automática'}
					>
						<span class="autoplay-icon">{isAutoPlaying ? '⏸️' : '▶️'}</span>
						<span class="autoplay-text">{isAutoPlaying ? 'Pausar' : 'Auto-play'}</span>
						{#if isAutoPlaying}
							<div class="autoplay-progress" style="width: {$autoPlayProgress}%"></div>
						{/if}
					</button>
				</div>

				<!-- Filter Controls -->
				<div class="filter-controls">
					<button class="filter-btn" class:active={currentSection === 0} on:click={() => setCurrentSectionEnhanced(0, 'filter')}>Início</button>
					<button class="filter-btn" class:active={currentSection === 3} on:click={() => setCurrentSectionEnhanced(3, 'filter')}>Corporativo</button>
					<button class="filter-btn" class:active={currentSection === 2} on:click={() => setCurrentSectionEnhanced(2, 'filter')}>Empreendedor</button>
					<button class="filter-btn" class:active={currentSection === sections.length - 1} on:click={() => setCurrentSectionEnhanced(sections.length - 1, 'filter')}>Atual</button>
				</div>
			</div>
		</div>



		<div class="story-container" class:visible={isVisible}>
			<!-- Enhanced Story Content -->
			<div class="story-content">
				{#each sections as section, index}
					<button 
						class="story-card" 
						class:active={currentSection === index}
						class:visible={isVisible}
						class:completed={index < currentSection}
						class:next={index === currentSection + 1}
						class:reading={index === currentSection && $readingProgress > 0}
						style="--delay: {index * 0.1}s"
						bind:this={storyCards[index]}
						on:click={() => setCurrentSectionEnhanced(index, 'card')}
						aria-label="Seção {index + 1}: {section.title}"
					>
						<!-- Card Status Indicator -->
						<div class="card-status">
							{#if index < currentSection}
								<span class="status-completed">✓</span>
							{:else if index === currentSection}
								<span class="status-current">👁️</span>
							{:else if index === currentSection + 1}
								<span class="status-next">→</span>
							{/if}
						</div>

						<!-- Reading Progress Bar -->
						{#if index === currentSection}
							<div class="card-reading-progress">
								<div class="reading-progress-bar" style="width: {$readingProgress}%"></div>
							</div>
						{/if}

						<div class="card-header">
							<div class="card-icon" class:pulsing={index === currentSection}>{section.icon}</div>
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

						<!-- Interaction Hints -->
						{#if index === currentSection + 1}
							<div class="interaction-hint">
								<span class="hint-text">Próxima →</span>
							</div>
						{/if}
					</button>
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

	/* Enhanced Controls Container */
	.controls-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		margin-top: 2rem;
		opacity: 0;
		transform: translateY(20px);
		transition: var(--transition-slow);
		transition-delay: 0.3s;
	}

	.controls-container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Auto-play Controls */
	.autoplay-controls {
		display: flex;
		justify-content: center;
	}

	.autoplay-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border: 2px solid var(--border-medium);
		background: var(--bg-white);
		color: var(--text-secondary);
		border-radius: var(--border-radius-large);
		cursor: pointer;
		transition: var(--transition);
		font-size: 0.9rem;
		font-weight: 600;
		position: relative;
		overflow: hidden;
		box-shadow: var(--shadow-light);
	}

	.autoplay-btn:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow);
		border-color: var(--primary-color);
	}

	.autoplay-btn.active {
		background: var(--primary-color);
		color: var(--text-white);
		border-color: var(--primary-color);
		box-shadow: var(--shadow-medium);
	}

	.autoplay-progress {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 3px;
		background: rgba(255, 255, 255, 0.3);
		transition: width 0.1s linear;
		border-radius: 0 0 var(--border-radius-large) var(--border-radius-large);
	}

	.autoplay-icon {
		font-size: 1rem;
		line-height: 1;
	}

	.autoplay-text {
		font-size: 0.875rem;
	}

	/* Filter Controls */
	.filter-controls {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		padding: 0.5rem 1rem;
		border: 2px solid var(--border-light);
		background: var(--bg-white);
		color: var(--text-dark);
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: var(--transition);
		font-size: 0.875rem;
		font-weight: 600;
		position: relative;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.filter-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
		transition: var(--transition);
		z-index: 0;
	}

	.filter-btn:hover::before,
	.filter-btn.active::before {
		left: 0;
	}

	.filter-btn:hover,
	.filter-btn.active {
		color: #ffffff !important;
		border-color: var(--primary-color);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		z-index: 1;
		position: relative;
	}

	.filter-btn:hover *,
	.filter-btn.active *,
	.filter-btn:hover span,
	.filter-btn.active span,
	.filter-btn:hover::after,
	.filter-btn.active::after {
		position: relative;
		z-index: 2;
		color: #ffffff !important;
		text-shadow: none;
	}

	/* Garantir texto branco visível */
	.filter-btn:hover,
	.filter-btn.active {
		background-color: rgba(0, 0, 0, 0.8) !important;
	}

	.filter-btn:hover::before,
	.filter-btn.active::before {
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(33, 33, 33, 0.9)) !important;
	}



	.story-container {
		display: block;
		margin-left: 0;
		padding-left: 0;
		opacity: 0;
		transform: translateY(30px);
		transition: var(--transition-slow);
		position: relative;
	}

	.story-container.visible {
		opacity: 1;
		transform: translateY(0);
	}



	.timeline-nav::-webkit-scrollbar {
		display: none;
	}











	@keyframes progressShimmer {
		0% { left: -100%; }
		100% { left: 100%; }
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
		cursor: pointer;
		scroll-margin-top: 2rem;
		width: 100%;
		text-align: left;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		display: block;
	}

	.story-card:focus {
		outline: 2px solid var(--primary-color);
		outline-offset: 2px;
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
		animation: pulseGlow 2s ease-in-out infinite;
	}

	.story-card.completed {
		opacity: 0.8;
		background: linear-gradient(135deg, var(--bg-white) 0%, rgba(16, 185, 129, 0.05) 100%);
		border-left: 4px solid var(--success-color, #10b981);
	}

	.story-card.next {
		opacity: 0.7;
		background: linear-gradient(135deg, var(--bg-white) 0%, rgba(245, 158, 11, 0.05) 100%);
		border-left: 4px solid var(--warning-color, #f59e0b);
		animation: nextCardPulse 2s ease-in-out infinite;
	}

	.story-card.reading {
		background: linear-gradient(135deg, var(--bg-white) 0%, rgba(66, 66, 66, 0.02) 100%);
	}

	/* Card Status Indicators */
	.card-status {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		background: var(--bg-white);
		box-shadow: var(--shadow-light);
		border: 2px solid var(--border-light);
		transition: var(--transition);
	}

	.status-completed {
		color: var(--success-color, #10b981);
		background: rgba(16, 185, 129, 0.1);
		border-color: var(--success-color, #10b981);
	}

	.status-current {
		color: var(--primary-color);
		background: rgba(66, 66, 66, 0.1);
		border-color: var(--primary-color);
		animation: currentStatusPulse 1.5s ease-in-out infinite;
	}

	.status-next {
		color: var(--warning-color, #f59e0b);
		background: rgba(245, 158, 11, 0.1);
		border-color: var(--warning-color, #f59e0b);
	}

	/* Reading Progress */
	.card-reading-progress {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--border-light);
		border-radius: var(--border-radius-large) var(--border-radius-large) 0 0;
		overflow: hidden;
	}

	.reading-progress-bar {
		height: 100%;
		background: var(--gradient-dark);
		transition: width 0.1s ease;
		position: relative;
	}

	.reading-progress-bar::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 10px;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
		animation: shimmer 1s infinite;
	}

	@keyframes pulseGlow {
		0%, 100% {
			box-shadow: var(--shadow-medium);
		}
		50% {
			box-shadow: 0 8px 32px rgba(66, 66, 66, 0.15), 0 0 0 1px var(--primary-color);
		}
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
		transition: var(--transition);
	}

	.card-icon.pulsing {
		animation: iconPulse 2s ease-in-out infinite;
		background: linear-gradient(135deg, var(--bg-gray-light) 0%, rgba(66, 66, 66, 0.1) 100%);
		border-color: var(--primary-color);
		box-shadow: 0 0 20px rgba(66, 66, 66, 0.1);
	}

	/* Interaction Hints */
	.interaction-hint {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		background: var(--warning-color, #f59e0b);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: var(--border-radius);
		font-size: 0.75rem;
		font-weight: 600;
		box-shadow: var(--shadow);
		animation: hintBounce 2s ease-in-out infinite;
		pointer-events: none;
	}

	.hint-text {
		display: flex;
		align-items: center;
		gap: 0.25rem;
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

	/* Enhanced UX Animations */
	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	@keyframes progressShimmer {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		50% {
			transform: translateX(0%);
			opacity: 1;
		}
		100% {
			transform: translateX(100%);
			opacity: 0;
		}
	}

	@keyframes progressPulse {
		0%, 100% {
			transform: translateX(-50%) scale(1);
			box-shadow: 
				0 0 15px var(--primary-color),
				0 0 25px rgba(66, 66, 66, 0.4),
				inset 0 1px 0 rgba(255, 255, 255, 0.3);
		}
		50% {
			transform: translateX(-50%) scale(1.3);
			box-shadow: 
				0 0 25px var(--primary-color),
				0 0 40px rgba(66, 66, 66, 0.6),
				inset 0 1px 0 rgba(255, 255, 255, 0.5);
		}
	}

	@keyframes pulse {
		0%, 100% {
			transform: translateX(-50%) scale(1);
			opacity: 1;
		}
		50% {
			transform: translateX(-50%) scale(1.2);
			opacity: 0.7;
		}
	}



	@keyframes rotateGlow {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes activeGlow {
		0%, 100% {
			box-shadow: 
				0 16px 32px rgba(66, 66, 66, 0.15),
				0 8px 16px rgba(66, 66, 66, 0.1),
				0 0 0 1px var(--primary-color),
				0 0 20px rgba(66, 66, 66, 0.2);
			transform: scale(1.15) translateY(-3px);
		}
		50% {
			box-shadow: 
				0 20px 40px rgba(66, 66, 66, 0.2),
				0 12px 24px rgba(66, 66, 66, 0.15),
				0 0 0 2px var(--primary-color),
				0 0 30px rgba(66, 66, 66, 0.3);
			transform: scale(1.18) translateY(-4px);
		}
	}

	@keyframes completedPulse {
		0%, 100% {
			box-shadow: 
				0 12px 24px rgba(16, 185, 129, 0.15),
				0 6px 12px rgba(16, 185, 129, 0.1),
				0 0 0 1px var(--success-color, #10b981);
		}
		50% {
			box-shadow: 
				0 16px 32px rgba(16, 185, 129, 0.2),
				0 8px 16px rgba(16, 185, 129, 0.15),
				0 0 0 1px var(--success-color, #10b981),
				0 0 20px rgba(16, 185, 129, 0.25);
		}
	}

	@keyframes nextPulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: 
				0 8px 16px rgba(245, 158, 11, 0.1),
				0 4px 8px rgba(245, 158, 11, 0.06),
				0 0 0 1px rgba(245, 158, 11, 0.2);
		}
		50% {
			transform: scale(1.03);
			box-shadow: 
				0 12px 24px rgba(245, 158, 11, 0.15),
				0 6px 12px rgba(245, 158, 11, 0.1),
				0 0 0 1px rgba(245, 158, 11, 0.3),
				0 0 15px rgba(245, 158, 11, 0.2);
		}
	}

	@keyframes completionBounce {
		0% {
			transform: scale(0) rotate(-180deg);
			opacity: 0;
			box-shadow: 
				0 0 0 rgba(16, 185, 129, 0),
				0 0 0 rgba(16, 185, 129, 0);
		}
		50% {
			transform: scale(1.3) rotate(-90deg);
			opacity: 1;
			box-shadow: 
				0 6px 18px rgba(16, 185, 129, 0.4),
				0 3px 9px rgba(16, 185, 129, 0.3);
		}
		75% {
			transform: scale(0.9) rotate(-45deg);
		}
		100% {
			transform: scale(1) rotate(0deg);
			opacity: 1;
			box-shadow: 
				0 4px 12px rgba(16, 185, 129, 0.3),
				0 2px 6px rgba(16, 185, 129, 0.2);
		}
	}



	@keyframes nextCardPulse {
		0%, 100% {
			transform: translateX(0) scale(1);
			box-shadow: var(--shadow-light);
		}
		50% {
			transform: translateX(0) scale(1.01);
			box-shadow: 0 4px 20px rgba(245, 158, 11, 0.2);
		}
	}

	@keyframes currentStatusPulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: var(--shadow-light);
		}
		50% {
			transform: scale(1.1);
			box-shadow: 0 0 15px rgba(66, 66, 66, 0.3);
		}
	}

	@keyframes iconPulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: 0 0 20px rgba(66, 66, 66, 0.1);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 0 25px rgba(66, 66, 66, 0.2);
		}
	}

	@keyframes hintBounce {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
	}

	@keyframes iconFloat {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
		}
		33% {
			transform: translateY(-2px) rotate(2deg);
		}
		66% {
			transform: translateY(1px) rotate(-1deg);
		}
	}





	/* Micro-interações sofisticadas */
	.timeline-dot {
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		animation: dotSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
		animation-delay: calc(var(--dot-index, 0) * 0.1s);
		opacity: 0;
		transform: translateX(-20px) scale(0.8);
	}

	.timeline-dot:active {
		transform: scale(1.05) translateY(-1px);
		transition: all 0.1s ease-out;
	}

	.timeline-nav:hover .timeline-dot:not(:hover):not(.active) {
		opacity: 0.6;
		transform: scale(0.95);
	}

	.timeline-nav:hover .timeline-line {
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.15);
	}

	.timeline-nav:hover .timeline-progress {
		box-shadow: 
			0 0 15px rgba(66, 66, 66, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.timeline-nav.visible .timeline-dot {
		opacity: 1;
		transform: translateX(0) scale(1);
	}

	/* Enhanced Responsividade */
	@media (max-width: 768px) {
		.storytelling-section {
			padding: 4rem 0;
			padding-top: 8rem; /* Account for navbar + progress bar */
		}



		.controls-container {
			gap: 1rem;
		}

		.autoplay-controls {
			order: 2;
		}

		.autoplay-btn {
			padding: 0.5rem 1rem;
			font-size: 0.8rem;
		}

		.filter-controls {
			order: 1;
			flex-wrap: wrap;
			gap: 0.5rem;
			justify-content: center;
		}

		.filter-btn {
			padding: 0.4rem 0.8rem;
			font-size: 0.8rem;
		}

		.story-container {
			margin-left: 0;
			padding-left: 0;
			gap: 2rem;
		}

		.timeline-nav {
			position: static;
			transform: none;
			left: auto;
			top: auto;
			flex-direction: row;
			overflow-x: auto;
			overflow-y: hidden;
			max-height: none;
			margin-bottom: 2rem;
			padding: 1rem;
			gap: 1rem;
			scroll-snap-type: x mandatory;
			scrollbar-width: none;
			-ms-overflow-style: none;
		}

		.timeline-nav::-webkit-scrollbar {
			display: none;
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

		.timeline-progress {
			height: 100%;
			width: var(--progress-width, 0%);
		}

		.timeline-dot {
			width: 60px;
			height: 60px;
			flex-shrink: 0;
			scroll-snap-align: center;
		}

		.dot-year {
			font-size: 0.65rem;
		}



		.story-card {
			padding: 1.5rem;
			scroll-margin-top: 1rem;
		}

		.card-header {
			flex-direction: column;
			text-align: center;
			gap: 0.75rem;
		}

		.card-details {
			justify-content: center;
		}

		.card-status {
			top: 0.5rem;
			right: 0.5rem;
			width: 20px;
			height: 20px;
			font-size: 0.7rem;
		}

		.card-reading-progress {
			height: 2px;
		}

		.interaction-hint {
			bottom: 0.5rem;
			right: 0.5rem;
			padding: 0.2rem 0.5rem;
			font-size: 0.65rem;
		}

		.final-quote blockquote {
			padding: 2rem;
		}
	}

	/* Enhanced Acessibilidade */
	@media (prefers-reduced-motion: reduce) {
		.story-card,
		.timeline-dot,
		.filter-btn,
		.autoplay-btn,
		.card-icon,
		.card-status,
		.timeline-progress,
		.interaction-hint {
			animation: none !important;
			transition: opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease;
		}

		.pulse-ring,
		.completion-indicator {
			display: none;
		}

		.filter-btn::before {
			transition: none;
		}
	}

	/* Focus States for Accessibility */
	.filter-btn:focus-visible,
	.timeline-dot:focus-visible,
	.autoplay-btn:focus-visible,
	.story-card:focus-visible {
		outline: 2px solid var(--primary-color);
		outline-offset: 2px;
		box-shadow: 0 0 0 4px rgba(66, 66, 66, 0.1);
	}

	/* High Contrast Mode Support */
	@media (prefers-contrast: high) {
		.timeline-progress {
			background: var(--text-primary);
		}

		.story-card.active {
			border: 3px solid var(--text-primary);
		}

		.timeline-dot.active {
			background: var(--text-primary);
			color: var(--bg-white);
		}
	}

	/* Print Styles */
	@media print {
		.controls-container,
		.timeline-nav,
		.interaction-hint {
			display: none;
		}

		.story-content {
			display: block;
		}

		.story-card {
			break-inside: avoid;
			margin-bottom: 2rem;
			box-shadow: none;
			border: 1px solid #ccc;
		}
	}

	/* Focus management for keyboard navigation */
	.storytelling-section:focus {
		outline: none;
	}

	.storytelling-section:focus-visible {
		outline: 2px solid var(--primary-color);
		outline-offset: 4px;
	}
</style>
<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	const dispatch = createEventDispatcher();

	// Accessibility and UX improvements
	let isReducedMotion = false;
	let focusedCardIndex = -1;
	let announceText = "";
	let lastInteractionTime = 0;

	interface Section {
		id: string;
		title: string;
		year: string;
		company: string;
		role: string;
		description: string;
		insight: string;
		icon: string;
	}

	let currentSection: number = 0;
	let isVisible: boolean = false;
	let timelineRef: HTMLElement;
	let storyCards: HTMLElement[] = [];
	let isScrolling: boolean = false;
	let scrollTimeout: number;
	let isAutoPlaying: boolean = false;
	let autoPlayInterval: number | null;
	let progressBar: HTMLElement;
	let isHovering: boolean = false;
	let touchStartY: number = 0;
	let touchStartX: number = 0;

	// Progress tracking with smooth animation
	const progress = tweened(0, {
		duration: 300,
		easing: cubicOut,
	});

	// Reading progress for current section
	const readingProgress = tweened(0, {
		duration: 100,
		easing: cubicOut,
	});

	// Auto-play progress
	const autoPlayProgress = tweened(0, {
		duration: 3000,
		easing: (t) => t,
	});

	const sections: Section[] = [
		{
			id: "despertar",
			title: "O Despertar para a Tecnologia",
			year: "2011-2013",
			company: "Banco Banese",
			role: "Estagiário",
			description:
				"Nos corredores do Banco Banese, um jovem estudante de Administração descobriu que sua paixão estava na forma como a tecnologia poderia transformar a experiência das pessoas.",
			insight: '"E se pudéssemos tornar isso mais simples?"',
			icon: "🏦",
		},
		{
			id: "alicerces",
			title: "A Construção dos Alicerces",
			year: "2013-2015",
			company: "Megga Distribuidora",
			role: "Analista de Logística",
			description:
				"Transição audaciosa para logística, desenvolvendo visão sistêmica fundamental. Paralelamente, formação em Direito e experiência no Ministério Público de Sergipe.",
			insight:
				"Desenvolvendo habilidades analíticas e de resolução de problemas",
			icon: "📚",
		},
		{
			id: "primeiro-voo",
			title: "O Primeiro Voo Solo",
			year: "2018",
			company: "CONNAT Soluções",
			role: "Co-fundador & CTO",
			description:
				"Co-fundação de startup de consultoria especializada em design thinking e transformação digital. Descoberta da verdadeira vocação na intersecção entre tecnologia, negócios e UX.",
			insight: "Laboratório de experimentação e cultura de inovação",
			icon: "🚀",
		},
		{
			id: "escalada",
			title: "A Escalada Corporativa",
			year: "2019-2021",
			company: "Accenture",
			role: "Product Owner",
			description:
				"Liderança de projetos para grandes corporações como Itaú Cartões e Drogaria São Paulo. Consolidação da expertise em metodologias ágeis e gestão de equipes multidisciplinares.",
			insight: "Navegando pela complexidade mantendo foco no valor real",
			icon: "🏢",
		},
		{
			id: "transformacao",
			title: "O Momento da Transformação Digital",
			year: "2021-2023",
			company: "FinanZero",
			role: "Product Manager",
			description:
				"Orquestração de crescimento impressionante: diversificação de portfólio, inteligência de ofertas, redesign de UX. Resultados: otimização de cross/up-selling e aumento drástico de conversão.",
			insight: "Sinfonia de crescimento e inovação",
			icon: "💳",
		},
		{
			id: "visao-empreendedora",
			title: "A Visão Empreendedora",
			year: "2021-Presente",
			company: "Tá no Plano",
			role: "Product Manager",
			description:
				"Transformação de como micro e pequenas empresas desenvolvem estratégias. Liderança no desenvolvimento de plataforma SaaS inovadora adaptada ao cotidiano das PMEs.",
			insight: "Democratizando estratégias de negócio",
			icon: "📊",
		},
		{
			id: "profissional-hoje",
			title: "O Profissional de Hoje",
			year: "Presente",
			company: "Nova Geração",
			role: "Product Manager",
			description:
				"Representante de uma nova geração de PMs: compreensão profunda de tecnologia e negócios, navegação entre startups e corporações, usuário sempre no centro das decisões.",
			insight: "Arquiteto de transformações e tradutor entre mundos",
			icon: "🎯",
		},
	];

	// Update progress when section changes
	$: {
		const progressValue = (currentSection / (sections.length - 1)) * 100;
		progress.set(progressValue);

		// Update CSS custom property for mobile timeline progress
		if (typeof document !== "undefined") {
			document.documentElement.style.setProperty(
				"--progress-width",
				`${progressValue}%`
			);
		}
	}

	onMount(() => {
		// Check for reduced motion preference
		isReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		// Add keyboard event listener
		window.addEventListener("keydown", handleKeydown);

		// Observer for section visibility and progress bar control
		const visibilityObserver = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						startReadingProgress();
						announceToScreenReader(
							"Timeline da jornada profissional carregada"
						);
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
			(entries: IntersectionObserverEntry[]) => {
				if (isScrolling) return;

				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
						const cardIndex = parseInt(
							(entry.target as HTMLElement).dataset.index || "0"
						);
						if (cardIndex !== currentSection) {
							currentSection = cardIndex;
						}
					}
				});
			},
			{
				threshold: [0.3, 0.5, 0.7],
				rootMargin: "-20% 0px -20% 0px",
			}
		);

		if (timelineRef) {
			visibilityObserver.observe(timelineRef);
		}

		// Observe all story cards for scroll-based selection
		setTimeout((): void => {
			storyCards.forEach((card: HTMLElement, index: number): void => {
				if (card) {
					card.dataset.index = index.toString();
					cardObserver.observe(card);
				}
			});
		}, 50);

		// Handle window resize for timeline sync
		const handleResize = (): void => {
			// Re-sync timeline scroll when window is resized
			setTimeout((): void => {
				syncTimelineScroll(currentSection);
			}, 50);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			if (timelineRef) {
				visibilityObserver.unobserve(timelineRef);
			}
			storyCards.forEach((card) => {
				if (card) cardObserver.unobserve(card);
			});
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("keydown", handleKeydown);
			stopAutoPlay();
		};
	});

	function setCurrentSection(index: number): void {
		currentSection = index;
		scrollToSectionEnhanced(index);
		focusedCardIndex = index;
	}

	function scrollToSection(index: number): void {
		if (storyCards[index]) {
			isScrolling = true;

			// Clear any existing timeout
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}

			storyCards[index].scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest",
			});

			// Sync timeline scroll on mobile
			syncTimelineScroll(index);

			// Reset scrolling flag after animation completes
			scrollTimeout = setTimeout((): void => {
				isScrolling = false;
			}, 500);
		}
	}

	// Sync timeline scroll with active section
	function syncTimelineScroll(index: number): void {
		const timelineNav = document.querySelector(
			".timeline-nav"
		) as HTMLElement | null;
		const timelineDots = document.querySelectorAll(
			".timeline-dot"
		) as NodeListOf<HTMLElement>;

		if (timelineNav && timelineDots[index]) {
			// Check if we're on mobile (timeline is horizontal)
			const isMobile = window.innerWidth <= 768;

			if (isMobile) {
				// Scroll timeline horizontally to center the active dot
				const dotElement = timelineDots[index];
				const timelineRect = timelineNav.getBoundingClientRect();
				const dotRect = dotElement.getBoundingClientRect();

				const scrollLeft =
					timelineNav.scrollLeft +
					(dotRect.left - timelineRect.left) -
					timelineRect.width / 2 +
					dotRect.width / 2;

				timelineNav.scrollTo({
					left: scrollLeft,
					behavior: "smooth",
				});
			}
		}
	}

	// Enhanced data filtering and selection
	function getFilteredSections(filter: string = "all"): Section[] {
		switch (filter) {
			case "early":
				return sections.filter((_, index) => index < 3);
			case "corporate":
				return sections.filter(
					(section) =>
						section.company.includes("Accenture") ||
						section.company.includes("FinanZero")
				);
			case "entrepreneurial":
				return sections.filter(
					(section) =>
						section.role.includes("Co-fundador") ||
						section.company.includes("CONNAT") ||
						section.company.includes("Tá no Plano")
				);
			case "recent":
				return sections.filter((_, index) => index >= 4);
			default:
				return sections;
		}
	}

	// Keyboard navigation with enhanced UX
	function handleKeydown(event: KeyboardEvent): void {
		if (!isVisible) return;

		// Stop auto-play on user interaction
		stopAutoPlay();

		switch (event.key) {
			case "ArrowUp":
			case "ArrowLeft":
				event.preventDefault();
				if (currentSection > 0) {
					setCurrentSection(currentSection - 1);
					provideHapticFeedback();
				}
				break;
			case "ArrowDown":
			case "ArrowRight":
				event.preventDefault();
				if (currentSection < sections.length - 1) {
					setCurrentSection(currentSection + 1);
					provideHapticFeedback();
				}
				break;
			case "Home":
				event.preventDefault();
				setCurrentSection(0);
				provideHapticFeedback();
				break;
			case "End":
				event.preventDefault();
				setCurrentSection(sections.length - 1);
				provideHapticFeedback();
				break;
			case " ":
			case "Space":
				event.preventDefault();
				toggleAutoPlay();
				break;
		}
	}

	// Auto-play functionality
	function startAutoPlay(): void {
		if (isAutoPlaying) return;

		isAutoPlaying = true;
		autoPlayProgress.set(0);

		autoPlayInterval = setInterval((): void => {
			if (currentSection < sections.length - 1) {
				setCurrentSection(currentSection + 1);
				autoPlayProgress.set(0);
			} else {
				stopAutoPlay();
			}
		}, 3000);

		autoPlayProgress.set(100);
	}

	function stopAutoPlay(): void {
		isAutoPlaying = false;
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
			autoPlayInterval = null;
		}
		autoPlayProgress.set(0);
	}

	function toggleAutoPlay(): void {
		if (isAutoPlaying) {
			stopAutoPlay();
		} else {
			startAutoPlay();
		}
	}

	// Reading progress simulation
	function startReadingProgress(): void {
		readingProgress.set(0);
		setTimeout(() => readingProgress.set(100), 1000);
	}

	// Haptic feedback for supported devices
	function provideHapticFeedback(): void {
		if ("vibrate" in navigator) {
			navigator.vibrate(50);
		}
	}

	// Touch gesture handling
	function handleTouchStart(event: TouchEvent): void {
		touchStartY = event.touches[0].clientY;
		touchStartX = event.touches[0].clientX;
		stopAutoPlay();
	}

	function handleTouchEnd(event: TouchEvent): void {
		const touchEndY = event.changedTouches[0].clientY;
		const touchEndX = event.changedTouches[0].clientX;
		const deltaY = touchStartY - touchEndY;
		const deltaX = touchStartX - touchEndX;
		const minSwipeDistance = 50;

		// Vertical swipe detection
		if (
			Math.abs(deltaY) > Math.abs(deltaX) &&
			Math.abs(deltaY) > minSwipeDistance
		) {
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
	function setCurrentSectionEnhanced(
		index: number,
		source: string = "manual"
	): void {
		const previousSection = currentSection;
		currentSection = index;
		scrollToSectionEnhanced(index);
		startReadingProgress();
		focusedCardIndex = index;
		updateLastInteraction();

		// Dispatch analytics event
		dispatch("sectionChange", {
			from: previousSection,
			to: index,
			source,
			section: sections[index],
		});

		// Update progress
		progress.set((index / (sections.length - 1)) * 100);

		// Provide haptic feedback
		provideHapticFeedback();
	}

	// Mouse enter/leave for auto-play pause
	function handleMouseEnter(): void {
		isHovering = true;
		if (isAutoPlaying) {
			autoPlayProgress.set($autoPlayProgress, { duration: 0 });
		}
	}

	function handleMouseLeave(): void {
		isHovering = false;
		if (isAutoPlaying) {
			autoPlayProgress.set(100);
		}
	}

	// Accessibility improvements
	function announceToScreenReader(message: string): void {
		announceText = message;
		setTimeout(() => {
			announceText = "";
		}, 1000);
	}

	function updateLastInteraction(): void {
		lastInteractionTime = Date.now();
	}

	function shouldReduceMotion(): boolean {
		return isReducedMotion;
	}

	// Enhanced scroll behavior with reduced motion support
	function scrollToSectionEnhanced(index: number): void {
		if (storyCards[index]) {
			isScrolling = true;
			updateLastInteraction();

			// Clear any existing timeout
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}

			storyCards[index].scrollIntoView({
				behavior: shouldReduceMotion() ? "auto" : "smooth",
				block: "center",
				inline: "nearest",
			});

			// Sync timeline scroll on mobile
			syncTimelineScroll(index);

			// Announce section change
			const section = sections[index];
			announceToScreenReader(
				`Navegando para: ${section.title}, ${section.year}`
			);

			// Reset scrolling flag after animation completes
			scrollTimeout = setTimeout(
				(): void => {
					isScrolling = false;
				},
				shouldReduceMotion() ? 50 : 500
			);
		}
	}
</script>

<section
	id="storytelling"
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
			<div class="title-decoration" />

			<!-- Enhanced Controls -->
			<div class="controls-container" class:visible={isVisible}>
				<!-- Auto-play Controls -->
				<div class="autoplay-controls">
					<button
						class="btn autoplay-btn"
						class:btn-primary={isAutoPlaying}
						class:btn-outline={!isAutoPlaying}
						on:click={toggleAutoPlay}
						aria-label={isAutoPlaying
							? "Pausar reprodução automática"
							: "Iniciar reprodução automática"}
						aria-pressed={isAutoPlaying}
					>
						<span class="autoplay-icon" aria-hidden="true"
							>{isAutoPlaying ? "⏸️" : "▶️"}</span
						>
						<span class="autoplay-text"
							>{isAutoPlaying ? "Pausar" : "Auto-play"}</span
						>
						{#if isAutoPlaying}
							<div
								class="autoplay-progress"
								style="width: {$autoPlayProgress}%"
								aria-hidden="true"
							/>
						{/if}
					</button>
				</div>

				<!-- Filter Controls -->
				<div
					class="filter-controls"
					role="tablist"
					aria-label="Navegação rápida da timeline"
				>
					<button
						class="btn filter-btn"
						class:btn-primary={currentSection === 0}
						class:btn-outline={currentSection !== 0}
						role="tab"
						aria-selected={currentSection === 0}
						aria-controls="story-content"
						tabindex={currentSection === 0 ? 0 : -1}
						on:click={() => setCurrentSectionEnhanced(0, "filter")}
						>Início</button
					>
					<button
						class="btn filter-btn"
						class:btn-primary={currentSection === 3}
						class:btn-outline={currentSection !== 3}
						role="tab"
						aria-selected={currentSection === 3}
						aria-controls="story-content"
						tabindex={currentSection === 3 ? 0 : -1}
						on:click={() => setCurrentSectionEnhanced(3, "filter")}
						>Corporativo</button
					>
					<button
						class="btn filter-btn"
						class:btn-primary={currentSection === 2}
						class:btn-outline={currentSection !== 2}
						role="tab"
						aria-selected={currentSection === 2}
						aria-controls="story-content"
						tabindex={currentSection === 2 ? 0 : -1}
						on:click={() => setCurrentSectionEnhanced(2, "filter")}
						>Empreendedor</button
					>
					<button
						class="btn filter-btn"
						class:btn-primary={currentSection ===
							sections.length - 1}
						class:btn-outline={currentSection !==
							sections.length - 1}
						role="tab"
						aria-selected={currentSection === sections.length - 1}
						aria-controls="story-content"
						tabindex={currentSection === sections.length - 1
							? 0
							: -1}
						on:click={() =>
							setCurrentSectionEnhanced(
								sections.length - 1,
								"filter"
							)}>Atual</button
					>
				</div>
			</div>
		</div>

		<!-- Screen Reader Announcements -->
		<div class="sr-only" aria-live="polite" aria-atomic="true">
			{announceText}
		</div>

		<div class="story-container" class:visible={isVisible}>
			<!-- Enhanced Story Content -->
			<div
				class="story-content"
				id="story-content"
				role="tabpanel"
				aria-label="Conteúdo da timeline"
			>
				{#each sections as section, index}
					<button
						class="story-card"
						class:active={currentSection === index}
						class:visible={isVisible}
						class:completed={index < currentSection}
						class:next={index === currentSection + 1}
						class:reading={index === currentSection &&
							$readingProgress > 0}
						class:focused={focusedCardIndex === index}
						style="--delay: {shouldReduceMotion()
							? '0s'
							: index * 0.1 + 's'}"
						bind:this={storyCards[index]}
						on:click={() =>
							setCurrentSectionEnhanced(index, "card")}
						on:focus={() => (focusedCardIndex = index)}
						on:blur={() => (focusedCardIndex = -1)}
						aria-label="Seção {index +
							1} de {sections.length}: {section.title}, {section.year}, {section.company}"
						aria-current={currentSection === index ? "step" : false}
						tabindex={currentSection === index ? 0 : -1}
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
								<div
									class="reading-progress-bar"
									style="width: {$readingProgress}%"
								/>
							</div>
						{/if}

						<div class="card-header">
							<div
								class="card-icon"
								class:pulsing={index === currentSection}
							>
								{section.icon}
							</div>
							<div class="card-meta">
								<h3 class="card-title">{section.title}</h3>
								<div class="card-details">
									<span class="card-year">{section.year}</span
									>
									<span class="card-company"
										>{section.company}</span
									>
									<span class="card-role">{section.role}</span
									>
								</div>
							</div>
						</div>
						<div class="card-content">
							<p class="card-description">
								{section.description}
							</p>
							<blockquote class="card-insight">
								<span class="quote-mark">"</span>
								{section.insight}
								<span class="quote-mark">"</span>
							</blockquote>
						</div>

						<!-- Interaction Hints -->
						{#if index === currentSection + 1}
							<div class="interaction-hint" aria-hidden="true">
								<span class="hint-text">Próxima →</span>
							</div>
						{/if}

						<!-- Progress indicator for current section -->
						{#if index === currentSection}
							<div class="section-progress" aria-hidden="true">
								<span class="progress-text"
									>{index + 1} de {sections.length}</span
								>
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
				A verdadeira inovação acontece quando conseguimos ver conexões onde
				outros veem apenas diferenças.
				<span class="quote-large">"</span>
				<cite>— Ginaldo Laranjeiras Junior</cite>
			</blockquote>
		</div>
	</div>
</section>

<style>
	.storytelling-section {
		min-height: 100vh;
		padding: 6rem 0;
		position: relative;
		background: var(--gradient-subtle);
		overflow: hidden;
	}

	.storytelling-section::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(
				circle at 20% 80%,
				rgba(66, 66, 66, 0.05) 0%,
				transparent 50%
			),
			radial-gradient(
				circle at 80% 20%,
				rgba(44, 44, 44, 0.05) 0%,
				transparent 50%
			);
		pointer-events: none;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
		position: relative;
		z-index: 2;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		margin-bottom: 1rem;
		background: var(--gradient-dark);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
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
		margin: 0 auto 3rem;
		border-radius: 2px;
		box-shadow: var(--shadow-light);
	}

	/* Controls Container */
	.controls-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.controls-container.visible {
		opacity: 1;
	}

	/* Accessibility */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.story-card,
		.controls-container,
		.story-container {
			transition: none;
			animation: none;
		}

		.story-card.visible {
			animation: none;
			transform: none;
		}
	}

	/* Auto-play Controls */
	.autoplay-controls {
		display: flex;
		justify-content: center;
	}

	.autoplay-btn {
		font-size: 0.875rem;
		position: relative;
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--border-light);
		background: rgba(248, 248, 248, 0.9);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: var(--text-secondary);
		border-radius: 12px;
		cursor: pointer;
		transition: var(--transition);
		box-shadow: var(--shadow-light);
		font-weight: 500;
	}

	.autoplay-btn:hover {
		background: var(--hover-overlay);
		border-color: var(--border-medium);
		transform: translateY(-2px);
		box-shadow: var(--shadow);
	}

	.autoplay-btn.btn-primary {
		background: var(--gradient-dark);
		color: var(--text-white);
		border-color: var(--border-medium);
		box-shadow: var(--shadow-medium);
	}

	.autoplay-progress {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 2px;
		background: rgba(255, 255, 255, 0.4);
		transition: width 0.1s linear;
		border-radius: 0 0 var(--border-radius) var(--border-radius);
	}

	.autoplay-icon {
		font-size: 0.875rem;
		margin-right: 0.5rem;
	}

	.autoplay-text {
		font-size: 0.875rem;
	}

	/* Filter Controls */
	.filter-controls {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		font-size: 0.875rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--border-light);
		background: rgba(248, 248, 248, 0.8);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: var(--text-secondary);
		border-radius: 10px;
		cursor: pointer;
		transition: var(--transition);
		box-shadow: var(--shadow-light);
		font-weight: 500;
	}

	.filter-btn:hover {
		background: var(--hover-overlay);
		border-color: var(--border-medium);
		transform: translateY(-1px);
		box-shadow: var(--shadow);
	}

	.filter-btn.btn-primary {
		background: var(--gradient-dark);
		color: var(--text-white);
		border-color: var(--border-medium);
		box-shadow: var(--shadow-medium);
	}

	.story-container {
		display: block;
		margin-left: 0;
		padding-left: 0;
		opacity: 0;
		transition: opacity 0.6s ease;
		position: relative;
	}

	/* Timeline visual para desktop */
	@media (min-width: 1024px) {
		.story-container {
			position: relative;
		}

		.story-card {
			position: relative;
		}

	}

	.story-container.visible {
		opacity: 1;
	}

	@keyframes progressShimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	.story-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.story-card {
		background: rgba(248, 248, 248, 0.9);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 20px;
		padding: 2rem;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow);
		transition: var(--transition);
		opacity: 0.7;
		position: relative;
		cursor: pointer;
		scroll-margin-top: 2rem;
		width: 100%;
		text-align: left;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		display: block;
		transform: translateY(10px);
		overflow: hidden;
	}

	
	.story-card.visible {
		opacity: 0.8;
		transform: translateY(0);
		animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 0.8;
			transform: translateY(0);
		}
	}

	.story-card.active {
		opacity: 1;
		box-shadow: var(--shadow-hover);
		border: 1px solid var(--border-medium);
		transform: translateY(0) scale(1.02);
		background: var(--bg-white);
	}



	.story-card.reading {
		background: var(--bg-light);
	}

	/* Card Status Indicators */
	.card-status {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		width: 28px;
		height: 28px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		background: var(--bg-white);
		color: var(--text-tertiary);
		border: 1px solid var(--border-light);
		transition: var(--transition);
		box-shadow: var(--shadow-light);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.status-completed {
		background: var(--gradient-dark);
		color: var(--text-white);
		box-shadow: var(--shadow-medium);
	}

	.status-current {
		background: var(--gradient-dark);
		color: var(--text-white);
		box-shadow: var(--shadow-medium);
		animation: statusPulse 2s infinite;
	}

	@keyframes statusPulse {
		0%,
		100% {
			transform: scale(1);
			box-shadow: var(--shadow-medium);
		}
		50% {
			transform: scale(1.1);
			box-shadow: var(--shadow-hover);
		}
	}

	.status-next {
		background: var(--gradient-medium);
		color: var(--text-primary);
		box-shadow: var(--shadow-medium);
	}

	/* Reading Progress */
	.card-reading-progress {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--border-light);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
	}

	.reading-progress-bar {
		height: 100%;
		background: var(--primary-color);
		transition: width 0.2s ease;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.card-icon {
		width: 64px;
		height: 64px;
		border-radius: 20px;
		background: var(--gradient-light);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		border: 1px solid var(--border-light);
		transition: var(--transition);
		box-shadow: var(--shadow-light);
		position: relative;
		overflow: hidden;
	}

	.card-icon.pulsing {
		background: var(--gradient-dark);
		color: var(--text-white);
		border-color: var(--border-medium);
		box-shadow: var(--shadow-medium), 0 0 0 0 rgba(59, 130, 246, 0.4);
		animation: iconPulse 2s infinite;
	}

	.card-icon.pulsing::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.1) 0%,
			transparent 100%
		);
		border-radius: inherit;
	}

	@keyframes iconPulse {
		0% {
			box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3),
				0 0 0 0 rgba(59, 130, 246, 0.4);
		}
		50% {
			box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4),
				0 0 0 8px rgba(59, 130, 246, 0.1);
		}
		100% {
			box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3),
				0 0 0 0 rgba(59, 130, 246, 0.4);
		}
	}

	/* Interaction Hints */
	.interaction-hint {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		background: var(--text-tertiary);
		color: var(--text-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--border-radius-small);
		font-size: 0.7rem;
		font-weight: 500;
		pointer-events: none;
	}

	.section-progress {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: var(--primary-color);
		color: var(--text-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--border-radius-small);
		font-size: 0.7rem;
		font-weight: 500;
		pointer-events: none;
	}

	.progress-text {
		display: flex;
		align-items: center;
		gap: 0.25rem;
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
		font-size: 1.375rem;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	.card-details {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.card-year {
		background: var(--gradient-dark);
		color: var(--text-white);
		padding: 0.375rem 0.75rem;
		border-radius: 8px;
		font-size: 0.8rem;
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
		letter-spacing: 0.01em;
	}

	.card-company {
		color: var(--text-secondary);
		font-weight: 600;
		font-size: 0.95rem;
		letter-spacing: 0.005em;
	}

	.card-role {
		color: var(--text-tertiary);
		font-size: 0.875rem;
		font-style: italic;
		font-weight: 500;
	}

	.card-content {
		line-height: 1.6;
	}

	.card-description {
		color: var(--text-secondary);
		margin-bottom: 1.25rem;
		font-size: 1rem;
		line-height: 1.7;
		letter-spacing: 0.01em;
	}

	.card-insight {
		background: var(--hover-overlay);
		border-left: 4px solid var(--primary-color);
		padding: 1rem 1.25rem;
		margin: 0;
		border-radius: 0 12px 12px 0;
		color: var(--text-secondary);
		font-style: italic;
		font-size: 0.95rem;
		line-height: 1.6;
		position: relative;
	}

	.quote-mark {
		color: var(--primary-color);
		font-size: 1.2em;
		font-weight: 700;
		opacity: 0.8;
	}

	.final-quote {
		margin-top: 4rem;
		text-align: center;
		opacity: 0;
		transition: var(--transition-slow);
		transform: translateY(30px);
	}

	.final-quote.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.final-quote blockquote {
		background: var(--bg-white);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 24px;
		padding: 3rem 2.5rem;
		margin: 0;
		box-shadow: var(--shadow-medium);
		border: 1px solid var(--border-light);
		max-width: 700px;
		margin: 0 auto;
		font-size: 1.25rem;
		color: var(--text-primary);
		font-style: italic;
		line-height: 1.6;
		font-weight: 500;
		position: relative;
		overflow: hidden;
	}

	.final-quote blockquote::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--gradient-dark);
	}

	.quote-large {
		font-size: 2.5rem;
		background: var(--gradient-dark);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-weight: 700;
		line-height: 1;
		opacity: 0.9;
	}

	.final-quote cite {
		display: block;
		margin-top: 1.5rem;
		color: var(--text-tertiary);
		font-size: 1rem;
		font-style: normal;
		font-weight: 600;
		letter-spacing: 0.01em;
	}

	/* Responsividade */
	@media (max-width: 1023px) {
		.story-container {
			padding-left: 0 !important;
		}

		.story-card {
			margin-left: 0 !important;
		}
	}

	@media (max-width: 768px) {
		.storytelling-section {
			padding: 4rem 0;
		}

		.section-header {
			margin-bottom: 3rem;
		}

		.section-title {
			font-size: clamp(2rem, 6vw, 2.5rem);
		}

		.controls-container {
			gap: 1rem;
		}

		.autoplay-text {
			display: none;
		}

		.story-card {
			padding: 1.5rem;
			border-radius: 16px;
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
			top: 1rem;
			right: 1rem;
			width: 24px;
			height: 24px;
			font-size: 0.7rem;
		}

		.card-icon {
			width: 56px;
			height: 56px;
			font-size: 1.375rem;
		}

		.final-quote blockquote {
			padding: 2rem 1.5rem;
			border-radius: 20px;
			font-size: 1.125rem;
		}

		.quote-large {
			font-size: 2rem;
		}
	}

	@media (max-width: 480px) {
		.filter-controls {
			flex-direction: column;
			width: 100%;
			max-width: 280px;
		}

		.filter-btn {
			width: 100%;
			justify-content: center;
		}
	}

	/* Accessibility & Performance */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}

		.story-card {
			transform: none !important;
		}

		.card-icon.pulsing {
			animation: none !important;
		}
	}

	@media (prefers-contrast: high) {
		.story-card {
			border: 2px solid var(--text-primary);
		}

		.card-status {
			border: 2px solid var(--text-primary);
		}
	}

	/* Print Styles */
	@media print {
		.storytelling-section {
			background: white !important;
			color: black !important;
			padding: 1rem !important;
		}

		.controls-container,
		.interaction-hint,
		.section-progress {
			display: none !important;
		}

		.story-card {
			box-shadow: none !important;
			border: 1px solid #ccc !important;
			break-inside: avoid;
			margin-bottom: 1rem !important;
		}

		.card-icon {
			background: #f0f0f0 !important;
			color: black !important;
		}
	}

	/* Focus States for Keyboard Navigation */
	.story-card:focus-visible {
		outline: 3px solid var(--primary-color);
		outline-offset: 2px;
	}

	.filter-btn:focus-visible,
	.autoplay-btn:focus-visible {
		outline: 2px solid var(--primary-color);
		outline-offset: 2px;
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

<script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar, MapPin, ExternalLink } from 'lucide-svelte';
	
	let experienceElement: HTMLElement;
	
	interface Experience {
		id: number;
		title: string;
		company: string;
		location: string;
		period: string;
		description: string;
		technologies: string[];
		achievements: string[];
		type: 'work' | 'education' | 'project';
	}
	
	const experiences: Experience[] = [
		{
			id: 1,
			title: 'Desenvolvedor Full Stack Sênior',
			company: 'Tech Solutions Inc.',
			location: 'São Paulo, SP',
			period: '2022 - Presente',
			description: 'Lidero o desenvolvimento de aplicações web escaláveis utilizando tecnologias modernas. Responsável pela arquitetura de sistemas e mentoria de desenvolvedores juniores.',
			technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
			achievements: [
				'Reduziu tempo de carregamento das aplicações em 40%',
				'Implementou arquitetura de microserviços',
				'Liderou equipe de 5 desenvolvedores'
			],
			type: 'work'
		},
		{
			id: 2,
			title: 'Desenvolvedor Full Stack',
			company: 'Digital Innovations',
			location: 'Rio de Janeiro, RJ',
			period: '2020 - 2022',
			description: 'Desenvolvimento de aplicações web e mobile para diversos clientes. Foco em performance, usabilidade e experiência do usuário.',
			technologies: ['JavaScript', 'Vue.js', 'Express', 'MongoDB', 'React Native'],
			achievements: [
				'Desenvolveu 15+ aplicações web',
				'Implementou sistema de pagamentos online',
				'Otimizou performance de APIs em 60%'
			],
			type: 'work'
		},
		{
			id: 3,
			title: 'Desenvolvedor Frontend',
			company: 'StartupXYZ',
			location: 'Belo Horizonte, MG',
			period: '2019 - 2020',
			description: 'Primeiro emprego como desenvolvedor, focado em criar interfaces modernas e responsivas. Aprendizado intensivo em tecnologias frontend.',
			technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Sass'],
			achievements: [
				'Criou biblioteca de componentes reutilizáveis',
				'Implementou design system da empresa',
				'Melhorou acessibilidade das aplicações'
			],
			type: 'work'
		},
		{
			id: 4,
			title: 'Bacharelado em Ciência da Computação',
			company: 'Universidade Federal de Minas Gerais',
			location: 'Belo Horizonte, MG',
			period: '2015 - 2019',
			description: 'Formação sólida em fundamentos da computação, algoritmos, estruturas de dados e engenharia de software.',
			technologies: ['Java', 'Python', 'C++', 'SQL', 'Git'],
			achievements: [
				'Graduado com honras (CRA 8.5)',
				'Projeto de TCC premiado',
				'Monitor de Programação Orientada a Objetos'
			],
			type: 'education'
		}
	];
	
	let activeTab = 'work';
	
	$: filteredExperiences = experiences.filter(exp => 
		activeTab === 'all' ? true : exp.type === activeTab
	);
	
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
		
		if (experienceElement) {
			observer.observe(experienceElement);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="experience" class="section experience" bind:this={experienceElement}>
	<div class="container">
		<div class="section-title">
			<h2>Experiência Profissional</h2>
			<p>Minha jornada profissional e acadêmica na área de tecnologia</p>
		</div>
		
		<div class="experience-content">
			<div class="filter-tabs">
				<button 
					class="filter-tab" 
					class:active={activeTab === 'work'}
					on:click={() => activeTab = 'work'}
				>
					💼 Trabalho
				</button>
				<button 
					class="filter-tab" 
					class:active={activeTab === 'education'}
					on:click={() => activeTab = 'education'}
				>
					🎓 Educação
				</button>
				<button 
					class="filter-tab" 
					class:active={activeTab === 'all'}
					on:click={() => activeTab = 'all'}
				>
					📋 Todos
				</button>
			</div>
			
			<div class="timeline">
				{#each filteredExperiences as experience, index (experience.id)}
					<div class="timeline-item" class:reverse={index % 2 === 1}>
						<div class="timeline-marker">
							<div class="marker-icon">
								{#if experience.type === 'work'}
									💼
								{:else if experience.type === 'education'}
									🎓
								{:else}
									🚀
								{/if}
							</div>
						</div>
						
						<div class="timeline-content">
							<div class="experience-card">
								<div class="card-header">
									<h3>{experience.title}</h3>
									<div class="company-info">
										<span class="company">{experience.company}</span>
										<div class="meta-info">
											<span class="period">
												<Calendar size={16} />
												{experience.period}
											</span>
											<span class="location">
												<MapPin size={16} />
												{experience.location}
											</span>
										</div>
									</div>
								</div>
								
								<p class="description">{experience.description}</p>
								
								<div class="technologies">
									<h4>Tecnologias:</h4>
									<div class="tech-tags">
										{#each experience.technologies as tech}
											<span class="tech-tag">{tech}</span>
										{/each}
									</div>
								</div>
								
								<div class="achievements">
									<h4>Principais Conquistas:</h4>
									<ul>
										{#each experience.achievements as achievement}
											<li>{achievement}</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.experience {
		background: var(--bg-light);
		position: relative;
	}
	
	.experience::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 70% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
			radial-gradient(circle at 30% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%);
		pointer-events: none;
	}
	
	.experience-content {
		position: relative;
		z-index: 1;
	}
	
	.filter-tabs {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}
	
	.filter-tab {
		padding: 1rem 2rem;
		border: 2px solid var(--primary-color);
		background: transparent;
		color: var(--primary-color);
		border-radius: var(--border-radius);
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition);
		font-size: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.filter-tab:hover {
		background: var(--primary-color);
		color: white;
		transform: translateY(-2px);
	}
	
	.filter-tab.active {
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		color: white;
		border-color: transparent;
		box-shadow: var(--shadow);
	}
	
	.timeline {
		position: relative;
		max-width: 1000px;
		margin: 0 auto;
	}
	
	.timeline::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 4px;
		background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
		transform: translateX(-50%);
		border-radius: 2px;
	}
	
	.timeline-item {
		position: relative;
		margin-bottom: 3rem;
		display: flex;
		align-items: center;
	}
	
	.timeline-item.reverse {
		flex-direction: row-reverse;
	}
	
	.timeline-marker {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
	}
	
	.marker-icon {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		box-shadow: var(--shadow);
		border: 4px solid var(--bg-light);
	}
	
	.timeline-content {
		width: calc(50% - 40px);
	}
	
	.timeline-item.reverse .timeline-content {
		margin-left: 40px;
	}
	
	.timeline-item:not(.reverse) .timeline-content {
		margin-right: 40px;
	}
	
	.experience-card {
		background: var(--bg-white);
		padding: 2rem;
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		transition: var(--transition);
		border: 1px solid rgba(102, 126, 234, 0.1);
		position: relative;
	}
	
	.experience-card::before {
		content: '';
		position: absolute;
		top: 30px;
		width: 0;
		height: 0;
		border: 15px solid transparent;
	}
	
	.timeline-item:not(.reverse) .experience-card::before {
		right: -30px;
		border-left-color: var(--bg-white);
	}
	
	.timeline-item.reverse .experience-card::before {
		left: -30px;
		border-right-color: var(--bg-white);
	}
	
	.experience-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-hover);
		border-color: var(--primary-color);
	}
	
	.card-header h3 {
		color: var(--primary-color);
		margin-bottom: 0.5rem;
		font-size: 1.3rem;
	}
	
	.company {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 1.1rem;
		display: block;
		margin-bottom: 0.5rem;
	}
	
	.meta-info {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	
	.period, .location {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--text-light);
		font-size: 0.9rem;
	}
	
	.description {
		margin: 1.5rem 0;
		line-height: 1.6;
		color: var(--text-secondary);
	}
	
	.technologies, .achievements {
		margin-top: 1.5rem;
	}
	
	.technologies h4, .achievements h4 {
		color: var(--text-primary);
		margin-bottom: 0.75rem;
		font-size: 1rem;
	}
	
	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.tech-tag {
		background: rgba(102, 126, 234, 0.1);
		color: var(--primary-color);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 500;
		border: 1px solid rgba(102, 126, 234, 0.2);
	}
	
	.achievements ul {
		list-style: none;
		padding: 0;
	}
	
	.achievements li {
		padding: 0.25rem 0;
		color: var(--text-secondary);
		position: relative;
		padding-left: 1.5rem;
		line-height: 1.5;
	}
	
	.achievements li::before {
		content: '🏆';
		position: absolute;
		left: 0;
		font-size: 0.9rem;
	}
	
	@media (max-width: 768px) {
		.timeline::before {
			left: 30px;
		}
		
		.timeline-item {
			flex-direction: row !important;
			margin-bottom: 2rem;
		}
		
		.timeline-marker {
			left: 30px;
			transform: translateX(-50%);
		}
		
		.marker-icon {
			width: 50px;
			height: 50px;
			font-size: 1.2rem;
		}
		
		.timeline-content {
			width: calc(100% - 80px);
			margin-left: 80px !important;
			margin-right: 0 !important;
		}
		
		.experience-card::before {
			left: -15px !important;
			right: auto !important;
			border-right-color: var(--bg-white) !important;
			border-left-color: transparent !important;
		}
		
		.experience-card {
			padding: 1.5rem;
		}
		
		.filter-tabs {
			gap: 0.5rem;
		}
		
		.filter-tab {
			padding: 0.8rem 1.5rem;
			font-size: 0.9rem;
		}
		
		.meta-info {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}
	}
</style>
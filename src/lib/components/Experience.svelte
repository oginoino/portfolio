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
			title: 'Product Manager',
			company: 'Tá no Plano',
			location: 'Remoto',
			period: 'Ago 2021 - Presente',
			description: 'Liderança no desenvolvimento de plataforma inovadora que transforma como micro e pequenas empresas desenvolvem estratégias de negócios.',
			technologies: ['Product Analytics', 'Growth Hacking', 'A/B Testing', 'User Research', 'Figma', 'Google Cloud Platform', 'Flutter'],
			achievements: [
				'Desenvolvimento de solução SaaS adaptada ao cotidiano de PMEs',
				'Implementação de metodologias ágeis e práticas centradas no usuário',
				'Gestão completa do ciclo de vida do produto desde discovery até entrega',
				'Liderança técnica e estratégica em startup de consultoria digitalizada'
			],
			type: 'work'
		},
		
		{
			id: 2,
			title: 'Product Manager',
			company: 'FinanZero',
			location: 'São Paulo, SP',
			period: 'Set 2021 - Jul 2023',
			description: 'Gerenciamento de produtos de crédito online em fintech de destaque, focando em diversificação de portfólio e otimização de conversão.',
			technologies: ['Google Analytics 4', 'OKRs', 'Scrum', 'Design Thinking', 'Design Sprint', 'Python', 'Product Discovery'],
			achievements: [
				'Diversificação de portfólio: Expansão da linha de produtos de crédito',
				'Aumento do ticket médio: Implementação de inteligência de relevância de ofertas',
				'Melhoria de conversão: Nova tela de ofertas user-centric com resultados significativos',
				'Cross/Up-selling: Otimização de fluxos com maior taxa de conversão',
				'SEO Excellence: Posicionamento de destaque para landing pages e blog',
				'Plataforma própria: Desenvolvimento de solução escalável para email marketing',
				'UX/UI: Melhoria da usabilidade de formulários aumentando Lead-to-Contract (L2C)'
			],
			type: 'work'
		},
		{
			id: 3,
			title: 'Product Owner',
			company: 'Accenture',
			location: 'São Paulo, SP',
			period: 'Dez 2019 - Set 2021',
			description: 'Consultor especializado em desenvolvimento de software para grandes corporações, com foco em soluções de infraestrutura em nuvem.',
			technologies: ['Automação de processos', 'Python', 'AWS', 'Agile', 'Cloud Infrastructure', 'Quality Assurance'],
			achievements: [
				'Itaú Cartões: Desenvolvimento de ecossistema cloud-ready',
				'Drogaria São Paulo: Soluções de backoffice e PDV',
				'Análise de requisitos e entrega de soluções técnicas',
				'Garantia da qualidade',
				'Automação',
			],
			type: 'work'
		},
		{
			id: 5,
			title: 'Formação em Product Management',
			company: 'Gama Academy',
			location: 'Online',
			period: 'Jan 2022',
			description: 'Jornada intensiva de Product Manager com foco em estratégia de produto, discovery, roadmaps e métricas. Formação prática com projetos reais e mentoria especializada.',
			technologies: ['Product Strategy', 'User Research', 'Data Analytics', 'Roadmapping', 'Stakeholder Management'],
			achievements: [
				'Jornada de Product Manager (18h) - Jan 2022',
				'Projeto final com validação de hipóteses de produto',
				'Aplicação prática de frameworks de discovery'
			],
			type: 'education'
		},
		{
			id: 6,
			title: 'Certificações Especializadas',
			company: 'Múltiplas Instituições',
			location: 'Online',
			period: 'Jul 2021 - Ago 2023',
			description: 'Formação contínua em Product Management, Agile e Liderança através de certificações reconhecidas no mercado.',
			technologies: ['Product-Led Growth', 'Continuous Discovery', 'OKRs', 'Scrum', 'Leadership'],
			achievements: [
				'Product-led Certification (Pendo) - Ago 2023',
				'Continuous Product Discovery Certification - Jun 2023',
				'Scrum Fundamentals Certified (SCRUMstudy) - Jul 2021'
			],
			type: 'education'
		},
		{
			id: 7,
			title: 'Co-founder',
			company: 'CONNAT Soluções',
			location: 'Propriá, SE',
			period: 'Jan 2019 - Dez 2019',
			description: 'Co-fundei uma startup de soluções tecnológicas para pequenas e médias empresas. Responsável pela estratégia de produto, desenvolvimento de MVP e validação de mercado. Liderou equipe técnica e definiu arquitetura de soluções.',
			technologies: ['MVP Development', 'Market Validation', 'Team Leadership', 'Business Strategy', 'Python', 'React'],
			achievements: [
				'Desenvolveu e validou MVP com primeiros clientes',
				'Estruturou processos de desenvolvimento ágil',
				'Captou investimento inicial para desenvolvimento do produto'
			],
			type: 'work'
		},
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
			radial-gradient(circle at 70% 20%, rgba(0, 0, 0, 0.02) 0%, transparent 50%),
			radial-gradient(circle at 30% 80%, rgba(0, 0, 0, 0.01) 0%, transparent 50%);
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
		background: var(--primary-color);
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
		background: var(--primary-color);
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
		background: var(--primary-color);
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
		border: 1px solid var(--border-light);
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
		background: rgba(0, 0, 0, 0.05);
		color: var(--primary-color);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 500;
		border: 1px solid var(--border-light);
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
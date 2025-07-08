<script lang="ts">
	import { onMount } from 'svelte';
	
	let skillsElement: HTMLElement;
	
	interface Skill {
		name: string;
		description: string;
		icon: string;
		category: string;
	}
	
	const skills: Skill[] = [
		// Produtos
		{ name: 'Product Strategy', description: 'Definição de visão, missão e estratégias de produto', icon: '🎯', category: 'Produtos' },
		{ name: 'Product Roadmap', description: 'Planejamento e priorização de funcionalidades', icon: '🗺️', category: 'Produtos' },
		{ name: 'OKRs & KPIs', description: 'Definição de objetivos e métricas de sucesso', icon: '📈', category: 'Produtos' },
		{ name: 'Product Discovery', description: 'Validação de hipóteses e descoberta de oportunidades', icon: '🔍', category: 'Produtos' },
		{ name: 'Product-Led Growth', description: 'Crescimento orientado pelo produto e experiência', icon: '🚀', category: 'Produtos' },
		{ name: 'Market Research', description: 'Análise de mercado e identificação de tendências', icon: '📋', category: 'Produtos' },
		{ name: 'Business Analysis', description: 'Análise de viabilidade e impacto nos negócios', icon: '💼', category: 'Produtos' },
		{ name: 'Competitive Analysis', description: 'Estudo da concorrência e posicionamento', icon: '🔎', category: 'Produtos' },
		{ name: 'User Research', description: 'Pesquisa com usuários e análise comportamental', icon: '👥', category: 'Produtos' },
		{ name: 'A/B Testing', description: 'Testes comparativos e otimização de conversão', icon: '🧪', category: 'Produtos' },
		
		// Agile & Liderança
		{ name: 'Scrum', description: 'Framework ágil para desenvolvimento iterativo', icon: '🏃', category: 'Agile & Liderança' },
		{ name: 'Metodologias Ágeis', description: 'Implementação de práticas ágeis e lean', icon: '⚡', category: 'Agile & Liderança' },
		{ name: 'Gestão de Equipes', description: 'Liderança e desenvolvimento de equipes', icon: '👥', category: 'Agile & Liderança' },
		{ name: 'Liderança Estratégica', description: 'Visão estratégica e tomada de decisões', icon: '🎖️', category: 'Agile & Liderança' },
		{ name: 'Histórias de Usuário', description: 'Criação e refinamento de user stories', icon: '📝', category: 'Agile & Liderança' },
		{ name: 'Pensamento Estratégico', description: 'Análise estratégica e planejamento', icon: '🧠', category: 'Agile & Liderança' },
		{ name: 'Comunicação Executiva', description: 'Apresentações e comunicação com C-level', icon: '🎤', category: 'Agile & Liderança' },
		{ name: 'Gestão de Projetos', description: 'Coordenação e entrega de projetos', icon: '📋', category: 'Agile & Liderança' },
		
		// Design & Desenvolvimento
		{ name: 'Design Thinking', description: 'Metodologia centrada no usuário para inovação', icon: '💡', category: 'Design & Desenvolvimento' },
		{ name: 'UX Foundations', description: 'Fundamentos de experiência do usuário', icon: '🎯', category: 'Design & Desenvolvimento' },
		{ name: 'Design Sprint', description: 'Processo rápido de validação de ideias', icon: '⚡', category: 'Design & Desenvolvimento' },
		{ name: 'Python', description: 'Programação para análise de dados e automação', icon: '🐍', category: 'Design & Desenvolvimento' },
		{ name: 'JavaScript', description: 'Desenvolvimento web e aplicações interativas', icon: '💻', category: 'Design & Desenvolvimento' },
		{ name: 'Go Language', description: 'Linguagem de programação para sistemas', icon: '🔷', category: 'Design & Desenvolvimento' },
		{ name: 'Data Science', description: 'Análise estatística e machine learning', icon: '🔬', category: 'Design & Desenvolvimento' },
		{ name: 'AWS', description: 'Serviços de nuvem e infraestrutura', icon: '☁️', category: 'Design & Desenvolvimento' },
		{ name: 'SQL', description: 'Consultas e análise de bancos de dados', icon: '🗄️', category: 'Design & Desenvolvimento' },
		
		// Ferramentas
		{ name: 'Jira', description: 'Gestão de projetos e tracking de issues', icon: '📋', category: 'Ferramentas' },
		{ name: 'Slack', description: 'Comunicação e colaboração em equipe', icon: '💬', category: 'Ferramentas' },
		{ name: 'Google Analytics', description: 'Análise de tráfego e comportamento web', icon: '📊', category: 'Ferramentas' },
		{ name: 'Notion', description: 'Documentação e gestão de conhecimento', icon: '📝', category: 'Ferramentas' },
		{ name: 'Figma', description: 'Design colaborativo e prototipação', icon: '🎨', category: 'Ferramentas' },
		{ name: 'Trello', description: 'Organização visual de tarefas', icon: '📌', category: 'Ferramentas' },
		{ name: 'Miro', description: 'Quadros colaborativos e brainstorming', icon: '🎯', category: 'Ferramentas' },
		{ name: 'Confluence', description: 'Wiki corporativo e documentação', icon: '📚', category: 'Ferramentas' },
		{ name: 'Mixpanel', description: 'Analytics de produto e eventos', icon: '📈', category: 'Ferramentas' },
		{ name: 'Hotjar', description: 'Heatmaps e gravações de sessão', icon: '🔥', category: 'Ferramentas' }
	];
	
	const categories = ['Produtos', 'Agile & Liderança', 'Design & Desenvolvimento', 'Ferramentas'];
	
	let activeCategory = 'Produtos';
	
	$: filteredSkills = skills.filter(skill => skill.category === activeCategory);
	
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('fade-in-up');
						// Animar barras de progresso
						const progressBars = entry.target.querySelectorAll('.progress-fill');
						progressBars.forEach((bar: Element) => {
							const htmlBar = bar as HTMLElement;
							const width = htmlBar.dataset.width;
							if (width) {
								setTimeout(() => {
									htmlBar.style.width = width + '%';
								}, 300);
							}
						});
					}
				});
			},
			{ threshold: 0.1 }
		);
		
		if (skillsElement) {
			observer.observe(skillsElement);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="skills" class="section skills" bind:this={skillsElement}>
	<div class="container">
		<div class="section-title">
			<h2>Competências Profissionais</h2>
			<p>Habilidades estratégicas e ferramentas que utilizo para criar produtos digitais de sucesso</p>
		</div>
		
		<div class="skills-content">
			<div class="category-tabs">
				{#each categories as category}
					<button 
						class="category-tab" 
						class:active={activeCategory === category}
						on:click={() => activeCategory = category}
					>
						{category}
					</button>
				{/each}
			</div>
			
			<div class="skills-grid">
				{#each filteredSkills as skill (skill.name)}
					<div class="skill-card">
						<div class="skill-header">
							<div class="skill-icon">{skill.icon}</div>
							<div class="skill-info">
								<h4>{skill.name}</h4>
							</div>
						</div>
						<div class="skill-description">
							{skill.description}
						</div>
					</div>
				{/each}
			</div>
			
			<div class="skills-summary">
				<div class="summary-card">
					<h3>Principais Competências</h3>
					<ul>
						<li>Product-Led Growth e Discovery</li>
						<li>Construção de Product Roadmaps</li>
						<li>OKRs e definição de metas ágeis</li>
						<li>Design Thinking e Design Sprint</li>
						<li>Metodologias Ágeis (Scrum, Kanban)</li>
						<li>UX Research e Foundations</li>
						<li>Análise de dados e ciência de dados</li>
						<li>Liderança e gestão de equipes</li>
						<li>Desenvolvimento técnico (Python, AWS)</li>
					</ul>
				</div>
				
				<div class="summary-card">
					<h3>Certificações & Cursos</h3>
					<ul>
						<li>Jornada de Product Manager - Gama Academy</li>
						<li>Product-led Certification - Pendo</li>
						<li>Continuous Product Discovery Certification</li>
						<li>Product Management: Building a Product Roadmap</li>
						<li>OKR: Construindo Metas Ágeis - Alura</li>
						<li>Foundations of User Experience (UX) Design - Coursera</li>
						<li>Design Thinking: Viabilizando Soluções - Alura</li>
						<li>Design Sprint 2.0 - Alura</li>
						<li>Scrum Fundamentals Certified - SCRUMstudy</li>
						<li>Agile Principles and Methodologies</li>
						<li>Introdução à Ciência de Dados - LinkedIn Learning</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.skills {
		background: var(--bg-white);
		position: relative;
	}
	
	.skills::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.01) 0%, transparent 50%),
			radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.02) 0%, transparent 50%);
		pointer-events: none;
	}
	
	.skills-content {
		position: relative;
		z-index: 1;
	}
	
	.category-tabs {
		display: flex;
		justify-content: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-2xl);
		flex-wrap: wrap;
	}
	
	.category-tab {
		padding: var(--spacing-md) var(--spacing-xl);
		border: 2px solid var(--primary-color);
		background: transparent;
		color: var(--primary-color);
		border-radius: var(--border-radius);
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition);
		font-size: var(--font-size-base);
	}
	
	.category-tab:hover {
		background: var(--primary-color);
		color: white;
		transform: var(--transform-hover-lift);
	}
	
	.category-tab.active {
		background: var(--primary-color);
		color: white;
		border-color: transparent;
		box-shadow: var(--shadow);
	}
	
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-2xl);
	}
	
	.skill-card {
		background: var(--bg-light);
		padding: var(--spacing-lg);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		transition: var(--transition);
		border: 1px solid var(--border-light);
	}
	
	.skill-card:hover {
		transform: var(--transform-hover-lift-lg);
		box-shadow: var(--shadow-hover);
		border-color: var(--primary-color);
	}
	
	.skill-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}
	
	.skill-icon {
		font-size: var(--font-size-2xl);
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 50%;
	}
	
	.skill-info {
		flex: 1;
	}
	
	.skill-info h4 {
		margin: 0 0 var(--spacing-xs) 0;
		color: var(--text-primary);
		font-size: var(--font-size-lg);
	}
	
	.skill-description {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		line-height: 1.5;
	}
	

	

	
	.skills-summary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: var(--spacing-xl);
	}
	
	.summary-card {
		background: var(--bg-light);
		padding: var(--spacing-xl);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		border: 1px solid var(--border-light);
	}
	
	.summary-card h3 {
		color: var(--primary-color);
		margin-bottom: var(--spacing-lg);
		font-size: var(--font-size-xl);
	}
	
	.summary-card ul {
		list-style: none;
		padding: 0;
	}
	
	.summary-card li {
		padding: var(--spacing-sm) 0;
		color: var(--text-secondary);
		position: relative;
		padding-left: var(--spacing-lg);
	}
	
	.summary-card li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--primary-color);
		font-weight: bold;
	}
	
	@media (max-width: 768px) {
		.category-tabs {
			gap: var(--spacing-sm);
		}
		
		.category-tab {
			padding: var(--spacing-sm) var(--spacing-lg);
			font-size: var(--font-size-sm);
		}
		
		.skills-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}
		
		.skill-card {
			padding: var(--spacing-md);
		}
		
		.skills-summary {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}
		
		.summary-card {
			padding: var(--spacing-lg);
		}
	}
</style>
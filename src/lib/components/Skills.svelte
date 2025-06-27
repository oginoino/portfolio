<script lang="ts">
	import { onMount } from 'svelte';
	
	let skillsElement: HTMLElement;
	
	interface Skill {
		name: string;
		level: number;
		icon: string;
		category: string;
	}
	
	const skills: Skill[] = [
		// Produtos
		{ name: 'Product Strategy', level: 95, icon: '🎯', category: 'Produtos' },
		{ name: 'Product Roadmap', level: 95, icon: '🗺️', category: 'Produtos' },
		{ name: 'Jira', level: 95, icon: '🎫', category: 'Produtos' },
		{ name: 'OKRs & KPIs', level: 90, icon: '📈', category: 'Produtos' },
		{ name: 'Product Discovery', level: 90, icon: '🔍', category: 'Produtos' },
		{ name: 'Google Analytics', level: 90, icon: '📊', category: 'Produtos' },
		{ name: 'Product-Led Growth', level: 85, icon: '🚀', category: 'Produtos' },
		{ name: 'Market Research', level: 85, icon: '📋', category: 'Produtos' },
		{ name: 'Notion', level: 85, icon: '📝', category: 'Produtos' },
		{ name: 'Business Analysis', level: 85, icon: '💼', category: 'Produtos' },
		{ name: 'Competitive Analysis', level: 80, icon: '🔎', category: 'Produtos' },
		{ name: 'Miro', level: 80, icon: '🧩', category: 'Produtos' },
		{ name: 'Mixpanel', level: 75, icon: '📈', category: 'Produtos' },
		
		// Agile & Liderança
		{ name: 'Scrum', level: 95, icon: '🏃', category: 'Agile & Liderança' },
		{ name: 'Metodologias Ágeis', level: 95, icon: '⚡', category: 'Agile & Liderança' },
		{ name: 'Gestão de Equipes', level: 90, icon: '👥', category: 'Agile & Liderança' },
		{ name: 'Liderança Estratégica', level: 90, icon: '🎖️', category: 'Agile & Liderança' },
		{ name: 'Histórias de Usuário', level: 85, icon: '📝', category: 'Agile & Liderança' },
		{ name: 'Pensamento Estratégico', level: 85, icon: '🧠', category: 'Agile & Liderança' },
		{ name: 'Comunicação Executiva', level: 80, icon: '🎤', category: 'Agile & Liderança' },
		{ name: 'Gestão de Projetos', level: 80, icon: '📋', category: 'Agile & Liderança' },
		
		// Design & Desenvolvimento
		{ name: 'Design Thinking', level: 95, icon: '💡', category: 'Design & Desenvolvimento' },
		{ name: 'UX Foundations', level: 90, icon: '🎯', category: 'Design & Desenvolvimento' },
		{ name: 'Design Sprint', level: 90, icon: '⚡', category: 'Design & Desenvolvimento' },
		{ name: 'Python', level: 85, icon: '🐍', category: 'Design & Desenvolvimento' },
		{ name: 'Figma', level: 85, icon: '🎨', category: 'Design & Desenvolvimento' },
		{ name: 'JavaScript', level: 80, icon: '💻', category: 'Design & Desenvolvimento' },
		{ name: 'Go Language', level: 75, icon: '🔷', category: 'Design & Desenvolvimento' },
		{ name: 'Data Science', level: 75, icon: '🔬', category: 'Design & Desenvolvimento' },
		{ name: 'AWS', level: 70, icon: '☁️', category: 'Design & Desenvolvimento' },
		{ name: 'SQL', level: 70, icon: '🗄️', category: 'Design & Desenvolvimento' }
	];
	
	const categories = ['Produtos', 'Agile & Liderança', 'Design & Desenvolvimento'];
	
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
								<span class="skill-level">{skill.level}%</span>
							</div>
						</div>
						<div class="progress-bar">
							<div 
								class="progress-fill" 
								data-width={skill.level}
								style="width: 0%"
							></div>
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
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}
	
	.category-tab {
		padding: 1rem 2rem;
		border: 2px solid var(--primary-color);
		background: transparent;
		color: var(--primary-color);
		border-radius: var(--border-radius);
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition);
		font-size: 1rem;
	}
	
	.category-tab:hover {
		background: var(--primary-color);
		color: white;
		transform: translateY(-2px);
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
		gap: 1.5rem;
		margin-bottom: 3rem;
	}
	
	.skill-card {
		background: var(--bg-light);
		padding: 1.5rem;
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		transition: var(--transition);
		border: 1px solid var(--border-light);
	}
	
	.skill-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-hover);
		border-color: var(--primary-color);
	}
	
	.skill-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.skill-icon {
		font-size: 2rem;
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
		margin: 0 0 0.25rem 0;
		color: var(--text-primary);
		font-size: 1.1rem;
	}
	
	.skill-level {
		color: var(--primary-color);
		font-weight: 600;
		font-size: 0.9rem;
	}
	
	.progress-bar {
		height: 8px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		overflow: hidden;
	}
	
	.progress-fill {
		height: 100%;
		background: var(--primary-color);
		border-radius: 4px;
		transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}
	
	.progress-fill::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}
	
	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
	
	.skills-summary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
	}
	
	.summary-card {
		background: var(--bg-light);
		padding: 2rem;
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		border: 1px solid var(--border-light);
	}
	
	.summary-card h3 {
		color: var(--primary-color);
		margin-bottom: 1.5rem;
		font-size: 1.3rem;
	}
	
	.summary-card ul {
		list-style: none;
		padding: 0;
	}
	
	.summary-card li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		position: relative;
		padding-left: 1.5rem;
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
			gap: 0.5rem;
		}
		
		.category-tab {
			padding: 0.8rem 1.5rem;
			font-size: 0.9rem;
		}
		
		.skills-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		
		.skill-card {
			padding: 1.25rem;
		}
		
		.skills-summary {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.summary-card {
			padding: 1.5rem;
		}
	}
</style>
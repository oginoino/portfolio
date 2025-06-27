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
		// Frontend
		{ name: 'TypeScript', level: 90, icon: '🔷', category: 'Frontend' },
		{ name: 'React', level: 85, icon: '⚛️', category: 'Frontend' },
		{ name: 'Svelte', level: 80, icon: '🧡', category: 'Frontend' },
		{ name: 'Vue.js', level: 75, icon: '💚', category: 'Frontend' },
		{ name: 'HTML5', level: 95, icon: '🌐', category: 'Frontend' },
		{ name: 'CSS3', level: 90, icon: '🎨', category: 'Frontend' },
		
		// Backend
		{ name: 'Node.js', level: 85, icon: '🟢', category: 'Backend' },
		{ name: 'Express', level: 80, icon: '🚀', category: 'Backend' },
		{ name: 'NestJS', level: 75, icon: '🔴', category: 'Backend' },
		{ name: 'Python', level: 70, icon: '🐍', category: 'Backend' },
		{ name: 'PostgreSQL', level: 80, icon: '🐘', category: 'Backend' },
		{ name: 'MongoDB', level: 75, icon: '🍃', category: 'Backend' },
		
		// DevOps & Tools
		{ name: 'Docker', level: 75, icon: '🐳', category: 'DevOps' },
		{ name: 'Git', level: 90, icon: '📝', category: 'DevOps' },
		{ name: 'AWS', level: 70, icon: '☁️', category: 'DevOps' },
		{ name: 'Linux', level: 75, icon: '🐧', category: 'DevOps' }
	];
	
	const categories = ['Frontend', 'Backend', 'DevOps'];
	
	let activeCategory = 'Frontend';
	
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
			<h2>Habilidades Técnicas</h2>
			<p>Tecnologias e ferramentas que domino para criar soluções completas</p>
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
						<li>Desenvolvimento Full Stack com TypeScript</li>
						<li>Arquitetura de aplicações escaláveis</li>
						<li>APIs RESTful e GraphQL</li>
						<li>Bancos de dados relacionais e NoSQL</li>
						<li>DevOps e Deploy automatizado</li>
						<li>Testes automatizados (Unit, Integration, E2E)</li>
						<li>Metodologias Ágeis (Scrum, Kanban)</li>
					</ul>
				</div>
				
				<div class="summary-card">
					<h3>Certificações & Cursos</h3>
					<ul>
						<li>AWS Certified Developer</li>
						<li>React Advanced Patterns</li>
						<li>Node.js Professional</li>
						<li>TypeScript Deep Dive</li>
						<li>Docker & Kubernetes</li>
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
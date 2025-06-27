<script lang="ts">
	import { onMount } from 'svelte';
	import { Github, ExternalLink, Star, GitFork } from 'lucide-svelte';
	
	let projectsElement: HTMLElement;
	
	interface Project {
		id: number;
		title: string;
		description: string;
		longDescription: string;
		technologies: string[];
		image: string;
		githubUrl?: string;
		liveUrl?: string;
		stars?: number;
		forks?: number;
		category: string;
		featured: boolean;
	}
	
	const projects: Project[] = [
		{
			id: 1,
			title: 'E-Commerce Platform',
			description: 'Plataforma completa de e-commerce com painel administrativo',
			longDescription: 'Sistema completo de e-commerce desenvolvido com React e Node.js, incluindo carrinho de compras, sistema de pagamentos, painel administrativo e dashboard de vendas.',
			technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
			image: '🛒',
			githubUrl: 'https://github.com/ginaldolaranjeiras/ecommerce-platform',
			liveUrl: 'https://ecommerce-demo.vercel.app',
			stars: 124,
			forks: 32,
			category: 'Full Stack',
			featured: true
		},
		{
			id: 2,
			title: 'Task Management App',
			description: 'Aplicativo de gerenciamento de tarefas com colaboração em tempo real',
			longDescription: 'Aplicação de produtividade inspirada no Trello, com funcionalidades de arrastar e soltar, colaboração em tempo real via WebSocket e notificações push.',
			technologies: ['Vue.js', 'Express', 'Socket.io', 'MongoDB', 'Redis'],
			image: '📋',
			githubUrl: 'https://github.com/ginaldolaranjeiras/task-manager',
			liveUrl: 'https://taskmanager-demo.netlify.app',
			stars: 89,
			forks: 21,
			category: 'Full Stack',
			featured: true
		},
		{
			id: 3,
			title: 'Weather Dashboard',
			description: 'Dashboard meteorológico com previsões e mapas interativos',
			longDescription: 'Dashboard responsivo que exibe informações meteorológicas detalhadas, previsões de 7 dias, mapas interativos e alertas climáticos usando APIs externas.',
			technologies: ['Svelte', 'TypeScript', 'Chart.js', 'Leaflet', 'OpenWeather API'],
			image: '🌤️',
			githubUrl: 'https://github.com/ginaldolaranjeiras/weather-dashboard',
			liveUrl: 'https://weather-dashboard-demo.vercel.app',
			stars: 67,
			forks: 15,
			category: 'Frontend',
			featured: false
		},
		{
			id: 4,
			title: 'API Gateway',
			description: 'Gateway de APIs com autenticação e rate limiting',
			longDescription: 'Microserviço que atua como gateway para múltiplas APIs, implementando autenticação JWT, rate limiting, cache Redis e monitoramento de performance.',
			technologies: ['Node.js', 'Express', 'Redis', 'JWT', 'Docker', 'Nginx'],
			image: '🔗',
			githubUrl: 'https://github.com/ginaldolaranjeiras/api-gateway',
			stars: 156,
			forks: 43,
			category: 'Backend',
			featured: true
		},
		{
			id: 5,
			title: 'Mobile Banking App',
			description: 'Aplicativo mobile de banco digital com React Native',
			longDescription: 'Aplicativo mobile completo para banco digital, incluindo transferências, pagamentos, investimentos e cartão virtual, com biometria e notificações push.',
			technologies: ['React Native', 'TypeScript', 'Firebase', 'Stripe', 'Biometrics'],
			image: '💳',
			githubUrl: 'https://github.com/ginaldolaranjeiras/mobile-banking',
			stars: 203,
			forks: 67,
			category: 'Mobile',
			featured: false
		},
		{
			id: 6,
			title: 'DevOps Pipeline',
			description: 'Pipeline CI/CD automatizado com Docker e Kubernetes',
			longDescription: 'Pipeline completo de CI/CD usando GitHub Actions, Docker, Kubernetes e monitoramento com Prometheus e Grafana para deploy automatizado.',
			technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana'],
			image: '🚀',
			githubUrl: 'https://github.com/ginaldolaranjeiras/devops-pipeline',
			stars: 91,
			forks: 28,
			category: 'DevOps',
			featured: false
		}
	];
	
	const categories = ['Todos', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'DevOps'];
	
	let activeCategory = 'Todos';
	let showFeaturedOnly = false;
	
	$: filteredProjects = projects.filter(project => {
		const categoryMatch = activeCategory === 'Todos' || project.category === activeCategory;
		const featuredMatch = !showFeaturedOnly || project.featured;
		return categoryMatch && featuredMatch;
	});
	
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
		
		if (projectsElement) {
			observer.observe(projectsElement);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="projects" class="section projects" bind:this={projectsElement}>
	<div class="container">
		<div class="section-title">
			<h2>Projetos em Destaque</h2>
			<p>Alguns dos projetos que desenvolvi utilizando tecnologias modernas</p>
		</div>
		
		<div class="projects-content">
			<div class="filters">
				<div class="category-filters">
					{#each categories as category}
						<button 
							class="filter-btn" 
							class:active={activeCategory === category}
							on:click={() => activeCategory = category}
						>
							{category}
						</button>
					{/each}
				</div>
				
				<div class="toggle-filter">
					<label class="toggle-label">
						<input 
							type="checkbox" 
							bind:checked={showFeaturedOnly}
							class="toggle-input"
						/>
						<span class="toggle-slider"></span>
						Apenas Destaques
					</label>
				</div>
			</div>
			
			<div class="projects-grid">
				{#each filteredProjects as project (project.id)}
					<div class="project-card" class:featured={project.featured}>
						{#if project.featured}
							<div class="featured-badge">
								<Star size={16} />
								Destaque
							</div>
						{/if}
						
						<div class="project-image">
							<div class="image-placeholder">
								<span class="project-icon">{project.image}</span>
							</div>
							<div class="project-overlay">
								<div class="project-links">
									{#if project.githubUrl}
										<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="project-link">
											<Github size={20} />
										</a>
									{/if}
									{#if project.liveUrl}
										<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="project-link">
											<ExternalLink size={20} />
										</a>
									{/if}
								</div>
							</div>
						</div>
						
						<div class="project-content">
							<div class="project-header">
								<h3>{project.title}</h3>
								<span class="project-category">{project.category}</span>
							</div>
							
							<p class="project-description">{project.description}</p>
							<p class="project-long-description">{project.longDescription}</p>
							
							<div class="project-technologies">
								{#each project.technologies as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>
							
							{#if project.stars !== undefined || project.forks !== undefined}
								<div class="project-stats">
									{#if project.stars !== undefined}
										<span class="stat">
											<Star size={16} />
											{project.stars}
										</span>
									{/if}
									{#if project.forks !== undefined}
										<span class="stat">
											<GitFork size={16} />
											{project.forks}
										</span>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			
			{#if filteredProjects.length === 0}
				<div class="no-projects">
					<p>Nenhum projeto encontrado para os filtros selecionados.</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.projects {
		background: var(--bg-white);
		position: relative;
	}
	
	.projects::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 80% 30%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
			radial-gradient(circle at 20% 70%, rgba(118, 75, 162, 0.03) 0%, transparent 50%);
		pointer-events: none;
	}
	
	.projects-content {
		position: relative;
		z-index: 1;
	}
	
	.filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 3rem;
		gap: 2rem;
		flex-wrap: wrap;
	}
	
	.category-filters {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	
	.filter-btn {
		padding: 0.75rem 1.5rem;
		border: 2px solid var(--primary-color);
		background: transparent;
		color: var(--primary-color);
		border-radius: var(--border-radius);
		font-weight: 500;
		cursor: pointer;
		transition: var(--transition);
		font-size: 0.9rem;
	}
	
	.filter-btn:hover {
		background: var(--primary-color);
		color: white;
		transform: translateY(-2px);
	}
	
	.filter-btn.active {
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		color: white;
		border-color: transparent;
		box-shadow: var(--shadow);
	}
	
	.toggle-filter {
		display: flex;
		align-items: center;
	}
	
	.toggle-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		font-weight: 500;
		color: var(--text-primary);
	}
	
	.toggle-input {
		display: none;
	}
	
	.toggle-slider {
		position: relative;
		width: 50px;
		height: 24px;
		background: #ccc;
		border-radius: 24px;
		transition: var(--transition);
	}
	
	.toggle-slider::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 50%;
		transition: var(--transition);
	}
	
	.toggle-input:checked + .toggle-slider {
		background: var(--primary-color);
	}
	
	.toggle-input:checked + .toggle-slider::before {
		transform: translateX(26px);
	}
	
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
	}
	
	.project-card {
		background: var(--bg-light);
		border-radius: var(--border-radius);
		overflow: hidden;
		box-shadow: var(--shadow);
		transition: var(--transition);
		border: 1px solid rgba(102, 126, 234, 0.1);
		position: relative;
	}
	
	.project-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-hover);
		border-color: var(--primary-color);
	}
	
	.project-card.featured {
		border: 2px solid var(--accent-color);
	}
	
	.featured-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--accent-color);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		z-index: 2;
	}
	
	.project-image {
		position: relative;
		height: 200px;
		overflow: hidden;
	}
	
	.image-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.project-icon {
		font-size: 4rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
	}
	
	.project-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: var(--transition);
	}
	
	.project-card:hover .project-overlay {
		opacity: 1;
	}
	
	.project-links {
		display: flex;
		gap: 1rem;
	}
	
	.project-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		color: white;
		transition: var(--transition);
		backdrop-filter: blur(10px);
	}
	
	.project-link:hover {
		background: var(--primary-color);
		border-color: var(--primary-color);
		transform: scale(1.1);
	}
	
	.project-content {
		padding: 2rem;
	}
	
	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
		gap: 1rem;
	}
	
	.project-header h3 {
		color: var(--primary-color);
		margin: 0;
		font-size: 1.3rem;
		flex: 1;
	}
	
	.project-category {
		background: rgba(102, 126, 234, 0.1);
		color: var(--primary-color);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
		white-space: nowrap;
	}
	
	.project-description {
		color: var(--text-primary);
		font-weight: 600;
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}
	
	.project-long-description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
	}
	
	.project-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}
	
	.tech-tag {
		background: rgba(102, 126, 234, 0.1);
		color: var(--primary-color);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
		border: 1px solid rgba(102, 126, 234, 0.2);
	}
	
	.project-stats {
		display: flex;
		gap: 1rem;
	}
	
	.stat {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--text-light);
		font-size: 0.9rem;
	}
	
	.no-projects {
		text-align: center;
		padding: 3rem;
		color: var(--text-secondary);
		font-size: 1.1rem;
	}
	
	@media (max-width: 768px) {
		.filters {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}
		
		.category-filters {
			justify-content: center;
		}
		
		.filter-btn {
			padding: 0.6rem 1.2rem;
			font-size: 0.85rem;
		}
		
		.toggle-filter {
			justify-content: center;
		}
		
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.project-content {
			padding: 1.5rem;
		}
		
		.project-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
		
		.project-category {
			align-self: flex-start;
		}
	}
</style>
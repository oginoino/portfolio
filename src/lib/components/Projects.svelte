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
			id: 4,
			title: 'Melhoria da Experiência do Usuário (UX/UI)',
			description: 'Redesign completo da interface com foco na experiência user-centric',
			longDescription: 'Nova área do cliente em formato de feed com componentes hero, cross-selling personalizado, carrossel de produtos e feedbacks visuais de progresso para melhorar conversão.',
			technologies: ['React', 'TypeScript', 'Design System', 'A/B Testing', 'Analytics', 'UX/UI'],
			image: '🎨',
			liveUrl: 'https://docs.google.com/presentation/d/1HvkKkU-SvRRWZnQB9QnA7cmlme_JLPOu/edit?usp=sharing&ouid=117989704451329949275&rtpof=true&sd=true',
			stars: 189,
			forks: 45,
			category: 'Frontend',
			featured: true
		},
		{
			id: 1,
			title: 'Otimização de SEO e Conteúdo Orgânico',
			description: 'Modernização tecnológica para melhorar ranking nos mecanismos de pesquisa',
			longDescription: 'Migração de WordPress puro para stack moderna com WordPress, GraphQL e NextJS. Implementação de AMP, WebStories e otimização para Core Web Vitals com interface mobile-first.',
			technologies: ['WordPress', 'GraphQL', 'NextJS', 'AMP', 'WebStories', 'Core Web Vitals'],
			image: '🔍',
			liveUrl: 'https://finanzero.com.br',
			stars: 156,
			forks: 43,
			category: 'Frontend',
			featured: true
		},
		{
			id: 2,
			title: 'Plataforma de E-mail Marketing',
			description: 'Modernização da infraestrutura de e-mail marketing com alta disponibilidade',
			longDescription: 'Implementação de redundâncias na infraestrutura AWS, otimização de filas SQS e melhorias no processo de build de campanhas para garantir entrega pontual e reduzir falhas.',
			technologies: ['AWS', 'SQS', 'Redis', 'Node.js', 'Email Marketing', 'Infrastructure'],
			image: '📧',
			liveUrl: 'https://finanzero.com.br',
			stars: 124,
			forks: 32,
			category: 'Backend',
			featured: true
		},
		{
			id: 3,
			title: 'Diversificação do Portfólio de Produtos',
			description: 'Sistema escalável para criação e gestão de múltiplos produtos financeiros',
			longDescription: 'Desenvolvimento de arquitetura abstrata para criação automatizada de novos produtos financeiros, incluindo empréstimos FGTS, consignado, MEI e home loan.',
			technologies: ['Microservices', 'API Gateway', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
			image: '💰',
			githubUrl: 'https://finanzero.com.br/',
			stars: 203,
			forks: 67,
			category: 'Full Stack',
			featured: true
		},
		
		{
			id: 5,
			title: 'BFF (Backend for Frontend)',
			description: 'Implementação de camada BFF para personalização e otimização de performance',
			longDescription: 'Sistema Dory para abstração de regras de negócio, feature flags para testes A/B, release control e personalização da experiência baseada em dados da proposta de crédito.',
			technologies: ['Node.js', 'GraphQL', 'Feature Flags', 'A/B Testing', 'Microservices', 'API Design'],
			image: '⚡',
			githubUrl: 'https://github.com/ginaldolaranjeiras/bff-dory',
			stars: 167,
			forks: 38,
			category: 'Backend',
			featured: false
		}
	];
	
	const categories = ['Todos', 'Full Stack', 'Frontend', 'Backend'];
	
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
			radial-gradient(circle at 80% 30%, rgba(0, 0, 0, 0.01) 0%, transparent 50%),
			radial-gradient(circle at 20% 70%, rgba(0, 0, 0, 0.02) 0%, transparent 50%);
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
		background: var(--primary-color);
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
		border: 1px solid var(--border-light);
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
		background: var(--primary-color);
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
		background: rgba(0, 0, 0, 0.05);
		color: var(--primary-color);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
		white-space: nowrap;
		border: 1px solid var(--border-light);
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
		background: rgba(0, 0, 0, 0.05);
		color: var(--primary-color);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
		border: 1px solid var(--border-light);
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
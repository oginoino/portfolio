<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';
	
	let isMenuOpen = false;
	let isScrolled = false;
	
	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
	
	const closeMenu = () => {
		isMenuOpen = false;
	};
	
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			closeMenu();
		}
	};
	
	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header class="header" class:scrolled={isScrolled}>
	<div class="container">
		<nav class="nav">
			<a href="/" class="logo" on:click={() => scrollToSection('hero')}>
				<img src="/Profile.jpg" alt="Ginaldo" class="logo-avatar" />
				<span class="logo-text">Gino</span>
			</a>
			
			<ul class="nav-links" class:open={isMenuOpen}>
				<li><button on:click={() => scrollToSection('about')}>Sobre</button></li>
				<li><button on:click={() => scrollToSection('skills')}>Habilidades</button></li>
				<li><button on:click={() => scrollToSection('experience')}>Experiência</button></li>
				<li><button on:click={() => scrollToSection('projects')}>Projetos</button></li>
				<li><button on:click={() => scrollToSection('storytelling')}>História</button></li>
				<li><button on:click={() => scrollToSection('testimonials')}>Depoimentos</button></li>
				<li><button on:click={() => scrollToSection('contact')}>Contato</button></li>
			</ul>
			
			<button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</nav>
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: rgba(248, 248, 248, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border-light);
		transition: var(--transition);
	}
	
	.header.scrolled {
		background: rgba(248, 248, 248, 0.98);
		box-shadow: var(--shadow);
		border-bottom: 1px solid var(--border-medium);
	}
	
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md) 0;
	}
	
	.logo {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--primary-color);
		text-decoration: none;
		transition: var(--transition);
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.logo-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--primary-color);
		transition: var(--transition);
	}
	
	.logo:hover {
		color: var(--secondary-color);
		transform: scale(1.05);
	}

	.logo:hover .logo-avatar {
		border-color: var(--secondary-color);
		transform: scale(1.1);
	}
	
	.logo-text {
		color: var(--primary-color);
		font-weight: 900;
		letter-spacing: -0.02em;
	}
	
	.nav-links {
		display: flex;
		list-style: none;
		gap: var(--spacing-xl);
		align-items: center;
	}
	
	.nav-links button {
		background: none;
		border: none;
		color: var(--text-primary);
		font-weight: 500;
		cursor: pointer;
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--border-radius);
		transition: var(--transition);
		font-size: var(--font-size-base);
	}
	
	.nav-links button:hover {
		color: var(--primary-color);
		background: var(--bg-gray);
		transform: var(--transform-hover-lift);
	}
	
	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: var(--text-primary);
		cursor: pointer;
		padding: var(--spacing-sm);
		border-radius: var(--border-radius);
		transition: var(--transition);
	}
	
	.menu-toggle:hover {
		color: var(--primary-color);
		background: var(--bg-gray);
	}
	
	@media (max-width: 768px) {
		.logo-avatar {
			width: 35px;
			height: 35px;
		}

		.logo {
			gap: var(--spacing-sm);
		}

		.menu-toggle {
			display: block;
		}
		
		.nav-links {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--bg-white);
			backdrop-filter: blur(10px);
			flex-direction: column;
			padding: var(--spacing-xl);
			box-shadow: var(--shadow);
			border-top: 1px solid var(--border-light);
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			transition: var(--transition);
			gap: var(--spacing-md);
		}
		
		.nav-links.open {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
		}
		
		.nav-links button {
			width: 100%;
			text-align: center;
			padding: var(--spacing-md);
			font-size: var(--font-size-lg);
		}
	}
</style>
<script lang="ts">
	import { onMount } from 'svelte';

	let isMenuOpen = false;
	let isScrolled = false;

	const navItems = [
		{ href: '#home', label: 'Início' },
		{ href: '#about', label: 'Sobre' },
		{ href: '#skills', label: 'Habilidades' },
		{ href: '#experience', label: 'Experiência' },
		{ href: '#projects', label: 'Projetos' },
		{ href: '#contact', label: 'Contato' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleScroll() {
		isScrolled = window.scrollY > 50;
	}

	function smoothScroll(event: Event, href: string) {
		event.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
		closeMenu();
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav class="navbar" class:scrolled={isScrolled}>
	<div class="nav-container">
		<div class="nav-brand">
			<a href="#home" on:click={(e) => smoothScroll(e, '#home')}>
				<span class="brand-text">Ginaldo</span>
				<span class="brand-accent">Laranjeiras</span>
			</a>
		</div>

		<div class="nav-menu" class:active={isMenuOpen}>
			{#each navItems as item}
				<a 
					href={item.href} 
					class="nav-link" 
					on:click={(e) => smoothScroll(e, item.href)}
				>
					{item.label}
				</a>
			{/each}
		</div>

		<button 
			class="nav-toggle" 
			class:active={isMenuOpen}
			on:click={toggleMenu}
			aria-label="Toggle menu"
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>

<!-- Overlay para fechar menu mobile -->
{#if isMenuOpen}
	<div 
		class="nav-overlay" 
		role="button" 
		tabindex="0"
		on:click={closeMenu} 
		on:keydown={closeMenu}
	></div>
{/if}

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: 1rem 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(226, 232, 240, 0.5);
		transition: all 0.3s ease;
	}

	.navbar.scrolled {
		padding: 0.5rem 0;
		background: rgba(255, 255, 255, 0.98);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-brand a {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 700;
		transition: transform 0.3s ease;
	}

	.nav-brand a:hover {
		transform: scale(1.05);
	}

	.brand-text {
		color: #1e293b;
	}

	.brand-accent {
		color: #667eea;
	}

	.nav-menu {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-link {
		position: relative;
		text-decoration: none;
		color: #475569;
		font-weight: 500;
		font-size: 0.95rem;
		transition: all 0.3s ease;
		padding: 0.5rem 0;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(45deg, #667eea, #764ba2);
		transition: width 0.3s ease;
	}

	.nav-link:hover {
		color: #667eea;
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-toggle {
		display: none;
		flex-direction: column;
		justify-content: space-around;
		width: 24px;
		height: 24px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 1001;
	}

	.nav-toggle span {
		width: 100%;
		height: 2px;
		background: #1e293b;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.nav-toggle.active span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.nav-toggle.active span:nth-child(2) {
		opacity: 0;
	}

	.nav-toggle.active span:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -6px);
	}

	.nav-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: none;
	}

	@media (max-width: 768px) {
		.nav-toggle {
			display: flex;
		}

		.nav-menu {
			position: fixed;
			top: 0;
			right: -100%;
			width: 280px;
			height: 100vh;
			background: white;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			padding: 5rem 2rem 2rem;
			gap: 1.5rem;
			transition: right 0.3s ease;
			box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
			z-index: 1000;
		}

		.nav-menu.active {
			right: 0;
		}

		.nav-link {
			font-size: 1.1rem;
			padding: 0.75rem 0;
			width: 100%;
			border-bottom: 1px solid #f1f5f9;
		}

		.nav-link::after {
			bottom: 0;
			height: 1px;
		}

		.nav-overlay {
			display: block;
		}

		.nav-container {
			padding: 0 1rem;
		}
	}

	@media (max-width: 480px) {
		.nav-brand a {
			font-size: 1.3rem;
		}

		.nav-menu {
			width: 100vw;
			padding: 5rem 1.5rem 2rem;
		}
	}
</style>
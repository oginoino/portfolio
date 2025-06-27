<script lang="ts">
	import { Github, Linkedin, Mail, Heart } from 'lucide-svelte';
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-section">
				<h3>Ginaldo Laranjeiras Junior</h3>
				<p>Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.</p>
			</div>
			
			<div class="footer-section">
				<h4>Links Rápidos</h4>
				<ul>
					<li><a href="#about">Sobre</a></li>
					<li><a href="#skills">Habilidades</a></li>
					<li><a href="#experience">Experiência</a></li>
					<li><a href="#projects">Projetos</a></li>
					<li><a href="#storytelling">História</a></li>
					<li><a href="#testimonials">Depoimentos</a></li>
				</ul>
			</div>
			
			<div class="footer-section">
				<h4>Contato</h4>
				<div class="social-links">
					<a href="https://github.com/ginaldolaranjeiras" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						<Github size={20} />
					</a>
					<a href="https://www.linkedin.com/in/ginaldolaranjeiras" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
						<Linkedin size={20} />
					</a>
					<a href="mailto:ginaldo@example.com" aria-label="Email">
						<Mail size={20} />
					</a>
				</div>
			</div>
		</div>
		
		<div class="footer-bottom">
			<p>
				© {new Date().getFullYear()} Ginaldo Laranjeiras Junior. Feito com 
				<Heart size={16} class="heart" /> e muito café.
			</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
		color: white;
		padding: 3rem 0 1rem;
		margin-top: auto;
	}
	
	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}
	
	.footer-section h3 {
		color: #f8f8f8;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}
	
	.footer-section h4 {
		color: #ecf0f1;
		margin-bottom: 1rem;
		font-size: 1.2rem;
	}
	
	.footer-section p {
		color: #bdc3c7;
		line-height: 1.6;
	}
	
	.footer-section ul {
		list-style: none;
	}
	
	.footer-section ul li {
		margin-bottom: 0.5rem;
	}
	
	.footer-section ul li a {
		color: #bdc3c7;
		transition: var(--transition);
		text-decoration: none;
	}
	
	.footer-section ul li a:hover {
		color: var(--accent-color);
		transform: translateX(5px);
	}
	
	.social-links {
		display: flex;
		gap: 1rem;
	}
	
	.social-links a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		color: #bdc3c7;
		transition: var(--transition);
		text-decoration: none;
	}
	
	.social-links a:hover {
		background: var(--accent-color);
		color: white;
		transform: translateY(-3px);
	}
	
	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 1rem;
		text-align: center;
	}
	
	.footer-bottom p {
		color: #95a5a6;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	
	:global(.heart) {
		color: #e74c3c;
		animation: heartbeat 1.5s ease-in-out infinite;
	}
	
	@keyframes heartbeat {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
	
	@media (max-width: 768px) {
		.footer {
			padding: 2rem 0 1rem;
		}
		
		.footer-content {
			grid-template-columns: 1fr;
			text-align: center;
			gap: 1.5rem;
		}
		
		.social-links {
			justify-content: center;
		}
		
		.footer-bottom p {
			font-size: 0.9rem;
		}
	}
</style>
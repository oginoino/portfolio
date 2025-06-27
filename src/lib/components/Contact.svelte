<script lang="ts">
	import { onMount } from 'svelte';
	import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle } from 'lucide-svelte';
	
	let contactElement: HTMLElement;
	let form: HTMLFormElement;
	let isSubmitting = false;
	let submitMessage = '';
	let submitType: 'success' | 'error' | '' = '';
	
	interface FormData {
		name: string;
		email: string;
		subject: string;
		message: string;
	}
	
	let formData: FormData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	
	const contactInfo = [
		{
			icon: Mail,
			label: 'Email',
			value: 'ginaldo.laranjeiras@email.com',
			link: 'mailto:ginaldo.laranjeiras@email.com'
		},
		{
			icon: Phone,
			label: 'Telefone',
			value: '+55 (11) 99999-9999',
			link: 'tel:+5511999999999'
		},
		{
			icon: MapPin,
			label: 'Localização',
			value: 'São Paulo, SP - Brasil',
			link: 'https://maps.google.com/?q=São+Paulo,+SP'
		}
	];
	
	const socialLinks = [
		{
			icon: Github,
			label: 'GitHub',
			url: 'https://github.com/ginaldolaranjeiras',
			color: '#333'
		},
		{
			icon: Linkedin,
			label: 'LinkedIn',
			url: 'https://linkedin.com/in/ginaldolaranjeiras',
			color: '#0077b5'
		},
		{
			icon: MessageCircle,
			label: 'WhatsApp',
			url: 'https://wa.me/5511999999999',
			color: '#25d366'
		}
	];
	
	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (isSubmitting) return;
		
		// Validação básica
		if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
			submitMessage = 'Por favor, preencha todos os campos obrigatórios.';
			submitType = 'error';
			return;
		}
		
		// Validação de email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			submitMessage = 'Por favor, insira um email válido.';
			submitType = 'error';
			return;
		}
		
		isSubmitting = true;
		submitMessage = '';
		
		try {
			// Simular envio do formulário
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Em um projeto real, aqui você faria a requisição para sua API
			// const response = await fetch('/api/contact', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(formData)
			// });
			
			submitMessage = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
			submitType = 'success';
			
			// Limpar formulário
			formData = {
				name: '',
				email: '',
				subject: '',
				message: ''
			};
			
		} catch (error) {
			submitMessage = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
			submitType = 'error';
		} finally {
			isSubmitting = false;
			
			// Limpar mensagem após 5 segundos
			setTimeout(() => {
				submitMessage = '';
				submitType = '';
			}, 5000);
		}
	}
	
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
		
		if (contactElement) {
			observer.observe(contactElement);
		}
		
		return () => observer.disconnect();
	});
</script>

<section id="contact" class="section contact" bind:this={contactElement}>
	<div class="container">
		<div class="section-title">
			<h2>Vamos Conversar?</h2>
			<p>Estou sempre aberto a novas oportunidades e projetos interessantes</p>
		</div>
		
		<div class="contact-content">
			<div class="contact-info">
				<div class="info-header">
					<h3>Entre em Contato</h3>
					<p>Ficarei feliz em discutir como posso contribuir para o seu próximo projeto.</p>
				</div>
				
				<div class="info-items">
					{#each contactInfo as info}
						<a href={info.link} class="info-item" target="_blank" rel="noopener noreferrer">
							<div class="info-icon">
								<svelte:component this={info.icon} size={24} />
							</div>
							<div class="info-content">
								<span class="info-label">{info.label}</span>
								<span class="info-value">{info.value}</span>
							</div>
						</a>
					{/each}
				</div>
				
				<div class="social-links">
					<h4>Redes Sociais</h4>
					<div class="social-grid">
						{#each socialLinks as social}
							<a 
								href={social.url} 
								class="social-link" 
								target="_blank" 
								rel="noopener noreferrer"
								style="--social-color: {social.color}"
							>
								<svelte:component this={social.icon} size={20} />
								<span>{social.label}</span>
							</a>
						{/each}
					</div>
				</div>
			</div>
			
			<div class="contact-form">
				<form bind:this={form} on:submit={handleSubmit}>
					<div class="form-header">
						<h3>Envie uma Mensagem</h3>
						<p>Preencha o formulário abaixo e responderei o mais breve possível.</p>
					</div>
					
					<div class="form-row">
						<div class="form-group">
							<label for="name">Nome *</label>
							<input 
								type="text" 
								id="name" 
								bind:value={formData.name}
								placeholder="Seu nome completo"
								required
							/>
						</div>
						
						<div class="form-group">
							<label for="email">Email *</label>
							<input 
								type="email" 
								id="email" 
								bind:value={formData.email}
								placeholder="seu.email@exemplo.com"
								required
							/>
						</div>
					</div>
					
					<div class="form-group">
						<label for="subject">Assunto</label>
						<input 
							type="text" 
							id="subject" 
							bind:value={formData.subject}
							placeholder="Assunto da mensagem"
						/>
					</div>
					
					<div class="form-group">
						<label for="message">Mensagem *</label>
						<textarea 
							id="message" 
							bind:value={formData.message}
							placeholder="Conte-me sobre seu projeto ou como posso ajudá-lo..."
							rows="6"
							required
						></textarea>
					</div>
					
					{#if submitMessage}
						<div class="submit-message" class:success={submitType === 'success'} class:error={submitType === 'error'}>
							{submitMessage}
						</div>
					{/if}
					
					<button type="submit" class="submit-btn" disabled={isSubmitting}>
						{#if isSubmitting}
							<div class="loading-spinner"></div>
							Enviando...
						{:else}
							<Send size={20} />
							Enviar Mensagem
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.contact {
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		color: white;
		position: relative;
		overflow: hidden;
	}
	
	.contact::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
		pointer-events: none;
	}
	
	.contact-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		position: relative;
		z-index: 1;
	}
	
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.info-header h3 {
		color: white;
		margin-bottom: 1rem;
		font-size: 1.8rem;
	}
	
	.info-header p {
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.6;
		font-size: 1.1rem;
	}
	
	.info-items {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	
	.info-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: var(--border-radius);
		transition: var(--transition);
		text-decoration: none;
		color: inherit;
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
	}
	
	.info-item:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
		border-color: rgba(255, 255, 255, 0.4);
	}
	
	.info-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		color: white;
		flex-shrink: 0;
	}
	
	.info-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	
	.info-label {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
	}
	
	.info-value {
		font-size: 1.1rem;
		color: white;
		font-weight: 600;
	}
	
	.social-links h4 {
		color: white;
		margin-bottom: 1rem;
		font-size: 1.2rem;
	}
	
	.social-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	
	.social-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: var(--border-radius);
		transition: var(--transition);
		text-decoration: none;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		font-weight: 500;
	}
	
	.social-link:hover {
		background: var(--social-color);
		transform: translateX(5px);
		border-color: var(--social-color);
	}
	
	.contact-form {
		background: rgba(255, 255, 255, 0.1);
		padding: 2.5rem;
		border-radius: var(--border-radius);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.form-header h3 {
		color: white;
		margin-bottom: 0.5rem;
		font-size: 1.8rem;
	}
	
	.form-header p {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 2rem;
		line-height: 1.6;
	}
	
	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}
	
	.form-group label {
		color: white;
		font-weight: 500;
		font-size: 0.95rem;
	}
	
	.form-group input,
	.form-group textarea {
		padding: 1rem;
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--border-radius);
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 1rem;
		transition: var(--transition);
		backdrop-filter: blur(10px);
	}
	
	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}
	
	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: rgba(255, 255, 255, 0.5);
		background: rgba(255, 255, 255, 0.15);
	}
	
	.form-group textarea {
		resize: vertical;
		min-height: 120px;
		font-family: inherit;
	}
	
	.submit-message {
		padding: 1rem;
		border-radius: var(--border-radius);
		margin-bottom: 1rem;
		font-weight: 500;
		text-align: center;
	}
	
	.submit-message.success {
		background: rgba(34, 197, 94, 0.2);
		color: #86efac;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}
	
	.submit-message.error {
		background: rgba(239, 68, 68, 0.2);
		color: #fca5a5;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}
	
	.submit-btn {
		width: 100%;
		padding: 1.25rem 2rem;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--border-radius);
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		backdrop-filter: blur(10px);
	}
	
	.submit-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
	}
	
	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
	
	.loading-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	@media (max-width: 768px) {
		.contact-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.contact-form {
			padding: 2rem;
		}
		
		.form-row {
			grid-template-columns: 1fr;
			gap: 0;
		}
		
		.info-header h3,
		.form-header h3 {
			font-size: 1.5rem;
		}
		
		.social-grid {
			display: grid;
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}
</style>
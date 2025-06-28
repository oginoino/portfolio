import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	// Carrega variáveis de ambiente baseado no modo (development, production, etc.)
	const env = loadEnv(mode, process.cwd(), '');
	
	return {
		plugins: [sveltekit()],
		define: {
			// Expõe variáveis de ambiente que começam com VITE_ para o cliente
			__APP_ENV__: JSON.stringify(env.APP_ENV),
		},
		envPrefix: 'VITE_', // Apenas variáveis com este prefixo são expostas no cliente
	};
});
<script>
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import StoryTelling from '$lib/components/StoryTelling.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Ginaldo Laranjeiras Junior - Desenvolvedor Full Stack</title>
	<meta name="description" content="Portfólio de Ginaldo Laranjeiras Junior - Desenvolvedor Full Stack especializado em TypeScript, React, Node.js e tecnologias modernas." />
</svelte:head>

<Hero />
<About />
<Skills />
<Experience />
<Projects />
<Testimonials />
<StoryTelling />
<Contact />
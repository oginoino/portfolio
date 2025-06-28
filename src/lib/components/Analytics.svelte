<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { analytics } from '$lib/firebase';
  import { logEvent } from 'firebase/analytics';

  // Function to track page views
  export function trackPageView(page_title: string, page_location: string): void {
    if (browser && analytics) {
      logEvent(analytics, 'page_view', {
        page_title,
        page_location
      });
    }
  }

  // Function to track custom events
  export function trackEvent(event_name: string, parameters: Record<string, any> = {}): void {
    if (browser && analytics) {
      logEvent(analytics, event_name, parameters);
    }
  }

  // Function to track button clicks
  export function trackButtonClick(button_name: string, section: string = ''): void {
    if (browser && analytics) {
      logEvent(analytics, 'button_click', {
        button_name,
        section
      });
    }
  }

  // Function to track form submissions
  export function trackFormSubmission(form_name: string, success: boolean = true): void {
    if (browser && analytics) {
      logEvent(analytics, 'form_submit', {
        form_name,
        success
      });
    }
  }

  // Function to track downloads
  export function trackDownload(file_name: string, file_type: string = ''): void {
    if (browser && analytics) {
      logEvent(analytics, 'file_download', {
        file_name,
        file_type
      });
    }
  }

  onMount(() => {
    // Track initial page view
    if (browser && analytics) {
      trackPageView(document.title, window.location.href);
    }
  });
</script>

<!-- This component doesn't render anything visible -->
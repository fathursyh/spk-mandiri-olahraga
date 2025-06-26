<script setup lang="ts">
    import { provide, ref } from 'vue';
    import KalkulasiTabs from '../partials/KalkulasiTabs.vue';

    const mode = ref(new URLSearchParams(window.location.search).get('mode'));
    
    const changeMode = () => {
        mode.value = new URLSearchParams(window.location.search).get('mode');
    }
    provide('mode', mode);
</script>

<template>
    <main class="min-h-screen w-full pt-14">
        <h1 class="text-4xl font-bold text-gray-800 text-center mt-12 mb-8" data-aos="fade-down">Kalkulasi SPK <span class="text-green-600">Fuzzy dan AHP-SAW</span></h1>
        <section class="w-full min-h-96" aria-label="Header dan form">
            <KalkulasiTabs @on-change-tab="changeMode" />
            {{ mode === 'pakar' ? 'pakar' : 'kustom' }}
        </section>
    </main>
</template>

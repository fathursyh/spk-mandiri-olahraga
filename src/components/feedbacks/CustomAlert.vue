<template>
<div class="z-50 fixed w-full top-0">
        <div v-if="type === 'error'" class="p-4 py-6 text-sm text-center text-red-800 bg-red-300" role="alert">
        <span class="font-medium">Error!</span> {{ text }}
    </div>
    <div v-if="type === 'success'" class="p-4 py-6 text-sm text-center text-green-800 bg-green-300" role="alert">
        <span class="font-medium">Sukses!</span> {{ text }}
    </div>
    <div v-else class="p-4 py-6 text-sm text-center text-yellow-800 bg-yellow-300" role="alert">
        <span class="font-medium">Perhatian!</span> {{ text }}
    </div>
</div>
</template>

<script setup lang="ts">
    import type { AlertEnum } from '../../enums/AlertEnum';

    defineProps<{
        type: AlertEnum,
        text: string
    }>();
</script>

<template>
    <div class="mt-6 overflow-x-auto max-w-screen-2xl mx-auto overflow-y-hidden">
        <p class="text-xs">* K7 merupakan hasil dari <span class="font-medium text-green-600">Fuzzy Tsukamoto</span></p>
            <table class="w-full min-w-max text-left border-collapse">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">No.</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Nama Atlet</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">K1 (Kekuatan)</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">K2 (Stabilitas)</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">K3 (Kelincahan)</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">K4 (Kecepatan)</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">K5 (Offense)</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">K6 (Defense)</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">K7 (Kesiapan)</th>
                    </tr>
                </thead>
                <TransitionGroup tag="tbody" name="fade-up">
                    <tr v-for="(item, index) in atletCount" :key="item">
                        <td class="px-4 py-3 text-sm text-gray-700">{{ index + 1 }}</td>
                        <td class="px-4 py-3 text-sm text-gray-700">
                            <input type="text" v-model="atlet[item - 1].nama" :id="`nama-${item}`" maxlength="50" class="w-full p-2 bg-gray-50 border-gray-300 rounded-md text-gray-500" minlength="1" />
                        </td>
                        <td v-for="(countData) in atlet[item - 1].data.length" :key="countData" class="px-4 py-3">
                            <input v-model.lazy="atlet[item - 1].data[countData - 1]" :id="`inputData-${item}${countData}`" type="number" :disabled="countData === 7" inputmode="numeric" class="w-20 p-2 bg-gray-50 border-gray-300 rounded-md text-gray-500 disabled:bg-gray-300" min="1" max="10" maxlength="2" @change="checkNumber(atlet[item - 1].data[countData - 1], item - 1, countData - 1)" />
                        </td>
                    </tr>
                </TransitionGroup>
            </table>
            <p v-if="atletCount === 0" class="text-red-600 text-center mt-2">Data atlet kosong.</p>
        </div>
</template>

<script setup lang="ts">
    import { computed, watch } from 'vue';
    import type { AtletType } from '../../types/atlet';
    import { calculateK7 } from '../../scripts/fuzzy';

    const props = defineProps<{
        atlet: AtletType[],
    }>();
    const atletCount = computed(() => {
        return props.atlet.length;
    });
    watch(atletCount, () => {
        const timer = setTimeout(() => {
            const nama : any = document.querySelectorAll('input[type="text"]')[atletCount.value - 1];
            nama?.focus();
            clearTimeout(timer);
        }, 140);
    });

    const checkNumber = (value: number, itemIndex: number, countIndex: number) => {
        if (value > 10) props.atlet[itemIndex].data[countIndex] = 10;
        if (value < 1) props.atlet[itemIndex].data[countIndex] = 1;
        if (countIndex === 0 || countIndex === 2 || countIndex === 4 || countIndex === 5) {
            props.atlet[itemIndex].data[6] = calculateK7(props.atlet[itemIndex].data[0], props.atlet[itemIndex].data[2], props.atlet[itemIndex].data[4], props.atlet[itemIndex].data[5]);
        }
    }
</script>
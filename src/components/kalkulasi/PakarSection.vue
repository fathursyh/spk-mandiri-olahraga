<template>
    <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-md min-h-80">
        <div class="flex flex-col md:flex-row gap-2 justify-between max-w-screen-2xl mx-auto">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">Data Atlet (Mode Pakar)</h2>
                <p class="mt-1 text-sm text-gray-500">Data dengan bobot tetap dimuat berdasarkan penelitian asli.</p>
            </div>
            <div class="flex gap-2">
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800" title="Tambah atlet baru" @click="tambahAtlet">Tambah</button>
                <button type="button" :disabled="atlet.length < 1" class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 disabled:bg-gray-400 disabled:cursor-not-allowed!" title="Hapus semua data atlet" @click="clearAtlet">Clear Data</button>
            </div>
        </div>
        <TableInputPakar :atlet="atlet" />
    <TableHasilPeringkat v-if="atlet.length > 0 && atlet[0].nama !== ''" :hasil="hasilRanking" />
    </div>
</template>

<script setup lang="ts">
    import { computed, inject, ref, watch } from 'vue';
    import { calculateExpertModeRankingsWithArray } from '../../scripts/saw';
    import TableInputPakar from '../tables/TableInputPakar.vue';
    import TableHasilPeringkat from '../tables/TableHasilPeringkat.vue';
    import type { AtletType } from '../../types/atlet';
    import { AlertEnum } from '../../enums/AlertEnum';
    
    const showAlert: Function = inject('showAlert')!;
    const defaultAtlet = {nama: '', data: [1, 1, 1, 1, 1, 1, 1]};
    const atlet = ref< AtletType[] >(JSON.parse(localStorage.getItem('atlet')!) || []);
    
    watch(atlet.value, () => {
        localStorage.setItem('atlet', JSON.stringify(atlet.value));
    });

    const tambahAtlet = () => {
        atlet.value.push({nama: defaultAtlet.nama, data: [...defaultAtlet.data]});
    }
    
    const clearAtlet = () => {
        const windowConfirm = confirm('Clear semua data atlet?');
        if (!windowConfirm) return;
        localStorage.removeItem('atlet');
        atlet.value.length = 0;
        showAlert(AlertEnum.Success, 'Data atlet berhasil dikosongkan.');
    }

    const hasilRanking = computed(() => {
        return calculateExpertModeRankingsWithArray(atlet.value);
    });
</script>
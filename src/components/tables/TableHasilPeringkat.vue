<template>
    <div class="py-6 mt-6">
        <div class="max-w-screen-xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-800">Hasil Peringkat Atlet</h2>
            <p class="mt-1 text-sm text-gray-500">Peringkat diurutkan berdasarkan Skor Akhir tertinggi menggunakan metode SAW.</p>
        </div>

        <div class="mt-6 overflow-x-auto max-w-screen-xl mx-auto">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Peringkat</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Nama Atlet</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 text-right">Skor Akhir</th>
                        <th class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 text-center">Detail Nilai</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(item, i) in hasil" :key="item.nama" class="hover:bg-gray-50 transition-colors duration-200" :class="[i === 0 && 'bg-green-50! hover:bg-green-100!']">
                        <td class="px-4 py-3">
                            <div v-if="i === 0" class="flex flex-col md:flex-row gap-2 items-center space-x-2">
                                <span class="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-indigo-600 rounded-full">1</span>
                                <span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Unggulan</span>
                            </div>
                            <span v-else class="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-indigo-800 bg-indigo-100 rounded-full">{{ i + 1 }}</span>
                        </td>
                        <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ item.nama || "[kosong]" }}</td>
                        <td class="px-4 py-3 text-sm font-semibold text-gray-800 text-right">{{ item.skorAkhir }}</td>
                        <td class="px-4 py-3 text-xs text-gray-500 text-center">
                            K1:{{ item.data[0] }}, K2:{{ item.data[1] }}, K3:{{ item.data[2] }}, K4:{{ item.data[3] }}, K5:{{ item.data[4] }}, K6:{{ item.data[5] }}, K7:{{ item.data[6].toFixed(3) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <AtletComparisonChart :hasil="hasil" />
        <BobotAHPChart :criteria-weights="bobot" />
    </div>
</template>

<script setup lang="ts">
    import { inject } from "vue";
    import AtletComparisonChart from "../kalkulasi/AtletComparisonChart.vue";
    import BobotAHPChart from "../kalkulasi/BobotAHPChart.vue";
    
    const bobot = inject<any>('bobotAHP');
    defineProps<{
        hasil: { nama: string; data: number[]; skorAkhir: number }[];
    }>();
</script>

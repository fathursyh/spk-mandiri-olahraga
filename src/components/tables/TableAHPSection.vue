<template>
    <div class="bg-white p-6 rounded-lg border border-gray-300 shadow-md">
        <div class="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-2 justify-between">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">Tentukan Bobot Kriteria (AHP)</h2>
                <p class="mt-1 text-sm text-gray-500">Isi matriks berikut untuk menentukan seberapa penting satu kriteria dibandingkan yang lain (gunakan skala 1-9).</p>
            </div>
            <button type="button" class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 disabled:bg-gray-400 disabled:cursor-not-allowed!" title="Clear data bobot" @click="clearBobot">Reset Bobot</button>
        </div>

        <div class="mt-6 overflow-x-auto max-w-screen-xl mx-auto">
            <table class="w-full min-w-max text-center border-collapse">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="p-2 border text-xs font-medium text-gray-500">Kriteria</th>
                        <th v-for="criterion in criteria" :key="criterion.key" class="p-2 border text-xs font-medium text-gray-500">{{ criterion.key }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(rowCriterion, rowIndex) in criteria" :key="rowCriterion.key">
                        <td class="p-2 border border-gray-400 font-medium bg-gray-50 text-xs text-left">{{ rowCriterion.key }}: {{ rowCriterion.name }}</td>
                        <td v-for="(colCriterion, colIndex) in criteria" :key="colCriterion.key" class="p-1 border border-gray-400">
                            <input
                                :id="`ahp-${rowIndex}${colIndex}`"
                                type="number"
                                v-model.number="matrix[rowIndex][colIndex]"
                                @change="updateReciprocal(rowIndex, colIndex, $event)"
                                :disabled="rowIndex === colIndex"
                                :class="[
                                    'w-20 text-center border rounded-md p-2 placeholder-shown:bg-red-100',
                                    rowIndex === colIndex ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                                ]"
                                min="1" max="9"
                                placeholder="1-9"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-screen-xl mx-auto">
             <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 w-full md:w-fit" title="Hitung dan terapkan bobot" @click="triggerCalculation">Hitung Bobot</button>
             <span v-if="result">Consistency Ratio =  {{ result.consistencyRatio }}</span>
             <div v-if="result" class="text-sm text-right">
                 <span class="font-medium" :class="[result?.isConsistent ? 'text-green-600' : 'text-red-600']">{{ result?.isConsistent? 'Bobot konsisten.' : 'Bobot tidak konsisten.'  }}</span>
                 <ul>
                    <li v-for="(item, i) in result.weights" :key="item">K{{ i + 1 }}: {{ item.toFixed(5) }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref } from "vue";
    import { calculateAhp } from "../../scripts/ahp";
    const showAlert = inject('showAlert');

    // State dan emit tidak berubah
    const emit = defineEmits(["weights-calculated"]);
    const criteria = [
        { key: "K1", name: "Kekuatan" },
        { key: "K2", name: "Stabilitas" },
        { key: "K3", name: "Kelincahan" },
        { key: "K4", name: "Kecepatan" },
        { key: "K5", name: "Offense" },
        { key: "K6", name: "Defense" },
        { key: "K7", name: "Kesiapan" },
    ];
    const n = criteria.length;
    const matrix = ref(
        JSON.parse(localStorage.getItem('ahp'))    
        ||
        Array(n)
            .fill(null)
            .map((_, i) =>
                Array(n)
                    .fill(null)
                    .map((_, j) => (i === j ? 1 : null))
            )
    );
    const result = ref(null);

    const clearBobot = () => {
        const windowConfirm = confirm('Reset tabel bobot AHP?');
        if (!windowConfirm) return;
        localStorage.removeItem('ahp');
        matrix.value =  Array(n)
            .fill(null)
            .map((_, i) =>
                Array(n)
                    .fill(null)
                    .map((_, j) => (i === j ? 1 : null))
            );
        showAlert('success', 'Tabel AHP berhasil di-reset ke nilai awal');
    }
    const updateReciprocal = (row, col, event) => {
        if(event.target.value < 1) {
            matrix.value[row][col] = 1;
        }
        if(event.target.value > 9) {
            matrix.value[row][col] = 9;
        }
        if (row === col) return;

        const value = matrix.value[row][col];

        // Pastikan nilai valid sebelum menghitung kebalikannya
        if (value && typeof value === "number" && value !== 0) {
            // Langsung set nilai kebalikannya di sel (col, row)
            // tanpa perlu mengecek posisi.
            matrix.value[col][row] = 1 / value;
        }
        localStorage.setItem('ahp', JSON.stringify(matrix.value));
    };

    const triggerCalculation = () => { 
        try {
            matrix.value.forEach(row => {
                const kosong = row.some(item => item === null);
                if(kosong) throw Error();
            })
        } catch(e) {
            showAlert('error', 'Tabel AHP masih ada bobot yang kosong!');
            return;
        }
        const ahpResult = calculateAhp(matrix.value);
        result.value = ahpResult;
        if (ahpResult.isConsistent) {
            showAlert('success', 'Perhitungan selesai, bobot AHP konsisten!');
            emit("weights-calculated", ahpResult.weights);
        } else {
            showAlert('warning', 'Perhitungan selesai, bobot AHP tidak konsisten!');
        }
    };

 
</script>

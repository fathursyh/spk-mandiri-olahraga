<template>
    <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-md mt-6 max-w-screen-xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-800">Visualisasi Bobot AHP</h2>
        <p class="mt-1 text-sm text-gray-500">Visualisasi bobot kepentingan tujuh kriteria AHP.</p>
        <div style="height: 350px" class="mx-auto max-w-sm">
            <Doughnut v-if="chartData.datasets[0].data.length" :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { Doughnut } from "vue-chartjs";
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

    // Daftarkan komponen-komponen yang akan digunakan oleh Chart.js untuk Donut chart
    ChartJS.register(Title, Tooltip, Legend, ArcElement);

    const props = defineProps({
        criteriaWeights: {default: [
        0.45334, // Bobot K1
        0.19956, // Bobot K2
        0.11525, // Bobot K3
        0.19415, // Bobot K4
        0.40134, // Bobot K5
        0.11853, // Bobot K6
        0.05822, // Bobot K7
    ], type: Array}
    })

    // Computed property untuk mengubah data bobot menjadi format Chart.js
    const chartData = computed(() => {
        return {
            // Label untuk setiap potongan donat
            labels: ["K1: Kuat", "K2: Stabil", "K3: Lincah", "K4: Cepat", "K5: Offense", "K6: Defense", "K7: Siap"],
            datasets: [
                {
                    // Palet warna yang menarik untuk 7 kriteria
                    backgroundColor: [
                        "#4f46e5", // Indigo
                        "#7c3aed", // Purple
                        "#db2777", // Pink
                        "#f97316", // Orange
                        "#eab308", // Amber
                        "#22c55e", // Green
                        "#0ea5e9", // Sky
                    ],
                    data: props.criteriaWeights,
                },
            ],
        };
    });

    // Opsi untuk kustomisasi tampilan chart
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right", // Posisi legenda di kanan cocok untuk Donut Chart
            },
            title: {
                display: true,
                text: "Persentase Tingkat Kepentingan Kriteria",
            },
            tooltip: {
                callbacks: {
                    // Kustomisasi tooltip agar menampilkan persentase
                    label: function (context) {
                        let label = context.label || "";
                        if (label) {
                            label += ": ";
                        }
                        if (context.parsed !== null) {
                            // Ubah nilai bobot (misal: 0.45) menjadi format persen (45.00%)
                            label += (context.parsed * 100).toFixed(2) + "%";
                        }
                        return label;
                    },
                },
            },
        },
    };
</script>

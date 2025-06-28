<template>
    <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-md mt-6 max-w-screen-xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-800">Grafik Perbandingan Kriteria Semua Atlet</h2>
        <p class="mt-1 text-sm text-gray-500">Visualisasi perbandingan skor semua atlet terhadap tujuh kriteria.</p>

        <div style="height: 400px">
            <Bar v-if="chartData.labels.length" :data="chartData" :options="chartOptions" />
            <div v-else class="flex items-center justify-center h-full text-gray-500">Belum ada data atlet untuk ditampilkan.</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import { Bar } from "vue-chartjs";
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, type ChartOptions } from "chart.js";

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    function generateDynamicColors(count: number) {
        const colors = [];
        const saturation = 70;
        const lightness = 55;
        for (let i = 0; i < count; i++) {
            const hue = Math.floor(i * (360 / count));
            colors.push({
                border: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                background: `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`,
            });
        }
        return colors;
    }

    // Komponen ini menerima array 'hasil' dari komponen induk
    const props = defineProps<{
        hasil: { nama: string; data: number[]; skorAkhir: number }[];
    }>();

    // Computed property untuk mengubah data atlet menjadi format Chart.js secara reaktif
    const chartData = computed(() => {
        const labels = ["K1:Kuat", "K2:Stabil", "K3:Lincah", "K4:Cepat", "K5:Offense", "K6:Defense", "K7:Siap"];
        const dynamicColors = generateDynamicColors(props.hasil.length);
        const datasets = props.hasil.map((athlete, index) => ({
            label: athlete.nama,
            data: athlete.data,
            backgroundColor: dynamicColors[index].background,
            borderColor: dynamicColors[index].border,
        }));

        return {
            labels,
            datasets,
        };
    });

    const chartOptions: any = {
        responsive: true,
        animation: {
            duration: 1000,
            easing: "easeInOutQuad",
            delay: 600,
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10, // Set skala maksimal menjadi 10
                title: {
                    display: true,
                    text: "Skor",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Kriteria",
                },
            },
        },
    };
</script>

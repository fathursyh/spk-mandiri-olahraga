export function calculateExpertModeRankingsWithArray(athletes, weights = [
    0.45334, // Bobot K1
    0.19956, // Bobot K2
    0.11525, // Bobot K3
    0.19415, // Bobot K4
    0.40134, // Bobot K5
    0.11853, // Bobot K6
    0.05822  // Bobot K7
  ]) {

  if (athletes.length === 0) {
    return [];
  }

  // --- LANGKAH 2A: Tentukan Nilai Maksimal per Kriteria ---
  // Inisialisasi array untuk menyimpan nilai maksimal, dengan 7 elemen bernilai 0
  const maxValues = new Array(7).fill(0);

  // Loop untuk setiap atlet
  for (const athlete of athletes) {
    // Loop untuk setiap nilai kriteria dalam array data
    athlete.data.forEach((value, index) => {
      if (value > maxValues[index]) {
        maxValues[index] = value;
      }
    });
  }
  // --- LANGKAH 2B & 3: Normalisasi dan Hitung Skor Akhir ---
  const athletesWithScores = athletes.map(athlete => {
    // Lakukan Normalisasi untuk setiap kriteria
    const normalizedValues = athlete.data.map((value, index) => {
      // Hindari pembagian dengan nol
      if (maxValues[index] === 0) {
        return 0;
      }
      return value / maxValues[index];
    });

    // Hitung Skor Akhir menggunakan metode .reduce() untuk cara yang lebih fungsional
    // Vi = Σ(wj * rij)
    const finalScore = normalizedValues.reduce((total, normValue, index) => {
      return total + (normValue * weights[index]);
    }, 0); // 0 adalah nilai awal dari 'total'

    return {
      ...athlete,
      skorAkhir: finalScore.toFixed(4)
    };
  });

  // --- LANGKAH 4: Perankingan Atlet ---
  const rankedAthletes = athletesWithScores.sort((a, b) => b.skorAkhir - a.skorAkhir);

  return rankedAthletes.map((athlete, index) => ({
    ...athlete,
    peringkat: index + 1
  }));
}
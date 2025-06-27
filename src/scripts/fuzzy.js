/**
 * Mengubah input skor kriteria menjadi derajat keanggotaan fuzzy.
 * @param {number} kekuatan - Skor K1 (1-10)
 * @param {number} kelincahan - Skor K3 (1-10)
 * @param {number} taktik - Skor rata-rata K5 & K6 (1-10)
 * @returns {Object} Objek berisi semua derajat keanggotaan.
 */
function fuzzifyInputs(kekuatan, kelincahan, taktik) {
  const fuzzyValues = {};

  // Fungsi internal untuk menghitung kurva linear turun & naik
  const turun = (val, a, b) => {
    if (val <= a) return 1;
    if (val >= b) return 0;
    return (b - val) / (b - a);
  };
  const naik = (val, a, b) => {
    if (val <= a) return 0;
    if (val >= b) return 1;
    return (val - a) / (b - a);
  };
  
  // Berdasarkan Gambar 5, 6, 7 di paper (domain antara 4 dan 7)
  const a = 4, b = 7;
  
  fuzzyValues.kekuatan_kurang = turun(kekuatan, a, b);
  fuzzyValues.kekuatan_baik = naik(kekuatan, a, b);
  
  fuzzyValues.kelincahan_kurang = turun(kelincahan, a, b);
  fuzzyValues.kelincahan_baik = naik(kelincahan, a, b);

  fuzzyValues.taktik_kurang = turun(taktik, a, b);
  fuzzyValues.taktik_baik = naik(taktik, a, b);
  
  return fuzzyValues;
}

/**
 * Mengevaluasi semua aturan fuzzy untuk mendapatkan alpha-predikat setiap aturan.
 * @param {Object} fuzzyValues - Hasil dari fungsi fuzzifyInputs.
 * @returns {Array<Object>} Array berisi { alpha, level } untuk setiap aturan.
 */
function evaluateRules(fuzzyValues) {
  const { kekuatan_kurang, kekuatan_baik, kelincahan_kurang, kelincahan_baik, taktik_kurang, taktik_baik } = fuzzyValues;
  
  // Tabel 3 Aturan dari paper
  const rules = [
    { alpha: Math.min(kekuatan_kurang, kelincahan_kurang, taktik_kurang), level: 'pemula' },
    { alpha: Math.min(kekuatan_kurang, kelincahan_kurang, taktik_baik),  level: 'pemula' },
    { alpha: Math.min(kekuatan_kurang, kelincahan_baik,  taktik_kurang), level: 'pemula' },
    { alpha: Math.min(kekuatan_kurang, kelincahan_baik,  taktik_baik),  level: 'menengah' },
    { alpha: Math.min(kekuatan_baik,  kelincahan_kurang, taktik_kurang), level: 'pemula' },
    { alpha: Math.min(kekuatan_baik,  kelincahan_kurang, taktik_baik),  level: 'menengah' },
    { alpha: Math.min(kekuatan_baik,  kelincahan_baik,  taktik_kurang), level: 'menengah' },
    { alpha: Math.min(kekuatan_baik,  kelincahan_baik,  taktik_baik),  level: 'profesional' }
  ];

  return rules;
}

/**
 * Mengubah hasil inferensi fuzzy menjadi satu nilai tegas (skor K7).
 * @param {Array<Object>} ruleOutputs - Hasil dari fungsi evaluateRules.
 * @returns {number} Skor akhir K7.
 */
function defuzzify(ruleOutputs) {
  let weightedSum = 0; // Σ(alpha * z)
  let alphaSum = 0;    // Σ(alpha)

  for (const rule of ruleOutputs) {
    if (rule.alpha === 0) continue; // Abaikan aturan yang tidak aktif

    let z = 0;
    // Berdasarkan rumus fungsi keanggotaan output di paper (hal. 5)
    switch (rule.level) {
      case 'pemula':
        // alpha = (8 - z) / 4   =>   z = 8 - (alpha * 4)
        z = 8 - (rule.alpha * 4);
        break;
      case 'menengah':
        // alpha = (z - 5) / 2 atau (9 - z) / 2
        // Kita bisa ambil rata-ratanya atau salah satu. Mari kita gunakan yg naik dulu.
        // alpha = (z - 5) / 2   =>   z = (alpha * 2) + 5
        z = (rule.alpha * 2) + 5;
        break;
      case 'profesional':
        // alpha = (z - 9) / 4   =>   z = (alpha * 4) + 9
        z = (rule.alpha * 4) + 9;
        break;
    }

    weightedSum += rule.alpha * z;
    alphaSum += rule.alpha;
  }
  
  // Hindari pembagian dengan nol
  if (alphaSum === 0) return 1; // Return nilai minimum jika tidak ada aturan aktif
  
  let finalScore = weightedSum / alphaSum;
  
  // Pastikan skor berada dalam rentang 1-10
  if (finalScore > 10) finalScore = 10;
  if (finalScore < 1) finalScore = 1;

  return finalScore;
}

/**
 * Fungsi utama untuk menghitung skor K7 menggunakan Fuzzy Tsukamoto.
 * @param {number} k1 - Skor Kekuatan
 * @param {number} k3 - Skor Kelincahan
 * @param {number} k5 - Skor Offense
 * @param {number} k6 - Skor Defense
 * @returns {number} Skor K7 yang sudah dihitung.
 */
export function calculateK7(k1, k3, k5, k6) {
  const taktik = (k5 + k6) / 2;
  
  // Tahap 1
  const fuzzyValues = fuzzifyInputs(k1, k3, taktik);
  
  // Tahap 2
  const ruleOutputs = evaluateRules(fuzzyValues);
  
  // Tahap 3
  const finalK7Score = defuzzify(ruleOutputs);
  return finalK7Score;
}
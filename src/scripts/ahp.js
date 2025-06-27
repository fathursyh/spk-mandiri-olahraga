   // Fungsi calculateAhp() tidak berubah, tetap sama seperti sebelumnya.
    export const calculateAhp = (matrixData) => {
        // ... (seluruh logika perhitungan AHP tetap sama)
        const numCriteria = matrixData.length;

        const columnSums = Array(numCriteria).fill(0);
        for (let j = 0; j < numCriteria; j++) {
            for (let i = 0; i < numCriteria; i++) {
                columnSums[j] += matrixData[i][j];
            }
        }

        const normalizedMatrix = matrixData.map((row) => row.map((cell, j) => cell / columnSums[j]));

        const weights = normalizedMatrix.map((row) => row.reduce((sum, cell) => sum + cell, 0) / numCriteria);

        const weightedSumVector = matrixData.map((row) => row.reduce((sum, cell, j) => sum + cell * weights[j], 0));

        const lambdaVector = weightedSumVector.map((val, i) => (weights[i] !== 0 ? val / weights[i] : 0));
        const lambdaMax = lambdaVector.reduce((sum, val) => sum + val, 0) / numCriteria;

        const consistencyIndex = (lambdaMax - numCriteria) / (numCriteria - 1);

        const randomIndex = 1.32; // RI untuk n=7

        const consistencyRatio = randomIndex !== 0 ? consistencyIndex / randomIndex : Infinity;

        return {
            weights: weights,
            consistencyRatio: consistencyRatio,
            isConsistent: consistencyRatio < 0.1,
        };
    };
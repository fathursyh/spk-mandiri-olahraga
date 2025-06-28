
export async function getK8Score(kriteria) {
  // GANTI URL INI dengan URL API
  const API_URL = "https://fathursyh.pythonanywhere.com/predict";

  // Kita hanya butuh K1-K7 untuk dikirim, sesuai format input model
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nilaiK: [kriteria[0], kriteria[1], kriteria[2], kriteria[3], kriteria[4], kriteria[5], kriteria[6]]
      })
    });

    if (!response.ok) {
      // Jika server mengembalikan error (misal: 400, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
      // Jika API mengembalikan pesan error custom
      throw new Error(result.error);
    }
    
    return result;

  } catch (error) {
    return null; // Kembalikan null untuk menandakan kegagalan
  }
}
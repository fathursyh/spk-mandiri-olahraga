<template>
    <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-md">

  <div>
    <h2 class="text-2xl font-bold text-gray-800">Tentukan Bobot Kriteria (AHP)</h2>
    <p class="mt-1 text-sm text-gray-500">
      Isi matriks berikut untuk menentukan seberapa penting satu kriteria dibandingkan yang lain.
    </p>
  </div>
  
  <div class="mt-6 overflow-x-auto">
    <p class="mb-2 text-sm">Contoh: Jika 'Kekuatan' **3x lebih penting** dari 'Stabilitas', isi angka 3 pada baris K1 kolom K2.</p>
    <table class="w-full min-w-max text-center border-collapse">
      <thead class="bg-gray-50">
        <tr>
          <th class="p-2 border">Kriteria</th>
          <th class="p-2 border">K1</th>
          <th class="p-2 border">K2</th>
          <th class="p-2 border">K3</th>
          <th class="p-2 border">K4</th>
          <th class="p-2 border">K5</th>
          <th class="p-2 border">K6</th>
          <th class="p-2 border">K7</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-2 border font-medium bg-gray-50">K1: Kekuatan</td>
          <td class="p-1 border"><input type="number" value="1" disabled class="w-16 text-center bg-gray-200 cursor-not-allowed"></td>
          <td class="p-1 border"><input type="number" placeholder="1-9" class="w-16 text-center border-gray-300 rounded-md"></td>
          <td class="p-1 border"><input type="number" placeholder="1-9" class="w-16 text-center border-gray-300 rounded-md"></td>
          </tr>
        <tr>
          <td class="p-2 border font-medium bg-gray-50">K2: Stabilitas</td>
          <td class="p-1 border"><input type="text" readonly class="w-16 text-center bg-gray-200" placeholder="Otomatis"></td>
          <td class="p-1 border"><input type="number" value="1" disabled class="w-16 text-center bg-gray-200 cursor-not-allowed"></td>
          <td class="p-1 border"><input type="number" placeholder="1-9" class="w-16 text-center border-gray-300 rounded-md"></td>
           </tr>
        
        </tbody>
    </table>
  </div>
  
  <div class="mt-6 flex justify-end">
    <button class="py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Hitung Bobot
    </button>
  </div>

</div>
</template>
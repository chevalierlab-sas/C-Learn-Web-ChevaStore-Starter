/**
 * Mengenkripsi string dengan mengubahnya menjadi format Base64 yang aman untuk URL.
 *
 * @param {string} value - String yang akan dienkripsi.
 * @returns {string} - String yang telah dienkripsi dalam format Base64 yang aman untuk URL.
 *
 * @example
 * encrypt_it("Hello World!"); // Mengembalikan "SGVsbG8gV29ybGQh"
 */
export function encrypt_it(value) {
  // Encode string to Base64 and make it URL-safe
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Mendekripsi string yang telah dienkripsi dalam format Base64 yang aman untuk URL.
 *
 * @param {string} encryptedValue - String yang telah dienkripsi dalam format Base64 yang aman untuk URL.
 * @returns {string} - String asli sebelum dienkripsi.
 *
 * @example
 * decrypt_it("SGVsbG8gV29ybGQh"); // Mengembalikan "Hello World!"
 */
export function decrypt_it(encryptedValue) {
  // Decode URL-safe Base64 back to original Base64
  const base64 = encryptedValue.replace(/-/g, "+").replace(/_/g, "/");
  return atob(base64);
}

/**
 * Mengambil nilai dari objek bertingkat berdasarkan jalur yang diberikan.
 *
 * @param {Object} obj - Objek yang ingin diakses.
 * @param {string} path - Jalur ke nilai yang diinginkan (misalnya, 'customer.name').
 * @returns {*} - Nilai yang ditemukan di jalur yang ditentukan, atau undefined jika jalur tidak ditemukan.
 *
 * @example
 * const data = { customer: { name: "John Doe" } };
 * const customerName = getValueByPath(data, 'customer.name'); // Mengembalikan "John Doe"
 */
export function getObjValueByPath(obj, path) {
  return path.split(".").reduce((o, key) => {
    return (o || {})[key];
  }, obj);
}

/**
 * Mengubah nilai dalam objek bertingkat berdasarkan jalur yang diberikan.
 *
 * @param {Object} obj - Objek yang ingin dimodifikasi.
 * @param {string} path - Jalur ke nilai yang ingin diubah (misalnya, 'customer.name').
 * @param {*} value - Nilai baru yang ingin ditetapkan.
 *
 * @example
 * const data = { customer: { name: "John Doe" } };
 * setValueByPath(data, 'customer.name', 'Jane Smith');
 * getValueByPath(data, 'customer.name') // Mengembalikan "Jane Smith"
 */
export function setObjValueByPath(obj, path, value) {
  const keys = path.split(".");
  keys.reduce((o, key, index) => {
    if (index === keys.length - 1) {
      o[key] = value;
    }
    return (o[key] = o[key] || {});
  }, obj);
}

/**
 * Mengubah string tanggal dalam format ISO 8601 menjadi format tanggal Eropa (dd/mm/yyyy).
 *
 * @param {string} isoDate - Tanggal dalam format ISO 8601 (misalnya, '2025-03-19T16:00:00+07:00').
 * @returns {string} - Tanggal dalam format dd/mm/yyyy.
 *
 * @example
 * const formattedDate = formatDateEurope('2025-03-19T16:00:00+07:00'); // Mengembalikan "19/03/2025"
 */
export function formatDateEurope(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari dan menambahkan nol di depan jika perlu
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan (0-11) dan menambahkan nol di depan
  const year = date.getFullYear(); // Mendapatkan tahun

  return `${day}/${month}/${year}`; // Mengembalikan format dd/mm/yyyy
}

/**
 * Mengubah string tanggal dalam format ISO 8601 menjadi format tanggal Eropa (dd MMMM yyyy).
 *
 * @param {string} isoDate - Tanggal dalam format ISO 8601 (misalnya, '2024-02-24T16:00:00+07:00').
 * @returns {string} - Tanggal dalam format "dd MMMM yyyy".
 *
 * @example
 * const formattedDate = formatDateIndonesian('2024-02-24T16:00:00+07:00'); // Mengembalikan "24 Februari 2024"
 */
export function formatDateIndonesian(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari dan menambahkan nol di depan jika perlu
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]; // Array bulan dalam bahasa Indonesia
  const month = months[date.getMonth()]; // Mendapatkan nama bulan
  const year = date.getFullYear(); // Mendapatkan tahun

  return `${day} ${month} ${year}`; // Mengembalikan format "dd MMMM yyyy"
}

/**
 * Mengubah string tanggal dalam format ISO 8601 menjadi format "dd MMMM, yyyy, hh:mm A".
 *
 * @param {string} isoDate - Tanggal dalam format ISO 8601 (misalnya, '2025-06-30T09:10:00+07:00').
 * @returns {string} - Tanggal dalam format "30 Juni, 2025, 09:10 AM".
 *
 * @example
 * const formattedDate = formatDateWithTimeIndonesian('2025-06-30T09:10:00+07:00'); // Mengembalikan "30 Juni, 2025, 09:10 AM"
 */
export function formatDateWithTimeIndonesian(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari dan menambahkan nol di depan jika perlu
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]; // Array bulan dalam bahasa Indonesia
  const month = months[date.getMonth()]; // Mendapatkan nama bulan
  const year = date.getFullYear(); // Mendapatkan tahun

  // Mendapatkan jam dan menit
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Mendapatkan menit dan menambahkan nol di depan jika perlu
  const ampm = hours >= 12 ? "PM" : "AM"; // Menentukan AM atau PM
  hours = hours % 12; // Mengubah ke format 12 jam
  hours = hours ? String(hours).padStart(2, "0") : "12"; // Menambahkan nol di depan jika perlu

  return `${day} ${month}, ${year}, ${hours}:${minutes} ${ampm}`; // Mengembalikan format "dd MMMM, yyyy, hh:mm A"
}

/**
 * Mengubah objek tanggal JavaScript menjadi string dalam format "YYYY-MM-DD".
 *
 * @param {Date} date - Objek tanggal JavaScript (misalnya, new Date('Wed Apr 02 2025 00:00:00 GMT+0700')).
 * @returns {string} - Tanggal dalam format "YYYY-MM-DD".
 *
 * @example
 * const formattedDate = formatDateToString(new Date('Wed Apr 02 2025 00:00:00 GMT+0700')); // Mengembalikan "2025-04-02"
 */
export function formatDateToString(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Parameter harus berupa objek Date yang valid.");
  }

  const year = date.getFullYear(); // Mendapatkan tahun
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan (ditambah 1 karena bulan dimulai dari 0) dan menambahkan nol di depan jika perlu
  const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari dan menambahkan nol di depan jika perlu

  return `${year}-${month}-${day}`; // Mengembalikan format "YYYY-MM-DD"
}

/**
 * Format angka menjadi format mata uang.
 * @param {number} amount - Angka yang akan diformat.
 * @param {string} currency - Kode mata uang (misalnya, 'USD', 'IDR', 'EUR').
 * @param {string} locale - Locale untuk format (misalnya, 'en-US', 'id-ID').
 * @returns {string} - Angka yang diformat sebagai mata uang.
 */
export const currencyFormatting = (amount, currency = "IDR", locale = "id-ID") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Mengekstrak teks dari string HTML.
 * @param {string} html - String yang berisi markup HTML yang akan diproses.
 * @returns {string} - Teks yang diekstrak dari string HTML. Jika tidak ada teks yang ditemukan, mengembalikan string kosong.
 */
export function extractTextFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

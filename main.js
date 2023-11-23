// TAHAP 1 MENGIRIM DATA KE CONSOLE

const beberapaBuku = [
  {
    id: 1,
    judul: "Satu Dasar",
    penulis: "Dhoifur",
    penerbit: "Gramedia",
    tahun: "2020",
    isComplete: true,
  },
  {
    id: 3,
    judul: "Petualang",
    penulis: "Malik Abdurrohman",
    penerbit: "Gramedia",
    tahun: "2020",
    isComplete: false,
  },
];

const RENDER_EVENT = "render";
const formInput = document.getElementById("inputBook");
console.log(formInput);
const inputJudul = document.getElementById("inputJudul");
const inputPenulis = document.getElementById("inputPenulis");
const inputPenerbit = document.getElementById("inputPenerbit");
const inputTahun = document.getElementById("inputTahun");
const inputCheckbox = document.getElementById("inputCheckbox");
const content = document.getElementById("content");

// Membuat custome event
document.addEventListener(RENDER_EVENT, function () {
  content.innerHTML = "";
  const booksComplete = beberapaBuku.filter((book) => {
    return book.isComplete == true;
  });

  const booksUncomplete = beberapaBuku.filter((book) => {
    return book.isComplete == false;
  });

  // Buat Content 1 / Selesai dibaca
  const content1 = document.createElement("div");
  content1.setAttribute("id", "content1");

  const content1H2 = document.createElement("h2");
  content1H2.innerText = "Selesai dibaca";
  content1.append(content1H2);

  // Isi Content 1
  booksComplete.forEach((book) => {
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const p5 = document.createElement("p");

    const tombolDiv = document.createElement("div");
    const ubah = document.createElement("button");
    ubah.setAttribute("id", "ubah1");
    ubah.innerText = "Belum dibaca";
    const hapus = document.createElement("button");
    hapus.setAttribute("id", "hapus1");
    hapus.innerText = "Hapus";
    tombolDiv.append(ubah, hapus);
    console.log(tombolDiv);

    p1.innerText = `Judul : ${book.id}`;
    p2.innerText = `Judul : ${book.judul}`;
    p3.innerText = `Penulis : ${book.penulis}`;
    p4.innerText = `Penerbit : ${book.penerbit}`;
    p5.innerText = `Tahun : ${book.tahun}`;
    content1.append(p1, p2, p3, p4, p5, tombolDiv);
  });

  // Buat Content 2 / Belum selesai dibaca
  const content2 = document.createElement("div");
  content2.setAttribute("id", "content2");

  const content2H2 = document.createElement("h2");
  content2H2.innerText = "Belum selesai dibaca";
  content2.append(content2H2);

  // Isi Content 2
  booksUncomplete.forEach((book) => {
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const p5 = document.createElement("p");

    const tombolDiv = document.createElement("div");
    const ubah = document.createElement("button");
    ubah.setAttribute("id", "ubah2");
    ubah.innerText = "Selesai dibaca";
    const hapus = document.createElement("button");
    hapus.setAttribute("id", "hapus2");
    hapus.innerText = "Hapus";
    tombolDiv.append(ubah, hapus);
    console.log(tombolDiv);

    p1.innerText = `Judul : ${book.id}`;
    p2.innerText = `Judul : ${book.judul}`;
    p3.innerText = `Penulis : ${book.penulis}`;
    p4.innerText = `Penerbit : ${book.penerbit}`;
    p5.innerText = `Tahun : ${book.tahun}`;
    content2.append(p1, p2, p3, p4, p5, tombolDiv);
  });

  // Masukkan content1 & content2 ke div content
  content.append(content1, content2);
});

document.addEventListener("DOMContentLoaded", function () {
  document.dispatchEvent(new Event(RENDER_EVENT));
});

formInput.addEventListener("submit", function (e) {
  e.preventDefault();

  const book = {
    id: +new Date(),
    judul: inputJudul.value,
    penulis: inputPenulis.value,
    penerbit: inputPenerbit.value,
    tahun: inputTahun.value,
    isComplete: inputCheckbox.checked,
  };

  beberapaBuku.push(book);

  document.dispatchEvent(new Event(RENDER_EVENT));

  formInput.reset();
});

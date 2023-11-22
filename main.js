// TAHAP 1 MENGIRIM DATA KE CONSOLE

const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
    const inputBookForm = document.getElementById('inputBook');
    inputBookForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
    });
  });


  function addBook() {
    // Mengambil nilai dari elemen formulir
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    // Menyimpan semua data dalam objek array
    // const generatedID = generateId();
    // const book = generateTodoObject(generatedID, title, author, year, isComplete);
    
     // Membuat objek buku baru
    const book = {
      id: generateId(), // Memanggil fungsi untuk menghasilkan ID unik
      title: title,
      author: author,
      year: year, 
      isComplete: isComplete,
    };

    
    books.push(book);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateId() {
    return +new Date();
  }

//   Mengirim data dengan cunstome event 'RENDER_EVENT'
  document.addEventListener(RENDER_EVENT, function () {
    console.log(books);

 // Mendapatkan elemen daftar buku belum selesai dan selesai
  const incompleteBookshelf = document.getElementById("incompleteBookshelfList");
  const completeBookshelf = document.getElementById("completeBookshelfList");

  // Mengosongkan elemen daftar buku
  incompleteBookshelf.innerHTML = "";
  completeBookshelf.innerHTML = "";
    
    for (const bookItem of books) {
        const bookElement = makeTodo(bookItem);
        if (bookItem.isComplete) {
          completeBookshelf.appendChild(bookElement);
        } else {
          incompleteBookshelf.appendChild(bookElement);
        }
    }
     });


//  TAHAP 2 MEMINDAH DATA KE HTML

// Fungsi untuk membuat elemen HTML dari objek buku
function makeTodo(book) {
  const bookItem = document.createElement("article");
  bookItem.classList.add("book_item");

  const title = document.createElement("h3");
  title.innerText = book.title;

  const author = document.createElement("p");
  author.innerText = `Penulis: ${book.author}`;

  const year = document.createElement("p");
  year.innerText = `Tahun: ${book.year}`;

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("action");

  const actionButton = document.createElement("button");
  actionButton.innerText = book.isComplete
    ? "Belum selesai dibaca"
    : "Selesai dibaca";
  actionButton.classList.add(book.isComplete ? "green" : "red");
  actionButton.addEventListener("click", function () {
    toggleBookStatus(book.id); // Memanggil fungsi untuk mengubah status buku
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Hapus buku";
  deleteButton.classList.add("red");
  deleteButton.addEventListener("click", function () {
    deleteBook(book.id); // Memanggil fungsi untuk menghapus buku
  });

  actionDiv.appendChild(actionButton);
  actionDiv.appendChild(deleteButton);

  bookItem.appendChild(title);
  bookItem.appendChild(author);
  bookItem.appendChild(year);
  bookItem.appendChild(actionDiv);

  return bookItem;
  } 
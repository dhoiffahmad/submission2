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
    const generatedID = generateId();
    const book = generateTodoObject(generatedID, title, author, year, isComplete);
    books.push(book);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateId() {
    return +new Date();
  }
   
  function generateTodoObject(id, title, author,year, isCompleted) {
    return {
      id,
      title,
      author,
      year,
      isCompleted
    }
  }

//   Mengirim data dengan cunstome event 'RENDER_EVENT'
  document.addEventListener(RENDER_EVENT, function () {
    console.log(books);

    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    incompleteBookshelfList.innerHTML = '';
    
    for (const bookItem of books) {
        const bookElement = makeTodo(bookItem);
        incompleteBookshelfList.append(bookElement);
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
    ? "Belum selesai di Baca"
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
// function makeTodo(todoObject) {
//     const textTitle = document.createElement('h2');
//     textTitle.innerText = todoObject.title;
   
//     const textTimestamp = document.createElement('p');
//     textTimestamp.innerText = todoObject.author;
   
//     const textContainer = document.createElement('div');
//     textContainer.classList.add('inner');
//     textContainer.append(textTitle, textTimestamp);
   
//     const container = document.createElement('div');
//     container.classList.add('item', 'shadow');
//     container.append(textContainer);
//     container.setAttribute('id', `todo-${todoObject.id}`);
   
//     return container;
//   }

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyC4E2b-7v9-QB5u--qpOizUm7UFVFTKl6A",
    authDomain: "bookapp-65566.firebaseapp.com",
    projectId: "bookapp-65566",
    storageBucket: "bookapp-65566.firebasestorage.app",
    messagingSenderId: "1046545799558",
    appId: "1:1046545799558:web:72d6df9aea9983d930f407"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function addBook() {
  const titleVal = document.getElementById("title").value;
  const authorVal = document.getElementById("author").value;
  const priceVal = Number(document.getElementById("price").value);
  const imageURLVal = document.getElementById("imageURL").value;

  if (!titleVal || !authorVal || !priceVal || !imageURLVal) {
    alert("Please fill all fields!");
    return;
  }

  await addDoc(collection(db, "books"), {
    title: titleVal,
    author: authorVal,
    price: priceVal,
    coverImageURL: imageURLVal
  });

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("price").value = "";
  document.getElementById("imageURL").value = "";
}
onSnapshot(collection(db, "books"), (snapshot) => {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  snapshot.docs.forEach(docSnap => {
    const book = docSnap.data();
    const id = docSnap.id;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${book.coverImageURL}" alt="cover">
      <h4>${book.title}</h4>
      <p>${book.author}</p>
      <p>Rs. ${book.price}</p>
      <button onclick="updateAuthor('${id}')">Update Author</button>
      <button onclick="deleteBook('${id}')">Delete</button>
    `;
    container.appendChild(card);
  });
});
window.updateAuthor = async function(id) {
  const newAuthor = prompt("Enter new author name:");
  if (newAuthor) {
    await updateDoc(doc(db, "books", id), { author: newAuthor });
  }
};
window.deleteBook = async function(id) {
  if (confirm("Are you sure you want to delete this book?")) {
    await deleteDoc(doc(db, "books", id));
  }
};

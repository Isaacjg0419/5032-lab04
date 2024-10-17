<template>
    <div class="container">
        <h1>Add a Book</h1>
        <form @submit.prevent="addBook" class="form-container">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" id="isbn" v-model="isbn" />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" />
            </div>
            <button type="submit">Add Book</button>
        </form>
        <BookList ref="bookList" />
    </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/init.js";
import BookList from '../components/BookList.vue';

export default {
    setup() {
        const isbn = ref("");
        const name = ref("");
        const { proxy } = getCurrentInstance();

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert("ISBN must be a valid number");
                    return;
                }

                await addDoc(collection(db, "books"), {
                    isbn: isbnNumber,
                    name: name.value,
                });

                isbn.value = "";
                name.value = "";

                alert("Book added successfully!");

                // Refresh the book list after adding a book
                const bookListComponent = proxy.$refs.bookList;
                if (bookListComponent && bookListComponent.fetchBooks) {
                    bookListComponent.fetchBooks();
                }
            } catch (error) {
                console.error("Error adding book: ", error);
            }
        };

        return {
            isbn,
            name,
            addBook,
        };
    },
    components: { BookList }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
}

button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
}

form {
    margin-bottom: 2rem;
}
</style>

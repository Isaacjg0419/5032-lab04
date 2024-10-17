<template>
    <div>
        <h1>Books with ISBN</h1>
        <h2>test for deployment</h2>
        <ul>
            <li v-for="book in books" :key="book.id">
                <div v-if="editingBookId === book.id">
                    <input type="text" v-model="editName" placeholder="Edit name" />
                    <input type="text" v-model="editIsbn" placeholder="Edit ISBN" />
                    <button @click="saveBook(book.id)">Save</button>
                    <button @click="cancelEdit()">Cancel</button>
                </div>
                <div v-else>
                    {{ book.name }} - ISBN: {{ book.isbn }}
                    <button @click="editBook(book)">Edit</button>
                    <button @click="deleteBook(book.id)">Delete</button>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';
import { collection, onSnapshot, query, where, orderBy, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../firebase/init.js';

export default {
    data() {
        return {
            books: [],
            editingBookId: null,
            editName: '',
            editIsbn: ''
        };
    },
    methods: {
        fetchBooks() {
            const booksCollection = collection(db, 'books');
            const q = query(
                booksCollection,
                where("isbn", ">", 1000),
                orderBy("isbn", "desc"),
                limit(10)
            );

            onSnapshot(q, (snapshot) => {
                this.books = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            });
        },
        editBook(book) {
            this.editingBookId = book.id;
            this.editName = book.name;
            this.editIsbn = book.isbn;
        },
        cancelEdit() {
            this.editingBookId = null;
            this.editName = '';
            this.editIsbn = '';
        },
        async saveBook(id) {
            try {
                const bookRef = doc(db, 'books', id);
                await updateDoc(bookRef, {
                    name: this.editName,
                    isbn: Number(this.editIsbn)
                });
                this.cancelEdit();
                alert("Book updated successfully!");
            } catch (error) {
                console.error("Error updating book: ", error);
            }
        },
        async deleteBook(id) {
            try {
                const bookRef = doc(db, 'books', id);
                await deleteDoc(bookRef);
                alert("Book deleted successfully!");
            } catch (error) {
                console.error("Error deleting book: ", error);
            }
        }
    },
    mounted() {
        this.fetchBooks();
    }
};

</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 1rem;
}

button {
    margin-left: 10px;
}
</style>

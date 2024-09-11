<template>
    <div>
        <h1>Books with ISBN</h1>
        <ul>
            <li v-for="book in books" :key="book.id">{{ book.name }} - ISBN: {{ book.isbn }}</li>
        </ul>
    </div>
</template>

<script>
import { onSnapshot, collection } from "firebase/firestore";
import db from "../firebase/init.js";

export default {
    data() {
        return {
            books: [],
        };
    },
    methods: {
        fetchBooks() {
            const booksCollection = collection(db, "books");
            onSnapshot(booksCollection, (snapshot) => {
                this.books = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            });
        },
    },
    mounted() {
        this.fetchBooks();
    },
};
</script>
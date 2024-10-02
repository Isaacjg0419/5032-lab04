const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// Function to count the number of books
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const count = snapshot.size;
      res.status(200).send({ count });
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// Function to get all books
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const books = [];
      snapshot.forEach(doc => {
        books.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).send(books);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).send("Error fetching books");
    }
  });
});

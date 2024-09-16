<template>
    <div>
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-else-if="error">Error: {{ error }}</p>
    </div>
</template>
<script>
// 6.4 - Import axios
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null,
        };
    },
    methods: {
        async getBookCount() {
            try {
                const response = await axios.get('https://us-central1-week7-jiayuan-6b508.cloudfunctions.net/countBooks');
                // 6.3 - Assign the count from response data
                this.count = response.data.count;
                this.error = null;
            } catch (err) {
                // 6.6 - Catch error and display it
                console.error = ("Error fetching book count", error);
                this.error = error;
                this.count = null;
            }
        }
    }
};
</script>
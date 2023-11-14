import { createApp } from 'vue'
import App from './components/App.js'
const app = createApp(App)
createApp({
    data() {
        return {
            movieInModal: { id: null, name: null, description: null },
            movies: [],
            childMsg: 'No child msg yet'
        }
    },
    async created() {
        this.movies = await (await fetch("http://localhost:8080/movies")).json()
    },
    methods: {
        getMovie: async function (id) {
            this.movieInModal = await (await fetch("http://localhost:8080/movies/" + id)).json()
            let movieInModal = new bootstrap.Modal(document.getElementById("movieInfoModal"))
            movieInModal.show()
        }
    }
})

app.mount('#app')
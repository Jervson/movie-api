export default {
    /*html*/
    template: `
    <table id="moviesTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Description</th>
        </tr>
        <tr v-for="movie in movies">
            <td @click="getMovie(movie.id)">{{ movie.name }}</td>
            <td>{{ movie.description }}</td>
        </tr>
    </table>
    `,
    emits: {
        showModal: (movie) => {
            console.log("Validation", movie)
            return movie.id && movie.name && movie.description
        }
    },
    data() {
        return {
            movies: []
        }
    },
    async created() {
        this.movies = await (await fetch("http://localhost:8080/movies")).json()
    },
    methods: {
        getMovie: async function (id) {
            const movieInModal = await (await fetch("http://localhost:8080/movies/" + id)).json()
            console.log("MoviesList: ", movieInModal)
            this.$emit("showModal", movieInModal)
        }
    }
}
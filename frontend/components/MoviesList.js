export default {
    /*html*/
    template: `
    <table id="moviesTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="movie in movies">
                <td @click="getMovie(movie.id)">{{ movie.name }}</td>
                <td>{{ movie.description }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
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
            const movieInModal = await (await fetch(this.API_URL + "/movies/" + id)).json()
            this.$emit("showModal", movieInModal)
        }
    }
}
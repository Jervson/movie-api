import moviesList from "../components/MoviesList.js"
import movieInfoModal from "../components/MovieInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import movieForm from "../components/movie/MovieForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newMovie">New Movie</button>
    <movies-list :key="update" @showModal="openModal"></movies-list>
    <movie-info-modal @movieUpdated="updateView" :movieInModal="movieInModal"></movie-info-modal>
    <new-object-modal id="newMovieModal" @save="saveNewMovie">
        <movie-form v-model:name="movieInModal.name" v-model:description="movieInModal.description"></movie-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal> 
    `,
    components: {
        moviesList,
        movieInfoModal,
        newObjectModal,
        movieForm
    },
    data() {
        return {
            update: 0,
            movieInModal: { id: "", name: "", description: "" },
            newMovieModal: {},
            error: ""
        }
    },
    methods: {
        openModal(movie) {
            this.movieInModal = movie
            let movieInfoModal = new bootstrap.Modal(document.getElementById("movieInfoModal"))
            movieInfoModal.show()
        },
        newMovie() {
            this.error = ""
            this.movieInModal = {}
            this.newMovieModal = new bootstrap.Modal(document.getElementById("newMovieModal"))
            this.newMovieModal.show()
        },
        updateView(movie) {
            this.update++
            this.movieInModal = movie
        },
        async saveNewMovie() {
            console.log("Saving:", this.movieInModal)
            const rawResponse = await fetch(this.API_URL + "/movies/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.movieInModal)
            });
            if (rawResponse.ok) {
                this.newMovieModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    },  
}
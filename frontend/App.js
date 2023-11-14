import moviesList from "./components/MoviesList.js"
import movieInfoModal from "./components/MovieInfoModal.js"
export default {
    /*html*/
    template: `
    <movies-list :key="update" @showModal="openModal"></movies-list>
    <movie-info-modal @movieUpdated="updateView" :movieInModal="movieInModal"></movie-info-modal>
    `,
    components: {
        moviesList,
        movieInfoModal
    },
    data() {
        return {
            update: 0,
            movieInModal: { id: "", name: "", description: "" }
        }
    },
    methods: {
        openModal(movie) {
            this.movieInModal = movie
            let movieInfoModal = new bootstrap.Modal(document.getElementById("movieInfoModal"))
            movieInfoModal.show()
        },
        updateView(movie) {
            this.update++
            this.movieInModal = movie
        }
    }
}
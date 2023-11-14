import moviesList from "./MoviesList.js"
import movieInfoModal from "./MovieInfoModal.js"
export default {
    /*html*/
    template: `
    <movies-list @showModal="openModal"></movies-list>
    <movie-info-modal :movieInModal="movieInModal"></movie-info-modal>
    `,
    components: {
        moviesList,
        movieInfoModal
    },
    data() {
        return {
            msg: 'Hello world!',
            movieInModal: { id: "", name: "", description: "" }
        }
    },
    methods: {
        openModal(movie) {
            this.moviesInModal = movie
            let movieInfoModal = new bootstrap.Modal(document.getElementById("movieInfoModal"))
            movieInfoModal.show()
        }
    }
}
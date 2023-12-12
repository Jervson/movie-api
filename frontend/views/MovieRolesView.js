import movieRolesList from "../components/MovieRolesList.js"
import movieRoleInfoModal from "../components/MovieRoleInfoModal.js"
import movieRoleForm from "../components/movierole/MovieRoleForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <h2>MovieRoles</h2>
    <button class="btn btn-secondary" @click="newMovieRole" >Create</button>
    <movieRoles-list :key="update" @showModal="openModal"></movieRoles-list>
    <movieRole-info-modal @movieRoleUpdated="updateView" :movieRoleInModal="movieRoleInModal"></movieRole-info-modal>
    <new-object-modal id="newMovieRoleModal" @save="saveNewMovieRole">
        <movieRole-form v-model:role="movieRoleInModal.role" v-model:artistid="movieRoleInModal.ArtistId" v-model:movieid="movieRoleInModal.MovieId"></movieRole-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        movieRolesList: movieRolesList,
        movieRoleInfoModal: movieRoleInfoModal,
        movieRoleForm,
        newObjectModal
    },
    data() {
        return {
            update: 0,
            movieRoleInModal: { id: "", role: "", ArtitstId: "", MovieId: ""},
            error:"",
            newMovieRoleModal:{}
        }
    },
    methods: {
        openModal(movieRole) {
            this.movieRoleInModal = movieRole
            let movieRoleInfoModal = new bootstrap.Modal(document.getElementById("movieRoleInfoModal"))
            movieRoleInfoModal.show()
        },
        updateView(movieRole){
            this.update++
            this.movieRoleInModal = movieRole
        },
        newMovieRole(){
            this.movieRoleInModal = {}
            this.newMovieRoleModal = new bootstrap.Modal(document.getElementById("newMovieRoleModal"))
            this.newMovieRoleModal.show()
        },
        async saveNewMovieRole(){
            console.log("Saving:", this.movieRoleInModal)
            const rawResponse = await fetch(this.API_URL + "/movieroles", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.movieRoleInModal)
            });

            if(rawResponse.ok){
                this.newMovieRoleModal.hide()
                this.updateView(this.movieRoleInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
    }
}
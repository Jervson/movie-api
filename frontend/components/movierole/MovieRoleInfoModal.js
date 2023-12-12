import confirmationModal from "../ConfirmationModal.js"
import movieRoleDetails from "./MovieRoleDetails.js";
import movieRoleForm from "./MovieRoleForm.js";
export default {
    /*html*/
    template: `
<div id="movieRoleInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <movieRole-form v-if="isEditing" v-model:role="modifiedMovieRole.role" v-model:id="modifiedMovieRole.id" />
                <movieRole-details v-else v-model:movieRoleInModal="movieRoleInModal" v-model:artists="artists" v-model:movies="movies" />
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedMovieRole">Save</button>
                                <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col me-auto"></div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<confirmation-modal :target="'#movieRoleInfoModal'" @confirmed="deleteMovieRole" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        movieRoleForm,
        movieRoleDetails,
    },
    emits:["movieRoleUpdated"],
    props: {
        movieRoleInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedMovieRole:{},
            artists: [],
            movies: []
        }
    },
    watch: {
        'movieRoleInModal.id': function(newVal) {
            if (newVal) {
                this.fetchArtists();
                this.fetchMovies();
            }
        }
    },
    methods: {
        async fetchArtists() {
            const movieRole = await (await fetch(this.API_URL + "/movieroles/"+ this.movieRoleInModal.id)).json();
            this.artists = movieRole.Artists;
        },
        async fetchMovies() {
            const movieRole = await (await fetch(this.API_URL + "/movieroles/"+ this.movieRoleInModal.id)).json();
            this.movies = movieRole.Movies;
        },
        startEditing(){
            this.modifiedMovieRole = {...this.movieRoleInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedMovieRole(){
            console.log("Saving:", this.modifiedMovieRole)
            const rawResponse = await fetch(this.API_URL + "/movieroles/" + this.modifiedMovieRole.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedMovieRole)
            });
            console.log(rawResponse);
            this.$emit("movieRoleUpdated", this.modifiedMovieRole)
            this.isEditing = false
        },
        deleteMovieRole(){
            console.log("Deleting:", this.movieRoleInModal)
            fetch(this.API_URL + "/movieroles/" + this.movieRoleInModal.id, {
                method: 'DELETE'
            });
            this.$emit("movieRoleUpdated", {})
            this.isEditing = false
        },
        createNewMovieRole() {
            try{
                console.log("Creating", this.newMovieRole);
                fetch(this.API_URL + "/movieroles", {
                    method:"POST",
                    headers: {
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(this.newMovieRole)               
                })
                    .then(response => response.json())
                    .then(newMovieRole => {
                       console.log("Created", newMovieRole);
                       this.$emit("movieRoleUpdated", newMovieRole);
                       this.cancelCreating();
                    });
            } catch (error){
                console.error(error);
            }
        },
        cancelCreating() {
            this.isCreating = false;
            this.newMovieRole = {
                role: ""
            };
        }
    }
}
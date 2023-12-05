import confirmationModal from "./ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="movieInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{movieInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedMovie.name"></td>
                        <td v-else>{{movieInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td v-if="isEditing"><input v-model="modifiedMovie.description"></td>
                        <td v-else>{{movieInModal.description}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedMovie">Save</button>
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
<confirmation-modal :target="'#movieInfoModal'" @confirmed="deleteMovie"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits: ["movieUpdated"],
    props: {
        movieInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedMovie: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedMovie = { ...this.movieInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedMovie() {
            console.log("Saving:", this.modifiedMovie)
            const rawResponse = await fetch(this.API_URL + "/movies/" + this.modifiedMovie.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedMovie)
            });
            console.log(rawResponse);
            this.$emit("movieUpdated", this.modifiedMovie)
            this.isEditing = false
        },
        async deleteMovie() {   
            try {
                const rawResponse = await fetch(this.API_URL + "/movies/" + this.movieInModal.id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                if (rawResponse.ok) {
                    console.log("Movie deleted successfully");
                    this.$emit("movieUpdated", null);
                } else {
                    console.error("Failed to delete the movie");
                }
                this.isEditing = false;
    
            } catch (error) {
                console.error("An error occurred while deleting the movie", error);
            }
        }
    }
}
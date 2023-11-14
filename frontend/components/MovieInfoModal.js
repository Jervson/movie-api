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
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="savemodifiedMovie">Save</button>
                    <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-warning" @click="startEditing">Edit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </template>
            </div>
        </div>
    </div>
</div>
    `,
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
        async savemodifiedMovie() {
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
        }
    }
}
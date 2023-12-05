import confirmationModal from "./ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="artistInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{artistInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedArtist.name"></td>
                        <td v-else>{{artistInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Date of Birth</th>
                        <td v-if="isEditing"><input v-model="modifiedArtist.dob"></td>
                        <td v-else>{{artistInModal.dob}}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td v-if="isEditing"><input v-model="modifiedArtist.gender"></td>
                        <td v-else>{{artistInModal.gender}}</td>
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
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedArtist">Save</button>
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
<confirmation-modal :target="'#artistInfoModal'" @confirmed="deleteArtist"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits: ["artistUpdated"],
    props: {
        artistInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedArtist: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedArtist = { ...this.artistInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedArtist() {
            console.log("Saving:", this.modifiedArtist)
            const rawResponse = await fetch(this.API_URL + "/artists/" + this.modifiedArtist.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedArtist)
            });
            console.log(rawResponse);
            this.$emit("artistUpdated", this.modifiedArtist)
            this.isEditing = false
        },
        async deleteArtist() {   
            try {
                const rawResponse = await fetch(this.API_URL + "/artists/" + this.artistInModal.id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                if (rawResponse.ok) {
                    console.log("Artist deleted successfully");
                    this.$emit("artistUpdated", {});
                } else {
                    console.error("Failed to delete the artist");
                }
                this.isEditing = false;
    
            } catch (error) {
                console.error("An error occurred while deleting the artist", error);
            }
        },
        createNewArtist() {
            try{
                console.log("Creating", this.newArtist);
                fetch(this.API_URL + "/artists", {
                    method:"POST",
                    headers: {
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(this.newArtist)               
                })
                    .then(response => response.json())
                    .then(newArtist => {
                       console.log("Created", newArtist);
                       this.$emit("artistUpdated", newArtist);
                       this.cancelCreating();
                    });
            } catch (error){
                console.error(error);
            }
        },
        cancelCreating() {
            this.isCreating = false;
            this.newArtist = {
                name: "",
                dob: "",
                gender: ""
            };
        }
    }
}
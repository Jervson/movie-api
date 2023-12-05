import artistsList from "../components/ArtistsList.js"
import artistInfoModal from "../components/ArtistInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import artistForm from "../components/artist/ArtistForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newArtist">New Artist</button>
    <artists-list :key="update" @showModal="openModal"></artists-list>
    <artist-info-modal @artistUpdated="updateView" :artistInModal="artistInModal"></artist-info-modal>
    <new-object-modal id="newArtistModal" @save="saveNewArtist">
        <artist-form v-model:name="artistInModal.name" v-model:dob="artistInModal.dob" v-model:gender="artistInModal.gender"></artist-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal> 
    `,
    components: {
        artistsList,
        artistInfoModal,
        newObjectModal,
        artistForm
    },
    data() {
        return {
            update: 0,
            artistInModal: { id: "", name: "", dob: "", gender: ""},
            newArtistModal:{},
            error: ""
        }
    },
    methods: {
        openModal(artist) {
            this.artistInModal = artist
            let artistInfoModal = new bootstrap.Modal(document.getElementById("artistInfoModal"))
            artistInfoModal.show()
        },
        newArtist() {
            this.error = ""
            this.artistInModal = {}
            this.newArtistModal = new bootstrap.Modal(document.getElementById("newArtistModal"))
            this.newArtistModal.show()
        },
        updateView(artist) {
            this.update++
            this.artistInModal = artist
        },
        async saveNewArtist() {
            console.log("Saving:", this.artistInModal)
            const rawResponse = await fetch(this.API_URL + "/artists/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.artistInModal)
            });
            if (rawResponse.ok) {
                this.newArtistModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}
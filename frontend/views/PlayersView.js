import artistsList from "../components/ArtistsList.js"
import artistInfoModal from "../components/ArtistInfoModal.js"
export default {
    /*html*/
    template: `
    <artists-list :key="update" @showModal="openModal"></artists-list>
    <artist-info-modal @artistUpdated="updateView" :artistInModal="artistInModal"></artist-info-modal>
    `,
    components: {
        artistsList,
        artistInfoModal
    },
    data() {
        return {
            update: 0,
            artistInModal: { id: "", name: "" }
        }
    },
    methods: {
        openModal(artist) {
            this.artistInModal = artist
            let artistInfoModal = new bootstrap.Modal(document.getElementById("artistInfoModal"))
            artistInfoModal.show()
        },
        updateView(artist) {
            this.update++
            this.artistInModal = artist
        }
    }
}
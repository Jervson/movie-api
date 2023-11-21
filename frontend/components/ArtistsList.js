export default {
    /*html*/
    template: `
    <table id="artistsTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
        </tr>
        <tr v-for="artist in artists">
            <td @click="getArtist(artist.id)">{{ artist.name }}</td>
            <td>{{artist.dob}}</td>
            <td>{{artist.gender}}</td>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            artists: []
        }
    },
    async created() {
        this.artists = await (await fetch("http://localhost:8080/artists")).json()
    },
    methods: {
        getArtist: async function (id) {
            const artistInModal = await (await fetch(this.API_URL + "/artists/" + id)).json()
            this.$emit("showModal", artistInModal)
        }
    }
}
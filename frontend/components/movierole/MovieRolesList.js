export default {
    /*html*/
    template: `
    <table id="movieRolesTable" class="table table-striped table-bordered">
        <tr>
            <th>Artist</th>
            <th>Role</th>
            <th>Movie</th>
        </tr>
        <tr v-for="movieRole in movieRoles">
            <td> {{ movieRole.Artist.name}} </td>
            <td @click="getMovieRole(movieRole.id)">{{ movieRole.role }}</td>
            <td> {{ movieRole.Movie.name}} </td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            movieRoles: []
        }
    },
    async created() {
        this.movieRoles = await (await fetch("http://localhost:8080/movieroles")).json()
    },
    methods: {
        getMovieRole: async function (id) {
            const movieRoleInModal = await (await fetch(this.API_URL + "/movieroles/" + id)).json()
            this.$emit("showModal", movieRoleInModal)
        }
    }
}
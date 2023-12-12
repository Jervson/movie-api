export default{
    /*html*/
    template: `
    <table class="table table-striped">
        <tr>
            <th>Id</th>
            <td>{{id}}</td>
        </tr>
        <tr>
            <th>Artist</th>
            <td>
            <select :value="artistid" @input="$emit('update:artistid',$event.target.value)">
                <option disabled>Select a genre</option>
                <option v-for="artist in artists" :value="artist.id">{{artist.name}}</option>
            </select>
        </td>
        </tr>
        <tr>
            <th>Role</th>
            <td><input type="text" :value="role" @input="$emit('update:role',$event.target.value)"></td>
        </tr>
        <tr>
            <th>Movie</th>
            <select :value="movieid" @input="$emit('update:movieid',$event.target.value)">
                <option disabled>Select a movie</option>
                <option v-for="movie in movies" :value="movie.id">{{movie.name}}</option>
            </select>
        </tr>
    </table>`,
    props: ["id","role","artistid","movieid"],
    emits: ["update:role","update:artistid","update:movieid"],
    async created() {
        this.movies = await (await fetch(this.API_URL + "/movies")).json()
        this.artists = await (await fetch(this.API_URL + "/artists")).json()
    },
    data() {
        return{
            movies:[],
            artists:[]
        }
    },
}
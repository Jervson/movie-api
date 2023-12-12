export default {
    /*html*/
    template: `<table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{movieRoleInModal && movieRoleInModal.id}}</td>
    </tr>  
    <tr>
        <th>Artists</th>
        <div v-for="artist in artists">
            {{artist.name}}
        </div>
    </tr>
    <tr>
        <th>Role</th>
        <td>{{movieRoleInModal && movieRoleInModal.role}}</td>
    </tr>

    <tr>
        <th>Movies</th>
        <div v-for="movie in movies">
            {{movie.name}}
    </div>
</tr>
</table>`,
props:["movieRoleInModal","artists", "movies"],
}
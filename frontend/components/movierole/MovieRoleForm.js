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
            <td>{{artist}}</td>
        </tr>
        <tr>
            <th>Role</th>
            <td><input type="text" :value="role" @input="$emit('update:role',$event.target.value)"></td>
        </tr>
        <tr>
            <th>Movie</th>
            <td>{{movie}}</td>
        </tr>
    </table>`,
    props: ["id","role","artist","movie"]
}
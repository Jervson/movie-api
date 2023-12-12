export default {
    /*html*/
    template: `<table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{movieRoleInModal.id}}</td>
    </tr>  
    <tr>
        <th>Artists</th>
        <td>
            {{artistName}}
        </td>
    </tr>
    <tr>
        <th>Role</th>
        <td>{{movieRoleInModal.role}}</td>
    </tr>

    <tr>
        <th>Movies</th>
        <td>
            {{movieName}}
        </td>
    </tr>
</table>`,
props:["movieRoleInModal","artistName", "movieName"],
}
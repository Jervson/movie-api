export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{artistInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{artistInModal.name}}</td>
    </tr>
    <tr>
        <th>Date Of Birth</th>
        <td>{{artistInModal.dob}}</td>
    </tr>
    <tr>
        <th>Gender</th>
        <td>{{artistInModal.gender}}</td>
    </tr>
</table>`,
    props: ["artistInModal"]
} 
export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{movieInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{movieInModal.name}}</td>
    </tr>
    <tr>
        <th>Description</th>
        <td>{{movieInModal.description}}</td>
    </tr>
</table>`,
    props: ["movieInModal"]
} 
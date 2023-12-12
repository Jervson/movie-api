export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td><input :value="name" @input="$emit('update:name',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Date Of Birth</th>
        <td><input :value="dob" @input="$emit('update:dob',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Gender</th>
        <td><input :value="gender" @input="$emit('update:gender',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "dob", "gender"],
    emits: ["update:name", "update:dob", "update:gender"]
}
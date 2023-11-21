export default {
    /*html*/
    template: `
    <h1>Hello App!</h1>
    <p>
      <router-link to="/movies">Go to Movies List</router-link>
      <router-link to="/artists">Go to Artists List</router-link>
    </p>
    <router-view></router-view>
    `
}
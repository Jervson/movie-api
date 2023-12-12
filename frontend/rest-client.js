import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import MoviesView from './views/MoviesView.js'
import ArtistsView from './views/ArtistsView.js'
import MovieRolesView from './views/MovieRolesView.js'

const routes = [
    { path: "/movies", component: MoviesView },
    { path: "/artists", component: ArtistsView },
    { path: "/movieroles", component: MovieRolesView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')
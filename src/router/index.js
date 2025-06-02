import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import AboutPage from "../components/AboutPage.vue";
import ContactPage from "../components/ContactPage.vue";    

const routes = [
    { path: "/", component: HomePage, name: "Início" },
    { path: "/sobre", component: AboutPage, name: "Sobre" },
    { path: "/contato", component: ContactPage, name: "Contato" }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import AboutPage from "../components/AboutPage.vue";
import ContactPage from "../components/ContactPage.vue";    
import MessagePage from "../components/MessagePage.vue";

const routes = [
    { path: "/", component: HomePage, name: "Início" },
    { path: "/sobre", component: AboutPage, name: "Sobre" },
    { path: "/contato", component: ContactPage, name: "Contato" },
    { path: "/mensagens", component: MessagePage, name: "Mensagem" }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
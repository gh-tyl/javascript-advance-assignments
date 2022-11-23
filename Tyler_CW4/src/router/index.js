import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ProductPage from "../components/ProductPage.vue";
import CartPage from "../components/CartPage.vue";
import LoginForm from "../components/LoginForm.vue";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/product",
        name: "ProductPage",
        component: ProductPage,
    },
    {
        path: "/login",
        name: "LoginForm",
        component: LoginForm,
    },
    {
        path: "/cart",
        name: "CartPage",
        component: CartPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

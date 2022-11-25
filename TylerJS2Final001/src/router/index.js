import { createWebHistory, createRouter } from "vue-router";
import LoginPage from '../components/LoginPage.vue'
import StudentPage from '../components/StudentPage.vue'
import TeacherPage from '../components/TeacherPage.vue'
import SignoutPage from '../components/SignoutPage.vue'


const routes = [
    {
        path: "/",
        name: "LoginPage",
        component: LoginPage,
    },
    {
        path: "/student",
        name: "StudentPage",
        component: StudentPage,
    },
    {
        path: "/teacher",
        name: "TeacherPage",
        component: TeacherPage,
    },
    {
        path: "/signout",
        name: "SignoutPage",
        component: SignoutPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

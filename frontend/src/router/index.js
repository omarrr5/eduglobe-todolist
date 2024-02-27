import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import Register from '../views/Register';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,  
})

export default router;
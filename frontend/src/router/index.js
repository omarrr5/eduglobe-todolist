import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard';
import TaskDetail from '../views/TaskDetail';
import Login from '../views/Login';
import Register from '../views/Register';
import DeafultLayout from '../components/DeafultLayout';
import AuthLayout from '../components/AuthLayout';
import store from "@/store";

const routes = [

    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
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
        ]
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: DeafultLayout,
        meta: {requiresAuth: true},
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/task/:title', 
                name: 'TaskDetail',
                component: TaskDetail,
                props: true 
            },
        ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,  
})

router.beforeEach((to , from , next) => {
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    }
    else if (store.state.user.token && (to.meta.isGuest)) {
        next({name: 'Dashboard'});
    }
    else {
        next();
    }
})

export default router;
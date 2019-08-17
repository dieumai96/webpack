import Vue from 'vue'
import Router from 'vue-router'
import Notification from './components/notifications/Notification.vue'
import Dashboard from './components/Dashboard.vue';
import Login from './components/auth/login/Login.vue';
import Contact from './components/contact/Contact.vue';
import About from './components/about/About.vue';
Vue.use(Router)

export default new Router({
    mode : 'history',
    routes: [
        {
            path: '/login',
            component: Login,
            name: 'login',
        },
        {
            path: '/dashboard',
            component: Dashboard,
            name: Dashboard,
            children: [
                {
                    path: 'notification',
                    component: Notification,
                    name: 'notification',
                },
                {
                    path: 'contact',
                    name: 'contact',
                    component: Contact
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About
                },
                {
                    path : '/',
                    redirect : '/notification',
                    component : Notification
                }
            ]
        },
        {
            path: '/',
            redirect: "/login",
            name: 'login',
            component: Login
        }
    ]
})

import Vue from 'vue'
import Router from 'vue-router'
// import Notification from './components/notifications/Notification.vue'
// import Dashboard from './components/Dashboard.vue';
// import Login from './components/auth/login/Login.vue';
// import Contact from './components/contact/Contact.vue';
// import About from './components/about/About.vue';
// import TestParams from './components/params/TestParams.vue';
import Dashboard from './components/home/Dashboard.vue';
import InputOutput from './components/input-output/input-output.vue';
import Computed from './components/computed/computed.vue'
import Directive from './components/directive/directive.vue';
import Style from './components/styles/style.vue';
import LifeCycle from './components/lifecycle/life-cycle.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'Dashboard',
            children: [
                {
                    path: 'input-output',
                    component: InputOutput,
                    name: 'input-output',
                },
                {
                    path: 'computed',
                    component: Computed,
                    name: 'computed',
                },
                {
                    path: 'directive',
                    component: Directive,
                    name: 'directive',
                },
                {
                    path: 'style',
                    component: Style,
                    name: 'style',
                },
                {
                    path: 'life-cycle',
                    component: LifeCycle,
                    name: 'life-cycle',
                },

            ]
        },
        {
            path: '/',
            redirect: "/dashboard",
            name: 'Dashboard',
            component: Dashboard
        }
        // {
        //     path: '/login',
        //     component: Login,
        //     name: 'login',
        // },

        // {
        //     path: '/dashboard',
        //     component: Dashboard,
        //     name: Dashboard,
        //     children: [
        //         {
        //             path: 'notification',
        //             component: Notification,
        //             name: 'notification',
        //         },
        //         {
        //             path: 'contact',
        //             name: 'contact',
        //             component: Contact
        //         },
        //         {
        //             path: 'about',
        //             name: 'about',
        //             component: About
        //         },
        //         {
        //             path: 'test-params',
        //             name: 'TestParams',
        //             component: TestParams,
        //         },
        //         {
        //             path: '/',
        //             redirect: '/notification',
        //             component: Notification
        //         }
        //     ]
        // },


    ]
})

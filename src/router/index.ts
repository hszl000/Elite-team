//index.js
import {defineAsyncComponent} from "vue"

import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: '/login', //登录页
        name: 'Login',
        meta: { title: '首页' },
        component:defineAsyncComponent( () =>import ('../views/Login.vue')),
    },
    {
        path: '/home', //布局的首页
        name: 'Home',
        redirect: '/index', // 重定向到 首页
        meta: { title: '首页' },
        component:defineAsyncComponent( () =>import ('../views/Home/Index.vue')),
        children:[
            {
                path: '/index', //首页
                name: 'Index',
                meta: { title: '首页' },
                component:defineAsyncComponent( () =>import ('../views/Home/Index/Index.vue'))
            },
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
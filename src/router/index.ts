//index.js
import {
    createRouter,
    createWebHistory
} from 'vue-router'
   // 引入message弹框
   import { ElMessage } from 'element-plus'
const routes = [
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: '/login', //登录页
        name: 'Login',
        component:() =>import ('../views/Login.vue'),
    },
    {
        path: '/home', //布局的首页
        name: 'Home',
        redirect: '/index', // 重定向到 首页
        meta: { title: '首页' },
        component:() =>import ('../views/Home/Index.vue'),
        children:[
            {
                path: '/index', //首页
                name: 'Index',
                meta: { title: '首页' },
                component:() =>import ('../views/Home/Index/Index.vue'),
            },
            {
                path: '/user', //用户展示
                name: 'User',
                redirect:'/user/userlist',
                meta: { title: '用户管理' },
                component:() =>import ('../views/Home/User/Index.vue'),
                children:[
                    {
                        path: '/user/userlist', //用户列表
                        name: 'Userlist',
                        meta: { title: '用户列表' },
                        component:() =>import ('../views/Home/User/Userlist.vue'),
                    }
                    
                ]
            },
            {
                path: '/role', //角色管理
                name: 'Role',
                meta: { title: '角色管理' },
                redirect:'/role/rolelist',
                component:() =>import ('../views/Home/Role/Index.vue'),
                children:[
                    {
                        path: '/role/rolelist', //角色列表
                        name: 'Rolelist',
                        meta: { title: '角色列表' },
                        component:() =>import ('../views/Home/Role/Rolelist.vue'),
                    }
                    
                ]
            },
            {
                path: '/goods', //商品管理
                name: 'Goods',
                meta: { title: '商品管理' },
                redirect:'/goods/goodslist',
                component:() =>import ('../views/Home/Goods/Index.vue'),
                children:[
                    {
                        path: '/goods/goodslist', //商品列表
                        name: 'Goodslist',
                        meta: { title: '商品列表' },
                        component:() =>import ('../views/Home/Goods/Goodslist.vue'),
                    },
                    {
                        path: '/goods/goodsclass', //商品列表
                        name: 'Goodsclass',
                        meta: { title: '商品分类' },
                        component:() =>import ('../views/Home/Goods/Goodsclass.vue'),
                    }
                    
                ]
            },
        ]
    },
    // 配置跳转404页面
    {
        path: '/404',
        name: '404',
        component: () => import('../components/404.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('user')) {
        if (to.path !== '/login') {
            next('/login')
            ElMessage.error({ message: '请登录' });
        }
    }
    next()
    if (to.path == '/login') {
        sessionStorage.removeItem('user')
    }
})
export default router
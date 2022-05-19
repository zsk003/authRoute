import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)
const Login = () => import('@/views/Login.vue')
const Home = () => import('@/layout/index.vue')
const SecondView = () => import('@/layout/components/secondView.vue')
const FirstPage = () => import('@/views/firstPage/Index.vue')
const RoleManager = () => import('@/views/systemManager/roleManager.vue')
const UserManager = () => import('@/views/systemManager/userManager.vue')
const Demo1 = () => import('@/views/demo/demo1.vue')
const Demo2 = () => import('@/views/demo/demo2.vue')

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'layout',
        component: Home,
        children: []
    }
]

/** 如果要嵌套三级路由，要把二级路由的component写成SecondView，可以参照‘系统管理’写 **/

export const candidateRoutes = [
    {
        path: '/firstPage',
        name: 'firstPage',
        component: FirstPage,
        meta: {
            title: '首页',
            icon: '',
            index: 1,
        }
    },
    {
        path: '/systemManager',
        name: 'systemManager',
        component: SecondView,
        meta: {
            title: '系统管理',
            icon: '',
            index: 10
        },
        children: [
            {
                path: '/systemManager/roleManager',
                component: RoleManager,
                name: 'roleManager',
                meta: {
                    title: '角色管理',
                    icon: '',
                    index: 11
                }
            },
            {
                path: '/systemManager/userManager',
                component: SecondView,
                name: 'userManager',
                meta: {
                    title: '用户管理',
                    icon: '',
                    index: 12
                },
                children: [
                    {
                        path: '/systemManager/userManager/userManager',
                        component: UserManager,
                        meta: {
                            title: '用户管理',
                            index: 121
                        }
                    },
                    {
                        path: '/systemManager/userManager/userManager11',
                        component: Demo2,
                        meta: {
                            title: '用户管理1',
                            index: 122
                        }
                    }
                ]
            },
            
        ]
    },
    {
        path: '/demo',
        name: 'demo',
        meta: {
            title: 'demo',
            icon: '',
            index: 3
        },
        component: SecondView,
        children: [
            {
                path: '/demo/demo1',
                component: Demo1,
                name: 'demo1',
                meta: {
                    title: 'demo1',
                    icon: '',
                    index: 31
                }
            },
            {
                path: '/demo/demo2',
                component: Demo2,
                name: 'demo2',
                meta: {
                    title: 'demo2',
                    icon: '',
                    index: 32
                }
            }
        ]
    }
   
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

let routeFresh = true

// 路由的导航守卫， 注意最后一定要执行next()，否则页面无法跳转
router.beforeEach((to: { path: any; query: any; meta?: {} | undefined }, from: any, next: (arg0: { path: string } | undefined) => void) => {
    const {path, query, meta = {}} = to
    // 这里只是演示没有token(登录的时候存在了window.sessionStorage中)跳回login页面，还有好多配置可以自己加
    const token = window.sessionStorage.getItem('token')
    if (!token && path !== '/login') {
        next({path: '/login'})
    } else {
        if (routeFresh) {
            store.dispatch('auth/addAuthRoutes').then(res => {
                if (!res) {
                    // 无权限进入系统
                    window.sessionStorage.clear()
                    // window.location.reload()
                    // @ts-ignore
                    next({path: '/login', replace: true})
                }
                routeFresh = false
                store.commit('auth/setSecondLevelRoutes', path)
                if (token && path === '/') {
                    next({path: res.path})
                } else {
                    // @ts-ignore
                    next({...to, replace: true})
                }
            })
        } else {
            store.commit('auth/setSecondLevelRoutes', path)
            // @ts-ignore
            next();
        }
    }
})

export default router

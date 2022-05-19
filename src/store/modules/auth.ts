import router, { candidateRoutes } from "@/router";

interface AddItem {
    path: String;
    name: String;
    meta: {
        index: Number;
        title: String;
        icon?: String;
    };
    component: any;
    children?: AddItem[];
    redirect?: String;
    childList?: any[];
}

export const auth = {
    namespaced: true,
    state: {
        homeRoutes: [],
        secondLevelRoutes: []
    },
    mutations: {
        setHomeRoutes(state: { homeRoutes: any }, args: any) {
            state.homeRoutes = args
        },
        setSecondLevelRoutes(state: { secondLevelRoutes: never[]; homeRoutes: any[] }, path: string) {
            if (!path) return state.secondLevelRoutes = []
            const fatherRoute = state.homeRoutes.find((r: { path: string }) => r.path === '/' + path.split('/')[1])
            if (!fatherRoute || !fatherRoute.children || !fatherRoute.children.length) return state.secondLevelRoutes = []
            state.secondLevelRoutes = fatherRoute.children
            state.secondLevelRoutes.forEach((s: any) => {
                s.root = fatherRoute
            })
        }
    },
    actions: {
        addAuthRoutes(context: { commit: (arg0: string, arg1: { path: any; name: any; meta: any; component: any; }[]) => void; }) {
            const authRoutes = window.sessionStorage.getItem('authRoutes')
            if (!authRoutes || (authRoutes && !JSON.parse(authRoutes).length)) return null
            const authRouteList = JSON.parse(authRoutes)
            const routeAuth = (routerList: any[], fatherRoute: any, firstLevel = false) => {
                const authList: { path: any; name: any; meta: any; component: any; }[] = []
                routerList.forEach((r: AddItem) => {
                    if (!r.meta || !r.meta.index || !authRouteList.includes(r.meta.index)) return
                    const addItem: AddItem = {
                        path: r.path,
                        name: r.name,
                        meta: r.meta,
                        component: r.component,
                    }

                    if (!addItem.childList) addItem.childList = [] // 用来保存子孙路由
                    addItem.childList.push(addItem.path)
                    if (r.children && r.children.length) {
                        const authChildren = routeAuth(r.children, addItem)
                        if (authChildren && authChildren.length) {
                            console.log(authChildren);
                            
                            addItem.children = authChildren
                            addItem.redirect = authChildren[0].path
                        }
                    }
                    if (fatherRoute) {
                        if (!fatherRoute.childList) fatherRoute.childList = []
                        fatherRoute.childList = fatherRoute.childList.concat(addItem.childList) // 将自己的childList加进父路由已保存的childList
                    }
                    // @ts-ignore
                    firstLevel && router.addRoute('layout', addItem)
                    authList.push(addItem)
                })
                return authList
            }

            const addRoutes = routeAuth(candidateRoutes,null, true)
            console.log(addRoutes, '! !!!!!!!!!!!!!!!!!!!');
            context.commit('setHomeRoutes', addRoutes)

            return addRoutes[0]
        }
    },
}

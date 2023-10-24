import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../view/HomePage.vue')
    },
    {
        path: '/DetailPage',
        name: 'DetailPage',
        component: () => import('../view/DetailPage.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

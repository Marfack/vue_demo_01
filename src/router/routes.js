export default [
    {
        name: 'home',
        path: '/',
        component: () => import('@/views/home/Home')
    },
    {
        name: 'heat',
        path: '/heat',
        component: () => import('@/views/heat/Heat')
    },
    {
        name: 'userEvaluation',
        path: '/user_evaluation',
        component: () => import('@/views/user_evaluation/UserEvaluation')
    },
    {
        name: 'compEvaluation',
        path: '/comp_evaluation',
        component: () => import('@/views/comprehensive_evaluation/CompEvaluation')
    },
    {
        name: 'Forbidden',
        path: '/403',
        component: () => import('@/views/errors/403')
    },
    {
        name: 'notfound',
        path: '/404',
        component: () => import('@/views/errors/404')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
]
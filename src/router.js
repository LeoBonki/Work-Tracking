import { createRouter, createWebHistory } from 'vue-router'
import ViewProject from './components/views/ViewProject.vue'
import ViewTask from './components/views/ViewTask.vue'
import ViewJobPost from './components/views/ViewJobPost.vue'
import ViewError404 from './components/views/ViewError404.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ViewProject,
    },
    {
        path: '/project/:id',
        name: 'Project',
        component: ViewTask
    },
    {
        path: '/job_post',
        name: 'JobPost',
        component: ViewJobPost,
    },
    {
        // path: "*",
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: ViewError404,
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
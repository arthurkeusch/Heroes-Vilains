import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ListTeamView from "@/views/ListTeamView.vue";
import OrgaView from "@/views/OrgaView.vue";
import LoginView from "@/views/LoginView.vue";
import CurrentOrga from "@/views/CurrentOrgaView.vue";
import CurrentTeam from "@/components/CurrentTeam.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/organisation',
        name: 'OrgaView',
        component: OrgaView
    },
    {
        path: '/organisation/current',
        name: 'currentOrga',
        component: CurrentOrga
    },
    {
        path: '/team/list',
        name: 'listTeamView',
        component: ListTeamView
    },
    {
        path: '/team/current',
        name: 'currentTeam',
        component: CurrentTeam
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
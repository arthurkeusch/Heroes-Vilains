import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ListTeamView from "@/views/ListTeamView.vue";
import OrgaView from "@/views/OrgaView.vue";
import LoginView from "@/views/LoginView.vue";
import CurrentOrga from "@/views/CurrentOrgaView.vue";
import CurrentTeam from "@/views/CurrentTeam.vue";
import CurrentHeroView from "@/views/CurrentHeroView.vue";
import store from "@/store";
import Error404 from "@/views/Error404.vue";
import HerosLoginView from "@/views/HerosLoginView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            levelAuth: 0
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            levelAuth: 0
        }
    },
    {
        path: '/organisation',
        name: 'OrgaView',
        component: OrgaView,
        meta: {
            levelAuth: 0
        }
    },
    {
        path: '/organisation/current',
        name: 'currentOrga',
        component: CurrentOrga,
        meta: {
            levelAuth: 1
        }
    },
    {
        path: '/team/list',
        name: 'listTeamView',
        component: ListTeamView,
        meta: {
            levelAuth: 0
        }
    },
    {
        path: '/team/current',
        name: 'currentTeam',
        component: CurrentTeam,
        meta: {
            levelAuth: 1
        }
    },
    {
        path: '/hero/current',
        name: 'currentHero',
        component: CurrentHeroView,
        meta: {
            levelAuth: 1
        }
    },
    {
        path: '/login/hero',
        name: 'loginHero',
        component: HerosLoginView,
        meta: {
            levelAuth: 0
        }
    },
    {
        path: '/404',
        name: 'errorPage404',
        component: Error404,
        meta: {
            levelAuth: 0
        }
    },
    {
        path: '*',
        name: 'error404'
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

function checkAccess(to) {
    if (to.meta.levelAuth === 1) {
        if (store.state.secret.auth || store.state.user.authUser) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

router.beforeEach((to, from, next) => {
    if (to.name === 'error404') {
        next('/404');
    } else if (checkAccess(to)) {
        next();
    } else {
        store.commit('updateShowErrorDialogue', true);
        store.commit('updateErrorTitle', "Accès interdit");
        store.commit('updateErrorDescr', "Vous devez être connecté pour accéder à cette page !");
        next('/login');
    }
});

export default router;
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth: false,
        passwordOrganisation: null,
        currentHero: null,
        currentTeam: null,
        currentOrganisation: null,
        listHeroAlias: [],
        listTeam: [],
        listOrganisations: []
    },

    mutations: {
        updatePasswordOrganisation(state, password) {
            state.passwordOrganisation = password;
        },

        updateListHeroAlias(state, listHero) {
            state.listHeroAlias = listHero;
        },

        updateCurrentHero(state, currentHero) {
            state.currentHero = currentHero;
        },

        updateListTeam(state, listTeam) {
            state.listTeam = listTeam;
        },

        updateCurrentTeam(state, currentTeam) {
            state.currentTeam = currentTeam;
        },

        updateListOrganisations(state, listOrganisations) {
            state.listOrganisations = listOrganisations;
        },

        updateCurrentOrganisation(state, currentOrganisation) {
            state.currentOrganisation = currentOrganisation;
        },

        setLogin(state, phrase) {
            state.auth = true;
            state.passwordOrganisation = phrase;
        },

        setLogout(state) {
            state.auth = false;
            state.passwordOrganisation = null;
        }
    },

    actions: {
        async login({commit}, credentials) {
            /*await new Promise( resolve => {
                setTimeout(resolve, 1000)
            });*/ //Pour mettre une pause de 1 seconde
            if (credentials.phrase === 'toto') {
                commit('setLogin', credentials.phrase);
            } else {
                commit('setLogout');
            }
        },
    },
})
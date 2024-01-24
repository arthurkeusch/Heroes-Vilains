import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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
    },

    actions: {

    },
})
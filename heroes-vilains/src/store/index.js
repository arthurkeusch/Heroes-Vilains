import Vue from 'vue'
import Vuex from 'vuex'
import {createOrganisation, getAllOrganisations, getOrganisationByID} from "@/services/org.service";
import {createTeam, getTeams} from "@/services/team.service";

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
            if (credentials.phrase !== null) {
                commit('setLogin', credentials.phrase);
            } else {
                commit('setLogout');
            }
        },

        async getAllOrganisations({commit}) {
            let listOrganisation = await getAllOrganisations();
            commit('updateListOrganisations', listOrganisation.data);
        },

        async createOrganisation(context, { name, password }) {
            return await createOrganisation(name, password);
        },

        async getOrganisationByID({commit, state}, idOrg) {
            let answer = await getOrganisationByID(idOrg, state.passwordOrganisation);
            if (answer.error === 0) {
                commit('updateCurrentOrganisation', answer.data);
            }
            return answer;
        },

        async getAllTeam({commit}) {
            let answer = await getTeams();
            commit('updateListTeam', answer.data);
        },

        updateCurrentTeam({commit}, team) {
            commit('updateCurrentTeam', team);
        },

        async createTeam(name) {
            await createTeam(name);
        }
    },
})
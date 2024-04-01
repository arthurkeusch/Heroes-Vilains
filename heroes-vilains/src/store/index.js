import Vue from 'vue';
import Vuex from 'vuex';
import {
    addTeam,
    createOrganisation,
    getAllOrganisations,
    getOrganisationByID,
    removeTeam
} from "@/services/org.service";
import {addHeroes, createTeam, getTeams, removeHeroes} from "@/services/team.service";
import {createHero, getAliases, getHeroByID, updateHero} from "@/services/hero.service";

import errorModule from '../store/error';
import secretModule from '../store/secret';
import userModule from '../store/user';

Vue.use(Vuex);

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

        async createOrganisation(context, {name, password}) {
            return await createOrganisation(name, password);
        },

        async getOrganisationByIDFromStore({commit, state}, idOrg) {
            let answer = await getOrganisationByID(idOrg, state.passwordOrganisation);
            if (answer.error === 0) {
                commit('updateCurrentOrganisation', answer.data[0]);
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
        },

        async addTeamByID({state, commit}, id_team) {
            await addTeam(id_team, state.passwordOrganisation);
            let answer = await getOrganisationByID(state.currentOrganisation['_id'], state.passwordOrganisation);
            if (answer.error === 0) {
                commit('updateCurrentOrganisation', answer.data[0]);
            }
            return answer;
        },

        async removeTeamByID({state, commit}, id_team) {
            await removeTeam(id_team, state.passwordOrganisation);
            let answer = await getOrganisationByID(state.currentOrganisation['_id'], state.passwordOrganisation);
            if (answer.error === 0) {
                commit('updateCurrentOrganisation', answer.data[0]);
            }
            return answer;
        },

        async getInfoHeroById({state, commit}) {
            let listTemp = [];
            for (let i = 0; i < state.currentTeam['members'].length; i++) {
                let answer = await getHeroByID(state.currentTeam['members'][i], state.passwordOrganisation);
                listTemp.push(answer.data[0]);
            }
            commit('updateListHeroAlias', listTemp);
        },

        setCurrentHero({commit}, hero) {
            commit('updateCurrentHero', hero);
        },

        async getAllHeroAlias() {
            let answer = await getAliases();
            return answer.data;
        },

        async createHeros(context, {publicName, realName, powers}) {
            return await createHero(publicName, realName, powers);
        },

        async addHerosToTeam({state, commit}, idHeros) {
            let answer = await addHeroes(idHeros, state.currentTeam['_id']);
            commit('updateCurrentTeam', answer);
            let listTemp = [];
            for (let i = 0; i < state.currentTeam['members'].length; i++) {
                answer = await getHeroByID(state.currentTeam['members'][i], state.passwordOrganisation);
                listTemp.push(answer.data[0]);
            }
            commit('updateListHeroAlias', listTemp);
        },

        async deleteHero({state, commit}, idHero) {
            let answer = await removeHeroes(idHero, state.currentTeam['_id']);
            commit("updateCurrentTeam", answer);
        },

        async updateHero({state, commit}, hero) {
            let answer = await updateHero(hero['_id'], hero['publicName'], hero['realName'], hero['powers'], state.passwordOrganisation);
            commit("updateCurrentHero", answer);
        }
    },

    modules: {
        error: errorModule,
        secret: secretModule,
        user: userModule
    }
})
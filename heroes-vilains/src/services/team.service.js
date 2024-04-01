import {getRequest, postRequest, patchRequest} from "./axios.service";

async function getTeamsFromAPI() {
    return getRequest('/teams/get', 'getTeams');
}

async function getTeams() {
    let answer = await getTeamsFromAPI();
    return answer.data;
}





async function createTeamFromAPI(data) {
    return postRequest('/teams/create',data, 'createTeam');
}

async function createTeam(name) {
    let data = {
        name : name
    };
    let answer = await createTeamFromAPI(data);
    return answer.data;
}




async function addHeroesFromAPI(data) {
    return patchRequest('/teams/addheroes', data, 'addHeroes');
}

async function addHeroes(idHeroes, idTeam) {
    let data = {
        idHeroes: [idHeroes],
        idTeam: idTeam
    };
    console.log(data)
    let answer = await addHeroesFromAPI(data);
    return answer.data;
}


async function removeHeroesFromAPI(data) {
    return patchRequest('/teams/removeheroes', data, 'removeHeroes')
}

async function removeHeroes(idHeroes, idTeam) {
    let data = {
        idHeroes: idHeroes,
        idTeam: idTeam
    };
    let answer = await removeHeroesFromAPI(data);
    return answer.data;
}




export {
    getTeams,
    createTeam,
    addHeroes,
    removeHeroes
}
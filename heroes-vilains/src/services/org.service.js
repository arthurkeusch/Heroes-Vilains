import {getRequest, patchRequest, postRequest} from "./axios.service";

async function getAllOrganisationsFromAPI() {
    return getRequest('/orgs/get', 'getAllOrganisations');
}

async function getAllOrganisations() {
    let answer = await getAllOrganisationsFromAPI();
    return answer.data;
}


async function createOrganisationFromAPI(data) {
    return postRequest('/orgs/create', data, 'createOrganisation');
}

async function createOrganisation(name, secret) {
    let data = {
        name: name,
        secret: secret
    };
    let answer = await createOrganisationFromAPI(data);
    return answer.data;
}


async function addTeamFromAPI(data) {
    return patchRequest('/orgs/addteam', data, 'addTeam');
}

async function addTeam(id) {
    let data = {
        idTeam: id
    };
    let answer = await addTeamFromAPI(data);
    return answer.data;
}


async function removeTeamFromAPI(data) {
    return patchRequest('/orgs/removeteam', data, 'removeTeam');
}

async function removeTeam(id) {
    let data = {
        idTeam: id
    };
    let answer = await removeTeamFromAPI(data);
    return answer.data;
}


async function getOrganisationByIDFromAPI(id) {
    return getRequest('/orgs/getbyid/' + id, 'getOrganisationByID');
}

async function getOrganisationByID(id) {
    let answer = await getOrganisationByIDFromAPI(id);
    return answer.data;
}


export {
    getAllOrganisations,
    createOrganisation,
    addTeam,
    removeTeam,
    getOrganisationByID
}
import {getRequest, patchRequest, postRequest} from "./axios.service";

async function getAllOrganisationsFromAPI() {
    return getRequest('/orgs/get', 'getAllOrganisations');
}

async function getAllOrganisations() {
    let answer = await getAllOrganisationsFromAPI();
    return answer.data;
}


async function createOrganisationFromAPI(data) {
    return postRequest('/orgs/create', data, 'createOrganisation')
}

async function createOrganisation(name, secret) {
    let data = {
        name: name,
        secret: secret
    };
    let answer = await createOrganisationFromAPI(data)
    return answer.data
}


async function addTeamFromAPI(data, orgSecret) {
    return patchRequest('/orgs/addteam?org-secret=' + orgSecret, data, 'addTeam')
}

async function addTeam(id, orgSecret) {
    let data = {
        idTeam: id
    };
    let answer = await addTeamFromAPI(data, orgSecret)
    return answer.data
}


async function removeTeamFromAPI(data, orgSecret) {
    return patchRequest('/orgs/removeteam?org-secret=' + orgSecret, data, 'removeTeam')
}

async function removeTeam(id, orgSecret) {
    let data = {
        idTeam: id
    };
    let answer = await removeTeamFromAPI(data, orgSecret)
    return answer.data
}


async function getOrganisationByIDFromAPI(id, orgSecret) {
    return getRequest('/orgs/getbyid/' + id + '?org-secret=' + orgSecret, 'getOrganisationByID');
}

async function getOrganisationByID(id, orgSecret) {
    let answer = await getOrganisationByIDFromAPI(id, orgSecret);
    return answer.data;
}


export {
    getAllOrganisations,
    createOrganisation,
    addTeam,
    removeTeam,
    getOrganisationByID
}
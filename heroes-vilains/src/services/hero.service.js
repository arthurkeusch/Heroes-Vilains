import {getRequest, postRequest, putRequest} from "./axios.service";

async function getAliasesFromAPI() {
    return getRequest('/heroes/getaliases', 'getAliases');
}

async function getAliases() {
    let answer = await getAliasesFromAPI();
    return answer.data;
}


async function createHeroFromAPI(data) {
    return postRequest('/heroes/create', data, 'createHero')
}

async function createHero(publicName, realName, powers) {
    let data = {
        publicName: publicName,
        realName: realName
    };
    if (powers !== undefined) {
        if (powers.length !== 0) data.powers = powers;
    }
    let answer = await createHeroFromAPI(data)
    return answer.data
}


async function updateHeroFromAPI(data, orgSecret) {
    return putRequest('/heroes/update?org-secret=' + orgSecret, data, 'updateHero')
}

async function updateHero(id, publicName, realName, powers, orgSecret) {
    let data = {
        _id: id
    };
    if (publicName !== null) data.publicName = publicName;
    if (realName !== null) data.realName = realName;
    if (powers !== null) data.powers = powers;
    let answer = await updateHeroFromAPI(data, orgSecret)
    return answer.data
}


async function getHeroByIDFromAPI(id, orgSecret) {
    return getRequest('/heroes/getbyid/' + id + '?org-secret=' + orgSecret, 'getHeroByID');
}

async function getHeroByID(id, orgSecret) {
    let answer = await getHeroByIDFromAPI(id, orgSecret);
    return answer.data;
}


export {
    getAliases,
    createHero,
    updateHero,
    getHeroByID
}
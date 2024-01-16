import {getRequest,postRequest,deleteRequest,patchRequest} from "./axios.services";

async function getAllConcertFromAPI() {
    return getRequest('/artistes/getAllConcert', 'getAllConcert');
}

async function getAllConcert() {
    let answer = await getAllConcertFromAPI();
    return answer.data;
}



async function getAllTypeMusiqueFromAPI() {
    return getRequest('/artistes/getAllTypeMusique', 'getAllTypeMusique');
}

async function getAllTypeMusique() {
    let answer = await getAllTypeMusiqueFromAPI();
    return answer.data;
}




async function getAllScenesFromAPI() {
    return getRequest('/artistes/getAllScenes', 'getAllScenes');
}

async function getAllScenes() {
    let answer = await getAllScenesFromAPI();
    return answer.data;
}




async function getInfoGroupeFromAPI(id_groupe) {
    return getRequest('/artistes/concert/getInfoGroupe?id='+id_groupe, 'getInfoGroupe');
}

async function getInfoGroupe(id_groupe) {
    let answer = await getInfoGroupeFromAPI(id_groupe);
    return answer.data;
}






async function getInfoArtistesGroupeFromAPI(id_groupe) {
    return getRequest('/artistes/concert/getInfoArtistesGroupe?id='+id_groupe, getInfoArtistesGroupe);
}

async function getInfoArtistesGroupe(id_groupe) {
    let answer = await getInfoArtistesGroupeFromAPI(id_groupe);
    return answer.data;
}





async function getInfoConcertFromAPI(id_concert) {
    return getRequest('/artistes/concert/getInfoConcert?id='+id_concert, getInfoConcert);
}

async function getInfoConcert(id_concert) {
    let answer = await getInfoConcertFromAPI(id_concert);
    return answer.data;
}





async function getAllConcertWithFilterFromAPI(data) {
    const params = new URLSearchParams(data);
    return getRequest(`/artistes/getAllConcertWithFilter?${params}`);
}


async function getAllConcertWithFilter(data) {
    let answer = await getAllConcertWithFilterFromAPI(data);
    console.log(data);
    return answer.data;
}

async function getAllArtistesFromAPI() {
    return getRequest('/artistes/getAllArtistes');
}


async function getAllArtistes() {
    let answer = await getAllArtistesFromAPI();
    return answer.data;
}

async function getCommentairesFromAPI(id_concert) {
    return getRequest('/artistes/concert/getCommentaires?id='+id_concert, "getCommentaires");
}

async function getCommentaires(id_concert) {
    let answer = await getCommentairesFromAPI(id_concert);
    return answer.data;
}

async function saveCommentFromAPI(data) {
    return postRequest('/artistes/concert/saveCommentaire',data, 'createConcert')
}

async function saveComment(id,prenom,nom,texte,id_stand) {
    let data = {
        id_utilisateur : id,
        prenom_utilisateur : prenom,
        nom_utilisateur: nom,
        texte_commentaire : texte,
        id_stand : id_stand,
    }
    let answer = await saveCommentFromAPI(data)
    return answer
}

async function deleteCommentaireFromAPI(id) {
    return deleteRequest('/artistes/concert/deleteCommentaire?id='+id, 'createConcert')
}

async function deleteCommentaire(id) {
    let answer = await deleteCommentaireFromAPI(id)
    return answer
}

async function modifierCommentaireFromAPI(data) {
    return patchRequest('/artistes/concert/modifierCommentaire',data, 'createConcert')
}

async function modifierCommentaire(id,texte) {
    let data = {
        id :id,
        texte :texte
    }
    let answer = await modifierCommentaireFromAPI(data)
    return answer
}

async function addArtisteToGroupeFromAPI(data) {
    return patchRequest('/artistes/addArtisteToGroupe',data, 'createConcert')
}

async function addArtisteToGroupe(id_artiste,id_groupe) {
    let data = {
        id_artiste :id_artiste,
        id_groupe :id_groupe
    }
    let answer = await addArtisteToGroupeFromAPI(data)
    return answer
}

export {
    getAllConcert,
    getAllTypeMusique,
    getAllScenes,
    getInfoGroupe,
    getInfoArtistesGroupe,
    getInfoConcert,
    getAllConcertWithFilter,
    getCommentaires,
    saveComment,
    deleteCommentaire,
    modifierCommentaire,
    getAllArtistes,
    addArtisteToGroupe
}
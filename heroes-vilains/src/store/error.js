export default {

    state: () => ( {
        showErrorDialogue: false,
        errorTitle: "Titre",
        errorDescr: "Descr"
    }),

    mutations: {
        updateShowErrorDialogue(state, isShow){
            state.showErrorDialogue = isShow;
        },

        updateErrorTitle(state, title){
            state.errorTitle = title;
        },

        updateErrorDescr(state, descr){
            state.errorDescr = descr;
        }
    },

    actions: {
        setShowErrorDialogue({commit}, isShow){
            commit('updateShowErrorDialogue', isShow);
        },

        setErrorTitle({commit}, title){
            commit('updateErrorTitle', title);
        },

        setErrorDescr({commit}, descr){
            commit('updateErrorDescr', descr);
        },

        getShowErrorDialogue({state}) {
            return state.showErrorDialogue;
        }
    },
}
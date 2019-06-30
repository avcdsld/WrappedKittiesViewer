import Vuex from 'vuex'
 
const appStore = () => {
    return new Vuex.Store({
        state: {
            kitty_list: {},
        },
        mutations: {
            kitty_list_update(state, payload) {
                state.kitty_list = {...payload}
            },
        },
    })
};
 
export default appStore;
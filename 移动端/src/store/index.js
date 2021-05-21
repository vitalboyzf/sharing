import {createStore} from 'vuex'
import {whoami} from "../service/user"

export default createStore({
    state: {
        user: {}
    },
    mutations: {
        getUserInfo(state, userInfo) {
            state.user = userInfo;
        }
    },
    actions: {
        async getUserInfo(context) {
            const {data} = await whoami();
            context.commit("getUserInfo", data);
        }
    },
    modules: {}
})

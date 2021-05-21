import {createStore} from "vuex";
import {whoami} from "../service/user";
import {getMomentByPage,getMomentByViews} from "../service/moment";
import {getLabelsByPage} from "../service/label";
import {randomColor} from "../utils/randomColor";
import {formatDate} from "../utils/data";

const store = createStore({
    state: {
        user: {},
        moments: [],
        hotMoments: [],
        labels: []
    },
    getters: {
        recommendMoments(state) {
            return state.moments.sort((a, b) => {
                return b.commentCount - a.commentCount;
            });
        }
    },
    mutations: {
        getUserInfo(ctx, data) {
            ctx.user = data;
        },
        getMoment(ctx, data) {
            ctx.moments = data;
        },
        getLabel(ctx, data) {
            ctx.labels = data;
        },
        setHotMoment(ctx, data) {
            ctx.hotMoments = data;
        }
    },
    actions: {
        async getUserInfo({
            commit
        }) {
            const res = await whoami();
            if (!res) return;
            commit("getUserInfo", res.data);
        },
        async getMoment(ctx, {
            offset = 0,
            limit = 8
        }) {
            const res = await getMomentByPage(offset, limit);
            res.data.map(moment => {
                moment.momentsLen = res.len;
            });
            if (!res && !res.data) return;
            ctx.commit("getMoment", res.data);
        },
        async getLabel(ctx, {
            offset = 0,
            limit = 16
        }) {
            const res = await getLabelsByPage(offset, limit);
            if (!res && !res.data) return;
            res.data.filter((label) => label.count !== 0)
                .map((label) => {
                    label.bgc = randomColor(0.5);
                    return label;
                });
            ctx.commit("getLabel", res.data);
        },
        async setHotMoment(ctx) {
            const {
                data
            } = await getMomentByViews(0, 3);
            data.map((moment) => {
                moment.createTime = formatDate(moment.createTime);
            });
            ctx.commit("setHotMoment", data);
        }
    }
});
export default store;
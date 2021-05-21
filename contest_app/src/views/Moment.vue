<template>
  <div class="momentWrapper">
    <div class="swiperUserWrapper">
      <swiper class="swiper" />
      <UserSideShow />
    </div>
    <div class="momentRecommend">
      <HotRecommend />
      <div class="side">
        <LabelSideList
          @handleChangeTag="handleChangeTag"
          bgc="rgba(53, 12, 17, 0.3)"
        />
        <CommentSideList />
      </div>
    </div>
    <div class="hotAndLink">
      <!-- 最新动态 -->
      <div class="newMoment">
        <div class="title">最新动态</div>
        <MomentList :moments="moments" v-if="!forceLoading" />
        <div v-else class="loadingContaier">
          <Loading />
        </div>
        <div class="pageContainer">
          <Page
            :total="moments[0] && moments[0].momentsLen"
            @pageChange="pageChange"
          />
        </div>
      </div>
      <!-- 友情链接 -->
      <LinkList />
    </div>
  </div>
</template>
<script>
import { onBeforeMount, ref, watch } from "vue";
import Swiper from "../components/Swiper.vue";
import MomentList from "../components/MomentList";
import Page from "../components/Page";
import CommentSideList from "../components/CommentSideList";
import LabelSideList from "../components/LabelSideList";
import LinkList from "../components/LinkList";
import UserSideShow from "../components/UserSideShow";
import HotRecommend from "../components/HotRecommend";
import { useRouter } from "vue-router";
import Loading from "../components/Loading";
import { useStore } from "vuex";
export default {
  components: {
    Swiper,
    MomentList,
    Page,
    CommentSideList,
    LabelSideList,
    LinkList,
    UserSideShow,
    HotRecommend,
    Loading,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const momentsRef = ref(store.state.moments || []);
    const forceLoadingRef = ref(false);
    watch(
      () => store.state.moments,
      () => {
        momentsRef.value = store.state.moments;
      }
    );
    async function pageChange(nextPage, limit = 8) {
      forceLoadingRef.value = true;
      await store.dispatch(
        "getMoment",
        { offset: (nextPage - 1) * limit },
        limit
      );
      forceLoadingRef.value = false;
    }
    function handleChangeTag(label) {
      router.push({
        path: "/labelMoment",
        query: {
          labelId: label.id,
          name: label.name,
        },
      });
    }
    return {
      moments: momentsRef,
      pageChange,
      handleChangeTag,
      forceLoading: forceLoadingRef,
    };
  },
};
</script>
<style lang="less" scoped>
.momentWrapper {
  width: 1200px;
  margin: 0 auto;
  .swiperUserWrapper {
    display: flex;
    justify-content: space-between;
    .swiper {
      height: 250px;
      border: 3px solid rgba(204, 52, 252, 0.4);
      flex-basis: 800px;
    }

    margin-bottom: 20px;
  }

  .momentRecommend {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .side {
      flex-basis: 350px;
      margin-right: 20px;
    }
  }
  .hotAndLink {
    display: flex;
    align-items: center;
    .newMoment {
      width: 800px;
      min-height: 300px;
      .title {
        text-align: center;
        font-size: 25px;
        color: #fff;
        text-shadow: 1px 1px 2px #888;
        margin: 10px 0;
      }
    }
  }
  .loadingContaier {
    height: 300px;
    margin-bottom: 80px;
    position: relative;
  }
}
</style>
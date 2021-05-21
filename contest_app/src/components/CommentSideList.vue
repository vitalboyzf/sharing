<template>
  <div class="hotComment">
    <div class="title">
      <span
        v-for="title in titles"
        :key="title.id"
        @click="changeTag(title.id)"
        :class="{ active: commentIdx === title.id }"
        >{{ title.name }}</span
      >
    </div>
    <!-- 推荐评论展示 -->

    <div v-if="comments" class="hostCommentList">
      <div v-if="commentIdx === 0">
        <div class="item" v-for="commentInfo in comments" :key="commentInfo.id">
          <p class="content">{{ commentInfo.content }}</p>
          <div class="foo">
            <span class="userName">{{ commentInfo.user.name }}</span>
            评论于
            <span class="date">{{ commentInfo.createAt }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="item"
          @click="toDetail(momentInfo.id)"
          v-for="momentInfo in moments"
          :key="momentInfo.id"
        >
          <p class="content">{{ momentInfo.title }}</p>
          <div class="foo">
            <span class="userName">{{ momentInfo.author.name }}</span>
            发布于
            <span class="date">{{ momentInfo.createTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { ref, onBeforeMount, watch, computed } from "vue";
import { getAllComment } from "../service/comment";
import { formatDate } from "../utils/data";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Loading from "../components/Loading";
export default {
  components: { Loading },
  setup() {
    const commentIdxRef = ref(0);
    const store = useStore();
    const router = useRouter();
    const commentsRef = ref(store.state.coments);
    const momentsRef = ref(store.state.moments.slice(0, 3));
    watch(()=>store.getters.recommendMoments, () => {
      console.log(store.getters.recommendMoments);
      momentsRef.value = store.getters.recommendMoments.slice(0, 3);
    });
    const titles = [
      { id: 0, name: "最新评论" },
      { id: 1, name: "热门推荐" },
    ];

    onBeforeMount(async () => {
      const { data } = await getAllComment(0, 3);
      // const { data: momentData } = await getMomentByViews(0, 3);

      data.map((comment) => {
        comment.createAt = formatDate(comment.createAt, true);
        return comment;
      });
      commentsRef.value = data;
    });
    function changeTag(nextIdx) {
      commentIdxRef.value = nextIdx;
    }
    function toDetail(momentId) {
      router.push({
        path: "/MomentDetail",
        query: {
          id: momentId,
        },
      });
    }
    return {
      titles,
      changeTag,
      toDetail,
      commentIdx: commentIdxRef,
      comments: commentsRef,
      moments: momentsRef,
    };
  },
};
</script>

<style lang="less" scoped>
.hotComment {
  margin-top: 20px;
  transition: all 0.7s;
  font-size: 14px;
  background-color: rgba(13, 22, 5, 0.6);
  border-radius: 10px;
  box-shadow: 2px 2px 2px #000, -2px -2px 2px #000;
  height: 280px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .title {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #fff;
    // border-bottom: 1px solid #aaa;
    display: flex;
    span {
      display: inline-block;
      flex-basis: 50%;
      text-align: center;
      background-color: rgba(0, 40, 0, 0.4);
      border: 1px solid #333;

      &.active {
        background-color: rgba(93, 201, 116, 0.4);
        border-bottom-color: #f90;
      }
    }
  }
  .hostCommentList {
    background-color: rgb(187, 74, 74);
    .item {
      &:not(&:nth-of-type(1)) {
        margin-top: 10px;
      }
      color: #aaa;
      background: linear-gradient(
        to top right,
        rgb(23, 1, 23),
        #000,
        rgb(23, 1, 23)
      );
      box-shadow: 1px 1px 2px rgb(177, 5, 5);
      padding: 10px;
      box-sizing: border-box;
      .content {
        padding: 0;
        margin: 0;
        color: rgb(248, 87, 248);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 310px;
      }
      .foo {
        margin-top: 10px;
        span {
          color: #fff;
          display: inline-block;
          height: 18px;
          line-height: 18px;
          vertical-align: middle;
          text-align: center;
          font-size: 13px;
          margin-right: 10px;
        }
        .userName {
          color: #f90;
        }
        .date {
          color: #0ff;
        }
      }
    }
  }
}
</style>
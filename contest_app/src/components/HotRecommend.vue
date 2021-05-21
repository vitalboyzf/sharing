<template>
  <div class="hotRecommend">
    <div class="hotRecommendTitle">热门推荐</div>
    <div v-if="moments.length !== 0">
      <div class="item" v-for="mot in moments" :key="mot.id">
        <div class="userInfo">
          <img
            v-if="mot.author.avatarUrl"
            class="userAvatar"
            :src="mot.author.avatarUrl"
            alt=""
          />
          <img
            v-else
            class="userAvatar"
            src="../assets/images/user.png"
            alt=""
          />
          <span class="userName">{{ mot.author.name }}</span>
          <span class="label">{{ Math.random() > 0.5 ? "心情" : "情感" }}</span>
        </div>
        <div class="main">
          <img
            v-if="mot.pictures && mot.pictures[0]"
            :src="mot.pictures[0]"
            alt=""
          />
          <img v-else src="../assets/images/defaultMomentPicture.webp" alt="" />
          <div class="right">
            <div class="title">{{ mot.title }}</div>
            <div class="content" v-html="mot.content"></div>
          </div>
        </div>
        <div class="footer">
          <div class="left">
            <span class="date"
              >发布日期： <span class="pink">{{ mot.createTime }}</span></span
            >
            <span class="views"
              >访问量：<span class="green">{{ mot.views }}</span></span
            >
            <span class="comment"
              >评论数：<span class="red">{{ mot.commentCount }} </span></span
            >
          </div>
          <div class="right" @click="toDetail(mot.id)">动态详情</div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Loading from "../components/Loading";
import { useStore } from "vuex";
export default {
  components: { Loading },
  setup() {
    const router = useRouter();
    const store = useStore();
    const momentsRef = ref(store.state.hotMoments || []);
    watch(
      () => store.state.hotMoments,
      () => {
        momentsRef.value = store.state.hotMoments;
      }
    );
    function toDetail(id) {
      router.push({
        path: "/momentDetail",
        query: {
          id,
        },
      });
    }
    return {
      moments: momentsRef,
      toDetail,
    };
  },
};
</script>

<style lang="less" scoped>
.hotRecommend {
  position: relative;
  min-height: 500px;
  .hotRecommendTitle {
    font-size: 25px;
    line-height: 25px;
    color: #fff;
    text-align: center;
    margin-bottom: 15px;
    text-shadow: 1px 1px 2px #888;
  }

  flex-basis: 800px;
  // background-color: #f90;
  .item {
    transition: all 0.7s;
    border-radius: 20px;
    margin-bottom: 10px;
    background: linear-gradient(
      to top right,
      rgb(23, 1, 23),
      #000,
      rgb(23, 1, 23)
    );
    box-shadow: 2px 2px 2px #000, -2px -2px 2px #000;
    padding: 5px 15px;
    box-sizing: border-box;
    color: #ccc;
    .main {
      margin: 10px 0;
      display: flex;
      img {
        width: 90px;
        height: 90px;
        border-radius: 20px;
        margin-right: 10px;
      }
      .title {
        font-size: 18px;
        color: rgb(69, 157, 240);
        font-weight: bolder;
      }
    }
    .userInfo {
      position: relative;
      .userAvatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #fff;
        vertical-align: middle;
      }
      .userName {
        margin-left: 20px;
        vertical-align: middle;
        color: #fa0;
        font-weight: 700;
      }
      .label {
        vertical-align: middle;
        position: absolute;
        right: 30px;
        color: rgb(81, 116, 231);
        font-weight: bold;
      }
    }
    .content {
      margin: 10px 0;
      text-indent: 2em;
      font-size: 15px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      .left {
        span {
          margin-right: 30px;
          font-size: 13px;
          span {
            font-weight: bold;
          }
        }
        .red {
          color: red;
        }
        .green {
          color: green;
        }
        .pink {
          color: rgb(13, 196, 233);
        }
      }
      .right {
        color: #fff;
        background-color: rgb(59, 40, 230);
        border-radius: 5px;
        padding: 3px 8px;
        font-size: 13px;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }
}
</style>
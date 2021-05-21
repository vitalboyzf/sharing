<template>
  <div class="detailWrapper">
    <div class="left">
      <section class="isRefresh" v-if="isRefresh"></section>
      <div class="momentWrapper">
        <div class="momentContent" v-if="momentInfo.id">
          <div class="title">{{ momentInfo.title }}</div>
          <div class="author">
            <img
              v-if="momentInfo.author.avatarUrl"
              class="avatar"
              :src="momentInfo.author.avatarUrl"
              alt=""
            />
            <img v-else class="avatar" src="../assets/images/user.png" alt="" />
            <div class="info">
              <div class="userName">{{ momentInfo.author.name }}</div>
              <span
                style="
                  font-size: 12px;
                  color: #666;
                  margin-top: 10px;
                  display: inline-block;
                "
                >2年</span
              >
            </div>
          </div>
          <div class="sentence">{{ momentInfo.author.sentence }}</div>
          <img
            class="pic"
            v-if="momentInfo.pictures"
            :src="momentInfo.pictures[0]"
            alt=""
          />
          <div class="content" v-html="momentInfo.content" />
          <div class="footer">
            <span class="date"
              ><i class="iconfont icon-riqiqishu" />{{
                momentInfo.createTime
              }}</span
            >
            <span class="views"
              ><i class="iconfont icon-fangwen" />{{ momentInfo.views }}</span
            >
          </div>
        </div>
        <Loading v-else />
      </div>
      <div class="commentWrapper">
        <div class="title">全部评论</div>
        <div class="commentList" v-if="rootComments.length !== 0">
          <CommentItem
            :rootComments="rootComments"
            @handleReply="handleReply"
          />
        </div>
        <div v-else class="noComment">没有任何评论~</div>
        <ReplyComment
          @closeModal="closeModal"
          v-if="curCommentId"
          :momentId="momentInfo.id"
          :commentId="curCommentId"
        />
      </div>
      <div class="publishComment">
        <span @click="handleSubmit">发布评论</span>
        <div class="text">
          <textarea
            placeholder="发表你的想法吧~"
            v-model="textValue"
            name=""
            id=""
            cols="20"
            rows="5"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="right">
      <LabelSideList @handleChangeTag="handleChangeTag" />
      <div class="card">
        <CardHot
          title="遇见，唯美了时光"
          content="感恩世间所有的缘，眼光交汇的那一刻，抵得上万千的暖。遇见，丰盈了文字；装点了人生的色彩；唯美了生命的诗行，是时光赠予的纯美，于灵魂深处开出最美的花朵，芬芳着生命的一程又一程。"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMomentById, increaseViews } from "../service/moment";
import { getAllChildByFatherId, createComment } from "../service/comment";
import { formatDate } from "../utils/data";
import ReplyComment from "../components/ReplyComment";
import CommentItem from "../components/CommentItem";
import LabelSideList from "../components/LabelSideList";
import CardHot from "../components/CardHot";
import Loading from "../components/Loading";
export default {
  components: { ReplyComment, CommentItem, LabelSideList, CardHot, Loading },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const momentId = route.query.id;
    const momentInfoRef = ref({});
    const commentRef = ref([]);
    const textAreaRef = ref("");
    const isRefreshRef = ref(true);
    const curCommentIdRef = ref(null);
    async function getMomentAndCommentInfo() {
      const { data } = await getMomentById(momentId);
      const commentArrPromise = data.comments
        ? data.comments
            .filter((comment) => comment.commentId === null)
            .map(async (comment) => {
              const { data } = await getAllChildByFatherId(comment.id);
              data.map((c) => {
                c.createAt = formatDate(c.createAt);
              });
              comment.children = data;
              return comment;
            })
        : [];
      Promise.all(commentArrPromise).then((res) => {
        commentRef.value = res;
      });
      data.createTime = formatDate(data.createTime);
      momentInfoRef.value = data;
      increaseViews(momentId, data.views + 1);
    }
    onBeforeMount(getMomentAndCommentInfo);
    async function handleSubmit() {
      const res = await createComment(momentId, textAreaRef.value);
      if (!res) {
        alert("请先登录");
        return;
      }
      isRefreshRef.value = !isRefreshRef.value;
      getMomentAndCommentInfo();
      textAreaRef.value = "";
      console.log("添加评论成功");
    }
    function handleReply(commentId) {
      curCommentIdRef.value = commentId;
    }
    function closeModal() {
      getMomentAndCommentInfo();
      curCommentIdRef.value = null;
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
      momentInfo: momentInfoRef,
      rootComments: commentRef,
      textValue: textAreaRef,
      handleSubmit,
      isRefresh: isRefreshRef,
      handleReply,
      closeModal,
      curCommentId: curCommentIdRef,
      handleChangeTag,
    };
  },
};
</script>

<style lang="less" scoped>
.detailWrapper {
  width: 1200px;
  height: 100px;
  color: #fff;

  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  .left {
    .momentWrapper {
      position: relative;
      width: 800px;
      min-height: 500px;
    }
    .momentContent {
      width: 800px;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      background: rgba(152, 101, 172, 0.2);
      //  background: rgba(195, 206, 99, 0.8);
      box-sizing: border-box;
      box-shadow: 2px 3px 2px rgba(152, 101, 172, 0.2);
      border-left: 1px solid rgb(84, 135, 228);
      border-top: 1px solid rgb(18, 139, 129);
      padding: 20px;
      .title {
        text-align: center;
        font-size: 30px;
        font-weight: border;
        text-shadow: 1px 1px 2px #fff;
      }
      .author {
        display: flex;
        align-items: center;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #fff;
        }

        .info {
          margin-left: 20px;
          .userName {
            color: #f90;
          }
          .sentence {
            margin-top: 4px;
            font-size: 12px;
            color: #888;
          }
        }
      }
      .sentence {
        margin-left: 70px;
        margin-top: 10px;
        color: #888;
      }
      .pic {
        width: 400px;
        margin-top: 20px;
      }
      .content {
        margin-top: 50px;
        color: #ddd;
      }
      .footer {
        margin-top: 30px;
        text-align: right;
        .date {
          i {
            color: rgb(38, 216, 38);
            margin-right: 10px;
          }
        }
        .views {
          margin-left: 30px;
          i {
            color: #0f0;
            margin-right: 10px;
          }
        }
      }
    }
    .commentWrapper {
      margin-top: 140px;
      min-height: 100px;
      width: 800px;

      .noComment {
        text-align: center;
        font-size: 30px;
        color: #888;
      }
      .title {
        font-size: 20px;
      }

      .commentList {
        margin-top: 20px;
      }
    }
    .publishComment {
      text-align: right;
      padding: 40px 0;
      width: 800px;

      .text {
        margin-top: 20px;

        textarea {
          width: 100%;
          font-size: 20px;
          resize: none;
          outline: none;
          border-radius: 10px;
          padding: 10px;
          box-sizing: border-box;
          background: rgba(56, 86, 143, 0.3);
          color: #fff;
          backdrop-filter: blur(10px);
        }
      }
      span {
        background: #f03;
        padding: 3px 8px;
      }
    }
  }
  .right {
    width: 350px;
    .card {
      height: 300px;
    }
  }
}
</style>
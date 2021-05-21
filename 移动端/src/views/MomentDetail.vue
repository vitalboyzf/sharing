<template>
  <div class="detail">
    <div class="goBack">
      <i class="iconfont icon-fanhui-copy-copy" @click="goBack"></i>
      <span class="head">文章详情</span>
    </div>
    <div v-if="moment" class="container">
      <!--      <div class="title">这是我的标题</div>-->
      <div class="userInfo">
        <img v-if="moment.author.avatarUrl" :src="moment.author.avatarUrl" alt="">
        <img v-else src="../assets/user.png" alt="">
        <div class="name">
          <span>{{ moment.author.name }}</span>
          <span>{{ disTimer }}</span>
        </div>
      </div>

      <div class="content">{{ moment.content }}</div>
      <div class="hr">正文结束</div>
      <div class="comment">
        <div class="commentHeader">
          <div class="commentTitle">
            全部评论
          </div>
          <div class="addComment">
            <span @click="handleShowEdit">写评论</span>
          </div>
        </div>
        <div class="commentItem" v-for="comment in comments" :key="comment.id">
          <div class="commentInfo">
            <img v-if="comment.user.avatarUrl" :src="comment.user.avatarUrl" alt="">
            <img v-else src="../assets/user.png" alt="">
            <div class="name">{{ comment.user.name }}</div>
            <!-- /.name -->
            <span class="zan">
              <i class="iconfont icon-dianzan"></i>
            <span>赞</span>
           </span>
            <!-- /.content -->
          </div>
          <div class="commentContent">
            {{ comment.content }}
          </div>
          <div class="refly">
            {{ comment.createTime.replace(/\.0+/g, '') }}
            <span class="btn" @click="handleShowPop(comment)">回复0</span>
          </div>
        </div>
        <van-popup v-model:show="showPop" teleport="body" position="bottom" close-on-click-overlay>
          <PoPComp :comment="clickComment" />
        </van-popup>
        <van-popup v-model:show="showEdit" teleport="body" position="bottom" close-on-click-overlay>
          <EditComment :momentId="moment.id" @closeModal="closeModal" />
        </van-popup>

      </div>
    </div>
    <div v-else>
      <van-loading text-color="#0094ff" />
    </div>
  </div>

</template>

<script>
import {useRoute, useRouter} from "vue-router"
// eslint-disable-next-line no-unused-vars
import {getMomentById, increaseViews} from "../service/moment"
import {onMounted, ref} from "vue";
import PoPComp from "../components/PoP"
import EditComment from "@/components/EditComment";
import {getDifferenceTimer} from "../utils/data"

export default {
  name: "MomentDetail",
  components: {PoPComp, EditComment},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const momentId = route.query.id;
    const clickCommentRef = ref(null);
    const momentRef = ref(null);
    const commentsRef = ref(null);
    let disTimerRef = ref(null);
    const showPopRef = ref(false);
    const showEditRef = ref(false);

    onMounted(async () => {
      const res = await getMomentById(momentId);
      let handleResult = getDifferenceTimer(res.data.createTime);
      if (handleResult !== "刚刚") {
        handleResult = handleResult + "前"
      }
      disTimerRef.value = handleResult;
      commentsRef.value = res.data.comments && res.data.comments.filter(comment => comment.commentId == null);
      momentRef.value = res.data;
      await increaseViews(momentId, momentRef.value.views + 1);
    })

    function goBack() {
      router.back();
    }

    function handleShowPop(currentComment) {
      clickCommentRef.value = currentComment;
      showPopRef.value = !showPopRef.value;
    }

    function handleShowEdit() {
      showEditRef.value = !showEditRef.value;
    }

    function closeModal() {
      showEditRef.value = false;
    }

    return {
      goBack,
      handleShowPop,
      handleShowEdit,
      momentId,
      closeModal,
      disTimer: disTimerRef,
      moment: momentRef,
      comments: commentsRef,
      showPop: showPopRef,
      showEdit: showEditRef,
      clickComment: clickCommentRef
    }
  },
}
</script>

<style lang="less" scoped>
.goBack {
  height: 50px;
  line-height: 50px;
  background-color: #020;
  color: #fffdef;

  i {
    margin-left: 10px;
    display: inline-block;
    height: 100%;
    width: 30px;
  }

  span {
    margin-left: 100px;
  }
}

.container {
  padding: 20px 20px;
  height: calc(100vh - 110px);
  box-sizing: border-box;
  overflow: auto;

  .title {
    text-align: start;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
  }

  .userInfo {
    height: 60px;
    display: flex;

    .name {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      align-items: center;
      justify-content: center;

      span {

        &:nth-of-type(1) {
          font-size: 13px;
          font-weight: bold;
        }

        &:nth-of-type(2) {
          font-size: 15px;
          color: #888888;
          margin-top: 2px;
        }
      }
    }

    img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
  }

  .content {
    font-size: 18px;
    margin-top: 30px;
  }

  .hr {
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #888888;
    margin-top: 120px;
  }

  .comment {
    .commentHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
    }

    .commentTitle {
      font-size: 20px;
      font-weight: bold;
    }

    .commentItem {
      border-bottom: 1px solid #ddd;
      padding: 15px 0;
      box-sizing: border-box;


      .commentInfo {
        display: flex;

        .name {
          font-size: 14px;
          color: #0077aa;
          margin-left: 15px;
        }

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .zan {
          margin-left: 200px;
          font-size: 16px;
          line-height: 30px;

          span {
            font-size: 20px;
            line-height: 30px;
          }
        }


      }

      .commentContent {
        margin-left: 45px;
        font-size: 14px;
        margin-top: 13px;
      }

      .refly {
        margin-left: 45px;
        margin-top: 15px;
        color: #888;
        font-size: 13px;

        .btn {
          color: #333333;
          border: 1px solid #222;
          margin-left: 20px;
        }
      }
    }
  }

  .addComment {
    width: 140px;
    height: 30px;
    text-align: center;


    span {
      background-color: green;
      color: #fff;
      display: inline-block;
      border: 1px solid #dddddd;
      font-size: 20px;
      padding: 3px 8px;
      border-radius: 10px;
    }
  }
}


</style>
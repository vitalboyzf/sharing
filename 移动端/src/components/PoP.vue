<template>
  <div class="modal">
    <div class="title">
      <i></i>
      <span>0条评论</span>

    </div>
    <div class="info">
      <div class="commentInfo">
        <img v-if="comment.user.avatarUrl" :src="comment.user.avatarUrl" alt="">
        <img v-else src="../assets/user.png" alt="">
        <div class="name">{{ comment.user.name }}</div>
        <span class="zan">
              <i class="iconfont icon-dianzan"></i>
            <span>赞</span>
           </span>
      </div>
      <div class="commentContent">
        {{ comment.content }}
      </div>
      <div class="totalComment">
        <div class="title">全部评论</div>
        <div class="content">
          <div class="noComment" v-if="comments.length===0">已展示所有评论</div>
          <div v-else>

            <div class="commentItem" v-for="co in comments" :key="co.id">
              <div class="user">
                <img v-if="co.user.avatarUrl" :src="co.user.avatarUrl" alt="">
                <img v-else src="../assets/user.png" alt="">
                <div class="name">{{ co.user.name }}</div>
              </div>
              <div class="con">{{ co.content }}</div>
              <div class="reply">
                <span class="date">{{ co.createAt }}</span>
                <span class="btn">回复0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
import {onMounted, ref} from "vue";
import {getAllChildByFatherId} from "../service/comment";
import {getDifferenceTimer} from "../utils/data"

export default {
  props: ["comment"],

  setup(ctx) {
    const commentsRef = ref([]);
    onMounted(() => {
      getAllChildByFatherId(ctx.comment.id).then(res => {
        console.log(res)
        res.data.map(comment => {
          comment.createAt = getDifferenceTimer(comment.createAt)
          return comment;
        })
        commentsRef.value = res.data;
      })
    })
    return {
      comments: commentsRef
    }
  }
}
</script>
<style lang="less" scoped>
.modal {
  padding: 5px 10px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.commentInfo {
  margin-top: 20px;
  display: flex;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .name {
    font-size: 16px;
    margin-left: 15px;
  }

  .zan {
    margin-left: 200px;
  }
}

.commentContent {
  font-size: 20px;
  color: #333;
  text-indent: 40px;
}

.totalComment {
  margin-top: 30px;
  border-top: 1px solid #ddd;

  .title {
    text-align: left;
    font-size: 18px;
  }

  .content {
    height: 300px;

    .noComment {
      font-size: 15px;
      text-align: center;
      margin-top: 20px;
      color: #888;
    }
  }
}

.commentItem {
  .user {
    display: flex;
    margin-top: 10px;
    padding: 10px 0;


    img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .name {
      font-size: 18px;
    }
  }

  .reply {
    .date {
      font-size: 14px;
      color: #888888;
    }

    .btn {
      font-size: 16px;
      margin-left: 100px;
      border: 1px solid #aaaaaa;
      padding: 3px 8px;
      color: green;
    }
  }

  .con {
    font-size: 18px;
    color: #333;
  }

}
</style>
<template>
  <div class="item" v-for="comment in rootComments" :key="comment.id">
    <div class="userInfo">
      <img v-if="comment.user.avatarUrl" :src="comment.user.avatarUrl" alt="" />
      <img v-else src="../assets/images/user.png" alt="" />
      <div class="info">
        <span class="user">{{ comment.user.name }}</span>
      </div>
    </div>
    <div class="content">
      {{ comment.content }}
    </div>
    <div class="footer">
      <span class="date">{{ comment.createTime.replace(/\.0{6}$/g, "") }}</span>

      <span class="reply" @click="handleReply(comment.id)">回复</span>
    </div>
    <div class="childrenComment">
      <div class="childItem" v-for="c in comment.children" :key="c.id">
        <div class="userInfo">
          <img v-if="c.user.avatarUrl" :src="c.user.avatarUrl" alt="" />
          <img v-else src="../assets/images/user.png" alt="" />
          <div class="childInfo">
            <span class="user">{{ c.user.name }}：</span>
            <span class="content">
              {{ c.content }}
            </span>
          </div>
        </div>

        <div class="footer">
          <span class="date">{{ c.createAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rootComments"],
  emits: ["handleReply"],
  setup(props, ctx) {
    function handleReply(id) {
      ctx.emit("handleReply", id);
    }
    return {
      handleReply,
    };
  },
};
</script>

<style lang="less" scoped>
.item {
  border-radius: 10px;
  position: relative;
  padding: 10px;
  border-left: 1px solid rgb(202, 223, 146);
  border-top: 1px solid rgb(218, 12, 91);
  box-sizing: border-box;
  background: linear-gradient(
    to top right,
    rgb(36, 6, 36),
    rgb(26, 15, 26),
    rgb(20, 6, 20)
  );
  margin-top: 20px;
  .userInfo {
    display: flex;
    align-items: center;
    .info {
      .user {
        color: rgb(12, 184, 241);
        margin-left: 10px;
      }
    }
  }
  .content {
    font-size: 13px;
    color: #eee;
    margin-left: 60px;
  }
  .footer {
    margin-top: 10px;
    margin-left: 60px;
    .reply {
      padding: 3px 8px;
      background-color: rgb(114, 33, 9);
      border-radius: 5px;
      display: inline-block;
      font-size: 12px;
      margin-left: 10px;
      &:hover {
        transform: scale(1.1);
      }
    }
    .date {
      font-size: 12px;
      color: #888;
    }
  }
  img {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
  }
  .childrenComment {
    margin-left: 50px;
    padding: 10px;
    box-sizing: border-box;
    .childItem {
      margin-bottom: 10px;
      // background-color: #111;
      backdrop-filter: blur(10px);
      background: rgba(0, 0, 0, 0.6);
      padding: 10px;
      box-sizing: border-box;
      border-radius: 10px;
      border-left: 1px solid rgb(133, 83, 8);
      box-shadow: 2px 2px 2px #000;
      .userInfo {
        display: flex;
        align-items: flex-start;
        .childInfo {
          margin-left: 5px;
        }
        img {
          width: 30px;
          height: 30px;
        }
        .user {
          color: rgb(34, 235, 174);
        }
      }

      .childInfo {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        .user {
          vertical-align: middle;
          line-height: 20px;
        }
        .content {
          margin: 0;
          width: 600px;
          font-size: 13px;
          vertical-align: middle;
          line-height: 20px;
        }
        .date {
          position: absolute;
          right: 10px;
          color: rgb(81, 115, 250);
        }
      }
      .footer {
        margin: 10px 0;
      }
    }
  }
}
</style>
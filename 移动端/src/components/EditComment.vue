<template>
  <div class="modal">
    <textarea v-model="commentContent" class="ipt" name="" id="" cols="30" rows="10" placeholder="来吧，展示！" />
    <span @click="publishComment">发布</span>
  </div>
</template>

<script>
import {ref} from "vue";
import {createComment} from "../service/comment"
import {Notify} from "vant";

export default {
  name: "EditComment",
  props: ["momentId"],
  setup(props, ctx) {
    const commentContentRef = ref("");

    async function publishComment() {
      await createComment(props.momentId, commentContentRef.value)
      Notify({message: "评论成功", duration: 1000, background: "green"})
      ctx.emit("closeModal")
    }

    return {
      commentContent: commentContentRef,
      publishComment
    }
  }
}
</script>

<style lang="less" scoped>
.modal {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ipt {
    width: 300px;
    height: 80px;
    resize: none;
    border-color: #ccc;
    font-size: 20px;
  }

  span {
    font-size: 20px;
    color: #333;
  }

}


</style>
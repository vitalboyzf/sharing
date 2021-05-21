<template>
  <div class="reply">
    <textarea
      class="replyTextarea"
      name=""
      id=""
      cols="20"
      rows="5"
      v-model="textValue"
    ></textarea>
    <div class="btn">
      <span class="submit" @click="handleReply">回复</span>
      <span class="reset" @click="reset">重置</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { replyComment } from "../service/comment";
export default {
  props: ["momentId", "commentId"],
  setup(props, ctx) {
    const textValueRef = ref("");
    async function handleReply() {
      const res = await replyComment(
        props.momentId,
        textValueRef.value,
        props.commentId
      );
      ctx.emit("closeModal");
    }
    function reset() {
      textValueRef.value = "";
    }
    return {
      textValue: textValueRef,
      handleReply,
      reset,
    };
  },
};
</script>

<style lang="less" scoped>
.reply {
  width: 400px;
  height: 150px;
  background-color: #fff;
  position: fixed;
  left: 40%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  z-index: 3000;
  background: linear-gradient(#011, #202, #011);
  .replyTextarea {
    font-size: 15px;
    width: 100%;
    height: 80%;
    resize: none;
    border: none;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
    background-color: #eee;
    font-weight: 500;
  }
  .btn {
    text-align: right;
    span {
      padding: 3px 8px;
      box-sizing: border-box;
      margin-top: 3px;
      display: inline-block;
      border-radius: 10px;
      background-color: #f40;
      &.submit {
        background-color: rgb(33, 96, 233);
        margin-right: 20px;
      }
    }
  }
}
</style>
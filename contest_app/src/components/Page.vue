<template>
  <div class="pageContainer" :class="{ hidden: maxPage < 2 }">
    <div class="page">
      <span :class="{ disabled: curPage === 1 }" @click="changePage(1)"
        >首页</span
      >
      <span
        :class="{ disabled: curPage === 1 }"
        @click="changePage(curPage - 1)"
        >上一页</span
      >
      <span
        v-for="n in maxPage"
        :key="n"
        :class="{ active: n === curPage }"
        @click="changePage(n)"
        >{{ n }}</span
      >
      <span
        :class="{ disabled: curPage === maxPage }"
        @click="changePage(curPage + 1)"
        >下一页</span
      >
      <span
        :class="{ disabled: curPage === maxPage }"
        @click="changePage(maxPage)"
        >尾页</span
      >
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: {
    total: {
      type: Number,
      default: 8,
    },
  },

  setup(props, ctx) {
    const curPageRef = ref(1);
    const maxPage = computed(() => Math.ceil(props.total / 8));
    function changePage(nextPage) {
      if (nextPage < 1 || nextPage > maxPage) return;
      curPageRef.value = nextPage;
      ctx.emit("pageChange", nextPage);
    }
    return {
      curPage: curPageRef,
      maxPage,
      changePage,
    };
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  width: 100%;
  height: 30px;
  margin: 30px 0;
  &.hidden {
    display: none;
  }
  .page {
    min-width: 300px;
    text-align: right;
    margin-right: 20px;
    height: 100%;
    span {
      display: inline-block;
      user-select: none;
      height: 30px;
      line-height: 30px;
      border-radius: 3px;
      border: 1px solid;
      padding: 0px 5px;
      margin: 0 5px;
      color: #fff;
      background: linear-gradient(#022, #030, #604);
      &.disabled {
        cursor: not-allowed;
        pointer-events: none;
        background: rgba(233, 243, 210, 0.4);
      }
      &:hover {
        color: #aaa;
        transform: scale(1.1);
      }
      &.active {
        background: green;
      }
    }
  }
}
</style>
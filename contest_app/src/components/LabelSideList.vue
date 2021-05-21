<template>
  <div
    class="label"
    :style="{
      '--bgc': bgc,
    }"
  >
    <div class="title">标签列表</div>
    <div v-if="labels.length !== 0" class="labelsList">
      <div
        class="item"
        v-for="label in labels"
        :style="{ background: label.bgc }"
        :key="label.id"
        @click="handleChangeTag(label)"
      >
        <span
          >{{ label.name }}（<span class="count">{{ label.count }}</span
          >）</span
        >
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Loading from "../components/Loading";
export default {
  components: { Loading },
  props: {
    bgc: {
      type: String,
      default: "rgba(77, 40, 52, 0.4)",
    },
  },
  setup(props, ctx) {
    const store = useStore();
    let labelsRef = computed(() => store.state.labels);
    function handleChangeTag(label) {
      ctx.emit("handleChangeTag", label);
    }
    return {
      labels: labelsRef,
      handleChangeTag,
    };
  },
};
</script>

<style lang='less' scoped>
.label {
  backdrop-filter: blur(5px);
  &:hover {
    background-color: rgba(13, 20, 29, 0.8);
  }
  transition: all 0.7s;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #000, -2px -2px 2px #000;
  height: 240px;
  background-color: var(--bgc);

  padding: 10px;
  box-sizing: border-box;
  .title {
    line-height: 30px;
    font-weight: bolder;

    height: 30px;
    color: #fff;
  }
  .labelsList {
    display: flex;
    flex-wrap: wrap;
    position:relative;
    .item {
      border-radius: 10px;
      margin: 5px 5px;
      border: 1px solid #f90;
      font-size: 12px;
      padding: 3px 8px;
      box-sizing: border-box;
      color: #fff;
      &:hover {
        transform: scale(1.1);
      }
      .count {
        color: #f9f;
      }
    }
  }
}
</style>
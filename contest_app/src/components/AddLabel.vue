<template>
  <div class="addLabel">
    <div class="curLabels">
      <span
        class="item"
        v-for="label in curArr"
        :key="label.id"
        :style="{ 'background-color': label.bgc }"
        @click="remove(label.id)"
        >{{ label.name }}</span
      >
      <span class="ok" @click="ok">完成</span>
    </div>
    <hr />
    <div class="totalLabels">
      <span
        class="item"
        @click="add(label)"
        v-for="label in totalLabelsArr"
        :style="{ 'background-color': label.bgc }"
        :key="label.id"
        >{{ label.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { randomColor } from "../utils/randomColor";
import { getAllLabels } from "../service/label";
export default {
  props: ["curLabels"],
  setup(props, ctx) {
    const totalLabelsArrRef = ref([]);

    onBeforeMount(async () => {
      const { data } = await getAllLabels();
      data.map((label) => {
        label.bgc = randomColor();
        return label;
      });
      totalLabelsArrRef.value = data;
    });
    const curArrRef = ref(props.curLabels || []);
    function add(label) {
      if (curArrRef.value.length > 2) return alert("最多选取三个标签！");
      if (curArrRef.value.includes(label)) return alert("已经包含这个标签了！");
      curArrRef.value.push(label);
    }
    function remove(id) {
      curArrRef.value = curArrRef.value.filter((label) => label.id != id);
    }
    function ok() {
      ctx.emit("changeLabels", curArrRef.value);
    }
    return {
      curArr: curArrRef,
      totalLabelsArr: totalLabelsArrRef,
      add,
      remove,
      ok,
    };
  },
};
</script>

<style lang="less" scoped>
.addLabel {
  width: 300px;
  height: 200px;
  background: rgba(0, 0, 2, 0.9);
  position: fixed;
  z-index: 233300;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  .item {
    display: inline-block;
    background-color: #03f;
    border-radius: 3px;
    color: #fff;
    padding: 2px 5px;
    margin: 3px 3px;
    cursor: pointer;
  }
  .curLabels {
    height: 40px;
    text-align: left;
    padding-top: 10px;
    padding-left: 10px;
    box-sizing: border-box;
    position: relative;
    .ok {
      display: inline-block;
      background-color: green;
      cursor: pointer;
      border-radius: 3px;
      color: #fff;
      padding: 3px 8px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .totalLabels {
    padding: 0 10px;
  }
}
</style>>

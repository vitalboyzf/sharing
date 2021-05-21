<template>
  <div class="labelMomentWrapper">
    <div class="labelMoment">
      <div class="title">{{ curLabelName }}</div>
      <MomentList :moments="moments" v-if="!forceLoading" />
      <Loading v-else />
    </div>
    <div class="side">
      <LabelSideList @handleChangeTag="handleChangeTag" />
      <Card
        :title="cardInfo.title"
        :content="cardInfo.content"
        bgColor="linear-gradient(315deg, #03a9f4, #ff0058)"
      />
    </div>
  </div>
</template>

<script>
import { getMomentByLabelId } from "../service/moment";
import LabelSideList from "../components/LabelSideList";
import Card from "../components/Card";
import MomentList from "../components/MomentList";
import { useStore } from "vuex";
import { ref, onBeforeMount, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import Loading from "../components/Loading";
export default {
  components: { LabelSideList, MomentList, Card, Loading },
  setup() {
    const store = useStore();
    const route = useRoute();
    const momentsRef = ref(store.state.moments);
    const forceLoadingRef = ref(false);
    watch(store.state.moments, () => {
      console.log("labelMoment", store.state.moments);
      momentsRef.value = store.state.moments;
    });
    const curLabelNameRef = ref("全部");
    const cardInfo = reactive({
      title: "生命是一种缘",
      content:
        "趁阳光正好，趁微风不噪。趁繁花还未开至荼蘼。趁现在还年轻，还可以走很长很长的路，还能诉说很深很深的思念。",
    });
    onBeforeMount(() => {
      const { labelId, name } = route.query;
      if (labelId) {
        handleChangeTag({ id: labelId, name: name });
        curLabelNameRef.value = name;
      }
    });

    async function handleChangeTag(label) {
      forceLoadingRef.value = true;
      const { data } = await getMomentByLabelId(label.id);
      curLabelNameRef.value = label.name;
      forceLoadingRef.value = false;
      momentsRef.value = data;
    }
    return {
      moments: momentsRef,
      handleChangeTag,
      curLabelName: curLabelNameRef,
      cardInfo,
      forceLoading: forceLoadingRef,
    };
  },
};
</script>

<style lang="less" scoped>
.labelMomentWrapper {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .labelMoment {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    min-height: 300px;
    width: 800px;
    background: rgba(0, 1, 0, 0.2);
    border-radius: 10px;
    .title {
      text-align: center;
      font-size: 30px;
      color: #fff;
      font-weight: bold;
      padding: 10px 0;
    }
  }
  .side {
    width: 350px;
  }
}
</style>
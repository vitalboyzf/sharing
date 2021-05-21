<template>
  <div class="home">
    <div class="notice">
      <van-notice-bar
          background="#020"
          color="#f90"
          left-icon="volume-o"
          text="生活很美好，美好需要你去发现它！"
      />
    </div>
    <div class="tags">
      <van-tabs type="card" @click="barClick"
      >
        <van-tab title="推荐">内容 1</van-tab>
        <van-tab v-for="label in labels" :name="label.id" :title="label.name" :key="label.id" />
      </van-tabs>
      <div class="content">
        <MomentListShow :moments="moments" />
        <van-pagination
            v-if="momentLength>10"
            v-model="currentPage"
            :page-count="Math.ceil(momentLength/10)"
            :items-per-page="5"
            @change="pageChange"
        />
      </div>

    </div>

    <NavBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import MomentListShow from "../components/MomentListShow"
import {getLabelsByPage} from "../service/label"
import {getMomentByLabelId, getMomentByPage} from "../service/moment"
import {onMounted, ref} from "vue";
import {formatDate} from "../utils/data"

export default {
  name: "Home",
  components: {
    NavBar,
    MomentListShow
  },
  setup() {
    let labelsRef = ref([])
    const momentsRef = ref([]);
    const momentLengthRef = ref(0);
    const currentPageRef = ref(1);

    function getTotalMomentByPage(page = 1, limit = 10) {
      getMomentByPage((page - 1) * limit, limit).then(res => {
        momentLengthRef.value = res.len;
        if (Array.isArray(res.data)) {
          res.data.forEach(moment => {
            moment.createTime = formatDate(moment.createTime);
          })
        }
        momentsRef.value = res.data;
      })
    }

    onMounted(() => {
      getLabelsByPage().then(res => {
        labelsRef.value = res.data;
      })
      getTotalMomentByPage();
    })

    async function barClick(name) {
      if (name === 0) {
        getTotalMomentByPage();
        return;
      }
      const {data} = await getMomentByLabelId(name)
      if (Array.isArray(data)) {
        data.forEach(moment => {
          moment.createTime = formatDate(moment.createTime);
        })
      }
      momentsRef.value = data;
    }

    async function pageChange(nextPage) {
      getTotalMomentByPage(nextPage);
    }

    return {
      labels: labelsRef,
      moments: momentsRef,
      momentLength: momentLengthRef,
      barClick,
      currentPage: currentPageRef,
      pageChange
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  padding: 10px 15px;
  margin-bottom: 100px;

  ul {
    margin-top: 30px;
  }
}

.van-tab__pane {
  display: none;
}
</style>

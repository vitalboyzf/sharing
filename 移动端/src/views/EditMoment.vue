<template>
  <div class="editMoment">
    <div class="header">
      <i @click="handleBack" class="iconfont icon-fanhui-copy-copy"></i>
      <span>编辑动态</span>
      <span class="send" @click="handleSend">发送</span>
      <!-- /.send -->
    </div>
    <!-- /.header -->
    <div class="tags">
      <div class="tagsShow" v-if="curTags.length!==0">
        <van-tag v-for="tag in curTags" :key="tag.id" type="primary">{{ tag.name }}</van-tag>
      </div>
      <div v-else>
        添加一些标签吧~
      </div>

      <!-- /.tag -->
      <div class="addTag" @click="showHandle">{{ curTags.length !== 0 ? '修改标签' : '添加标签' }}</div>
      <!-- /.addTag -->
    </div>
    <!-- /.tags -->
    <div class="editContent">
      <textarea v-model="momentContent" placeholder="分享新鲜事..." class="textarea" name="" id="" cols="30"
                rows="10"></textarea>
      <!-- /# -->
    </div>
    <!-- /.editContent -->
  </div>
  <!-- /.editMoment -->
  <!--  弹出层-->
  <van-popup v-model:show="show" teleport="#app" position="top">
    <AddTags @updateCurTags="updateCurTags" />
  </van-popup>
</template>

<script>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {addLabels, createMoment} from "../service/moment"
import AddTags from "../components/addTags";

export default {
  components: {AddTags},
  name: "EditMoment",
  setup() {
    const momentContentRef = ref("");
    const router = useRouter();
    const showRef = ref(false);
    const curTagsRef = ref([]);

    function handleBack() {
      router.back();
    }

    // 发表文章
    async function handleSend() {
      try {
        const result = await createMoment(momentContentRef.value);
        await addLabels(result.data.insertId, curTagsRef.value.map(tagInfo => tagInfo.name));
        router.back();
        console.log("添加成功")

      } catch (e) {
        console.log(e)
      }
    }

    function showHandle() {
      showRef.value = true;
    }

    function updateCurTags(curTags) {
      curTagsRef.value = curTags;
    }

    return {
      handleBack,
      handleSend,
      showHandle,
      updateCurTags,
      show: showRef,
      curTags: curTagsRef,
      momentContent: momentContentRef
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;

  i {
    line-height: 60px;
    font-size: 30px;
  }

  .send {
    color: #3967FF;
    font-size: 20px;
  }
}

.tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  color: #888;

  .tagsShow {
    span {
      margin-left: 10px;
    }
  }

  .addTag {
    margin-right: 20px;
    color: #f90;
    box-sizing: border-box;
    border: 1px solid #aaa;
    padding: 3px 8px;
    border-radius: 5px;
    font-size: 16px;
  }

}

.textarea {
  height: calc(100vh - 140px);
  border: none;
}
</style>
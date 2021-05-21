<template>
  <div class="addTags">
    <div class="curTags">
      <van-tag closeable color="#f90" v-for="tag in curTags" :key="tag.id" @click="removeTag(tag)">
        {{ tag.name }}
      </van-tag>
    </div>
    <div class="hr"></div>
    <hr>
    <div class="dataTags">
      <div class="allTagTitle">所有标签</div>
      <div class="group">
        <van-tag color="#7232dd" v-for="tag in totalTags" :key="tag.id" @click="addToCur(tag)">
          {{ tag.name }}
        </van-tag>
      </div>
      <!-- /.group -->
    </div>
    <!-- /.addTag -->
    <!-- /.dataTags -->
    <!-- /.curTags -->
  </div>
  <!-- /.addTags -->
</template>

<script>
import {getLabelsByPage} from "../service/label";
import {onBeforeUpdate, onMounted, ref} from "vue";
import {Notify} from "vant";

export default {
  name: "addTags",

  setup(props, ctx) {
    const totalTagsRef = ref([]);
    const curTagsRef = ref([]);
    onMounted(async () => {
      const res = await getLabelsByPage();
      totalTagsRef.value = res.data;
    })

    onBeforeUpdate(() => {
      ctx.emit("updateCurTags", curTagsRef.value);
    })

    function addToCur(tag) {
      if (curTagsRef.value.includes(tag)) return;
      if (curTagsRef.value.length >= 4) {
        Notify({type: 'warning', background: "#f40", message: '最多选取四个标签', duration: 1000});
        return;
      }
      curTagsRef.value.push(tag);
    }

    function removeTag(tag) {
      curTagsRef.value = curTagsRef.value.filter(t => t !== tag);
    }

    return {
      curTags: curTagsRef,
      totalTags: totalTagsRef,
      addToCur,
      removeTag
    }
  }
}
</script>

<style lang="less" scoped>
.addTags {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  .curTags {
    span {
      margin-left: 10px;
      display: inline-block;
      padding: 3px 8px;
      box-sizing: border-box;
    }
  }

  .dataTags {
    .allTagTitle {
      font-size: 20px;
    }

    .group {
      //width: 50%;

      span {
        margin-left: 10px;
        display: inline-block;
        padding: 3px 8px;
      }
    }
  }
}


</style>
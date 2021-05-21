<template>
  <div class="editorWrapper">
    <div class="editorBtn">
      <span class="title">
        <input type="text" placeholder="添加一个标题吧" v-model="titleValue" />
      </span>
      <span class="labels">
        <span
          class="item"
          v-for="label in labels"
          :style="{ 'background-color': label.bgc }"
          :key="label.id"
          >{{ label.name }}</span
        >
        <button class="add" @click="showLabelHandler">添加标签</button>
      </span>
      <AddLabel
        @changeLabels="changeLabels"
        v-if="showLabel"
        :curLabels="labels"
      />
      <input class="file" type="file" ref="pictureRef" />
      <span class="btn">
        <button class="submit" @click="publish">发布</button>
        <button class="reset" @click="reset">重置</button>
      </span>
    </div>
    <div class="editMoment"></div>
  </div>
</template>

<script>
import E from "wangeditor";
import AddLabel from "../components/AddLabel";
import { onMounted, onUnmounted, ref } from "vue";
import { uploadPicture } from "../service/upload";
import { createMoment, addLabels } from "../service/moment";
import { useStore } from "vuex";
export default {
  components: { AddLabel },
  setup(props, ctx) {
    let content = "";
    let editor;
    const store = useStore();
    const pictureRef = ref(null);
    const labelsRef = ref([]);
    const showLabelModalRef = ref(false);
    const titleValueRef = ref("");
    onMounted(() => {
      editor = new E(".editMoment");

      editor.config.uploadImgShowBase64 = true;
      editor.config.colors = [
        "#000000",
        "#eeece0",
        "#1c487f",
        "#4d80bf",
        "#c24f4a",
        "#8baa4a",
        "#7b5ba1",
        "#46acc8",
        "#f9963b",
        "#f90",
        "#008c8c",
        "#888",
      ];
      editor.config.height = 380;
      //   editor.config.uploadImgServer = "http://49.232.250.47:2000/upload";
      //   editor.config.uploadFileName = "img";
      //   editor.config.uploadImgHooks = {
      //     customInsert(insertImg, result, editor) {
      //       insertImg(result.url);
      //     },
      //   };
      editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ];
      editor.config.onchange = (newHtml) => {
        content = newHtml;
      };
      /** 一定要创建 */
      editor.create();
      // 设置初识内容
      //   editor.txt.html("zf");
    });
    onUnmounted(() => {
      editor.destroy();
    });
    function reset(force) {
      if (force === true) {
        editor.txt.clear();
        titleValueRef.value = "";
        return;
      }
      const ok = confirm("确定要重置吗？");
      if (ok) editor.txt.clear();
    }
    async function publish() {
      const labels = labelsRef.value.map((labelInfo) => labelInfo.name);
      if (titleValueRef.value === "") return alert("请添加一个标题");
      const momentRes = await createMoment(content, titleValueRef.value);
      if (!momentRes.data) {
        return alert("发布失败");
      }
      const labelRes = await addLabels(momentRes.data.insertId, labels);
      if (!labelRes.message) {
        return alert("添加标签失败");
      }
      if (pictureRef.value.files.length !== 0) {
        const momentId = momentRes.data.insertId;
        const file = pictureRef.value.files[0];
        // 此时可以自行将文件上传至服务器
        const formData = new FormData();
        formData.append("picture", file, "picture");
        await uploadPicture(formData, momentId);
        ctx.emit("closeModal");
      }
      reset(true);
      store.dispatch("getMoment");
      alert("发布成功");
    }
    function changeLabels(labels) {
      labelsRef.value = labels;
      showLabelModalRef.value = false;
    }
    function showLabelHandler() {
      showLabelModalRef.value = true;
    }
    return {
      publish,
      pictureRef,
      reset,
      changeLabels,
      labels: labelsRef,
      showLabel: showLabelModalRef,
      showLabelHandler,
      titleValue: titleValueRef,
    };
  },
};
</script>

<style lang="less" >
.editorWrapper {
  margin: 0 auto;
  width: 1200px;
  height: 400px;

  .editorBtn {
    text-align: right;
    display: inline-block;
    margin: 0 auto;
    width: 1200px;
    margin-bottom: 10px;
    position: relative;
    .title {
      text-align: left;
      position: absolute;
      left: 10px;
      bottom: -20px;
      width: 300px;
      height: 50px;
      display: inline-block;

      input {
        padding: 3px 8px;
        box-sizing: border-box;
        font-size: 25px;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 10px;
      }
    }
    .file {
      background-color: #aaa;
      width: 200px;
      border-radius: 5px;
    }
    .btn {
      width: 60px;
      margin-left: 30px;
      button {
        color: #fff;
        border: none;
        outline: none;
        font-size: 20px;
        border-radius: 5px;
        &:hover {
          transform: scale(1.1);
        }
        &.submit {
          background-color: #0f0;
        }
        &.reset {
          margin-left: 10px;
          background-color: #f00;
        }
      }
    }
    .labels {
      margin-right: 30px;
      .item {
        display: inline-block;
        padding: 2px 5px;
        color: #fff;
        background-color: #34f;
        border-radius: 3px;
        margin-left: 10px;
      }
      .add {
        margin-left: 10px;
        width: 70px;
        cursor: pointer;
        display: inline-block;
        background-color: #f98;
        padding: 3px 8px;
        border-radius: 10px;
        color: #fff;
        outline: none;
        border: none;
      }
    }
  }
  .editMoment {
    position: relative;
    background-color: #aaa;
    margin: 0 auto;
    .submit {
      position: absolute;
      top: 0px;
      right: 20px;
    }
    .w-e-text-container {
      height: 400px !important;
    }
  }
}
</style>
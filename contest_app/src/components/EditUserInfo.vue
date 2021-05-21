<template>
  <div class="editUserInfo">
    <div class="avatar">
      <div v-if="!imgSrc" class="img">木有头像</div>
      <img v-else :src="imgSrc" alt="" />
      <div class="upload">
        <input type="file" ref="file" @change="handleChange" />
      </div>
      <div class="close" @click="closeModal">关闭</div>
    </div>
    <div class="userName">
      <label
        >用户名：
        <input
          type="text"
          placeholder="请输入用户名"
          v-model="userInfo.userName"
        />
      </label>
    </div>
    <div class="sentence">
      <label
        >个人美句：
        <textarea
          placeholder="写点东西展示一下自己吧~"
          v-model="userInfo.shortSentence"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </label>
    </div>
    <div class="btn">
      <input @click="submitHandle" type="submit" value="提交修改" />
      <input type="reset" value="重置" />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { updateUserInfo } from "../service/user";
import { uploadAvatar } from "../service/upload";
export default {
  props: ["userInfo"],
  setup(props, ctx) {
    const userId = props.userInfo.userId;
    const userInfo = reactive({
      userName: props.userInfo.userName,
      shortSentence: props.userInfo.shortSentence || "",
    });
    const uploadRef = ref("");
    const imgSrcRef = ref(props.userInfo.avatarUrl);
    function fileHandle(file, img) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = function () {
        console.log("文件上传中");
      };
      reader.onload = function () {
        imgSrcRef.value = reader.result;
      };
    }
    async function submitHandle() {
      const avatar = uploadRef.value.files[0];
      await updateUserInfo(userId, userInfo.userName, userInfo.shortSentence);
      if (avatar) {
        // 上传头像
        const formData = new FormData();
        formData.append("avatar", avatar, "avatar");
        const res = await uploadAvatar(formData);
        closeModal();
      }
    }

    function handleChange() {
      fileHandle(uploadRef.value.files[0]);
    }
    function closeModal() {
      ctx.emit("closeModal");
    }
    return {
      file: uploadRef,
      handleChange,
      imgSrc: imgSrcRef,
      userInfo,
      submitHandle,
      closeModal,
    };
  },
};
</script>

<style lang="less" scoped>
.editUserInfo {
  position: fixed;
  border-radius: 10px;
  left: 30%;
  top: 20%;
  width: 350px;
  height: 400px;
  background-color: rgb(190, 225, 235);
  padding: 20px;
  .avatar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .img {
      width: 50px;
      height: 50px;
      border: 1px solid #ccc;
      font-size: 12px;
      line-height: 50px;
      border-radius: 50%;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .upload {
      width: 180px;
      input {
        width: 100%;
      }
    }
    .close {
      padding: 3px 8px;
      background-color: #f00;
      color: #fff;
      border-radius: 10px;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .userName {
    margin-top: 30px;
    label {
      font-size: 20px;
      font-weight: bold;
      input {
        outline: none;
      }
    }
  }
  .sentence {
    label {
      font-size: 20px;
      font-weight: bold;
    }
    margin-top: 30px;
    textarea {
      vertical-align: text-top;
      resize: none;
      outline: none;
    }
  }
  .btn {
    text-align: center;
    margin-top: 30px;
    input {
      color: #fff;
      border: none;
      padding: 3px 8px;
      border-radius: 5px;
      outline: none;
      &:hover {
        transform: scale(1.1);
      }
    }
    input[type="submit"] {
      background-color: rgb(56, 146, 219);
      margin-right: 30px;
    }
    input[type="reset"] {
      background-color: #f30;
    }
  }
}
</style>
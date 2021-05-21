<template>
  <div class="wrapper">
    <div class="header">
      <van-uploader :max-count="1"
                    :after-read="afterRead"
                    :max-size="200 * 1024"
                    @oversize="onOversize"
                    v-model="fileList"
      />
      <div class="name">
        {{ userName }}
      </div>
      <!-- /.name -->
    </div>
    <van-form @failed="onFailed">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="userInfo.userName"
          name="userName"
          placeholder="用户名"
          required
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          v-model="userInfo.shortSentence"
          name="shortSentence"
          placeholder="个人短句"
      />
      <div style="margin: 16px;">
        <van-button @click="submit" round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- /.header -->
  </div>
  <!-- /.wrapper -->
</template>

<script>
import {ref} from "vue";
import {Toast} from "vant";
import {uploadAvatar} from "@/service/upload";
import {useStore} from "vuex";
import {updateUserInfo} from "../service/user";
import {useRouter} from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const userInfoRef = ref(store.state.user);
    const userName = userInfoRef.value.userName;
    const fileListRef = ref(userInfoRef.value.avatarUrl ? [{url: userInfoRef.value.avatarUrl, isImage: true}] : [])

    const afterRead = async (file) => {
      // 此时可以自行将文件上传至服务器
      const param = new FormData();
      param.append("avatar", file.file, "avatar");
      await uploadAvatar(param)
      Toast("头像修改成功");
    };

    function onOversize() {
      Toast('文件大小不能超过 200kb');
    }

    async function submit() {
      const {userId, userName, shortSentence} = userInfoRef.value;
      await updateUserInfo(userId, userName, shortSentence);
      Toast("修改成功");
      router.back();
    }

    function onFailed(failed) {
      console.log(failed)
    }

    return {
      afterRead,
      onOversize,
      userName,
      userInfo: userInfoRef,
      fileList: fileListRef,
      submit,
      onFailed
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  padding: 20px;

  .header {
    display: flex;
    //justify-content: space-between;
    align-items: center;

    .name {
      margin-left: 20px;
      color: #333;
    }
  }
}
</style>
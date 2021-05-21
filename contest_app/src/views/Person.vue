<template>
  <div class="personWrapper">
    <div class="left">
      <div class="user">
        <div class="userInfo">
          <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt="" />
          <img
            style="background: #fff"
            v-else
            src="../assets/images/user.png"
            alt=""
          />
          <!-- {{ userInfo }} -->
          <div class="name">{{ userInfo.userName || "未登录" }}</div>
          <span class="editUserInfo" @click="handleEditUserInfo"
            >编辑个人信息</span
          >
          <div class="login" v-if="!userInfo.userId" @click="toLogin">
            去登录
          </div>
          <div class="login" v-else @click="logout">退出登录</div>
        </div>
        <div class="sentence">
          {{ userInfo.shortSentence || "添加一些文字吧~" }}
        </div>
      </div>
      <div class="addMoment">
        <div class="title">
          <span @click="toEditMoment" v-if="userInfo.userId">写个动态吧</span>
        </div>
      </div>
      <div class="momentList">
        <div class="title">我的动态</div>
        <div class="edit">
          <span v-if="moments.length !== 0" @click="handleModal">{{
            isEdit ? "完成" : "编辑"
          }}</span>
        </div>
        <MomentList
          @closeModal="closeModal"
          :isEdit="isEdit"
          v-if="moments.length !== 0"
          :moments="moments"
        />
        <div v-else class="noMoment">您还没有发布任何动态~</div>
      </div>
      <Page :total="totalPageMoment.length" @pageChange="pageChange" />
    </div>
    <div class="right">
      <Calendar />
      <CardBorder
        :title="cardInfo.title"
        :content="cardInfo.content"
        bgColor="linear-gradient(315deg, rgba(6, 13, 25), #f2005f)"
      />
    </div>
    <EditUserInfo
      v-if="isEditUserInfo"
      :userInfo="userInfo"
      @closeModal="handleEditUserInfo"
    />
    <LoginModal @controlModal="controlModal" v-if="modalStyle === 'login'" />
    <Register @controlModal="controlModal" v-if="modalStyle === 'register'" />
  </div>
</template>

<script>
import { ref, onBeforeMount, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LoginModal from "../components/LoginModal";
import Register from "../components/Register";
import MomentList from "../components/MomentList";
import Page from "../components/Page";
import { getMomentByUserId } from "../service/moment";
import CardBorder from "../components/CardBorder";
import Calendar from "../components/Calendar";
import EditUserInfo from "../components/EditUserInfo";
export default {
  components: {
    LoginModal,
    Register,
    MomentList,
    Page,
    CardBorder,
    Calendar,
    EditUserInfo,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userInfoRef = ref(store.state.user || {});
    const momentListRef = ref([]);
    const modalStyleRef = ref("");
    let totalPageMoment = ref([]);
    const isEditUserInfoRef = ref(false);
    const isEditRef = ref(false);
    const cardInfo = reactive({
      title: "聆听时光",
      content:
        "喜欢独处时间的一隅，静静拥住这样的一段寂静时光，将喧嚣纷扰置之度外，赏红尘冷艳，赏人间水波涟漪。",
    });
    watch(
      () => store.state.user,
      () => {
        userInfoRef.value = store.state.user;
        getMoment();
      }
    );
    async function getMoment() {
      const res = await getMomentByUserId(userInfoRef.value.userId);
      totalPageMoment.value = res.data;
      momentListRef.value = totalPageMoment.value.slice(0, 8);
    }
    onBeforeMount(getMoment);

    function toLogin() {
      modalStyleRef.value = "login";
    }
    function controlModal(target) {
      modalStyleRef.value = target;
    }
    function logout() {
      const ok = confirm("是否确定退出登录？");
      if (!ok) return;
      localStorage.removeItem("token");
      modalStyleRef.value = null;
      location.reload();
    }
    function toEditMoment() {
      router.push("/editMoment");
    }
    function pageChange(nextPage) {
      momentListRef.value = totalPageMoment.value.slice(
        (nextPage - 1) * 8,
        (nextPage - 1) * 8 + 8
      );
    }
    function closeModal() {
      isEditRef.value = false;
    }
    function handleModal() {
      isEditRef.value = !isEditRef.value;
    }
    function handleEditUserInfo() {
      isEditUserInfoRef.value = !isEditUserInfoRef.value;
    }

    return {
      modalStyle: modalStyleRef,
      moments: momentListRef,
      totalPageMoment,
      toLogin,
      userInfo: userInfoRef,
      logout,
      controlModal,
      toEditMoment,
      pageChange,
      cardInfo,
      closeModal,
      isEdit: isEditRef,
      isEditUserInfo: isEditUserInfoRef,
      handleModal,
      handleEditUserInfo,
    };
  },
};
</script>

<style lang="less" >
.personWrapper {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .left {
    width: 800px;

    .user {
      backdrop-filter: blur(5px);
      background-color: rgba(0, 10, 10, 0.7);
      box-shadow: 1px 2px 3px #000;
      border-left: 1px solid #f90;
      border-top: 1px solid rgb(65, 93, 216);
      padding: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      transition: all 0.3s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.9);
      }
      .userInfo {
        position: relative;
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.6s;
          &:hover {
            transform: rotate(360deg);
          }
        }
        .name {
          margin-left: 20px;
          font-size: 25px;
          color: #f90;
          font-weight: bolder;
        }
        .login {
          color: #fff;
          position: absolute;
          background-color: rgb(236, 66, 24);
          padding: 3px 8px;
          border-radius: 10px;
          right: 20px;
        }
        .editUserInfo {
          margin-left: 30px;
          color: rgb(118, 125, 230);
        }
      }
      .sentence {
        margin-top: 20px;
        color: #aaa;
        text-indent: 2em;
      }
    }
    .addMoment {
      margin-top: 20px;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      .title {
        text-align: right;
        span {
          line-height: 30px;
          display: inline-block;
          padding: 3px 8px;
          border-radius: 10px;
          height: 30px;
          color: #fff;
          background: linear-gradient(#32f, #01e, #319);
        }
      }
    }
    .momentList {
      .title {
        text-align: center;
        font-size: 25px;
        color: #fff;
        text-shadow: 1px 1px 2px #888;
      }
      .edit {
        text-align: right;

        span {
          background-color: #f00;
          color: #fff;
          padding: 3px 8px;
          margin-right: 20px;
          border-radius: 5px;
          display: inline-block;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      .noMoment {
        text-align: center;
        color: #888;
        font-size: 20px;
        margin-top: 50px;
      }
    }
  }
  .right {
    width: 350px;
  }
}
</style>
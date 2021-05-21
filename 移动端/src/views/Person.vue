<template>
  <div class="person">
    <div class="person-info">
      <div class="show-info">
        <img
            v-if="userInfo && userInfo.avatarUrl"
            :src="userInfo.avatarUrl"
            alt=""
            class="avatar"
        />
        <img v-else src="../assets/user.png" alt="" class="avatar" />
        <span class="user">
          <span class="name">{{
              userInfo ? userInfo.userName : "默认用户"
            }}</span>
          <span class="edit" @click="toEdit">编辑个人信息></span>
        </span>
      </div>
      <div class="toLogin" v-if="!userInfo">
        <router-link to="/login">
          <span>去登录 > </span>
        </router-link>
      </div>
      <div v-else>
        <span class="logout" @click="logout">退出登录</span>
      </div>
    </div>
    <div class="sentence" v-if="userInfo">
      <span>{{ userInfo.shortSentence }}</span>
    </div>
    <div class="sentence" v-else>
      <span>介绍一下自己吧~</span>
    </div>
    <div class="pubMoment">
    <span class="pubWrapper" @click="handleToEditMoment">
        <span>写个动态</span>
      <i class="iconfont icon-xie"></i>
    </span>
    </div>
    <div class="myMomentList">
      <MomentListShow :moments="moments" />
    </div>
    <!-- /.myMomentList -->
    <!-- /.pubMoment -->
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import MomentListShow from "../components/MomentListShow"
import {useStore} from "vuex";
import {formatDate} from "../utils/data"
import {getMomentByUserId} from "../service/moment"

export default {
  components: {MomentListShow},
  setup() {
    const store = useStore();
    const router = useRouter();
    const UserInfoRef = ref(null);
    const momentsRef = ref([]);
    onMounted(async () => {
      await store.dispatch("getUserInfo");
      const userInfo = store.state.user;
      if (!userInfo) return;
      UserInfoRef.value = userInfo;
      const {data} = await getMomentByUserId(userInfo.userId);
      data.forEach(moment => {
        moment.createTime = formatDate(moment.createTime);
      })
      momentsRef.value = data;
    });

    function logout() {
      const isLogout = confirm("是否确定退出登录！");
      if (isLogout) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }

    function toEdit() {
      router.push({
        path: "/editUserInfo",
      })
    }

    function handleToEditMoment() {
      router.push("/editMoment")
    }

    return {
      userInfo: UserInfoRef,
      logout,
      handleToEditMoment,
      toEdit,
      moments: momentsRef
    };
  },
};
</script>

<style lang="less" scoped>
.person {
  height: 90vh;
  padding: 15px;
  box-sizing: border-box;

  .person-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 10px 20px;

    .show-info {
      display: flex;
      align-items: center;

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 15px;
      }

      .user {
        position: relative;
        width: 130px;
        height: 40px;

        .name {
          font-size: 16px;
        }

        .edit {
          color: #aaa;
          display: block;
          margin-top: 5px;
          font-size: 14px;
          position: absolute;
          left: 0;
          top: 30px;
        }
      }
    }

    .toLogin {
      color: #405;
      font-weight: bolder;
      font-size: 18px;
      font-family: 雅黑;
    }

    .logout {
      font-size: 15px;
      color: #fff;
      background-color: #f40;
      padding: 5px 8px;
      border-radius: 8px;
    }
  }

  .sentence {
    padding: 20px 15px;
    font-size: 14px;
    color: #888;
    text-indent: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .pubMoment {
    font-size: 20px;
    text-align: right;
    margin-right: 30px;

    span {
      margin-right: 10px;
      color: #3967FF;
    }
  }

  .myMomentList {
    height: 300px;
    overflow: auto;
  }
}
</style>
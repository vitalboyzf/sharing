<template>
  <div class="momentShowContent">
    <template class="container" v-if="handleMoment.length !== 0">
      <div
        class="item"
        v-for="moment in handleMoment"
        :key="moment.id"
        @click="toDetail(moment.id)"
      >
        <img v-if="moment.pictures" :src="moment.pictures[0]" alt="" />
        <img v-else src="../assets/images/defaultMomentPicture.webp" alt="" />
        <div class="box">
          <div class="title">{{ moment.title }}</div>
          <div class="content" v-html="moment.content" />
          <div class="footer">
            <span class="date"
              ><i class="iconfont icon-riqiqishu"></i
              >{{ moment.createTime }}</span
            >
            <span class="views"
              ><i class="iconfont icon-fangwen"></i>{{ moment.views }}</span
            >
          </div>
        </div>
        <div class="modal" v-if="isEdit">
          <span class="delete" @click="deleteMoment(moment.id)">X</span>
        </div>
      </div>
    </template>
    <Loading v-else />
  </div>
</template>

<script>
import { computed } from "vue";
import { formatDate } from "../utils/data";
import { useRouter } from "vue-router";
import { deleteMomentByMomentId } from "../service/moment";
import Loading from "../components/Loading";
export default {
  components: { Loading },
  props: ["moments", "isEdit"],
  setup(props, ctx) {
    const router = useRouter();
    const moments = computed(() => {
      return props.moments.map((moment) => {
        moment.createTime = formatDate(moment.createTime, false);
        return moment;
      });
    });
    function toDetail(id) {
      if (props.isEdit) {
        return;
      }
      router.push({
        path: "/momentDetail",
        query: {
          id,
        },
      });
    }
    async function deleteMoment(momentId) {
      const res = await deleteMomentByMomentId(momentId);
      ctx.emit("closeModal");
      alert("删除成功");
    }
    return {
      handleMoment: moments,
      toDetail,
      deleteMoment,
    };
  },
};
</script>

<style lang="less" scoped>
.momentShowContent {
  width: 800px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  font-size: 15px;
  min-height: 300px;

  .item {
    width: 169px;
    height: 230px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 2px #000, -1px 0px 1px #f90;
    margin: 10px 15px;
    border-radius: 10px;
    transition: transfrom 0.6s;
    overflow: hidden;
    position: relative;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
      img{
        transform:scale(1.1)
      }
    }
    img {
      width: 100%;
      height: 45%;
    }
    .box {
      position: relative;
      height: 55%;
      .title {
        text-align: left;
        font-size: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 5px;
        box-sizing: border-box;
        color: rgb(69, 157, 240);
        margin-bottom: 10px;
      }
      .content {
        font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 5px;
        box-sizing: border-box;
        color: #aaa;
      }

      .footer {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        .date {
          color: #f80;
          i {
            color: #f99;
            margin-right: 3px;
          }
        }
        .views {
          margin-left: 30px;
          font-size: 12px;
          color: #f90;
          i {
            color: #f99;
            margin-right: 2px;
          }
        }
      }
    }
    .modal {
      background-color: rgba(0, 0, 0, 0.8);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      &:hover {
        .delete {
          transform: rotate(360deg);
        }
      }
      .delete {
        color: #fff;
        font-size: 30px;
        position: absolute;
        right: 10px;
        transition: all 0.5s;
        top: 10px;
      }
    }
  }
}
</style>
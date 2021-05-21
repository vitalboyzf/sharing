<template>
  <div class="momentWrapper">
    <div class="item" v-for="moment in moments" :key="moment.id">
      <div class="content">{{ moment.content }}</div>
      <div class="info">
            <span class="createData">
              发布:<span style="color:#0077aa">{{ moment.createTime }}</span>
            </span>
        <span class="commentCount">
              评论数:<span style="color:green">{{ moment.commentCount }}</span>
            </span>
        <span class="views">
             访问量:<span style="color:#f40">{{ moment.views }}</span>
            </span>
        <span class="toDetail" @click="toMomentDetail(moment.id)">去详情</span>
        <!-- /.toInfo -->
        <!-- /.createData -->
      </div>
    </div>
  </div>

</template>

<script>
import {useRouter} from "vue-router";

export default {
  props: ["moments"],
  name: "momentListShow",
  setup() {
    const router = useRouter();

    function toMomentDetail(momentId) {
      router.push({
        path: "/momentDetail",
        state: {momentId: momentId},
        query: {id: momentId}
      })
    }

    return {
      toMomentDetail,
      currentPage: 3
    }
  }
}
</script>

<style lang="less" scoped>
.momentWrapper{
  ul{
    margin-top: 30px;
  }
}
.item {

  height: 100px;
  border: 1px solid #aaa;
  border-left-color: transparent;
  border-right-color: transparent;
  position: relative;

  .content {
    font-size: 16px;
    margin: 10px 0;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3; //行数
    -webkit-box-orient: vertical;
  }

  .info {
    position: absolute;
    bottom: 5px;
    width: 100%;

    span {
      font-size: 13px;
      color: #888888;

      &.createData {
        margin-left: 10px;
      }

      &.toDetail {
        position: absolute;
        right: 20px;
        bottom: 0;
        font-size: 16px;
        color: #3967FF;
      }

      &.commentCount {
        margin-left: 10px;
      }

      &.views {
        margin-left: 10px;
      }
    }
  }
}
</style>
<template>
  <div class="link">
    <div class="title">友情链接</div>
    <div class="content">
      <div class="item" v-for="item in linkList" :key="item.title">
        <a :href="item.url" :style="{ background: item.bgc }">{{
          item.title
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { randomColor } from "../utils/randomColor";
export default {
  setup() {
    const linkList = [
      { title: "袁进的博客", url: "http://blog.yuanjin.tech/" },
      {
        title: "网易云音乐接口项目",
        url: "https://neteasecloudmusicapi.vercel.app/#/",
      },
      {
        title: "YDoc",
        url: "https://github.com/YMFE/ydoc",
      },
      {
        title: "React技术揭秘",
        url: "https://react.iamkasong.com/",
      },
      {
        title: " Vue3js官网",
        url: "https://vue3js.cn/",
      },
      {
        title: "廖雪峰官方网站",
        url: "https://www.liaoxuefeng.com/",
      },
      {
        title: "我的github仓库",
        url: "https://github.com/vitalboyzf?tab=repositories",
      },
      {
        title: "bootstrap4中文文档",
        url: "http://bs4.vx.link/",
      },
      {
        title: "我的npm包管理",
        url: "https://www.npmjs.com/settings/zf-v/packages",
      },
      {
        title: "MDN Web开发文档",
        url: "https://developer.mozilla.org/zh-CN/docs/Web",
      },

      {
        title: "若岚博客",
        url: "https://www.yangruolan.com/log/",
      },
      {
        title: "jQuery插件库",
        url: "https://www.jq22.com/",
      },
      {
        title: "渡一开发者中心",
        url:
          "https://passport.duyiedu.com/login?cb=https://developer.duyiedu.com/previewAPI/%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F",
      },
      {
        title: "阿里巴巴图标库",
        url: "https://www.iconfont.cn/",
      },
      {
        title: "wangEditor富文本编辑器",
        url: "https://github.com/wangeditor-team/wangEditor",
      },
    ];
    linkList.map((link) => {
      link.bgc = randomColor(0.6);
      return link;
    });
    return {
      linkList,
    };
  },
};
</script>

<style lang="less" scoped>
.link {
  font-size: 15px;
   backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  width: 350px;
  height: 420px;
  background-color: rgba(0, 0, 0, 0.6);
  margin-left: 30px;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  transition: all 0.5s;
  &:hover {
    background-color: #000;
  }
  .title {
    color: #fff;
    font-weight: bolder;
    padding-bottom: 10px;
    border-bottom: 1px solid #f90;
  }
  .content {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    .item {
      height: 20px;
      line-height: 20px;
      color: #fff;
      border-radius: 10px;
      overflow: hidden;
      padding: 3px 2px;
      margin: 8px 8px;
      &:hover {
        background: #f90;
      }
      a {
        text-decoration: none;
        color: #fff;
        padding: 3px 5px;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
      }
    }
  }
}
</style>
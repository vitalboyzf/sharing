<template>
  <div class="dycalendarContainer">
    <section class="section">
      <div class="box">
        <div class="dycalendar"></div>
      </div>
    </section>
  </div>
</template>

<script>
import "../jslib/dycalendar";
import "../jslib/vanilla-tilt";
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      dycalendar.draw({
        target: ".dycalendar",
        type: "month",
        dayformat: "full",
        monthformat: "full",
        highlighttargetdate: true,
        prevnextbutton: "show",
      });
      // vanilla-til.js object
      VanillaTilt.init(document.querySelector(".dycalendarContainer"), {
        max: 25,
        speed: 400,
        glare: true, // 发光效果
        "max-glare": 0.5,
        scale: 0.8, //缩放
        // 调整旋转角度
        gyroscopeMinAngleX: -10, // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
        gyroscopeMaxAngleX: 10, // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
        gyroscopeMinAngleY: -10, // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
        gyroscopeMaxAngleY: 10,
      });
    });
  },
};
</script>

<style lang="less">
@import url("../assets/css/dycalendar.css");
.dycalendarContainer {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border-top: rgba(255, 255, 255, 0.5) 1px solid;
    border-left: rgba(255, 255, 255, 0.5) 1px solid;
    overflow: hidden;
    color: #aaa;
    border-radius: 10px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    .box {
      .dycalendar {
        width: 100%;
        padding: 20px;
        table {
          width: 100%;
          margin-top: 40px;
        }
        .dycalendar-month-container .dycalendar-body table tr td {
          color: rgb(16, 150, 139);
          cursor: pointer;
        }
        .dycalendar-month-container .dycalendar-body table tr:nth-child(1) td {
          background-color: rgba(109, 151, 97, 0.8);
          border-radius: 7px;
          font-weight: 400;
          color: #fff;
        }
        .dycalendar-month-container .dycalendar-body table tr td:hover {
          background-color: rgb(64, 104, 238);
          font-weight: 500;
          border-radius: 2px;
          color: #000;
        }
        .dycalendar-month-container .dycalendar-target-date,
        .dycalendar-month-container .dycalendar-today-date {
          background-color: rgb(64, 104, 238);
          color: #fff !important;
        }
        .dycalendar-month-container
          .dycalendar-header
          .dycalendar-prev-next-btn.prev-btn,
        .dycalendar-month-container
          .dycalendar-header
          .dycalendar-prev-next-btn.next-btn {
          background-color: rgba(255, 255, 255, 0.3);
          color: #0f0;
          width: 44px;
          height: 33px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
        }
        .dycalendar-month-container .dycalendar-span-month-year {
          color: #fff;
          width: 100%;
          height: 33px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
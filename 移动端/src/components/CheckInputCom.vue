<template>
  <input type="checkbox" :checked="checkBoxValue" @change="changeCheckBox" class="checkbox">
  <div>
    ipt: {{ checkBoxValue }}
  </div>
  <input type="text" :value="iptValue" @input="changeIptValue">
  <div>
    ipt: {{ iptValue }}
  </div>
</template>

<script>

export default {
  props: {
    iptValue: {
      type: String
    },
    iptValueModifiers: {
      default: () => ({}),
    },
    checkBoxValue: {
      type: Boolean
    }
  },
  name: "CheckInputCom",
  setup(props, ctx) {

    function changeIptValue(e) {

      if (props.iptValueModifiers.trim) {
        e.target.value = e.target.value.trim();
      }
      ctx.emit("update:iptValue", e.target.value);
    }

    function changeCheckBox() {
      ctx.emit("update:check-box-value", !props.checkBoxValue);
    }

    return {
      changeIptValue,
      changeCheckBox
    }
  }
}
</script>

<style scoped>

</style>
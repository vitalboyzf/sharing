<template>
  <!--  <CheckInputCom :ipt-value="iptValue" @update:ipt-value="updateIptValueHandler" />-->
  <CheckInputCom
      v-model:iptValue.trim="iptValue"
      v-model:check-box-value="boxValue" />
</template>

<script>
import CheckInputCom from "../components/CheckInputCom.vue"
import {ref} from "vue";

export default {
  components: {CheckInputCom},

  setup() {
    const iptValue = ref("");
    const boxValue = ref(true);
    return {
      iptValue,
      boxValue
    }
  }
}


</script>

<style>
</style>
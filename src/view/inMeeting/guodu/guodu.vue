<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let to = window.sessionStorage.getItem("to");
    if (to == "home") {
      this.$router.push("/home");
    } else {
      this.$router.push("/overall/one");
    }
    this.$store.dispatch("set_Refresh", 1);
  },
  computed: {},

  watch: {
    // 监听,当路由发生变化的时候执行
  },
};
</script>
<style lang="less" scoped>
</style>
<template>
  <div>
    <input type="text" v-model="inputText" />
    <button @click="testParams">Params</button>
  </div>
</template>

<script>
export default {
  name: "TestParams",
  components: {},
  data() {
    return {
      inputText: ""
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
    testParams() {
      this.$router.push({
        name: "ParamsByRoute",
        params: { id: "bar" }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.inputText != "") {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>

<style>
</style>

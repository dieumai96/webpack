<template>
    <div>Test params</div>
</template>

<script>
export default {
  name: "TestParams",
  components: {},
  created(){
      console.log(this.$route.query);
  }
};
</script>

<style>
</style>

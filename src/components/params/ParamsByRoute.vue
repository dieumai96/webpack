<template>
  <div>Params By route</div>
</template>

<script>
export default {
  name: "ParamsByRoute",
  created(){
      console.log(this.$route.params);
  }
};
</script>

<style>
</style>
<template>
  <div>
    {{ title }}
    <button @click="title = 'Nguyen Van B'">Change Input</button>
    <button @click="onDestroy">Destroy</button>
  </div>
</template>

<script>
export default {
  name: "LifeCycle",
  data() {
    return {
      title: "Nguyen Van A"
    };
  },
  created() {
    console.log("Created...");
  },
  mounted() {
    console.log("Mounted...");
  },

  destroyed() {
    console.log("Destroy...");
  },
  updated() {
    console.log("Update ....");
  },
  methods: {
    onDestroy() {
      this.$destroy();
    }
  }
};
</script>

<style>
</style>
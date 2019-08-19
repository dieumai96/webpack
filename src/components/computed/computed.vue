<template>
  <div>
    <div>{{reversedMessage}}</div>
    <button class="btn btn-danger" @click="name = 'Dao Thi Lien Hoai'">Change name</button>
    <br />
    <span>{{count}}</span>
    <button class="btn btn-primary" @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  name: "Computed",
  data() {
    return {
      name: "Vu Van Thuy",
      count: 1
    };
  },
  computed: {
    reversedMessage() {
      console.log("Run.....");
      return this.name
        .split(" ")
        .reverse()
        .join(" ");
    }
  },
  methods: {
    changeName() {
      console.log("Run in methods");
      return this.name;
    },
    increment() {
      this.count++;
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="container" style="text">
    <span
      :style="{color : 'red', fontSize : fontSize + 'px',textDecoration : 'underline'}"
    >Hello world</span>
    <p :style="style">hello world</p>

    <input type="text" :class="classObj" :value="valueInput" />
    <h1>Test encapsulation style</h1>
  </div>
</template>

<script>
export default {
  name: "Style",
  data() {
    return {
      fontSize: 30,
      valueInput: "Vu Van Thuy",
      style: {
        color: "blue",
        fontSize: "25px"
      },
      classObj: {
        "form-control": true,
        "change-input": true
      }
    };
  }
};
</script>

<style scoped>
.change-input {
  font-size: 25px;
  color: aquamarine;
}
</style>
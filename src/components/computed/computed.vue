<template>
  <div>
    <div>{{reversedMessage}}</div>
    <button class="btn btn-danger" @click="name = 'Dao Thi Lien Hoai'">Change name</button>
    <br />
    <span>{{count}}</span>
    <button class="btn btn-primary" @click="count++">Increment</button>
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
  // computed method không nhận cặp dấu () đăng sau. Nên không thể truyền tham số đầu vào, nên nó chỉ nhận được dữ liệu có sẵn bên trong component
  // computed sẽ tính toán lại các biến phụ thuộc vào trong nó thay đổi. Còn method sẽ tính toán  lại các biến khi mà nó được gọi
  computed: {
    reversedMessage() {
      return this.name
        .split(" ")
        .reverse()
        .join(" ");
    }
  },
  methods: {
    changeName() {
      return this.name;
    }
  }
};
</script>

<style>
</style>
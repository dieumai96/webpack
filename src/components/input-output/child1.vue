<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <span class="infomation">abcccc</span>
      <h5 class="card-title">Child 1</h5>
      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p
        class="card-text"
      >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">{{userInfomation.name}}</a>
      <a href="#" class="card-link">{{userInfomation.age}}</a>
      <br />
      <button class="btn btn-danger" @click="changeInfomation">Change</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Child1",
  props: {
    userInfomation: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeInfomation() {
      this.userInfomation.name = "Nguyen Van A";
      this.userInfomation.age = "25";
      this.$emit("changeUse1", this.userInfomation);
    }
  }
};
</script>

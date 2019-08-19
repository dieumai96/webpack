<template>
  <div class="parent-view">
    <div class="parent">
      <span class="infomation">User1: {{user1.name}} {{user1.age}}</span>
      <br />
      <span class="infomation color">User2: {{user2.name}} {{user2.age}}</span>
    </div>
    <div class="row">
      <div class="col-md-4">
        <Child1 :userInfomation="user1" v-on:changeUse1="user1 = $event" />
      </div>
      <div class="col-md-4">
        <Child2 :userInfomation="user2" v-on:changeUse2="user2 = $event"/>
      </div>
    </div>
  </div>
</template>

<script>
import Child1 from "./child1.vue";
import Child2 from "./child2.vue";
export default {
  name: "InputOutput",
  components: {
    Child1,
    Child2
  },
  data() {
    return {
      user1: {
        name: 18,
        age: "Vu Thuy"
      },
      user2: {
        name: 20,
        age: "Lien hoai"
      }
    };
  }
};
</script>

<style lang = "scss" scope>
span.infomation {
  color: red;
  font-size: 20px;
  &.color {
    color: blue;
  }
}
</style>
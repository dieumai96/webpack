<template>
  <div>
    <div>a</div>
    <button @click="onLogin">click</button>
  </div>
</template>
<script>
// import AppSercvice from "./../../services/app-service";
import { BehaviorSubject } from 'rxjs';
export default {
  name: "coma",
  methods: {
    onLogin(e) {
      // let random = Math.random(20);
      // AppSercvice.flag.next(random);
    }
  }
};
</script>
<style scoped>
</style>
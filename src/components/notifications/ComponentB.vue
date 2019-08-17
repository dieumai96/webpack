<template>
  <div>compob</div>
</template>
<script>
import AppSercvice from "./../../services/app-service";
import { BehaviorSubject } from "rxjs";
let INIT_DATA = null;

export default {
  name: "comb",

  created() {
    // AppSercvice.flag$.subscribe(data => {
    //   if (data != null) {
    //     console.log(data);
    //     AppSercvice.flag.complete();
    //   }
    // });
  }
};
</script>
<style scoped>
</style>
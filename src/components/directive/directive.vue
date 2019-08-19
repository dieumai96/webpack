<template>
  <div>
    <h2>Thông tin nhân viên cty : {{company}}</h2>
    <input type="text" placeholder="Search name" v-bind:value="searchKey" />
    <ul>
      <li v-bind:key="i" v-for="(item,i) in user">
        <div class="infomation">
          <span>{{item.class}}</span>
          <span>{{item.name}}</span>
          <i
            class="fa fa-female"
            :style="{color : 'red'}"
            aria-hidden="true"
            v-if="item.gender == 'female'"
          ></i>
          <i
            class="fa fa-male"
            :style="{color : 'blue'}"
            aria-hidden="true"
            v-if="item.gender == 'male'"
          ></i>
          <i class="fa fa-times" aria-hidden="true" v-on:click="deleteItem(item.id)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import uuid from "uuid";
export default {
  name: "Directive",
  data() {
    return {
      company: "SmartOsc",
      user: [
        { name: "Vu Van A", class: "CN06", gender: "male" },
        { name: "Vu Van B", class: "CN07", gender: "female" },
        { name: "Vu Van C", class: "CN08", gender: "female" },
        { name: "Vu Van D", class: "CN09", gender: "male" },
        { name: "Vu Van E", class: "CN010", gender: "male" }
      ],
      searchKey: "vu van thuy"
    };
  },
  created() {
    this.user.forEach(e => {
      e.id = uuid.v4();
    });
  },
  methods: {
    deleteItem(id) {
      this.user = this.user.filter(x => x.id !== id);
    },
    onSearch(event) {
      console.log(this.searchKey);
    }
  }
};
</script>
<style lang = "scss" scoped>
ul {
  li {
    list-style: none;
    i {
      color: red;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>

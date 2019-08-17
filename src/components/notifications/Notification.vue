<template>
  <div class="container">
    <div id="nb-global-spinner" class="spinner" v-if="isLoading">
      <div class="blob blob-0"></div>
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="blob blob-4"></div>
      <div class="blob blob-5"></div>
    </div>
    <md-table v-model="listData" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Notifications</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Action" md-sort-by="action" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Title" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="date">{{ item.meta.timeCreated }}</md-table-cell>
        <md-table-cell
          md-label="Read"
          md-sort-by="read"
        >{{ item.totalReadFlat > 0 ? item.totalReadFlat : 0 }}/{{item.totalFlat ? item.totalFlat : 0}}</md-table-cell>
        <md-table-cell md-label="Send" md-sort-by="send">
          <md-checkbox v-model="item.status == 2" class="md-primary" disabled></md-checkbox>
        </md-table-cell>
        <!-- <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>-->
      </md-table-row>
    </md-table>
  </div>
  <!-- <coma></coma>
  <comb></comb>-->
</template>

<script>
import axios from "axios";
import Config from "./../../config/serverConfig";
import Url from "./../../config/apiUrl";
import coma from "./ComponentA.vue";
import comb from "./ComponentB.vue";
export default {
  name: "Notification",
  components: {
    coma,
    comb
  },
  data() {
    return {
      isLoading: Boolean,
      listData: [],
      disabled: true
    };
  },
  created() {
    const headers = {
      Authorization: Config.TOKEN
    };
    this.isLoading = true;
    axios
      .post(
        `${Config.API_ENDPOINT}/${Url.GET_ALL_NOTIFICATION}`,
        {
          page: 1,
          limit: 10
        },
        { headers }
      )
      .then(res => {
        this.isLoading = false;
        if (res.status == 200) {
          if (res.data.status == 0) {
            let { data } = res.data;
            console.log(data);
            this.listData = data;
          }
        }
      })
      .catch(err => err);
  }
};
</script>


<style  scoped>
.md-table-cell {
  text-align: left;
}
.md-numeric {
  text-align: left !important;
}
.container {
  margin-top: 20px;
}
@-webkit-keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes spin {
  0% {
    -moz-transform: rotate(0);
  }
  100% {
    -moz-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1003;
  overflow: hidden;
}
.spinner div:first-child {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  box-shadow: 0 3px 3px 0 rgb(36, 22, 236);
  transform: translate3d(0, 0, 0);
  animation: spin 2s linear infinite;
}
.spinner div:first-child:after,
.spinner div:first-child:before {
  content: "";
  position: absolute;
  border-radius: 50%;
}
.spinner div:first-child:before {
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  box-shadow: 0 3px 3px 0 rgb(67, 9, 226);
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}
.spinner div:first-child:after {
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  box-shadow: 0 3px 3px 0 rgb(47, 34, 163);
  animation: spin 1.5s linear infinite;
}
</style>

<template>
  <md-dialog :md-active.sync="showModalSelectBuilding" :md-click-outside-to-close="false">
    <md-dialog-title>Select building</md-dialog-title>
    <md-dialog-content>
      <div class="row" :style="{width : '700px'}" v-if="!isLoading">
        <div class="col-md-12">
          <ul>
            <li v-for="(item,index) in buildingInfo.blocks" :key="index">
              <md-checkbox v-model="array" @change="onChangeStatus($event,item)">{{item}}</md-checkbox>
            </li>
          </ul>
        </div>
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      <md-button class="md-primary" @click="showDialog = false">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { ajax } from "rxjs/ajax";
import Config from "./../../config/serverConfig";
import Url from "./../../config/apiUrl";
import { ThirdParty } from "./../../third-party/third-party";
var jwtDecode = require("jwt-decode");
export default {
  props: {
    showModalSelectBuilding: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      buildingInfo: {},
      isLoading: true,
      array: []
    };
  },
  beforeCreate() {},
  created() {
    let token = ThirdParty.getToken();
    let decoded = jwtDecode(token);
    let body = {
      buildingID: decoded.buildingID
    };
    ajax({
      url: `${Config.API_ENDPOINT}/${Url.GET_BUILDING_INFOMATION}`,
      method: "POST",
      headers: {
        Authorization: Config.TOKEN
      },
      body
    }).subscribe(data => {
      this.isLoading = false;
      console.log(data.response);
      if (data.response) {
        if (data.response.status == 0) {
          this.buildingInfo = data.response.data;
        }
      }
    });
  },
  methods : {
     onChangeStatus(event,item){
       console.log(item);
     }
  },
  name: "SelectBuilding"
};
</script>

<style scoped lang = "scss">
ul {
  li {
    list-style: none;
  }
}
</style>
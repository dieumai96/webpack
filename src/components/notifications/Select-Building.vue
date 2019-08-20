<template>
  <md-dialog :md-active.sync="showModalSelectBuilding">
    <md-dialog-title>Preferences</md-dialog-title>

    <md-tabs md-dynamic-height>
      <md-tab md-label="General">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
      </md-tab>

      <md-tab md-label="Activity">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
      </md-tab>

      <md-tab md-label="Account">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
      </md-tab>
    </md-tabs>

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
import * as JWT from "jwt-decode";
export default {
  props: {
    showModalSelectBuilding: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      buildingInfo: {}
    };
  },
  created() {
    let token = ThirdParty.getToken();
    let decoded = JWT(token);
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
    }).subscribe(data => console.log(data));
  },
  name: "SelectBuilding"
};
</script>

<style>
</style>
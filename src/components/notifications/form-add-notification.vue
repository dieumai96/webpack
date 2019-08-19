<template>
  <md-dialog :md-active.sync="showDialog">
    <md-tabs md-dynamic-height>
      <md-tab md-label="Create notification">
        <div class="row" :style="{width : '600px'}">
          <div class="col-md-12 col-lg-12">
            <div class="form-group">
              <label for="input-title">Titlte</label>
              <input type="text" class="form-control" name id />
            </div>
          </div>
        </div>
      </md-tab>
    </md-tabs>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeModal('do-nothing')">Close</md-button>
      <md-button class="md-primary" @click="closeModal('create')">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
// import AppService from "./../../services/app-service";
import { messageService } from "./../../services/app-service";

export default {
  name: "AddNotification",
  props: ["showDialog"],
  methods: {
    closeModal(event) {
      console.log(event);
      switch (event) {
        case "create": {
          messageService.sendCallBackCloseModal(true);
          break;
        }
        case "do-nothing": {
          this.$emit("callbackDialog", false);
          //   AppService.createBeaviorSubject().next(true);

          break;
        }
      }
    }
  }
};
</script>


<style  scoped lang = "scss">
.form-group {
  font-family: 'Muli',sans-serif;
  input{
    outline: none;
    border-radius: 0px;
  }
}
</style>

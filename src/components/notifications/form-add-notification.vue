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
          <div class="col-md-12 col-lg-12">
            <div class="form-group">
              <label for="input-title">Content</label>
              <textarea name id class="form-control" cols="30" rows="6"></textarea>
            </div>
          </div>
          <div class="col-md-12 col-lg-12">
            <div class="upload-btn-wrapper">
              <button class="btn">Upload a file</button>
              <input type="file" name="myfile" @change="onChangeFile" multiple />
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
    },
    onChangeFile(event){
      
    }
  }
};
</script>


<style  scoped lang = "scss">
.form-group {
  font-family: "Muli", sans-serif;
  input {
    outline: none;
    border-radius: 0px;
  }
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.upload-btn-wrapper input[type="file"] {
  height: 100px;
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>

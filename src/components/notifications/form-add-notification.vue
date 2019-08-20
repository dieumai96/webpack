<template>
  <md-dialog :md-active.sync="showDialog" class="dialogParent" :md-click-outside-to-close = "false">
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
          <div class="col-md-12 col">
            <ul class="list-files">
              <li v-for="(item,index) in listFile" :key="index">
                <span>{{item.file.name | textPipe}}</span>
                <i class="fa fa-times" aria-hidden="true" @click="removeFromList(item.id)"></i>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for>Select scope</label>
              <select name class="form-control" id @change="selectScope($event)">
                <option value="1">All</option>
                <option value="2">Building</option>
                <option value="3">Flat</option>
              </select>
            </div>
          </div>
        </div>
      </md-tab>
    </md-tabs>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeModal('do-nothing')">Close</md-button>
      <md-button class="md-primary" @click="closeModal('create')">Save</md-button>
    </md-dialog-actions>
    <SelectBuilding v-if="selectType == 2" :showModalSelectBuilding="true" />
  </md-dialog>
</template>

<script>
// import AppService from "./../../services/app-service";
import { messageService } from "./../../services/app-service";
import SelectBuilding from "./Select-Building.vue";

import uuid from "uuid";
export default {
  name: "AddNotification",
  props: ["showDialog"],
  data() {
    return {
      listFile: [],
      selectedCountry: null,
      countries: [
        "Algeria",
        "Argentina",
        "Brazil",
        "Canada",
        "Italy",
        "Japan",
        "United Kingdom",
        "United States"
      ],
      showModalSelectBuilding: false,
      selectType: 1
    };
  },
  components: { SelectBuilding },
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
    selectScope(event) {
      if (event.target.value == 2) {
        $(".dialogParent").css("display", "none");
        this.selectType = 2;
        this.showModalSelectBuilding = true;
      }
      if (event.target.value == 3) {
        $(".dialogParent").css("display", "none");
      }
    },
    onChangeFile(event) {
      let target = event.target || event.srcElement;
      for (var i = 0; i < event.target.files.length; i++) {
        this.listFile.push({
          id: uuid.v4(),
          file: event.target.files[i]
        });
      }
      console.log(this.listFile);
      target.value = "";
    },
    removeFromList(id) {
      this.listFile = this.listFile.filter(x => x.id != id);
    }
  },
  filters: {
    textPipe(args) {
      let length = args.length;
      let splice = "";
      if (length < 40) {
        splice = args;
      } else {
        splice = args.substr(0, 20) + "...";
      }
      return splice;
    }
  },
  computed: {
    receiveValueSelect() {
      return this.selectedCountry;
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
.list-files {
  list-style: none;
  margin: 10px;
  i {
    color: red;
    cursor: pointer;
  }
}

span {
  font-family: "Muli", sans-serif;
  color: #5d66dd;
}
</style>

<template>
  <div>
    <div
      v-if="isLoading"
      class="w3-container w3-red"
      v-bind:style="{ width: uploadPercentage != 100 ? (uploadPercentage + '%') : (0 + '%') , display : uploadPercentage == 100 ? 'none' : 'block' , height: uploadPercentage != 100 ? (10 + 'px') : (0 + 'px')}"
    ></div>
    <div class="container">
      <Loading v-if="isLoading" />
      <md-table v-model="listData" md-card>
        <md-table-toolbar>
          <span class="md-title">Notifications</span>
          <md-button
            class="md-raised md-primary"
            v-bind:style="{textTransform : 'capitalize'}"
            @click="showDialog = true"
          >Add notification</md-button>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Action" md-sort-by="action" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Title" md-sort-by>{{ item.title }}</md-table-cell>
          <md-table-cell
            md-label="Date"
            md-sort-by="date"
          >{{ item.meta.timeCreated | tranformDate }}</md-table-cell>
          <md-table-cell
            md-label="Read"
            md-sort-by="read"
          >{{ item.totalReadFlat > 0 ? item.totalReadFlat : 0 }}/{{item.totalFlat ? item.totalFlat : 0}}</md-table-cell>
          <md-table-cell md-label="Send" md-sort-by="send">
            <md-checkbox v-bind:checked="item.status == 2" class="md-primary" disabled></md-checkbox>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <div class="container-fluid">
        <nav>
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" v-on:click="changePage('','prev')" aria-label=" Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              class="page-item page-item-number"
              v-bind:key="item.id"
              v-for="(item) in renderPage.slice(0, 5)"
            >
              <a
                class="page-link"
                v-bind:class="{ active: item.page == 1 }"
                v-bind:id="'dpl-block-'+item.page"
                v-on:click="changePage(item.page,'page')"
              >{{item.page}}</a>
            </li>

            <li class="page-item" v-on:click="changePage('','next')">
              <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- //// -->
    <AddNotification v-bind:showDialog="showDialog" @callbackDialog="showDialog = $event" />
  </div>

  <!-- <coma></coma>
  <comb></comb>-->
</template>

<script>
import axios from "axios";
import moment from "moment";
import Config from "./../../config/serverConfig";
import Url from "./../../config/apiUrl";
import Loading from "./../shared/Loading.vue";
import { timer, Subject, BehaviorSubject } from "rxjs";
import { takeUntil, tap, skipWhile } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import AddNotification from "./form-add-notification.vue";
import { messageService } from "./../../services/app-service";
export default {
  name: "Notification",
  components: {
    Loading,
    AddNotification
  },

  data() {
    return {
      isLoading: Boolean,
      listData: [],
      disabled: true,
      pageNow: 1,
      totalCount: Number,
      countPage: 0,
      renderPage: [],
      renderTempPage: [],
      uploadPercentage: 0,
      clearSub$: new Subject(false),
      showDialog: false
    };
  },
  filters: {
    tranformDate: function(value) {
      if (!value) {
        return "";
      } else {
        let stringDate = new Date(value);
        return moment(String(stringDate)).format("DD/MM/YYYY A");
      }
    }
  },
  created() {
    messageService.getCallBackCloseModal().subscribe(message => {
      if (message != null) {
        this.onSearch(1, {}, "first", null);
      } else {
      }
    });
    this.onSearch(1, {}, "first", null);
  },
  destroyed() {
    this.clearSub$.next(true);
    this.clearSub$.complete();
  },
  methods: {
    onSearch: function(page, searchObject, order, typeSearch) {
      this.uploadPercentage = 0;
      this.isLoading = true;
      this.pageNow = page;
      this.isLoading = true;
      searchObject.limit = 10;
      searchObject.page = page;
      searchObject.isConcludeCount = true;
      for (let i = 0; i < 80; i++) {
        if (this.uploadPercentage == 80) {
          break;
        }
        setInterval(() => {
          this.uploadPercentage++;
        }, 30);
      }
      // time.subscribe(data => console.log(time));
      ajax({
        url: `${Config.API_ENDPOINT}/${Url.GET_ALL_NOTIFICATION}`,
        method: "POST",
        headers: {
          Authorization: Config.TOKEN
        },
        body: searchObject
      })
        .pipe(takeUntil(this.clearSub$))
        .subscribe(res => {
          this.uploadPercentage = 100;
          this.isLoading = false;
          if (res.response.status == 0) {
            let { data } = res.response;
            if (data) {
              this.listData = data;
              this.totalCount = res.response.totalCount;
              this.countPage = Math.ceil(this.totalCount / 10);
              if (order == "next" && this.pageNow >= 5) {
                this.renderPage = this.renderTempPage.filter(
                  e => e.page >= this.pageNow - 4
                );
                console.log(this.renderTempPage);
                setTimeout(() => {
                  $(`#dpl-block-${this.pageNow}`).addClass("active");
                }, 250);
                console.log("cc", this.renderPage);
              }
              if (order == "prev" && this.pageNow >= 1 && this.countPage > 5) {
                let max = this.pageNow + 3;
                this.renderPage = this.renderTempPage.filter(
                  e => e.page >= max - 3
                );
                setTimeout(() => {
                  $(`#dpl-block-${this.pageNow}`).addClass("active");
                }, 250);
              }
              if (order == "first") {
                this.renderPage = [];
                for (let i = 1; i <= this.countPage; i++) {
                  this.renderPage.push({
                    page: i
                  });
                  this.renderTempPage.push({
                    page: i
                  });
                }
              }
            }
          }
        });
    },
    changePage: async function(i, type) {
      let body = {};
      if (this.bodySearch) {
        body = this.bodySearch;
      }
      if (type == "prev") {
        if (this.pageNow != 1) {
          for (let i = 1; i <= this.countPage; i++) {
            $(`#dpl-block-${i}`).removeClass("active");
          }
          $(`#dpl-block-${this.pageNow - 1}`).addClass("active");
          this.onSearch(this.pageNow - 1, body, type);
        }
      } else if (type == "next") {
        if (this.pageNow != this.countPage) {
          for (let i = 1; i <= this.countPage; i++) {
            $(`#dpl-block-${i}`).removeClass("active");
          }
          $(`#dpl-block-${this.pageNow + 1}`).addClass("active");
          this.onSearch(this.pageNow + 1, body, type);
        }
      } else {
        await this.onSearch(i, body, "not-first");
        for (let i = 1; i <= this.countPage; i++) {
          $(`#dpl-block-${i}`).removeClass("active");
        }
        $(`#dpl-block-${i}`).addClass("active");
      }
    }
  }
};
</script>


<style  scoped >
md-button.md-raised {
  text-transform: capitalize;
}
.container-fluid {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
ul.pagination li {
  cursor: pointer;
}
ul.pagination li a {
  padding: 13px 18px;
  color: #181818;
  font-family: "Muli", sans-serif;
}

ul.pagination li a.active {
  background: var(--md-theme-default-primary, #448aff);
  color: #ffffff;
}
.md-table-cell {
  text-align: left;
}
.md-numeric {
  text-align: left !important;
}
.container {
  margin-top: 20px;
}

.w3-container:after,
.w3-container:before {
  content: "";
  display: table;
  clear: both;
}
.w3-container,
.w3-panel {
  padding: 0.01em 16px;
}
.w3-panel {
  margin-top: 16px;
  margin-bottom: 16px;
}
.w3-red,
.w3-hover-red:hover {
  color: #fff !important;
  background-color: #f44336 !important;
}
</style>

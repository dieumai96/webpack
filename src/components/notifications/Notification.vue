<template>
  <div class="container">
    <!-- <div id="nb-global-spinner" class="spinner" v-if="isLoading">
      <div class="blob blob-0"></div>
      <div class="blob blob-1"></div>title
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="blob blob-4"></div>
      <div class="blob blob-5"></div>
    </div>-->
    <md-table v-model="listData" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Notifications</h1>
      </md-table-toolbar>
      <!-- 
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Action" md-sort-by="action" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Title" md-sort-by>{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="date">{{ item.meta.timeCreated | tranformDate }}</md-table-cell>
        <md-table-cell
          md-label="Read"
          md-sort-by="read"
        >{{ item.totalReadFlat > 0 ? item.totalReadFlat : 0 }}/{{item.totalFlat ? item.totalFlat : 0}}</md-table-cell>
        <md-table-cell md-label="Send" md-sort-by="send">
          <md-checkbox v-model="item.status == 2" class="md-primary" disabled></md-checkbox>
        </md-table-cell>
      </md-table-row>-->
    </md-table>
    <div class="container-fluid">
      <nav>
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" aria-label=" Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item page-item-number"
            v-bind:key="item.id"
            v-for="(item,index) in renderPage.slice(0, 5)"
          >
            <a class="page-link dpl-block" v-bind:class="{ active: item.page == 1 }">{{index + 1}}</a>
          </li>

          <li class="page-item">
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!-- <coma></coma>
  <comb></comb>-->
</template>

<script>
import axios from "axios";
import moment from "moment";
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
      disabled: true,
      pageNow: 1,
      totalCount: Number,
      countPage: 0,
      renderPage: [],
      renderTempPage: []
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
    const headers = {
      Authorization: Config.TOKEN
    };
    // this.isLoading = true;
    // axios
    //   .post(
    //     `${Config.API_ENDPOINT}/${Url.GET_ALL_NOTIFICATION}`,
    //     {
    //       page: 1,
    //       limit: 10
    //     },
    //     { headers }
    //   )
    //   .then(res => {
    //     this.isLoading = false;
    //     if (res.status == 200) {
    //       if (res.data.status == 0) {
    //         let { data } = res.data;
    //         console.log(data);
    //         this.listData = data;
    //       }
    //     }
    //   })
    //   .catch(err => err);
    this.onSearch(1, {}, "first", null);
  },
  methods: {
    onSearch: function(page, searchObject, order, typeSearch) {
      const headers = {
        Authorization: Config.TOKEN
      };
      this.pageNow = page;
      this.isLoading = true;
      searchObject.limit = 10;
      searchObject.page = page;
      searchObject.isConcludeCount = true;
      axios
        .post(
          `${Config.API_ENDPOINT}/${Url.GET_ALL_NOTIFICATION}`,
          searchObject,
          { headers }
        )
        .then(res => {
          this.isLoading = false;
          if (res.status == 200) {
            if (res.data.status == 0) {
              let data = res.data.data;
              if (data) {
                this.listData = data;
                console.log(this.listData);
                this.totalCount = res.data.totalCount;
                this.countPage = Math.ceil(this.totalCount / 10);
                if (order == "next" && this.pageNow >= 5) {
                  this.renderPage = this.renderTempPage.filter(
                    e => e.page >= this.pageNow - 4
                  );
                  setTimeout(() => {
                    $(`.dpl-block-${this.pageNow}`).addClass("active");
                  }, 250);
                }
                if (
                  order == "prev" &&
                  this.pageNow >= 1 &&
                  this.countPage > 5
                ) {
                  let max = this.pageNow + 3;
                  this.renderPage = this.renderTempPage.filter(
                    e => e.page >= max - 3
                  );
                  setTimeout(() => {
                    $(`.dpl-block-${this.pageNow}`).addClass("active");
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
                console.log(this.renderPage);
              }
            }
          }
        });
    }
  }
};
</script>


<style  scoped >
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

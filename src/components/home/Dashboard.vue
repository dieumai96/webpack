<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/dashboard/input-output">Input output</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/computed">Computed</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/directive">Directive</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/style">Style</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/life-cycle">Life cycle</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ path: '/dashboard/test-params', query: { plan: 'private' }}"
          >Router query</router-link>
        </li>
      </ul>
      <span class="navbar-text" @click="onLogout">
        <i class="fas fa-sign-out-alt"></i>
        Logout
      </span>
    </nav>
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    onLogout() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!!localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    });
  }
};
</script>

<style>
body {
  font-family: "Muli", sans-serif;
}
.navbar-text {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>
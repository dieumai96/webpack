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
      </ul>
    </nav>
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard"
};
</script>

<style>
body {
  font-family: "Muli", sans-serif;
}
</style>
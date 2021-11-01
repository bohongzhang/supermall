<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabbar";


export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/*  引用基本的css样式*/
@import "assets/css/base.css";
</style>

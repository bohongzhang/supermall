<template>
  <tab-bar>
    <tabbar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/101.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/102.svg" alt="">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category" >
      <img slot="item-icon" src="~assets/img/tabbar/201.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/202.svg" alt="">
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/cart" >
      <img slot="item-icon" src="~assets/img/tabbar/301.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/302.svg" alt="">
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/401.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/402.svg" alt="">
      <div slot="item-text">我的</div>
    </tabbar-item>

  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabbarItem from "components/common/tabbar/TabbarItem";


export default {
  name: "MainTabbar",
  components: {
    TabBar,
    TabbarItem
  }
}
</script>

<style scoped>

</style>

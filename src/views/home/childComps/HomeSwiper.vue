<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a href="item.link">
        <img :src="item.image" alt="" @load="swiperimageload">
      </a>
    </swiper-item>

  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";


export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isload: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperimageload(){
      if(!this.isLoad){
        this.$emit('swiperimageload')
      }
      this.isLoad=true;
    }
  }
}
</script>

<style scoped>

</style>

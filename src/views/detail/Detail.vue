<template>
 <div class="detail">
   <detail-navbar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
 </div>
</template>

<script>

import DetailNavbar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import {getDetail,Goods} from "network/detail";



export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo
  },
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  created() {
    //1 保存传入的iid
    this.iid =  this.$route.params.iid
    // 2 获取商品信息
    getDetail(this.iid).then(res=>{
      console.log(res.result)
      const  resultdata=res.result
        this.topImages=resultdata.itemInfo.topImages
        this.goods =new Goods(resultdata.itemInfo,resultdata.columns,resultdata.shopInfo.services)
    })

  }
}
</script>

<style scoped>

</style>

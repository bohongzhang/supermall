<template>
  <div id="detail">
    <detail-navbar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailimageLoad="imgLoad"/>
      <detail-param-info :param-info="this.paramInfo"/>
      <detail-comment :comment="comment"/>
      <goods-list v-bind:goods="recommend"/>
    </scroll>
  </div>
</template>

<script>

import DetailNavbar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailComment from "./childComps/DetailComment";
import GoodsList from "../../components/content/goods/GoodsList";


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
import {itemListenerMixin} from "../../common/mixin";


export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList

  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      comment: {},
      recommend: []
    }
  },
  created() {
    //1 保存传入的iid
    this.iid = this.$route.params.iid
    // 2 获取商品信息
    getDetail(this.iid).then(res => {
     // console.log(res.result)
      const resultdata = res.result
      this.topImages = resultdata.itemInfo.topImages
      this.goods = new Goods(resultdata.itemInfo, resultdata.columns, resultdata.shopInfo.services)
      // 3 获取商店的xinxi
      this.shop = new Shop(resultdata.shopInfo)
      // 4 .获取商品的详情信息
      this.detailInfo = resultdata.detailInfo
      // 4 .获取商品参数详情信息
      this.paramInfo = new GoodsParam(resultdata.itemParams.info, resultdata.itemParams.rule)
      // 6 获取评论数据
      if (resultdata.rate.cRate) {
        this.comment = resultdata.rate.list[0];
      }

      // 7 获取推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
        // console.log(res.data.list);
      })
    })

  },
  destroyed() {
    this.$bus.$off('itemimageload', this.itemImgListener)
  },
  methods: {
    imgLoad() {
      //console.log("1111111111");
      // console.log(this.$refs.scroll)
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #ffffff;
}

.detail-nav {
  position: relative;
  background-color: #ffffff;
  z-index: 9;
}

.content {
  height: calc(100% - 44px - 2.09rem);
}

</style>

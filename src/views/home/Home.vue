<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :title="title"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
    />


    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperimageload="swiperimageload"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="title"
                   @tabClick="tabClick"
                   ref="tabControl2"

      />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>


  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";


// 导入在network/home.js里面自定义的方法
import {
  getHomeMultidata,
  getHomeGoods
} from "network/home";
import {debounce} from "common/utils.js"
import Scroll from "components/common/scroll/Scroll";


export default {
  name: "Home",

  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      title: ['流行', '新款', '精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  //销毁
  destroyed() {
    console.log("destroyed");

  },
  //激活
  activated() {
    //console.log("activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    //这里是预防出现错误
    this.$refs.scroll.refresh()
  },
  //未激活
  deactivated() {
    // 这里可以使用一个计算属性
    this.saveY = this.$refs.scroll.getScrollY
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    // 2,请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    // 3,添加监听item中方法
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('itemimageload', (info) => {
      // 调用的太频繁了
      // this.$refs.scroll.refresh();
      refresh();
    })

  },
  methods: {
    /**
     * 事件监听的方法
     */
    swiperimageload() {
      // 2 获取tabcontrol的offset
      // 所有的组件都有一个属性$el  $el可以获取组件dom
      //console.log(this.$refs.tabControl.$el.offsetTop);
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;

    },

    tabClick(index, type) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      // 参数 0左侧 0 上层   500毫秒
      this.$refs.scroll.scrollTo()
    },
    contentScroll(position) {
      // 1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.判断tabControl 是否吸顶
      this.isTabFixed = (-position.y) > this.taboffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },


    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)

        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }


  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

/*.tab-control {*/
/*  !*position: sticky;*!*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/

.content {
  overflow: hidden;
  /*margin-top: 48px;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>

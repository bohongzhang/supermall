<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }

  },
  mounted() {
    // 1 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2 监听滚动位置
    this.scroll.on('scroll', (position) => {
      // this.scroll.refresh();
      this.$emit('scroll', position)
    })
    // 3 上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })

  },
  methods: {
    scrollTo(x = 0, y = 0, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll.refresh();
    }
  }

}
</script>

<style scoped>

</style>

import {debounce} from "./utils";

export const itemListenerMixin = {

  data() {
    return {
      itemImgListener: null
    }
  },
  mounted: function () {
    // 3,添加监听item中方法
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = (info) => {
      refresh();
    }
    this.$bus.$on('itemimageload', this.itemImgListener)
    // console.log("22222222222");
  }
}

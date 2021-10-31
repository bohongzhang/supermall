<template>
  <div class="wrapper" ref="aa">
    <ul>
      <button @click="btnClick"> 我是按钮</button>

      <li>分类列表18</li>
      <li>分类列表19</li>
      <li>分类列表20</li>
      <li>分类列表21</li>
      <li>分类列表22</li>
      <li>分类列表23</li>
      <li>分类列表24</li>
      <li>分类列表25</li>
      <li>分类列表26</li>
      <li>分类列表27</li>
      <li>分类列表28</li>
      <li>分类列表29</li>
      <li>分类列表30</li>
      <li>分类列表31</li>
      <li>分类列表32</li>
      <li>分类列表33</li>
      <li>分类列表34</li>
      <li>分类列表35</li>
      <li>分类列表36</li>
      <li>分类列表37</li>
      <li>分类列表38</li>
      <li>分类列表39</li>
      <li>分类列表40</li>
      <li>分类列表41</li>
      <li>分类列表42</li>
      <li>分类列表43</li>
      <li>分类列表44</li>
      <li>分类列表45</li>
      <li>分类列表46</li>
      <li>分类列表47</li>
      <li>分类列表48</li>
      <li>分类列表49</li>
      <li>分类列表50</li>
      <li>分类列表51</li>
      <li>分类列表52</li>
      <li>分类列表53</li>
      <li>分类列表54</li>
      <li>分类列表55</li>
      <li>分类列表56</li>
      <li>分类列表57</li>
      <li>分类列表58</li>
      <li>分类列表59</li>
      <li>分类列表60</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data() {
    return {}
  },
  created() {

  },
  methods: {
    btnClick() {
      console.log('btm click .')
    }
  },
  mounted() {

    let wrapper = this.$refs.aa
    this.scroll = new BScroll(wrapper, {
      //控制div是否可以点击
      click: true,
      probeType: 3,
      pullUpLoad: true
    })
    this.scroll.on('scroll', (position) => {
      // console.log(position)
    })
    this.scroll.on('pullingUp', () => {
    //  console.log(123)

      setTimeout(() => {
          this.scroll.finishPullUp()
        },
        2000)

    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
  /*overflow-y: scroll;*/

}
</style>

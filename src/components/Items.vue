<template>
  <div>
    <Detail ref="detail" />
    <div class="items_div">
      <div class="items_container">
        <div class="items" v-for="(subcategory, index) in this.category.subcategories" :key="index">
          <div class="items_subdiv">
            <p class="items_title">{{ subcategory.name }}</p>
            <div class="items_detail" :class="{ smallGrid: subcategory.items.length > 4, tinGrid: subcategory.items.length > 1, middleGrid: subcategory.items.length > 6, largeGrid: subcategory.items.length > 9}">
              <div class="item" :class="{big: item.isopen, small: !item.isopen, official: item.official, hiddenBackground: !isShow(item.filter)}" v-for="(item, index) in subcategory.items" :key="index">
                <div class="oss" :class="{ isShow: !isShow(item.filter)}">
                  <div :style="{ backgroundImage: 'url(' + `logos/${item.logo}` + ')' }" :class="{openImg: item.isopen, img: !item.isopen}" alt="" @click="showDetail(item, subcategory, category)"></div>
                  <p class="item_title" v-if="item.isopen">国内开源</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from '@/components/detail/Detail.vue'

export default {
  components: {
    Detail
  },
  props:['category'],
  methods: {
    isShow(filter) {
      if (this.$store.state.selectFilter.length == 0) {
        return true
      }

      if (filter == undefined) {
        return false
      }

      for (let i = 0; i < this.$store.state.selectFilter.length; i++) {
        for (let k = 0; k < this.$store.state.selectFilter[i].options.length; k++) {
          for (let j = 0; j < filter.length; j++) {
            if (this.$store.state.selectFilter[i].options[k] == filter[j]) {
              return true
            }
          }
        }
      }

      return false
    },
    showDetail(data, subcategory, category) {
      this.$refs.detail.show(data, subcategory, category)
    }
  }
}
</script>

<style scoped>
.items_container {
  padding: 20px;
  background-color: #005c94;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

.items_div {
  padding: 20px;
  background: linear-gradient(to right, #0085cf, #004384);
  text-align: center;
}

.items {
  padding: 0px 8px;
  text-align: center;
  position: relative; 
  font-size: 10px;
  box-sizing: border-box;
  margin: 6px 4px 12px 4px;
}

.items_subdiv {
  height:100%;
}

.items_title {
  color: white;
  font-size: 18px;
  margin-bottom: 6px;
  margin-top: 0px;
  height: 30px;
}

.items_detail {
  padding: 12px;
  background-color: #72a8c4;
  height: calc(100% - 60px);
}

.tinGrid {
  display: grid; 
  grid-template-columns: repeat(2, 120px); 
  grid-auto-rows: 56px; 
  gap: 6px;
}

.smallGrid {
  display: grid; 
  grid-template-columns: repeat(2, 120px); 
  grid-auto-rows: 56px; 
  gap: 6px;
}

.middleGrid {
  display: grid; 
  grid-template-columns: repeat(4, 120px);
  grid-auto-rows: 56px; 
  gap: 6px;
}

.largeGrid {
  display: grid; 
  grid-template-columns: repeat(5, 120px);
  grid-auto-rows: 56px; 
  gap: 6px;
}

.big {
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-end: span 1;
  grid-row-end: span 2;
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #ff742c, #eea24e);
  border-image-slice: 10;
}

.official {
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #49f1f2, #0000ae);
  border-image-slice: 10;
}

.small {
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-end: span 1;
  grid-row-end: span 1;
}

.oss {
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.img {
  width: 100%;
  height: 100%;
  background-color: white;
  background-size:auto 100%;
  background-repeat:no-repeat;
  background-position: center center;
}

.openImg {
  background-color: white;
  width: 100%;
  height: 77%;
  background-size:auto 60%;
  background-repeat:no-repeat;
  background-position: center center;
}

.item_title {
  padding: 4px;
  color: white;
  background: linear-gradient(to right, #ff742c, #eea24e);
  margin: 0px;
  font-size: 14px;
}

.isShow {
  visibility: hidden;
}

.hiddenBackground {
  background-color: #005c94;
  border: none;
}
</style>
<template>
  <div>
    <div class="position">
      <div class="iconfont position__icon">&#xe790;</div>
      <span>北京理工大学国防科技园2号楼10层</span>
      <div class="iconfont notice__icon">&#xe887;</div>
    </div>
    <div class="search">
      <div class="iconfont">&#xe7da;</div>
      <div class="search__text">山姆会员商店优惠商品</div>
    </div>
    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt=""
      >
    </div>
    <div class="nav">
      <div
        v-for="navItem in navList"
        :key="navItem.id"
        class="nav__item"
      >
        <img class="nav__item__img" :src="navItem.imgUrl" alt="">
        <p class="nav__item__desc">{{ navItem.title }}</p>
      </div>
    </div>
    <div class="gap" />
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Header',
  setup () {
    const navList = reactive([
      { id: 1, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', title: '超市便利' },
      { id: 2, imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png', title: '菜市场' },
      { id: 3, imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png', title: '水果店' },
      { id: 4, imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png', title: '鲜花绿植' },
      { id: 5, imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png', title: '医药健康' },
      { id: 6, imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png', title: '家居时尚' },
      { id: 7, imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png', title: '烘培蛋糕' },
      { id: 8, imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png', title: '签到' },
      { id: 9, imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png', title: '大牌免运' },
      { id: 10, imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png', title: '红包套餐' }
    ])
    return { navList }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/variables.scss';
  @import '~@/style/mixins.scss';
  .position {
    position: relative;
    padding: .16rem .24rem .16rem 0;
    display: flex;
    align-items: center;
    color: $main-text-color;
    span {
      @include ellipsis;
      font-size: .16rem;
    }
    .position__icon {
      margin-right: .08rem;
      font-size: .2rem;
    }
    .notice__icon {
      position: absolute;
      right: 0;
      font-size: .2rem;
    }
  }
  .search {
    margin-bottom: .12rem;
    padding: 0 .16rem;
    display: flex;
    align-items: center;
    height: .32rem;
    background: $default-bg-color;
    border-radius: .16rem;
    color: #B7B7B7;
    &__text {
      margin-left: .12rem;
    }
  }
  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    img {
      width: 100%;
    }
  }
  .nav {
    margin-top: .16rem;
    display: flex;
    flex-wrap: wrap;
    &__item {
      width: 20%;
      &__img {
        margin: 0 auto;
        display: block;
        height: .4rem;
        width: .4rem;
      }
      &__desc {
        margin: .06rem 0 .16rem 0;
        text-align: center;
        color: $main-text-color;
      }
    }
  }
  .gap {
    margin: 0 -.18rem;
    height: .1rem;
    background: $main-border-color;
  }
</style>

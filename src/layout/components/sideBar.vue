<template>
  <div class="sideBar">
    <div class="sideBar_item" v-for="item in pageRoutes" :key="item.path"
         :class="{activeBar: $route.path === item.path}" @click="changePath(item.path)">
      <span>{{ item.meta.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "sideBar",
  props: {
    pageRoutes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changePath(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
.sideBar {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #ffffff;

  & > div {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
  }

  & > div.activeBar {
    background: aqua;
  }
}
</style>

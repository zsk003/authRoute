<template>
  <div class="firstPage">
    <Map class="mapContent" ref="map" />
  </div>
</template>

<script>
import Map from "@/views/firstPage/Map";

export default {
  name: "firstPage",
  data() {
    return {}
  },
  components: {
    Map
  },
  mounted() {
  },
  methods: {
    picTest() {
      this.$refs.map.setSkin()
    }
  }
}
</script>

<style lang="scss" scoped>
.firstPage {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .mapContent {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .testBtn {
    position: absolute;
    z-index: 2;
  }
}
</style>

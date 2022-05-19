<template>
  <div id="home">
    <div class="header">
      <div class="navContent">
        <div class="logo">xxxxxx平台</div>
        <div class="navs">
          <div
            v-for="item in firstLevel"
            :key="item.path"
            :class="{ currentNav: item.childList.indexOf($route.path) !== -1 }"
            @click="changePath(item)"
          >
            {{ item.meta.title }}
          </div>
        </div>
      </div>
      <div class="settingOptions">
        <span>{{ currentTime }}</span>
        <div class="optionsBtn"></div>
      </div>
      <div class="settings" @click="logout">退出</div>
    </div>
    <div class="content">
      <el-menu
        class="sideMenu"
        :router="true"
        v-if="$store.state.auth.secondLevelRoutes.length"
        :default-active="$route.path"
      >
        <div
          v-for="faRoute in $store.state.auth.secondLevelRoutes"
          :key="faRoute.path"
        >
          <component
            :index="faRoute.path"
            :is="faRoute.children ? 'el-submenu' : 'el-menu-item'"
          >
            <template slot="title">
              <img class="navPicture" :src="faRoute.meta.icon.normal" alt="" />
              <span>{{ faRoute.meta.title }}</span>
            </template>
            <template v-if="faRoute.children && faRoute.children.length">
              <div v-for="(v, i) in faRoute.children" :key="v.path + i">
                <el-menu-item
                  :index="v.meta.redirect ? v.meta.redirect : v.path"
                >
                  <template slot="title">
                    <span>{{ v.meta.title }}</span>
                  </template>
                </el-menu-item>
              </div>
            </template>
          </component>
        </div>
      </el-menu>
      <div class="content_view">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "@/layout/components/sideBar";

export default {
  name: "Home",
  data() {
    return {
      currentTime: "",
      firstLevel: [],
    };
  },
  components: {
    sideBar,
  },
  mounted() {
    this.setRoutes();

    this.getCurrentTime();
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  },
  methods: {
    addZero(num) {
      num = parseInt(num);
      let str = "";
      if (num < 10) {
        str = "0" + num.toString();
      } else {
        str = num.toString();
      }
      if (num == 0) {
        str = "12";
      }
      return str;
    },

    getCurrentTime() {
      const time = new Date();
      this.currentTime =
        time.getFullYear() +
        "-" +
        this.addZero(time.getMonth() + 1) +
        "-" +
        this.addZero(time.getDate()) +
        " " +
        this.addZero(time.getHours()) +
        ":" +
        this.addZero(time.getMinutes());
    },
    setRoutes() {
      this.firstLevel = this.$store.state.auth.homeRoutes
    },
    changePath(item) {
      this.$router.push(item.path);
    },
    logout() {
      window.sessionStorage.clear();
      location.reload();
    },
  },
};
</script>

<style scoped lang="scss">
#home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f6f6f6;

  .header {
    width: 100%;
    height: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    background: #fff;

    .navContent {
      display: flex;
      align-items: center;

      .logo {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 25px;
        font-weight: bold;
      }

      .navs {
        display: flex;
        align-items: center;
        user-select: none;

        & > div {
          margin-left: 45px;
          cursor: pointer;
        }

        & > div:hover {
          text-decoration: underline;
        }

        & > div.currentNav {
          color: aqua;
        }
      }
    }

    .settingOptions {
      width: 310px;
      font-family: "LEDNumber";
      font-size: 20px;
      // color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      white-space: nowrap;
      justify-content: space-between;

      .optionsBtn {
        display: flex;
        align-items: center;
        flex: 1 0 auto;
        justify-content: flex-end;
      }

      & > span:last-child {
        margin-left: 30px;
        cursor: pointer;
        font-family: "Microsoft YaHei";
      }
    }
  }

  .content {
    flex: 1 0 auto;
    display: flex;
    align-items: center;

    .sideMenu {
      width: 300px;
      height: 100%;
      flex-shrink: 0;
    }

    .content_view {
      flex: 1 0 auto;
      height: 100%;
    }
  }
}
</style>

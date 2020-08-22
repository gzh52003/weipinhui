<template>
  <div class="wrap">
    <!-- <button @click ="back()">back</button>
        <nav>
            <ul>
                <li :key="item.path" v-for ="(item,idx) in menu"  @click="goto(item.path,idx)" :class="currentIndex===idx?'current' : ''">
                <router-link 
                :to="item.path"  
                tag="span"
                >{{item.text}}</router-link>
                {{item.text}}
                </li>
            </ul>
    </nav>-->
    <el-container>
      <el-header class="header" v-show="isShow">
        <el-row>
          <el-col :span="12" class="logo">
            <i class="el-icon-food"></i>后台管理系统
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-button type="text" @click="toLogin()">登录</el-button>
            <el-button type="text" @click="toReg()">注册</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            class="el-menu-demo"
            mode="vertical"
            background-color="blueviolet"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            v-show="isShow"
          >
            <template v-for="item in menu">
              <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
                <i :class="item.icon_Name" style="color:white"></i>
                {{item.text}}
              </el-menu-item>

              <el-submenu :index="item.path" :key="item.path" v-else>
                <template v-slot:title>
                  <i :class="item.icon_Name" style="color:white"></i>
                  {{item.text}}
                </template>
                <el-menu-item
                  :key="sub.path"
                  :index="item.path+sub.path"
                  v-for="sub in item.submenu"
                >{{sub.text}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/user/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb> -->
          <div class="project">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      menu: [
        {
          text: "首页",
          path: "/home",
          icon_Name: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon_Name: "el-icon-user-solid",
          submenu: [
            {
              text: "添加用户",
              path: "/add",
            },
            {
              text: "用户列表",
              path: "/list",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon_Name: "el-icon-basketball",
        },
        {
          text: "订单管理",
          path: "/order",
          icon_Name: "el-icon-tickets",
        },
      ],

      currentIndex: 0,
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toReg() {
      this.$router.push("reg");
    },
    goto(path, idx) {
      this.$router.push(path);
      this.currentIndex = idx;
    },
    back() {
      this.$router.back();
    },
  },
  components: {},
  created() {
    this.isShow = this.$route.path == "/login"? false : true;
  },
  watch: {
    $route: {
      deep: true,
      handler(newval) {
        this.isShow = newval.path == "/login"? false : true;
        },
    },
  },
};
</script>

<style lang ="scss">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
}
.wrap {
  height: 100%;
}
.el-menu-demo {
  height: 100%;
}
.el-container {
  overflow: hidden;
  height: 100%;
}
.current {
  color: aqua;
}
.project {
  margin-top: 20px;
}
.main {
  overflow-y: hidden;
}
.is-active {
  i {
    color: inherit !important;
  }
}
.header {
  background-color: blueviolet;
  line-height: 60px;

  .logo {
    font-size: 30px;
    color: cornsilk;

    .el-icon-food {
      display: inline-block;
      margin-right: 25px;
    }
  }
}
</style>

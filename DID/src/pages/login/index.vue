<template>
  <div class="bg">
    <img class="logo" src="@/assets/imgs/logo.png" />
    <div class="title">EOTC</div>
    <img class="logo-bg" src="@/assets/imgs/logo_bg.png" alt="" />
    <div class="bg-white">
      <!-- 登录、注册 -->
      <!-- <div class="login-box">
        <button
          :style="btn == 1 ? 'background:#1B2945;color:#fff;' : ''"
          @click="btn = 1"
        >
          {{ $t("menu.login") }}
        </button>
        <button
          :style="btn == 2 ? 'background:#1B2945;color:#fff;' : ''"
          @click="btn = 2"
        >
          {{ $t("menu.signin") }}
        </button>
      </div> -->
      <LogIn v-if="btn == 1" @btnNum="getBtnNum" ref="login" />
      <!-- <SignIn v-else @btnNum="getBtnNum" /> -->
    </div>
  </div>
</template>

<script>
import LogIn from "./logIn";
import SignIn from "./signIn";

export default {
  name: "login",
  data() {
    return {
      btn: 1,
    };
  },
  components: {
    LogIn,
    SignIn,
  },
  mounted() {
    this.btn = !!this.$route.code ? 2 : 1;
    // loadweb3(() => {
    //   const dom = this.$refs.login;
    //   const address = localStorage.getItem("myaddress")
    //   dom.getWallet({
    //     myaddress: address,
    //     oType: address.length === 34 ? 'trx' : 'bsc',
    //     sign: localStorage.getItem("mysign"),
    //   });
    // });
  },
  methods: {
    getBtnNum(e) {
      this.btn = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  min-height: 100vh;
  background: #1b2945;
  display: flex;
  flex-direction: column;
  .logo {
    margin: 0 auto;
    padding-top: 52px;
    display: block;
    width: 144px;
    height: 144px;
  }
  .title {
    margin-top: 20px;
    text-align: center;
    font-size: 45px;
    color: #e2ecff;
  }
  .logo-bg {
    position: absolute;
    top: 176px;
    right: 0;
    width: 214px;
    height: 364px;
    z-index: 2;
  }
  .bg-white {
    position: relative;
    margin-top: 89px;
    margin-left: 4%;
    width: 92%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #fff;
    z-index: 3;
    flex: 1;
    display: flex;
    flex-direction: column;
    .login-box {
      position: absolute;
      top: -48px;
      padding: 2px;
      width: 324px;
      background: #fff;
      border-radius: 48px;
      box-shadow: 0px 3px 6px 1px rgba(204, 204, 204, 0.2);
      z-index: 999;
      button {
        width: 160px;
        height: 96px;
        border-radius: 48px;
        font-size: 40px;
        border: 1px solid #fff;
        color: #1b2945;
        background: #fff;
      }
    }
  }
}
</style>
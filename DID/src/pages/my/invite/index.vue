<template>
  <div class="invite_wrap fullscreen">
    <page-header :title="$t('my.invite_friends')" theme="dark"></page-header>
    <div
      class="content"
      :style="
        'background-image: url(' +
        (langCode == 'zh'
          ? require('@/assets/imgs/bg-invite.png')
          : require('@/assets/imgs/bg-invite2.png')) +
        ')'
      "
    >
      <div class="main">
        <div class="share_wrap">
          <van-row class="row" type="flex" align="center">
            <van-col :span="6" class="label">{{ $t("invute.tags1") }}</van-col>
            <van-col :span="18" class="value" @click="copy(form.data.url)">
              <van-row type="flex" align="center">
                <van-col :span="21" class="label ellipsis">{{
                  form.data.url
                }}</van-col>
                <van-col :span="3" class="label"
                  ><i class="icon icon-copy"></i
                ></van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row class="row" type="flex" align="center">
            <van-col :span="6" class="label">{{ $t("invute.tags2") }}</van-col>
            <van-col :span="18" class="value" @click="copy(form.data.code)">
              <van-row type="flex" align="center">
                <van-col :span="21" class="label ellipsis">{{
                  form.data.code
                }}</van-col>
                <van-col :span="3" class="label"
                  ><i class="icon icon-copy"></i
                ></van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
        <div class="btn_wrap">
          <div class="btn" @click="togglePoster(true)">
            {{ $t("invute.tags3") }}
          </div>
          <div class="icon" @click="toggleQr(true)">
            <van-icon size="20px" name="qr" />
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="hide">
      <div class="qr_wrap" v-show="qr" @click.stop>
        <div class="title">{{ $t("invute.tags4") }}</div>
        <vue-qr class="img" :logoSrc="logo" :text="form.data.url" />
        <p class="tip">
          {{ $t("invute.tags5") }}<br />{{ $t("invute.tags6") }}
        </p>
      </div>
      <div class="poster_wrap" v-show="poster">
        <div class="img" ref="img">
          <img
            class="bg"
            :src="
              langCode == 'zh'
                ? require('@/assets/imgs/poster.png')
                : require('@/assets/imgs/poster2.png')
            "
            alt=""
          />
          <vue-qr class="qr" :logoSrc="logo" :text="form.data.url" />
        </div>
        <div class="icon icon-download" @click.stop="save"></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
import { copy } from "@/utils/utils";
import vueQr from "vue-qr";
import html2canvas from "html2canvas";

export default {
  name: "invite",
  components: { PageHeader, vueQr },
  data() {
    return {
      show: false,
      logo: require("../../../assets/imgs/logo.png"),
      qr: false,
      poster: false,
      form: {
        data: {
          code: "",
          url: "",
        },
      },
      langCode: "",
    };
  },
  mounted() {
    let lang = JSON.parse(localStorage.getItem("lang"));
    this.langCode = lang ? lang.lang : "zh";
  },
  methods: {
    copy,
    hide() {
      this.show = false;
      this.qr = false;
      this.poster = false;
    },
    toggleOverlay(show) {
      this.show = show;
    },
    toggleQr(show) {
      this.toggleOverlay(true);
      this.qr = show;
    },
    togglePoster(show) {
      this.toggleOverlay(true);
      this.poster = show;
    },
    save() {
      const dom = this.$refs.img;
      html2canvas(dom, {
        useCORS: true, // 【重要】开启跨域配置
        width: dom.clientWidth - 1,
        height: dom.clientHeight,
        backgroundColor: null,
        scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
        allowTaint: true, // 允许跨域图片
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "海报.png";
        link.click();
      });
    },
  },
  created() {
    const userInfo = JSON.parse(this.cookie.get("userInfo"));
    if (userInfo) {
      this.form.data.code = userInfo.userId;
      this.form.data.url = `${location.origin}/#/login?code=${this.form.data.code}`;
    }
  },
};
</script>

<style scoped lang="scss">
.invite_wrap {
  .content {
    flex: 1;
    margin-top: -1px;
    padding-top: 1px;
    background-color: $theme;
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: top center;
    .main {
      @include posi($b: 50px, $l: 30px, $r: 30px);
      .share_wrap {
        padding: 0 30px;
        background-color: #fff;
        border-radius: 20px;
        overflow: hidden;
        .row {
          padding: 40px 0;
          border-bottom: 1px solid #f3f4f5;
          &:last-of-type {
            border-bottom: none;
          }
          .label {
            color: #999;
            font-size: 32px;
            &.ellipsis {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .value {
            color: #333;
            font-size: 32px;
            text-align: right;
            .icon {
              color: #c6c6c6;
              margin-left: 15px;
            }
          }
        }
      }
      .btn_wrap {
        position: relative;
        display: flex;
        color: #fff;
        padding: 20px 0;
        line-height: 56px;
        font-size: 31px;
        font-weight: bold;
        border-radius: 20px;
        background-color: #247ff6;
        margin-top: 80px;
        &:after {
          @include posi($r: 160px, $b: 20px, $t: 20px);
          display: block;
          content: "";
          width: 1px;
          background-color: #92bffa;
          transform: scaleX(0.5);
        }
        .btn {
          flex: 1;
          text-align: center;
        }
        .icon {
          flex: 0 0 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .qr_wrap {
    @include centered();
    width: 80%;
    padding: 40px 100px 60px;
    text-align: center;
    background-color: #fff;
    border-radius: 20px;
    .title {
      color: #1b2945;
      font-size: 42px;
      font-weight: bold;
    }
    .img {
      display: block;
      width: 100%;
    }
    .tip {
      color: #333;
      line-height: 1.4;
      font-size: 30px;
    }
  }
  .poster_wrap {
    @include centered();
    .img {
      position: relative;
      .bg {
        display: block;
        width: 590px;
      }
      .qr {
        @include posi($r: 40px, $b: 50px);
        display: block;
        width: 120px;
      }
    }
    .icon {
      display: block;
      width: 80px;
      height: 80px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: 80px;
      margin: 50px auto 0;
      border-radius: 50%;
      font-size: 20px;
    }
  }
}
</style>
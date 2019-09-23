<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="mobile"
        required
        clearable
        label="手机号码"
        placeholder="请输入手机号"
        name="mobile"
        v-validate="'required'"
        :error-message="errors.first('mobile')"
      />

      <van-field
        v-model="code"
        type="text"
        label="验证码"
        placeholder="请输入验证码"
        required
        name="code"
        v-validate="'required'"
        :error-message="errors.first('code')"
      />
    </van-cell-group>
    <div class="mylogin">
      <van-button type="info" @click="doLogin" :loading="loading">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810",
      loading:false
    };
  },
  methods: {
    // 设置自己的验证规则方法
    myrule(){
      // 验证对象
      const dict = {
        // 验证规则
        custom: {
          mobile: {
            required: "请输入电话号码"
          },
          code: {
            required: () => "请输入验证码"
          }
        }
      }
       // 使用校验规则
      this.$validator.localize("zh_CN", dict);
    },
    async doLogin(){
      // 点击登录,先进行验证
      this.loading=true;
      let valid = await this.$validator.validate();
        //  未输入手机号或验证码则不做其他提示,输入值则发请求
        if (valid) {
          // 异常处理
          try {
            let res = await login({
              mobile: this.mobile,
              code: this.code
            })
            // console.log(res);
            this.$store.commit('getUser',res)
            this.loading=false;
            this.$router.back();
          } catch (error) {
            this.$toast.fail('登录失败');
            this.loading=false;
          }

        }
    }
  },
  mounted() {
    this.myrule();
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar__title {
  background-color: #3296fa;
  color: #fff;
  max-width: 100%;
}
.mylogin {
  padding: 15px;
  margin-top: 30px;
  .van-button--normal {
    width: 100%;
    border-radius: 5px;
    background-color: #6db4fb;
  }
}
</style>
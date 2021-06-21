<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入帐户名"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="请输入密码"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>

      <!--      <a-form-item>-->
      <!--        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">记住我</a-checkbox>-->
      <!--      </a-form-item>-->

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >登陆</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loginBtn: false,
      loginType: 1,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 1
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit (e) {
      e.preventDefault()
      this.state.loginBtn = true
      const validateFieldsKey = ['username', 'password']
      this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          loginParams.name = values.username
          loginParams.pwd = values.password
          this.Login(loginParams)
              .then((res) => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
              .finally(() => {
                this.state.loginBtn = false
              })
        } else {
          setTimeout(() => {
            this.state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      this.$router.push({ path: '/' })
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: err.msg || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>

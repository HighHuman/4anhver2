<template>
  <div class="opening-page">
    <div class="opening-page-header d-flex justify-content-between">
      <div class="opening-page-header-right d-flex">
        <img src="../assets/img/opening-page-icon.png" />
        <span class="project-name">Sercurity Dashboard </span>
      </div>
      <div class="opening-page-header-left d-flex align-items-center">
        <div class="login-btn cursor-pointer" @click="openLogin">Login</div>
      </div>
    </div>
    <!--  -->
    <div class="opening-page-content d-flex mt-5">
      <div class="opening-page-content-img d-flex">
        <img src="../assets/img/opening-page-icon-3.png" alt="" />
        <img src="../assets/img/opening-page-icon-2.png" alt="" />
        <img src="../assets/img/opening-page-icon-1.png" alt="" />
      </div>
      <div class="opening-page-content-title">
        Monitoring and Analysis System, Security Alert for Information
        Infrastructure on Amazon Web Services Platform.
      </div>
      <div class="opening-page-content-text">
        Explore our Monitoring and Analysis System, a vigilant guardian ensuring
        information security on the Amazon Web Services infrastructure, issuing
        timely alerts for enhanced data integrity.
      </div>
      <div class="register-btn" @click="openRegisterForm()">Start now</div>
    </div>

    <login-form ref="loginFormRef" />

    <register-form ref="registerFormRef" />
  </div>
</template>

<script setup lang="ts">
import { ElDialog } from "element-plus";
import store from "../common/store";
import { ref } from "vue";
import router from "../common/router";
import LoginForm from "../components/common/user/login.vue";
import RegisterForm from "../components/common/user/register.vue";

const loginFormRef = ref();
const registerFormRef = ref();

const openLogin = () => {
  if (loginFormRef?.value.openLoginForm) {
    loginFormRef?.value.openLoginForm();
  }
};

const openRegisterForm = () => {
  if (registerFormRef?.value.openRegisterForm) {
    registerFormRef?.value.openRegisterForm({});
  }
};
</script>

<style scoped lang="scss">
.opening-page {
  padding: 10px 30px;
  background-image: url("../assets/img/opening-page-bg.jpg");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.opening-page-header {
  .opening-page-header-right {
    gap: 10px;
    color: #00a9ff;
    font-size: 50px;
    font-weight: 600;
    //icon color code: 00a9ff
    img {
      height: 70px;
    }
  }
  .opening-page-header-left {
    gap: 10px;
    font-size: 20px;
    font-weight: 500;
    color: rgb(110, 110, 110);
  }
  .nav-item {
    cursor: pointer;
  }
  .nav-item:hover {
    color: #000;
  }
  .login-btn {
    height: 40px;
    width: 100px;
    text-align: center;
    color: white;
    background-color: #00a9ff;
    border-radius: 8px;
    line-height: 40px;
  }
}

// content
.opening-page-content {
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  .opening-page-content-img {
    img {
      height: 200px;
    }
  }
  .opening-page-content-title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
  .opening-page-content-text {
    width: 500px;
    text-align: center;
  }
  .register-btn {
    font-size: 20px;
    height: 60px;
    width: 300px;
    text-align: center;
    color: white;
    background-color: #e577f1;
    border-radius: 8px;
    line-height: 60px;
  }
}
</style>
<style lang="scss">
.opening-page .el-dialog {
  // background-color: rgba(0, 255, 255, 0.353);
  max-height: 510px;
  .el-dialog__header {
    font-weight: bold;
    margin-right: 0;
    border-bottom: 1px solid;
  }
}
</style>

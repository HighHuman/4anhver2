<script setup lang="ts">
import { ref } from "vue";
import {
  ElForm,
  ElButton,
  ElNotification,
  type FormInstance,
  type FormRules,
} from "element-plus";
import store from "../../../common/store";

import { IUser } from "../../../common/model";

const formModel = ref<IUser>({});
const isLoginForm = ref(false);
const rulesFormRef = ref<FormInstance>();

const formRules = ref<FormRules>({
  username: [
    {
      required: true,
      message: "Required field",
    },
  ],

  password: [
    {
      required: true,
      message: "Required field",
    },
  ],
});

const openLoginForm = () => {
  isLoginForm.value = true;
};

const resetForm = (elForm: FormInstance | undefined) => {
  if (!elForm) return;

  elForm.resetFields();
};

const login = async () => {
  const data = {
    username: formModel.value.username,
    password: formModel.value.password,
  };

  await store.dispatch("getLogin", data);
};

const handleSubmit = (elForm: FormInstance | undefined) => {
  if (!elForm) return;

  elForm.validate((valid) => {
    if (valid) {
      login();
    } else {
      return false;
    }
  });
};

defineExpose({
  openLoginForm,
});
</script>

<template>
  <el-dialog
    v-model="isLoginForm"
    title="Login"
    width="400px"
    center
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <div class="user-login-form" @keydown.enter="handleSubmit(rulesFormRef)">
      <el-form
        ref="rulesFormRef"
        :rules="formRules"
        :model="formModel"
        label-position="top"
        size="large"
        require-asterisk-position="right"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="formModel.username" placeholder="Username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="formModel.password"
            type="password"
            placeholder="Password"
          />
        </el-form-item>
      </el-form>
      <div class="login-form-btn">
        <el-button
          round
          @click="handleSubmit(rulesFormRef)"
          color="#49b6fb"
          plain
          size="large"
          class="admin-auth-button"
          center
          >Login</el-button
        >
        <el-button
          round
          @click="resetForm(rulesFormRef)"
          color="#49b6fb"
          plain
          size="large"
          class="admin-auth-button"
          center
          >Reset</el-button
        >
      </div>
      <div class="login-form-footer cursor-pointer">Forgot password</div>
    </div>
  </el-dialog>
</template>

<style scoped>
.login-form-btn {
  display: flex;
  justify-content: center;
  color: #ff8c00;
}
.login-form-footer {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
.login-form-footer:hover {
  text-decoration: underline;
}
</style>
<style lang="scss">
.user-login-form .el-form .el-form-item {
  .el-form-item__label {
    color: rgb(0, 0, 0);
  }
  // .el-form-item__label:after {
  //   color: rgb(255, 0, 0) !important;
  // }
  .el-form-item__content {
    .el-form-item__error {
      color: rgb(255, 0, 0);
    }
  }
}
</style>

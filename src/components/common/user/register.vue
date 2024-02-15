<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import {
  ElNotification,
  ElForm,
  ElScrollbar,
  ElMessage,
  type FormInstance,
  type FormRules,
  type UploadProps,
  UploadFile,
  genFileId,
  UploadRawFile,
  UploadInstance,
} from "element-plus";
import { IUser } from "../../../common/model";
import store from "../../../common/store";
// import axios from "axios";

const emits = defineEmits(["refresh-data"]);
const isResgisterForm = ref<boolean>(false);
const loading = ref<boolean>(false);
const rulesFormRef = ref<FormInstance>();
const userRole = ref("1");
const upload = ref<UploadInstance>();
const file = ref<any>(null);
const base64Img = ref<string>("");
const currentUser = computed(() => store.state.currentUser);

const formModel = ref<IUser>({});
const openRegisterForm = (val?: any) => {
  isResgisterForm.value = true;
  if (JSON.stringify(val) === "{}") {
    formModel.value.dateOfBirth = "27/01/1995";

    return;
  }
  formModel.value.id = val.id;
  formModel.value.avatar = val.avatar;
  formModel.value.dateOfBirth = val.dateOfBirth;
  formModel.value.email = val.email;
  formModel.value.fullname = val.fullname;
  formModel.value.gender = val.gender;
  formModel.value.password = val.password;
  formModel.value.userRole = val.userRole;
  formModel.value.username = val.username;
  console.log(formModel.value);
};

const formRules = ref<FormRules>({
  username: {
    required: true,
    message: "Required field",
  },
  password: [
    {
      required: true,
      message: "Required field",
    },
  ],
  fullname: {
    required: true,
    message: "Required field",
  },
  gender: {
    required: true,
    message: "Required field",
  },
  dateOfBirth: {
    required: true,
    message: "Required field",
  },
  email: {
    required: true,
    message: "Required field",
  },
  userRole: {
    required: true,
    message: "Required field",
  },
});

const signUp = async () => {
  loading.value = true;
  const temp: any = {
    username: formModel.value.username,
    password: formModel.value.password,
    fullname: formModel.value.fullname,
    userRole: formModel.value.userRole,
  };

  loading.value = false;
};

const handleSignUp = (elForm: FormInstance | undefined) => {
  if (!elForm) return;

  elForm.validate(async (valid) => {
    if (valid) {
      await signUp();
      resetForm(elForm);
    } else {
      return false;
    }
  });
};

const handleClose = (elForm: FormInstance | undefined) => {
  resetForm(elForm);
  isResgisterForm.value = false;
};

const resetForm = (elForm: FormInstance | undefined) => {
  if (!elForm) return;

  elForm.resetFields();
  base64Img.value = "";
};

const onFileChange = (uploadFile: UploadFile) => {
  let fileType: string;
  if (uploadFile) {
    file.value = uploadFile.raw;
  }
  const reader: any = new FileReader();
  reader.onload = () => {
    base64Img.value = reader.result;
    fileType = reader.result.split(";")[0].split(":")[1];
  };
  reader.readAsDataURL(file.value);
  console.log(base64Img.value);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

defineExpose({
  openRegisterForm,
});
</script>

<template>
  <el-dialog
    v-model="isResgisterForm"
    title="Register"
    width="500px"
    center
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <div class="userform" v-loading="loading">
      <el-scrollbar height="380">
        <el-form
          ref="rulesFormRef"
          :model="formModel"
          :rules="formRules"
          label-position="top"
          require-asterisk-position="right"
        >
          <el-form-item label="Fullname" prop="fullname">
            <el-input v-model="formModel.fullname" />
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Gender" prop="gender">
                <el-radio-group v-model="formModel.gender">
                  <el-radio label="Male" size="large">Male</el-radio>
                  <el-radio label="Female" size="large">Female</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Date of birth" prop="dateOfBirth">
                <el-date-picker v-model="formModel.dateOfBirth" type="date" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="Username" prop="username">
                <el-input v-model="formModel.username" />
              </el-form-item>
            </el-col>
            <el-col :span="1"> </el-col>
            <el-col :span="12">
              <el-form-item label="Password" prop="password">
                <el-input
                  v-model="formModel.password"
                  type="password"
                  show-password
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Email" prop="email">
            <el-input v-model="formModel.email" />
          </el-form-item>

          <el-form-item
            label="User role"
            prop="userRole"
            v-if="currentUser.userRole === 1"
          >
            <el-radio-group v-model="userRole">
              <el-radio label="1" size="large">Admin</el-radio>
              <el-radio label="2" size="large">End user </el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="upload-avatar">
            <el-form-item
              label="Avatar"
              prop="avatar"
              size="default"
              style="display: block"
            >
              <div class="d-flex align-items-center">
                <el-upload
                  class="avatar-uploader"
                  :auto-upload="false"
                  :show-file-list="false"
                  @change="onFileChange"
                  :before-upload="beforeAvatarUpload"
                  :on-exceed="handleExceed"
                >
                  <template #default>
                    <el-button style="margin-left: 40px; margin-right: 80px"
                      >Choose picture</el-button
                    >
                  </template>
                </el-upload>
                <div class="avatar" :class="{ uploadedAvatar: base64Img }">
                  <img v-if="base64Img" :src="base64Img" />
                </div>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </el-scrollbar>
      <div class="userform-footer d-flex justify-content-between">
        <div
          class="userform-footer-clearall cursor-pointer d-flex align-items-center justify-content-center"
          @click="resetForm(rulesFormRef)"
        >
          Reset
        </div>
        <div class="userform-footer-btn">
          <button
            class="btn btn-close cursor-pointer"
            @click="handleClose(rulesFormRef)"
          >
            Cancel
          </button>
          <button
            class="btn btn-accept cursor-pointer"
            @click="handleSignUp(rulesFormRef)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.btn {
  background-color: #49b6fb;
  color: white;
}
.userform {
  height: 100%;
  width: 100%;
}
.btn-close {
  margin-right: 10px;
  background-color: #fff;
  color: #000;
  border: 1px solid #009dff;
}
.userform-footer {
  background-color: white;
  padding-top: 5px;
}
.userform-footer-clearall {
  color: #009dff;
}
.userform-footer-clearall:hover {
  text-decoration: underline;
}
.alert {
  margin-top: -5px;
  color: #f56c6c;
  font-size: 12px;
}
/* :deep(.el-form-item__label::after) {
  content: "*";
  color: var(--el-color-danger);
  margin-left: 4px;
} */
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed black;
  background-image: url("../../../assets/img/empty-avatar.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.uploadedAvatar {
  border: 1px solid black;
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
:deep(.el-select) {
  width: 100%;
}
</style>

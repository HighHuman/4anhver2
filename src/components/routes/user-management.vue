<script setup lang="ts">
import { ref } from "vue";
import {
  ElScrollbar,
  ElTable,
  ElNotification,
  ElMessageBox,
} from "element-plus";
import { userList } from "../demo-user";
import { IUser } from "../../common/model";
import Register from "../common/user/register.vue";

const tableData = ref<IUser[]>(userList);

const loading = ref(false);
const tableRef = ref<InstanceType<typeof ElTable>>();
const registerFormRef = ref<InstanceType<typeof Register>>();

const deleteUser = async () => {
  ElNotification({
    type: "success",
    title: "Successful",
    message: "Deleted",
    duration: 3000,
  });
};

const handleDelete = () => {
  ElMessageBox.confirm("Do you want to delete this user?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await deleteUser();
    })
    .catch(() => {
      console.log("cancel");
    });
};

const openRegisterForm = (val?: any) => {
  if (registerFormRef.value?.openRegisterForm) {
    registerFormRef.value?.openRegisterForm(val);
  }
};
</script>

<template>
  <div class="usermanager-wrap">
    <div class="usermanager-addnew mb-3" @click="">
      <i class="ms-Icon ms-font ms-Icon--Add cursor-pointer mr-2"></i>
      <span @click="openRegisterForm({})">Add New</span>
    </div>
    <div class="usermanager-table">
      <div class="table-titles d-flex">
        <div class="title-item usermanager-title-id">ID</div>
        <div class="title-item usermanager-title-avatar">Avatar</div>
        <div class="title-item usermanager-title-username">Username</div>
        <div class="title-item usermanager-title-fullname">Fullname</div>
        <div class="title-item usermanager-title-gender">Gender</div>
        <div class="title-item usermanager-title-birth">Date of birth</div>
        <div class="title-item usermanager-title-email">Email</div>
        <div class="title-item usermanager-title-actions"></div>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        max-height="450px"
        ref="tableRef"
      >
        <!-- ID -->
        <el-table-column width="50">
          <template #default="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!-- AVATAR -->
        <el-table-column width="80">
          <template #default="scope">
            <img src="../../assets/img/empty-avatar.png" alt="" />
          </template>
        </el-table-column>
        <!-- USERNAME -->
        <el-table-column show-overflow-tooltip width="200">
          <template #default="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <!-- FULLNAME -->
        <el-table-column show-overflow-tooltip width="200">
          <template #default="scope">
            <span>{{ scope.row.fullname }}</span>
          </template>
        </el-table-column>
        <!-- GENDER -->
        <el-table-column width="80">
          <template #default="scope">
            <span>{{ scope.row.gender }}</span>
          </template>
        </el-table-column>
        <!-- BIRTH -->
        <el-table-column width="120">
          <template #default="scope">
            <span>{{ scope.row.dateOfBirth }}</span>
          </template>
        </el-table-column>
        <!-- EMAIL -->
        <el-table-column>
          <template #default="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <!-- DELETE/EDIT  -->
        <el-table-column width="100">
          <template #default="scope">
            <i
              class="ms-Icon ms-font-xl mr-3 ms-Icon--Delete cursor-pointer"
              @click="handleDelete"
            >
            </i>
            <i
              @click="openRegisterForm(scope.row)"
              class="ms-Icon ms-font-xl ms-Icon--Edit cursor-pointer"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <register ref="registerFormRef" />
  </div>
</template>

<style scoped>
@import url("../css/el-table.css");
img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.usermanager-wrap {
  height: 100%;
  width: 100%;
  background-color: #363c41;
  border-radius: 4px;
  padding: 10px 10px 20px 10px;
  color: white;
}

.usermanager-addnew {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>

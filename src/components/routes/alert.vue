<script setup lang="ts">
import { ref } from "vue";
import { IAlert } from "../../common/model";
import SearchBox from "../common/search-box.vue";
import moment from "moment";
import { demoAlert } from "../demo-alert.ts";
import DetailData from "../common/detail-data.vue";
import { ElScrollbar, ElTable } from "element-plus";
import { DoughnutChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
Chart.defaults.color = "#fff";
const tableRef = ref();
const detailRef = ref();
const loading = ref(false);
const tableData = ref<IAlert[]>(demoAlert.slice(0, 7));

const circleChartData = {
  labels: ["Low", "High"],
  datasets: [
    {
      data: [1134, 352],
      backgroundColor: ["#f8ff58", "#ff544d"],
    },
  ],
};

const barChartData = {
  labels: [
    "2/2",
    "3/2",
    "4/2",
    "5/2",
    "6/2",
    "7/2",
    "8/2",
    "9/2",
    "10/2",
    "11/2",
    "12/2",
    "13/2",
    "14/2",
    "15/2",
  ],
  datasets: [
    {
      label: "alerts",
      data: [
        2415, 3541, 2984, 2102, 3784, 1574, 4125, 3697, 2568, 1974, 2014, 4365,
        4641, 2543,
      ],
      backgroundColor: ["#77CEFF"],
    },
  ],
};

const circleChartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Level Chart",
    },
  },
});

const barChartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Alert Chart",
    },
  },
});
const loadMore = () => {
  loading.value = true;
  if (tableData.value.length > demoAlert.length) {
    return;
  }
  const num = tableData.value.length;
  const arr = demoAlert.slice(num, num + 5);

  tableData.value = tableData.value.concat(arr);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

const handleScroll = ({ scrollTop }) => {
  if (Math.abs(scrollTop - tableRef.value.$el.clientHeight + 260) <= 1) {
    loadMore();
  }
};

const openDetailDialog = (val: object, id: any) => {
  if (detailRef?.value.showDetailData) {
    detailRef?.value.showDetailData(val, id);
  }
};
</script>
<template>
  <div class="alert-wrap">
    <div class="alert-header">
      <search-box />
    </div>
    <div class="alert-result">
      <div class="alert-result-chart">
        <div class="alert-result-chart-circle">
          <DoughnutChart
            :chartData="circleChartData"
            :height="190"
            :options="circleChartOptions"
          />
        </div>

        <div class="alert-result-chart-bar">
          <BarChart
            :chartData="barChartData"
            :height="150"
            :options="barChartOptions"
          />
        </div>
      </div>
      <div class="alert-result-table">
        <div class="mb-2">Total: 2543 alerts</div>

        <div class="table-titles d-flex">
          <div class="title-item alert-title-id">ID</div>
          <div class="title-item alert-title-eventid">Event ID</div>
          <div class="title-item alert-title-level">Level</div>
          <div class="title-item alert-title-message">Message</div>
          <div class="title-item alert-title-localtime">Local Time</div>
          <div class="title-item alert-title-data">Event List</div>
        </div>

        <el-scrollbar @scroll="handleScroll" height="260px">
          <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            ref="tableRef"
          >
            <!-- ID -->
            <el-table-column width="210" show-overflow-tooltip>
              <template #default="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <!-- EVENT ID -->
            <el-table-column width="210">
              <template #default="scope">
                <span>{{ scope.row.eventId }}</span>
              </template>
            </el-table-column>
            <!-- LEVEL -->
            <el-table-column width="60">
              <template #default="scope">
                <span>{{ scope.row.level }}</span>
              </template>
            </el-table-column>
            <!-- MESSAGE -->
            <el-table-column width="230" show-overflow-tooltip>
              <template #default="scope">
                <span>{{ scope.row.message }}</span>
              </template>
            </el-table-column>
            <!-- LOCAL TIME  -->
            <el-table-column width="160">
              <template #default="scope">
                <span>{{
                  moment(scope.row.localTime).format("DD/MM/YYYY HH:mm:ss")
                }}</span>
              </template>
            </el-table-column>

            <!-- DATA  -->
            <el-table-column>
              <template #default="scope">
                <span
                  class="data"
                  @click="openDetailDialog(scope.row.data, scope.row.id)"
                  >Click to see detail</span
                >
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
  </div>
  <detail-data ref="detailRef" />
</template>
<style scoped>
@import url("../css/el-table.css");
.alert-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.alert-header {
  width: 100%;
  background-color: #363c41;
  border-radius: 4px;
}

/* RESULT  */
.alert-result {
  width: 100%;
  height: calc(100% - 102px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
/* RESUTL CHART  */
.alert-result-chart {
  display: flex;
  justify-content: space-around;
  height: 150px;
  border-radius: 4px;
  background-color: #363c41;
  padding-inline: 30px;
  width: 100%;
  gap: 50px;
}
.alert-result-chart-circle {
  width: 300px;
}
.alert-result-chart-bar {
  width: calc(100% - 300px);
}
/* RESULT TABLE  */
.alert-result-table {
  background-color: #363c41;
  padding: 10px;
  border-radius: 4px;
  color: white;
}
:deep(.el-input:not(.el-input--medium) .el-input__wrapper) {
  box-shadow: unset;
  border-radius: unset;
}
</style>
../demo-user.ts

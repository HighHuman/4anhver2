import { createStore } from "vuex";
import router from "./router";
import { ICurrentPage } from "./model";
import { userList } from "../components/demo-user";
import { helper } from "../utils/helper";
import { ElNotification } from "element-plus";
interface IState {
  isLogin: boolean;
  currentPage: string;
  tableDatas: any[];
  currentUser: any;
}

const store = createStore<IState>({
  state: {
    isLogin: false,
    currentPage: ICurrentPage.Event,
    currentUser: {},
  },
  mutations: {
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setLogin(state, payload) {
      state.isLogin = payload;
    },
    setTableDatas(state, payload) {
      state.tableDatas = state.tableDatas.concat(payload);
    },
  },
  actions: {
    getLogin(context, payload) {
      const isExistUser = userList.filter(
        (item) => item.username === payload.username
      );
      if (!isExistUser.length) {
        return ElNotification({
          type: "error",
          title: "Error",
          message: "Not exist user",
          duration: 1000,
        });
      }
      if (isExistUser[0].password !== payload.password) {
        return ElNotification({
          type: "error",
          title: "Error",
          message: "Wrong password",
          duration: 1000,
        });
      }

      ElNotification({
        type: "success",
        title: "Successful",
        message: "Login succesful",
        duration: 1000,
      });
      helper.setAcessToken("abcdefgh");
      context.commit("setCurrentUser", isExistUser);
      context.commit("setLogin", true);
      router.push({ name: "event" });
    },
    logout(context) {
      helper.deteteAccessToken();
      context.commit("setLogin", false);

      router.push({ name: "opening" });
    },
    getCurrentPage(context, payload) {
      context.commit("setCurrentPage", payload);
    },
    // LẤY DATA NGƯỜI ĐANG ĐĂNG NHẬP
    getCurrentUser(context) {
      const accessToken = helper.getAccessToken();
      if (accessToken) context.commit("setLogin", true);
    },
  },
});

export default store;

export const helper = {
  setAcessToken(tokenVal: string) {
    return localStorage.setItem("accessToken", tokenVal);
    // return Cookies.set("accessToken", tokenVal);
  },
  getAccessToken() {
    return localStorage.getItem("accessToken");
    // return Cookies.get("accessToken");
  },
  deteteAccessToken() {
    return localStorage.clear();
  },
};

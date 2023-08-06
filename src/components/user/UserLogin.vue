<template>
  <div class="login-container">
    <b-card class="login-card">
      <h3 class="card-title">로그인</h3>

      <b-form @submit.prevent="confirm">
        <b-form-group
          id="userId-group"
          label="사용자명"
          label-for="userId-input"
        >
          <b-form-input
            id="userId-input"
            v-model="member.userId"
            type="text"
            placeholder="사용자명을 입력하세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password-group"
          label="비밀번호"
          label-for="password-input"
        >
          <b-form-input
            id="password-input"
            v-model="member.userPwd"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="dark" class="login-button"
          >로그인</b-button
        >
      </b-form>

      <div class="register-link">
        <router-link to="/user/join">회원가입</router-link>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  data() {
    return {
      member: {
        userId: null,
        userPwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.member);
      let token = localStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "AppMain" });
      } else {
        alert("로그인에 실패하였습니다.");
      }
    },
    movePage() {
      this.$router.push({ name: "UserJoin" });
    },
  },
};
</script>

<style scoped>
.login-container {
  margin-top: 300px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100vh;
  /* background: linear-gradient(
    to bottom right,
    rgb(245, 230, 235),
    rgb(231, 228, 241),
    rgb(210, 218, 233),
    rgb(217, 207, 222),
    rgb(250, 207, 207),
    rgb(254, 240, 214)
  ); */
  background-repeat: no-repeat;
  background-size: cover;
}

.login-card {
  width: 50vh;
  height: 35vh;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
}

.card-title {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  color: #4c4c4c;
}

.login-button {
  width: 100%;
  background-color: #4c4c4c;
  color: #ffffff;
}

.register-link {
  margin-top: 1rem;
  text-align: center;
}

.b-form-group {
  margin-bottom: 1.5rem;
}

.b-form-input {
  background-color: #f8f1f4;
  color: #4c4c4c;
  border-color: #f8f1f4;
  border-radius: 8px;
}

.b-form-input:focus {
  box-shadow: none;
}
</style>

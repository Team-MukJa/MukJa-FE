<template>
  <div class="login-container">
    <b-card class="login-card">
      <h3 class="card-title">로그인</h3>

      <b-form @submit.prevent="login">
        <b-form-group id="username-group" label="사용자명" label-for="username-input">
          <b-form-input
            id="username-input"
            v-model="username"
            type="text"
            placeholder="사용자명을 입력하세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password-group" label="비밀번호" label-for="password-input">
          <b-form-input
            id="password-input"
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="login-button">로그인</b-button>
      </b-form>

      <div class="register-link">
        <router-link to="/register">회원가입</router-link>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // 로그인 메소드 내용 유지
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 400px;
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
  background-color: #f8a5c2;
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
  border-color: #f8a5c2;
}
</style>

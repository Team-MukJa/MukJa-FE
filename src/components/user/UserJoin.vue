<template>
  <div class="register-container">
    <b-card class="register-card">
      <h3 class="card-title">회원가입</h3>
      <b-form @submit.prevent="register">
        <b-form-group
          id="usernid-group"
          label="아이디"
          label-for="username-input"
        >
          <b-form-input
            id="userid-input"
            v-model="member.userId"
            type="text"
            placeholder="아이디를 입력하세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="username-group"
          label="이름"
          label-for="username-input"
        >
          <b-form-input
            id="username-input"
            v-model="member.userName"
            type="text"
            placeholder="이름을 입력하세요"
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

        <b-form-group id="email-group" label="이메일" label-for="email-input">
          <b-input-group>
            <b-form-input
              id="email-id-input"
              v-model="member.emailId"
              type="text"
              placeholder="이메일 ID을 입력하세요"
              required
            ></b-form-input>
            <b-input-group-prepend>
              <span class="input-group-text">@</span>
            </b-input-group-prepend>
            <b-form-input
              id="email-domain-input"
              v-model="member.emailDomain"
              type="text"
              placeholder="도메인을 입력하세요"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-button type="submit" variant="primary" class="register-button"
          >회원가입</b-button
        >
      </b-form>

      <div class="login-link">
        <router-link to="/user/login">로그인</router-link>
      </div>
    </b-card>
  </div>
</template>
<script>
import { join } from "@/api/member";

export default {
  data() {
    return {
      member: {
        userId: null,
        userName: null,
        userPwd: null,
        emailId: null,
        emailDomain: null,
      },
    };
  },
  computed: {},
  methods: {
    register() {
      join(
        this.member,
        ({ data }) => {
          if (data === 1) this.$router.push({ name: "UserLogin" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 110px;
}

.register-card {
  width: 600px;
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

.register-button {
  width: 100%;
  background-color: #f8a5c2;
  color: #ffffff;
}

.login-link {
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

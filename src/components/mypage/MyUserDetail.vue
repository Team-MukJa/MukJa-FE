<template>
  <div class="register-container">
    <b-card class="register-card">
      <h3 class="card-title">내 정보</h3>
      <b-form @submit.prevent="register">
        <b-form-group id="username-group" label="아이디" label-for="username-input">
          <b-form-input
            id="username-input"
            v-model="this.my.userId"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password-group" label="비밀번호" label-for="password-input">
          <b-form-input id="password-input" v-model="this.my.userPwd" type="test"></b-form-input>
        </b-form-group>

        <b-form-group id="name-group" label="이름" label-for="name-input">
          <b-form-input
            id="name-input"
            v-model="this.my.userName"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="email-group" label="이메일" label-for="email-input">
          <b-form-input id="email-input" v-model="this.email" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group id="regtime-group" label="가입날짜" label-for="regtime-input">
          <b-form-input
            id="regtime-input"
            v-model="this.regtime"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="modify-button">수정</b-button>
        <b-button type="submit" variant="primary" class="delete-button">탈퇴</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "MyUserDetail",
  components: {},
  props: {
    myData: Object,
  },
  data() {
    return {
      my: {
        userId: "",
        userPwd: "",
        userName: "",
        emailId: "",
        emailDomain: "",
        joinDate: [],
        role: "",
      },
      message: "MyUserDetail",
      email: "",
      regtime: "",
    };
  },
  created() {
    this.my.userId = this.myData.userId;
    this.my.userPwd = this.myData.userPwd;
    this.my.userName = this.myData.userName;
    this.my.emailId = this.myData.emailId;
    this.my.emailDomain = this.myData.emailDomain;
    this.my.joinDate = this.myData.joinDate;
    this.my.role = this.myData.role;

    this.email = this.my.emailId + "@" + this.my.emailDomain;
    this.regtime =
      this.my.joinDate[0] + "년 " + this.my.joinDate[1] + "월 " + this.my.joinDate[2] + "일";
  },
  methods: {},
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  height: 680px;
  background-repeat: no-repeat;
}

.register-card {
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

.modify-button {
  width: 45%;
  background-color: #f8a5c2;
  border-color: #f8a5c2;
  color: #ffffff;
  margin-top: 10%;
  margin-right: 10%;
}
.delete-button {
  width: 45%;
  background-color: #f8a5c2;
  border-color: #f8a5c2;
  color: #ffffff;
  margin-top: 10%;
}

.modify-button:hover,
.modify-button:focus,
.modify-button:active {
  background-color: #e26893;
  border-color: #e26893;
  color: #000000;
  margin-top: 10%;
}

.delete-button:hover,
.delete-button:focus,
.delete-button:active {
  background-color: #e26893;
  border-color: #e26893;
  color: #000000;
  margin-top: 10%;
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

<template>
  <div class="register-container">
    <b-card class="register-card">
      <h3 class="card-title">내 정보</h3>
      <b-form>
        <b-form-group
          id="username-group"
          label="아이디"
          label-for="username-input"
        >
          <b-form-input
            id="username-input"
            v-model="my.userId"
            type="text"
            required
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password-group"
          label="비밀번호"
          label-for="password-input"
        >
          <b-form-input
            id="password-input"
            v-model="my.userPwd"
            type="test"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="name-group" label="이름" label-for="name-input">
          <b-form-input
            id="name-input"
            v-model="my.userName"
            type="text"
            required
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="email-group" label="이메일" label-for="email-input">
          <b-input-group>
            <b-form-input
              id="email-id-input"
              v-model="my.emailId"
              type="text"
              placeholder="이메일 ID을 입력하세요"
              required
            ></b-form-input>
            <b-input-group-prepend>
              <span class="input-group-text">@</span>
            </b-input-group-prepend>
            <b-form-input
              id="email-domain-input"
              v-model="my.emailDomain"
              type="text"
              placeholder="도메인을 입력하세요"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="regtime-group"
          label="가입날짜"
          label-for="regtime-fieldset"
        >
          <b-form-input
            id="regtime-fieldset"
            v-model="regtime"
            type="text"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-button
          variant="dark"
          class="modify-button"
          @click.self.prevent="doModify"
          >수정</b-button
        >
        <b-button
          variant="dark"
          class="delete-button"
          @click.self.prevent="doDelete"
          >탈퇴</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "MyUserDetail",
  components: {},
  data() {
    return {
      my: {
        userId: "",
        userPwd: "",
        userName: "",
        emailId: "",
        emailDomain: "",
      },
      message: "MyUserDetail",
      regtime: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  created() {
    this.my.userId = this.userInfo.userId;
    this.my.userName = this.userInfo.userName;
    this.my.emailId = this.userInfo.emailId;
    this.my.emailDomain = this.userInfo.emailDomain;

    this.regtime =
      this.userInfo.joinDate[0] +
      "년 " +
      this.userInfo.joinDate[1] +
      "월 " +
      this.userInfo.joinDate[2] +
      "일";
  },
  methods: {
    ...mapActions(memberStore, ["getUserInfo"]),
    doModify() {
      if (!this.my.userPwd) this.my.userPwd = null;
      this.$emit("update-user", this.my);
    },
    doDelete() {
      this.$emit("delete-user", this.my.userId);
    },
  },
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

  color: #ffffff;
  margin-top: 10%;
  margin-right: 10%;
}
.delete-button {
  width: 45%;

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

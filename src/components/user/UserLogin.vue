<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 pa-8" color="primary lighten-4">
          <v-card-title class="pb-4 text-center">
            <h2 class="display-1 font-style">Login</h2>
          </v-card-title>
          <v-form @submit.prevent="login">
            <v-text-field v-model="username" label="Username" outlined></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
            ></v-text-field>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn type="submit" color="primary" block>Login</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-row justify="center">
            <v-col cols="6" class="text-center">
              <v-btn text color="primary" @click="goToSignUp">Sign Up</v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <v-btn text color="primary" @click="goToForgotPassword">Forgot Password</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      console.log("Username:", this.username);
      console.log("Password:", this.password);
    },
    goToSignUp() {
      console.log("Go to Sign Up page");
      // 여기에 회원가입 페이지로 이동하는 코드를 추가하세요.
    },
    goToForgotPassword() {
      console.log("Go to Forgot Password page");
      // 여기에 비밀번호 찾기 페이지로 이동하는 코드를 추가하세요.
    },
  },
};
</script>

<style>
.fill-height {
  height: 100vh;
}

.font-style {
  font-family: "Arial", sans-serif;
  /* 원하는 글꼴로 변경할 수 있습니다. */
}
</style>

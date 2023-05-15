<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 pa-8" color="primary lighten-4">
          <v-card-title class="pb-4 text-center">
            <h2 class="display-1 font-style">Sign Up</h2>
          </v-card-title>
          <v-form @submit.prevent="signUp">
            <v-text-field v-model="username" label="Username" outlined></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
            ></v-text-field>
            <v-text-field v-model="email" label="Email" outlined></v-text-field>
            <v-text-field v-model="address" label="Address" outlined></v-text-field>
            <v-text-field v-model="phoneNumber" label="Phone Number" outlined></v-text-field>
            <v-btn type="submit" color="primary" block>Sign Up</v-btn>
          </v-form>
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <v-btn text color="primary" @click="goToLogin">Back to Login</v-btn>
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
      email: "",
      address: "",
      phoneNumber: "",
    };
  },
  methods: {
    signUp() {
      console.log("Username:", this.username);
      console.log("Password:", this.password);
      console.log("Email:", this.email);
      console.log("Address:", this.address);
      console.log("Phone Number:", this.phoneNumber);
      // 여기에 회원가입 처리를 위한 로직을 추가하세요.
    },
    goToLogin() {
      console.log("Go to Login page");
      // 여기에 로그인 페이지로 이동하는 코드를 추가하세요.
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

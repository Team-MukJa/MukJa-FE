<template>
  <div>
    <h2>아이디: {{ myData.userId }}</h2>
    <h2>이름: {{ myData.userName }}</h2>
    <h2>비밀번호: {{ myData.userPwd }}</h2>
    <h2>이메일: {{ myData.emailId + "@" + myData.emailDomain }}</h2>
    <h2>가입날짜: {{ myData.joinDate }}</h2>
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
      message: "MyUserDetail",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>

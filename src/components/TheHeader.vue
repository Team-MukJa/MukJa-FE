<template>
  <div class="app">
    <b-navbar variant="light" class="bg-light">
      <b-navbar-brand @click="goToMain">MukJa</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto">
          <b-nav-item>
            <b-nav-link @click="goToReview">여행지 검색</b-nav-link>
          </b-nav-item>
          <b-nav-item>
            <b-nav-link @click="goToPlaces">핫플레이스</b-nav-link>
          </b-nav-item>
          <b-nav-item>
            <b-nav-link @click="goToPlan">여행 계획</b-nav-link>
          </b-nav-item>
          <b-nav-item>
            <b-nav-link @click="goToNotices">공지사항</b-nav-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown right toggle-class="btn btn-link" class="person-icon">
            <template #button-content>
              <i class="fa fa-user"></i>
            </template>
            <b-dropdown-item v-if="userInfo" @click="goToMyPage">마이페이지</b-dropdown-item>
            <b-dropdown-item v-if="userInfo" @click="logout">로그아웃</b-dropdown-item>
            <b-dropdown-item v-if="!userInfo" @click="goToLogin">로그인</b-dropdown-item>
            <b-dropdown-item v-if="!userInfo" @click="goToRegister">회원가입</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";
export default {
  data() {
    return {
      highlightedMenu: null,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  created() {
    let token = localStorage.getItem("access-token");
    this.getUserInfo(token);
  },
  methods: {
    ...mapActions(memberStore, ["userLogout", "getUserInfo"]),

    goToMyPage() {
      this.$router.push({ name: "my" });
    },
    logout() {
      console.log(this.userInfo.userId);
      this.userLogout(this.userInfo.userId);
      localStorage.removeItem("access-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "AppMain" });
    },
    goToLogin() {
      this.$router.push({ name: "UserLogin" });
    },
    goToRegister() {
      this.$router.push({ name: "UserJoin" });
    },
    goToPlan() {
      this.$router.push({ name: "AppPlan" });
    },
    goToReview() {
      this.$router.push({ name: "AppReview" });
    },
    goToNotices() {
      this.$router.push({ name: "notices" });
    },
    goToPlaces() {
      this.$router.push({ name: "places" });
    },
    goToMain() {
      this.$router.push({ name: "AppMain" });
    },
  },
};
</script>

<style scoped>
.person-icon .navbar-toggler-icon {
  display: none;
}

.person-icon .navbar-toggler {
  display: inline-block;
  font-size: 24px;
  line-height: 24px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}

.person-icon .navbar-toggler:hover {
  color: #007bff;
}

.person-icon .navbar-toggler[aria-expanded="true"] {
  color: #007bff;
}

.person-icon .dropdown-toggle {
  color: #333;
  font-size: 16px;
  padding: 8px 20px;
  background: none;
  border: none;
  transition: color 0.3s;
}

.person-icon .dropdown-toggle:hover {
  color: #007bff;
}

.person-icon .dropdown-item {
  color: #333;
  font-size: 16px;
  padding: 8px 20px;
  transition: background-color 0.3s;
}

.person-icon .dropdown-item:hover {
  background-color: #007bff;
  color: #fff;
}

.person-icon .dropdown-menu {
  background-color: #f8f9fa;
  border: none;
}
</style>

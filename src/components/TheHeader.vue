<template>
  <div class="app">
    <b-navbar type="light" variant="light" class="navbar-login">
      <b-navbar-nav class="justify-content-centser">
        <b-navbar-brand to="/" class="navbar-brand-login" @click="toggleMenuHighlight(null)">
          <!-- <b-icon-menu-down></b-icon-menu-down>EnjoyTrip -->
          <img src="@/assets/ape.png" width="50px" alt="MukJa Icon" class="navbar-icon" /> MukJa
        </b-navbar-brand>
      </b-navbar-nav>

      <b-navbar-nav class="mx-auto">
        <b-nav-item to="/search" class="nav-link-login" @click="toggleMenuHighlight('search')"
          :class="{ 'menu-highlight': highlightedMenu === 'search' }">
          <b-icon-search></b-icon-search> 여행지 검색
        </b-nav-item>
        <b-nav-item to="/places" class="nav-link-login" @click="toggleMenuHighlight('hotplaces')"
          :class="{ 'menu-highlight': highlightedMenu === 'hotplaces' }">
          <b-icon-compass></b-icon-compass> 핫플레이스
        </b-nav-item>
        <b-nav-item to="/plan" class="nav-link-login" @click="toggleMenuHighlight('plan')"
          :class="{ 'menu-highlight': highlightedMenu === 'plan' }">
          <b-icon-list-ul></b-icon-list-ul> 여행 계획
        </b-nav-item>

        <b-nav-item to="/notices" class="nav-link-login" @click="toggleMenuHighlight('notices')"
          :class="{ 'menu-highlight': highlightedMenu === 'notices' }">
          <b-icon-exclamation-circle></b-icon-exclamation-circle> 공지사항
        </b-nav-item>
        <b-nav-item-dropdown right class="nav-item-dropdown-login" @click="toggleMenuHighlight(null)">
          <template #button-content>
            <b-icon-person-fill></b-icon-person-fill>
          </template>
          <b-dropdown-item v-if="userInfo" @click="goToMyPage" class="dropdown-item-login">
            <b-icon-person-badge-fill></b-icon-person-badge-fill> 마이페이지
          </b-dropdown-item>
          <b-dropdown-item v-if="userInfo" @click="logout" class="dropdown-item-login">
            <b-icon-box-arrow-right></b-icon-box-arrow-right> 로그아웃
          </b-dropdown-item>
          <b-dropdown-item v-if="!userInfo" @click="goToLogin" class="dropdown-item-login">
            <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right> 로그인
          </b-dropdown-item>
          <b-dropdown-item v-if="!userInfo" @click="goToRegister" class="dropdown-item-login">
            <b-icon-person-plus-fill></b-icon-person-plus-fill> 회원가입
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <!-- 로그인 화면 컨텐츠 -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";
export default {
  data() {
    return {
      // isAuthenticated: false,
      highlightedMenu: null,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),

    goToMyPage() {
      this.$router.push({ name: "my" });
      this.toggleMenuHighlight(null); // 마이페이지로 이동할 때 다른 버튼의 하이라이트 해제
    },
    logout() {
      this.toggleMenuHighlight(null); // 로그아웃할 때 다른 버튼의 하이라이트 해제
      console.log(this.userInfo.userId);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userId);
      localStorage.removeItem("access-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "AppMain" });
    },
    goToLogin() {
      this.$router.push({ name: "UserLogin" });
      this.toggleMenuHighlight(null); // 로그인 화면으로 이동할 때 다른 버튼의 하이라이트 해제
    },
    goToRegister() {
      this.$router.push({ name: "UserJoin" });
      this.toggleMenuHighlight(null); // 회원가입 화면으로 이동할 때 다른 버튼의 하이라이트 해제
    },
    toggleMenuHighlight(menu) {
      this.highlightedMenu = menu === this.highlightedMenu ? null : menu;
    },
  },
};
</script>

<style scoped>
.navbar-login {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  background-color: transparent;
  border-bottom: none;
  display: flex;
  align-items: center;
}

.navbar-login .nav-link-login {
  font-weight: bold;
}

.navbar-brand-login {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  color: #8d70b7;
  font-size: 20px;
  font-weight: bold;
  margin-left: 450px;
}

.nav-link-login {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  color: #8d70b7;
  font-size: 16px;
  padding: 0.5rem;
  transition: background-color 0.3s ease-in-out;
}

.dropdown-login {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  border: none;
}

.dropdown-item-login {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  color: #8d70b7;
  font-size: 16px;
}

.dropdown-item-login:hover,
.dropdown-item-login:focus {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  background-color: rgb(252, 169, 169);
  color: #542d8d;
}

.nav-item-dropdown-login {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  margin-top: 8px;
}

.nav-item-dropdown-login .dropdown-menu {
  margin-top: 5px;
  /* 원하는 간격으로 조정 */
  text-align: center;
  font-weight: bold;
}

.menu-highlight {
  z-index: 2000;
  /*맨 앞으로 나오도록 함*/
  background-color: rgb(252, 169, 169);
}
</style>

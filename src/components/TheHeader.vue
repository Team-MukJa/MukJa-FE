<template>
  <div class="app">
    <!-- 이전 내비게이션
    <b-navbar type="light" variant="light" class="navbar-login">
      <b-navbar-nav>
        <b-navbar-brand to="/" class="navbar-brand-login">
          <img src="@/assets/ape.png" width="50px" alt="MukJa Icon" class="navbar-icon" /> EnjoyTrip
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
    </b-navbar> -->

    <ul class="navbar-login">
      <li class="nav-link-login">
        <router-link to="/" class="navbar-brand-login" @click="toggleMenuHighlight(null)">
          NangMan
        </router-link>
      </li>
      <li class="nav-link-login mx-auto" @click="toggleMenuHighlight(null)">
        <ul class="nav-items">
          <li class="nav-item">
            <router-link to="/search" nav-link-class="text-light" class="nav-link-login"
              @click="toggleMenuHighlight('search')" :class="{ 'menu-highlight': highlightedMenu === 'search' }">
              여행지 검색
            </router-link>
          </li>
          <span class="divider"></span>
          <li class="nav-item">
            <router-link to="/places" class="nav-link-login" @click="toggleMenuHighlight('hotplaces')"
              :class="{ 'menu-highlight': highlightedMenu === 'hotplaces' }">
              핫플레이스
            </router-link>
          </li>
          <span class="divider"></span>
          <li class="nav-item">
            <router-link to="/plan" class="nav-link-login" @click="toggleMenuHighlight('plan')"
              :class="{ 'menu-highlight': highlightedMenu === 'plan' }">
              여행 계획
            </router-link>
          </li>
          <span class="divider"></span>
          <li class="nav-item">
            <router-link to="/notices" class="nav-link-login" @click="toggleMenuHighlight('notices')"
              :class="{ 'menu-highlight': highlightedMenu === 'notices' }">
              공지사항
            </router-link>
          </li>
        </ul>
      </li>
      <b-nav-item-dropdown right class="drop" no-caret>
        <template #button-content>
          <div class="dropdown-button">
            <span class="dropdown-icon">
              <b-icon-person-fill size="lg"></b-icon-person-fill>
            </span>
            <span class="dropdown-caret"></span>
          </div>
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
    </ul>

    <!-- 로그인 화면 컨텐츠 -->
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
  background-color: rgba(0, 0, 0, 0);
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.nav-link-login {
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.nav-link-login:hover,
.nav-link-login:focus {
  color: rgb(253, 186, 186);
  text-decoration: none;
}

.navbar-brand-login {
  font-size: 25px;
  font-weight: bold;
  margin-left: 20px;
  color: white;
}

.navbar-brand-login:hover,
.navbar-brand-login:focus {
  color: rgb(253, 186, 186);
  text-decoration: none;
}

.nav-items {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

.nav-item {
  margin: 0 10px;
}

.dropdown-login {
  border: none;
}

.dropdown-item-login {
  color: #8d70b7;
  font-size: 16px;
}

.dropdown-item-login:hover,
.dropdown-item-login:focus {
  background-color: #d4c8e2;
  color: #542d8d;
}


.menu-highlight {
  background-color: rgb(253, 186, 186);
}

.divider {
  display: inline-block;
  width: 1px;
  height: 22px;
  background-color: #ccc;
  margin: 0 10px;
  vertical-align: middle;
}


.dropdown-button {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-icon {
  color: white;
  font-size: 20px;
  padding-right: 20px;
}

.dropdown-caret {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid white;
}

.dropdown-button:hover .dropdown-icon,
.dropdown-button:focus .dropdown-icon {
  color: rgb(253, 186, 186);
}

/* .navbar-login {
  background-color: transparent;
  border-bottom: none;
}

.navbar-brand-login {
  color: #8d70b7;
  font-size: 20px;
  font-weight: bold;
}

.nav-link-login {
  color: #8d70b7;
  font-size: 16px;
  padding: 0.5rem;
  transition: background-color 0.3s ease-in-out;
}

.dropdown-login {
  border: none;
}

.dropdown-item-login {
  color: #8d70b7;
  font-size: 16px;
}

.dropdown-item-login:hover,
.dropdown-item-login:focus {
  background-color: #d4c8e2;
  color: #542d8d;
}

.menu-highlight {
  background-color: #d4c8e2;
} */
</style>

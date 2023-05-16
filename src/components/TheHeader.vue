<template>
  <div>
    <b-navbar type="light" variant="light" class="navbar-login">
      <b-navbar-nav>
        <b-navbar-brand to="/" class="navbar-brand-login">
          <img src="@/assets/ape.png" width="50px" alt="MukJa Icon" class="navbar-icon" /> MukJa
        </b-navbar-brand>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item
          to="/searchlocations"
          class="nav-link-login"
          @click="toggleMenuHighlight('search')"
          :class="{ 'menu-highlight': highlightedMenu === 'search' }"
        >
          <b-icon-search></b-icon-search> 여행지 검색
        </b-nav-item>
        <b-nav-item
          to="/hotplaces"
          class="nav-link-login"
          @click="toggleMenuHighlight('hotplaces')"
          :class="{ 'menu-highlight': highlightedMenu === 'hotplaces' }"
        >
          <b-icon-compass></b-icon-compass> 핫플레이스
        </b-nav-item>
        <b-nav-item
          to="/plan"
          class="nav-link-login"
          @click="toggleMenuHighlight('plan')"
          :class="{ 'menu-highlight': highlightedMenu === 'plan' }"
        >
          <b-icon-list-ul></b-icon-list-ul> 여행 계획
        </b-nav-item>
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-icon-person-fill></b-icon-person-fill>
          </template>
          <b-dropdown-item v-if="isAuthenticated" @click="goToMyPage" class="dropdown-item-login">
            <b-icon-person-badge-fill></b-icon-person-badge-fill> 마이페이지
          </b-dropdown-item>
          <b-dropdown-item v-if="isAuthenticated" @click="logout" class="dropdown-item-login">
            <b-icon-box-arrow-right></b-icon-box-arrow-right> 로그아웃
          </b-dropdown-item>
          <b-dropdown-item v-if="!isAuthenticated" @click="goToLogin" class="dropdown-item-login">
            <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right> 로그인
          </b-dropdown-item>
          <b-dropdown-item
            v-if="!isAuthenticated"
            @click="goToRegister"
            class="dropdown-item-login"
          >
            <b-icon-person-plus-fill></b-icon-person-plus-fill> 회원가입
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <!-- 로그인 화면 컨텐츠 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      highlightedMenu: null,
    };
  },
  methods: {
    goToMyPage() {
      this.$router.push({ name: "my" });
    },
    logout() {
      this.$router.push({ name: "my" });
    },
    goToLogin() {
      this.$router.push({ name: "UserLogin" });
    },
    goToRegister() {
      this.$router.push({ name: "UserJoin" });
    },
    toggleMenuHighlight(menu) {
      this.highlightedMenu = this.highlightedMenu === menu ? null : menu;
    },
  },
};
</script>

<style scoped>
.navbar-login {
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
}
</style>

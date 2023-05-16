<template>
  <div>
    <b-navbar toggleable type="light" variant="light" class="navbar-login">
      <b-navbar-brand to="/" class="navbar-brand-login">
        <b-icon-house-door-fill></b-icon-house-door-fill> MukJa
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/travel-plans" class="nav-link-login">
            <b-icon-list-ul></b-icon-list-ul> 여행 계획
          </b-nav-item>
          <b-nav-item to="/hot-places" class="nav-link-login">
            <b-icon-compass></b-icon-compass> 핫플레이스
          </b-nav-item>
          <b-nav-item to="/search-locations" class="nav-link-login">
            <b-icon-search></b-icon-search> 여행지 검색
          </b-nav-item>

          <b-nav-item-dropdown right class="dropdown-login">
            <template #button-content>
              <b-icon-person></b-icon-person> {{ isAuthenticated ? "마이페이지" : "로그인" }}
            </template>
            <b-dropdown-item v-if="isAuthenticated" @click="goToMyPage" class="dropdown-item-login">
              <b-icon-person-badge></b-icon-person-badge> 마이페이지
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
      </b-collapse>
    </b-navbar>

    <!-- 로그인 화면 컨텐츠 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false, // 사용자 인증 상태에 따라 변경
    };
  },
  methods: {
    goToMyPage() {
      // 마이페이지로 이동하는 메소드
    },
    logout() {
      // 로그아웃 메소드
    },
    goToLogin() {
      // 로그인 페이지로 이동하는 메소드
    },
    goToRegister() {
      // 회원가입 페이지로 이동하는 메소드
    },
  },
};
</script>

<style scoped>
.navbar-login {
  background-color: #f6f2ff;
  border-bottom: 1px solid #d4c8e2;
}

.navbar-brand-login {
  color: #8d70b7;
  font-size: 20px;
  font-weight: bold;
}

.nav-link-login {
  color: #8d70b7;
  font-size: 16px;
}

.nav-link-login:hover,
.nav-link-login:focus {
  color: #542d8d;
}

.dropdown-login {
  background-color: #f6f2ff;
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
</style>

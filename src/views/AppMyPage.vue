<template>
  <div class="my-container">
    <b-tabs id="tab" class="justify-content-center" active-nav-item-class="font-weight-bold text-uppercase" fill>
      <b-tab title="나의 정보" active title-link-class="text-dark" style="margin-top: 50px"><my-user-detail
          @update-user="updateUser" @delete-user="deleteUser"></my-user-detail></b-tab>
      <b-tab title="나의 핫플레이스" title-link-class="text-dark"><my-hot-place style="margin-top: 50px"
          :myHotPlace="myHotPlace"></my-hot-place></b-tab>
      <b-tab title="나의 여행계획" title-link-class="text-dark"><my-plan style="margin-top: 50px"
          :myPlan="myPlan"></my-plan></b-tab>
      <b-tab title="나의 리뷰" title-link-class="text-dark"><my-review style="margin-top: 50px"
          :myReview="myReview"></my-review></b-tab>
      <b-tab title="나의 문의사항" title-link-class="text-dark"><my-notice style="margin-top: 50px"
          :myNotice="myNotice"></my-notice></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import http from "@/util/http-common";

import MyUserDetail from "@/components/mypage/MyUserDetail.vue";
import MyHotPlace from "@/components/mypage/MyHotPlace.vue";
import MyPlan from "@/components/mypage/MyPlan.vue";
import MyReview from "@/components/mypage/MyReview.vue";
import MyNotice from "@/components/mypage/MyNotice.vue";

import { modify, deleteMember } from "@/api/member";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "AppMyPage",
  components: {
    MyUserDetail,
    MyHotPlace,
    MyPlan,
    MyReview,
    MyNotice,
  },
  data() {
    return {
      myHotPlace: [],
      myPlan: [],
      myReview: [],
      myNotice: [],
      member: {
        userId: null,
        userPwd: null,
      },
    };
  },
  created() {
    http.get(`/my/place/${this.userInfo.userId}`).then(({ data }) => {
      this.myHotPlace = data;
    });
    http.get(`/my/plan/${this.userInfo.userId}`).then(({ data }) => {
      this.myPlan = data;
    });
    http.get(`/my/review/${this.userInfo.userId}`).then(({ data }) => {
      this.myReview = data;
    });
    http.get(`/my/notice/${this.userInfo.userId}`).then(({ data }) => {
      this.myNotice = data;
    });
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo", "userLogout"]),
    updateUser(user) {
      modify(
        user,
        ({ data }) => {
          if (data === "success") {
            let token = localStorage.getItem("access-token");
            this.getUserInfo(token);
            this.$router.go(this.$router.currentRoute);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteUser(userId) {
      deleteMember(
        userId,
        ({ data }) => {
          if (data === "success") this.logout();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    logout() {
      this.userLogout(this.userInfo.userId);
      localStorage.removeItem("access-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "AppMain" });
    },
  },
};
</script>

<style scoped>
#tab {
  display: fixed;
  align-content: center;
  width: 1000px;
  max-height: 100vh;
  margin-top: 30px;
  padding-bottom: 50px;
  background-color: whitesmoke;
  border-radius: 10px;
}

.nav-pills>.nav-item>.active {
  background-color: rgb(252, 169, 169) !important;
  /* 클릭된 탭의 배경색 변경 */
}
</style>

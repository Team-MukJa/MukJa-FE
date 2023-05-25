<template>
  <div>
    <div class="backg"></div>
    <div class="my-container">
      <b-tabs
        id="tab"
        class="justify-content-center"
        active-nav-item-class="font-weight-bold text-uppercase"
        fill
      >
        <b-tab
          title="나의 정보"
          active
          title-link-class="text-dark"
          style="margin-top: 50px"
          ><my-user-detail
            @update-user="updateUser"
            @delete-user="deleteUser"
          ></my-user-detail
        ></b-tab>
        <b-tab title="나의 일지" title-link-class="text-dark"
          ><my-hot-place style="margin-top: 50px"></my-hot-place
        ></b-tab>
        <b-tab title="나의 계획" title-link-class="text-dark"
          ><my-plan style="margin-top: 50px"></my-plan
        ></b-tab>
        <b-tab title="나의 리뷰" title-link-class="text-dark"
          ><my-review style="margin-top: 50px" :myReview="myReview"></my-review
        ></b-tab>
        <b-tab title="나의 커뮤니티" title-link-class="text-dark"
          ><my-notice style="margin-top: 50px" :myNotice="myNotice"></my-notice
        ></b-tab>
      </b-tabs>
    </div>
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
      myReview: [],
      myNotice: [],
      member: {
        userId: null,
        userPwd: null,
      },
    };
  },
  created() {
    http.get(`/my/review/${this.userInfo.userId}`).then(({ data }) => {
      this.myReview = data;
      console.log(this.myReview);
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
.backg {
  z-index: -1;
  background-image: url("../assets/paper.png");
  background-size: 1500px 850px;
  background-position: center;
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}

#tab {
  display: fixed;
  align-content: center;
  width: 900px;
  max-height: 70vh;
  margin-top: 100px;
  padding-bottom: 50px;
  border-radius: 10px;
  overflow-y: auto;
}
#tab::-webkit-scrollbar {
  width: 5px;
}

#tab::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.nav-pills > .nav-item > .active {
  background-color: rgb(252, 169, 169) !important;
}
</style>

import Vue from "vue";
import VueRouter from "vue-router";
import AppUser from "@/views/AppUser";
import AppMyPage from "@/views/AppMyPage";
import AppMain from "@/views/AppMain";
import AppPlan from "@/views/AppPlan";

import store from "@/store";

//추가
import AppReview from "@/views/AppReview";

//추가
import DestinationInfo from "@/components/review/DestinationInfo.vue";
import ReviewDetail from "@/components/review/ReviewDetail.vue";
import PlaceSearch from "@/components/review/ReviewDetail2.vue";

Vue.use(VueRouter);

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "AppMain",
    component: AppMain,
  },
  {
    path: "/user",
    name: "AppUser",
    component: AppUser,
    children: [
      {
        path: "login",
        name: "UserLogin",
        component: () => import("@/components/user/UserLogin"),
      },

      {
        path: "join",
        name: "UserJoin",
        component: () => import("@/components/user/UserJoin"),
      },
    ],
  },
  {
    path: "/my",
    name:"my",
    component: AppMyPage,
    beforeEnter: onlyAuthUser,
  },

  {
    path: "/search",
    component: PlaceSearch,
  },

  //추가

  {
    path: "/review",
    name: "AppReview",
    component: AppReview,
    redirect: "/review/detail2",

    children: [
      {
        path: "regist",
        name: "PlanRegist",
        beforeEnter: onlyAuthUser,

        component: () => import("@/components/plan/PlanRegist"),
      },
      {
        path: "list",
        name: "PlanList",
        component: () => import("@/components/plan/PlanList"),
      },
      {
        path: "place",
        name: "DestinationInfo",
        component: DestinationInfo,
      },

      {
        path: "detail/:contentid",
        name: "ReviewDetail",
        component: ReviewDetail,
      },
      {
        path: "detail2",
        name: "PlaceSearch",
        component: PlaceSearch,
      },
    ],
  },

  // notice
  {
    path: "/notices",
    name: "notices",
    component: () => import("@/views/AppNotice"),
    redirect: "/notices/list",
    children: [
      {
        path: "list",
        name: "noticelist",
        component: () => import("@/components/notice/NoticeList"),
      },
      // {
      //   path: "write",
      //   name: "noticewrite",
      //   // beforeEnter: onlyAuthUser,
      //   component: () => import("@/components/notice/NoticeWrite"),
      // },
      {
        path: "view/:articleno",
        name: "noticeview",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/notice/NoticeView"),
      },
      {
        path: "modify/:articleno",
        name: "noticemodify",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/notice/NoticeModify"),
      },
      {
        path: "delete/:articleno",
        name: "noticedelete",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/notice/NoticeDelete"),
      },
    ],
  },

  //hotplace
  {
    path: "/places",
    name: "places",
    component: () => import("@/views/AppHotPlace"),
    redirect: "/places/list",
    children: [
      {
        path: "list",
        name: "placelist",
        component: () => import("@/components/hotplace/HotplaceList"),
      },
      {
        path: "write",
        name: "placewrite",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/hotplace/HotplaceWrite"),
      },
      {
        path: "view/:place-id",
        name: "placeview",
        component: () => import("@/components/hotplace/HotplaceView"),
      },
      {
        path: "modify/:place-id",
        name: "placemodify",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/hotplace/HotplaceModify"),
      },
      {
        path: "delete/:noticeid",
        name: "noticedelete",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/hotplace/HotplaceDelete"),
      },
    ],
  },

  {
    path: "/plan",
    name: "AppPain",
    component: AppPlan,
    redirect: "/plan/list",
    children: [
      {
        path: "regist",
        name: "PlanRegist",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/plan/PlanRegist"),
      },
      {
        path: "list",
        name: "PlanList",
        component: () => import("@/components/plan/PlanList"),
      },

      {
        path: "detail",
        name: "PlanDetail",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/plan/PlanDetail"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

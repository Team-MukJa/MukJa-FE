import Vue from "vue";
import VueRouter from "vue-router";
import AppUser from "@/views/AppUser";
import AppMain from "@/views/AppMain";

import UserLogin from "@/components/user/UserLogin.vue";
import UserJoin from "@/components/user/UserJoin.vue";

// components
// import MyUserDetail from "@/components/mypage/MyUserDetail";
// import MyReview from "@/components/mypage/MyReview";
// import MyPlan from "@/components/mypage/MyPlan";
// import MyHotPlace from "@/components/mypage/MyHotPlace";
// import MyNotice from "@/components/mypage/MyNotice";

Vue.use(VueRouter);

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
        component: UserLogin,
      },

      {
        path: "join",
        name: "UserJoin",
        component: UserJoin,
      },
    ],
  },
  // {
  //   path: "/my",
  //   component: AppMyPage,
  //   children: [
  //     {
  //       path: "user/:userid",
  //       name: "MyUserDetail",
  //       component: MyUserDetail,
  //     },
  //     {
  //       path: "review/:userid",
  //       name: "MyReview",
  //       component: MyReview,
  //     },
  //     {
  //       path: "plan/:userid",
  //       name: "MyPlan",
  //       component: MyPlan,
  //     },
  //     {
  //       path: "place/:userid",
  //       name: "MyHotPlace",
  //       component: MyHotPlace,
  //     },
  //     {
  //       path: "notice/:userid",
  //       name: "MyNotice",
  //       component: MyNotice,
  //     },
  //   ],
  // },
  //notice
  // {
  //   path: "/notices",
  //   name: "notices",
  //   component: () => import("@/views/AppNotice"),
  //   redirect: "/notices/list",
  //   children: [
  //     {
  //       path: "list",
  //       name: "noticelist",
  //       component: () => import("@/components/notice/NoticeList"),
  //     },
  //     {
  //       path: "write",
  //       name: "noticewrite",
  //       // beforeEnter: onlyAuthUser,
  //       component: () => import("@/components/notice/NoticeWrite"),
  //     },
  //     {
  //       path: "view/:articleno",
  //       name: "noticeview",
  //       component: () => import("@/components/notice/NoticeView"),
  //     },
  //     {
  //       path: "modify/:articleno",
  //       name: "noticemodify",
  //       // beforeEnter: onlyAuthUser,
  //       component: () => import("@/components/notice/NoticeModify"),
  //     },
  //     {
  //       path: "delete/:articleno",
  //       name: "noticedelete",
  //       // beforeEnter: onlyAuthUser,
  //       component: () => import("@/components/notice/NoticeDelete"),
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

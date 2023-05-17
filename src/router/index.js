import Vue from "vue";
import VueRouter from "vue-router";
import AppUser from "@/views/AppUser";
import AppMyPage from "@/views/AppMyPage";
import AppMain from "@/views/AppMain";

// components
import UserLogin from "@/components/user/UserLogin.vue";
import UserJoin from "@/components/user/UserJoin.vue";

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
  {
    path: "/my",
    component: AppMyPage,
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
        path: "view/:noticeid",
        name: "noticeview",
        component: () => import("@/components/notice/NoticeView"),
      },
      {
        path: "modify/:noticeid",
        name: "noticemodify",
        // beforeEnter: onlyAuthUser,
        component: () => import("@/components/notice/NoticeModify"),
      },
      {
        path: "delete/:noticeid",
        name: "noticedelete",
        // beforeEnter: onlyAuthUser,
        component: () => import("@/components/notice/NoticeDelete"),
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

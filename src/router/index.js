import Vue from "vue";
import VueRouter from "vue-router";
import AppUser from "@/views/AppUser";
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import { createPlanner } from "@/api/lib/plan";

const planStore = {
  namespaced: true,
  state: {
    plan: null,
  },
  getters: {},
  mutations: {
    CREATE_PLAN(state, plan) {
      state.plan = plan;
    },
  },
  actions: {
    createPlan: ({ commit }, plan) => {
      console.log(plan);
      createPlanner(
        plan,
        ({ data }) => {
          commit("CREATE_PLAN", data);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default planStore;

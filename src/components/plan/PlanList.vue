<template>
  <div class="plan-container">
    <div class="page-header">
      <h2 class="page-title text-center">여행 계획 리스트</h2>
      <b-button id="regist-button" class="ml-auto" variant="primary" @click="openModal"
        >글 작성</b-button
      >
    </div>
    <hr />

    <div class="row">
      <div class="col-md-6" v-for="plan in plans" :key="plan.id">
        <b-card class="plan-card" @click="goToDetailPage(plan.planId)">
          <h4 class="card-title">{{ plan.subject }}</h4>
          <b-card-text>{{ plan.content }}</b-card-text>
          <div class="d-flex justify-content-between">
            <div v-for="image in plan.representativeImage" :key="image">
              <img :src="image" alt="여행 사진" class="img-thumbnail" />
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <!-- 모달 추가 -->
    <b-modal v-model="modalOpen" title="여행 계획 작성" @ok="submitForm" @cancel="closeModal">
      <b-form>
        <b-form-group label="여행 제목" label-for="title-input">
          <b-form-input id="title-input" v-model="plan.subject" required></b-form-input>
        </b-form-group>
        <!-- <b-form-group label="작성자" label-for="userId-input">
          <b-form-input id="user-input" v-model="plan.userId" required></b-form-input>
        </b-form-group> -->
        <div class="form-row">
          <div class="col">
            <b-form-group label="여행 시작일" label-for="start-date-picker">
              <b-form-datepicker
                id="start-date-picker"
                v-model="plan.startDate"
                required
              ></b-form-datepicker>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group label="여행 종료일" label-for="end-date-picker">
              <b-form-datepicker
                id="end-date-picker"
                v-model="plan.endDate"
                required
              ></b-form-datepicker>
            </b-form-group>
          </div>
        </div>

        <b-form-group label="여행 내용" label-for="content-input">
          <b-form-textarea id="content-input" v-model="plan.content" required></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { getPlans } from "@/api/plan";
const planStore = "planStore";
const memberStore = "memberStore";

export default {
  name: "PlanList",
  data() {
    return {
      modalOpen: false,
      plan: {
        userId: "",
        subject: "",
        content: "",
        startDate: null,
        endDate: null,
      },
      plans: [],
    };
  },
  created() {
    getPlans(
      ({ data }) => {
        console.log(data);
        this.plans = data;
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.userInfo) {
      this.plan.userId = this.userInfo.userId;
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(planStore, ["createPlan"]),
    openModal() {
      if (!this.userInfo) alert("로그인을 해야될까?");
      else {
        // this.plan = this.userInfo.userId;
        this.modalOpen = true;
      }
    },
    closeModal() {
      this.modalOpen = false;
    },
    submitForm() {
      // 서버쪽으로 입력 값 보내기
      console.log(this.plan.fDate, "여행 계획이 저장되었습니다.");

      this.createPlan(this.plan);

      // var currentDate = new Date(this.startDate);
      // var datesInRange = [];
      // var endFormatDate = new Date(this.endDate);
      // while (currentDate <= endFormatDate) {
      //   var formattedDate = currentDate.toISOString().split("T")[0];
      //   datesInRange.push(formattedDate);
      //   currentDate.setDate(currentDate.getDate() + 1);
      // }
      // console.log(datesInRange);

      this.modalOpen = false; // 저장 후 모달을 닫습니다.
      this.$router.push({ name: "PlanRegist" });
    },
    goToDetailPage(planId) {
      // 상세보기 페이지로 이동하는 로직을 추가하세요.
      console.log(`Go to detail page for planId: ${planId}`);
      this.$router.push({ name: "PlanDetail", params: { planid: planId } });
    },
  },
};
</script>

<style scoped>
.plan-container {
  margin: 30px;
  width: 1200px;
  height: 85%;
  background-color: whitesmoke;
  border-radius: 10px; /* 테두리 둥글게 조정 */
}
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  text-align: center;
  margin: 30px;
}

.page-title {
  font-family: "Arial", sans-serif;
  font-size: 24px;
}

#regist-button {
  background-color: #f8a5c2;
  border-color: #f8a5c2;
  color: #ffffff;
}
#regist-button:hover,
#regist-button:focus,
#regist-button:active {
  background-color: #e26893;
  border-color: #e26893;
  color: #000000;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
}

.plan-card {
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.img-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.col-md-6:not(:last-child) {
  border-right: 1px solid #ccc;
}
</style>

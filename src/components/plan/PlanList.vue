<template>
  <div class="plan-container">
    <b-button
      id="regist-button"
      class="ml-auto"
      variant="primary"
      @click="openModal"
      >글 작성</b-button
    >
    <hr />

    <div class="row">
      <div class="col-md-6" v-for="plan in plans" :key="plan.id">
        <b-card class="plan-card" @click="goToDetailPage(plan.planId)">
          <h4 class="card-title">{{ plan.subject }}</h4>
          <b-card-text class="card-text">{{
            truncateText(plan.content, 30)
          }}</b-card-text>
          <div class="d-flex justify-content-between image-container">
            <div
              v-for="image in plan.representativeImage"
              :key="image"
              class="image-wrapper"
            >
              <div class="image-hover">
                <img :src="image" alt="여행 사진" class="img-thumbnail" />
              </div>
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <!-- 모달 추가 -->
    <b-modal
      v-model="modalOpen"
      title="여행 계획 작성"
      @ok="submitForm"
      @cancel="closeModal"
    >
      <b-form>
        <b-form-group label="여행 제목" label-for="title-input">
          <b-form-input
            id="title-input"
            v-model="plan.subject"
            required
          ></b-form-input>
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
          <b-form-textarea
            id="content-input"
            v-model="plan.content"
            required
          ></b-form-textarea>
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

    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.substring(0, maxLength) + "...";
      }
    },
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
  width: 150vh;
  max-height: 80vh;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.plan-container::-webkit-scrollbar {
  width: 8px;
}

.plan-container::-webkit-scrollbar-track {
  background-color: #f6f6f6;
}

.plan-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.plan-container::-webkit-scrollbar-thumb:hover {
  background-color: #999;
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
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
}

#regist-button {
  background-color: #343a40;
  border-color: #343a40;
  color: #ffffff;
}

#regist-button:hover,
#regist-button:focus,
#regist-button:active {
  background-color: #1d2124;
  border-color: #1d2124;
  color: #ffffff;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
}

.plan-card {
  margin: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  background-color: #ffffff;
  transition: box-shadow 0.3s;
}

.plan-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
}

.card-text {
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
}

.image-wrapper {
  margin-right: 1px;
  border: none !important;
  position: relative;
}

.image-hover {
  position: relative;
  overflow: hidden;
}

.image-hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}

.image-hover:hover::before {
  opacity: 1;
}

.image-hover:hover .img-thumbnail {
  transform: scale(1.1);
}
.img-thumbnail {
  width: 200px; /* Adjust image width */
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s; /* margin-bottom: 0; - */
}

.col-md-6:not(:last-child) {
  border-right: 1px solid #e5e5e5;
}

.b-modal .modal-dialog {
  margin-top: 10vh;
}
</style>

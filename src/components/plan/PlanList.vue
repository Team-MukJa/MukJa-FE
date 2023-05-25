<template>
  <div>
    <div class="backg"></div>
    <div class="plan-container">
      <div class="page-header">
        <h2 class="page-title text-center">NangMan Plan</h2>
        <b-button id="regist-button" class="ml-auto" variant="primary" @click="openModal">계획 세워보기</b-button>
      </div>
      <hr />

      <div class="row">
        <div class="col-md-6" v-for="plan in plans" :key="plan.id">
          <b-card class="plan-card" @click="goToDetailPage(plan.planId)">
            <h4 class="card-title">{{ plan.subject }}</h4>
            <b-card-text class="card-text">{{ truncateText(plan.content, 30) }}</b-card-text>
            <div class="d-flex justify-content-between">
              <div v-for="image in plan.representativeImage" :key="image">
                <img :src="image" alt="여행지 사진" class="img-thumbnail" />
              </div>
            </div>
          </b-card>
        </div>
      </div>

      <!-- 모달 추가 -->
      <b-modal v-model="modalOpen" title="낭만 계획 작성" @ok="submitForm" @cancel="closeModal" hide-footer>
        <b-form>
          <b-form-group label="계획을 한마디로 표현해보세요." label-for="title-input">
            <b-form-input id="title-input" v-model="plan.subject" required></b-form-input>
          </b-form-group>
          <div class="form-row">
            <div class="col">
              <b-form-group label="가는 날" label-for="start-date-picker">
                <b-form-datepicker id="start-date-picker" v-model="plan.startDate" required></b-form-datepicker>
              </b-form-group>
            </div>
            <div class="col">
              <b-form-group label="오는 날" label-for="end-date-picker">
                <b-form-datepicker id="end-date-picker" v-model="plan.endDate" required></b-form-datepicker>
              </b-form-group>
            </div>
          </div>
          <b-form-group label="어떤 여행인지 기록해보세요." label-for="content-input">
            <b-form-textarea id="content-input" v-model="plan.content" required></b-form-textarea>
          </b-form-group>

          <div class="modal-footer">
            <b-button variant="primary"
              style="background-color: rgb(253, 186, 186); border-color: rgb(253, 186, 186); color: #000000;"
              @click="submitForm">계획 세우러가기</b-button>
            <b-button variant="secondary" @click="closeModal">취소</b-button>
          </div>
        </b-form>
      </b-modal>
    </div>
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
      if (!this.userInfo) alert("로그인해야 이용 가능합니다.");
      else {
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
.backg {
  z-index: -1;
  background-image: url('../../assets/paper.png');
  background-size: 1500px 850px;
  background-position: center;
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}

.plan-container {
  margin-top: 60px;
  width: 100vb;
  max-height: 70vh;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.plan-container::-webkit-scrollbar {
  width: 5px;
}

.plan-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
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
  font-family: 'MYYeongnamnu',
    sans-serif;
  font-size: 40px;
  color: rgb(253, 131, 131);
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

#regist-button {
  margin-top: 10px;
  background-color: rgb(253, 186, 186);
  border-color: rgb(253, 186, 186);
  color: #000000;
}

#regist-button:hover,
#regist-button:focus,
#regist-button:active {
  background-color: rgb(253, 131, 131);
  border-color: rgb(253, 131, 131);
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

.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* 표시할 줄 수 */
  -webkit-box-orient: vertical;
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

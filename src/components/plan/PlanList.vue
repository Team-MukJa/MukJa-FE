<template>
  <div>
    <div class="page-header">
      <h2 class="page-title text-center">여행 계획 리스트</h2>
      <b-button class="ml-auto" variant="primary" @click="openModal">글 작성</b-button>
    </div>
    <hr />

    <div class="row">
      <div class="col-md-6" v-for="plan in plans" :key="plan.id">
        <b-card class="plan-card" @click="goToDetailPage(plan.id)">
          <h4 class="card-title">{{ plan.title }}</h4>
          <b-card-text>{{ plan.content }}</b-card-text>
          <div class="d-flex justify-content-between">
            <div v-for="image in plan.images" :key="image.id">
              <img :src="image.url" alt="여행 사진" class="img-thumbnail" />
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <!-- 모달 추가 -->
    <b-modal v-model="modalOpen" title="여행 계획 작성" @ok="submitForm" @cancel="closeModal">
      <b-form>
        <b-form-group label="여행 제목" label-for="title-input">
          <b-form-input id="title-input" v-model="title" required></b-form-input>
        </b-form-group>

        <div class="form-row">
          <div class="col">
            <b-form-group label="여행 시작일" label-for="start-date-picker">
              <b-form-datepicker
                id="start-date-picker"
                v-model="startDate"
                required
              ></b-form-datepicker>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group label="여행 종료일" label-for="end-date-picker">
              <b-form-datepicker
                id="end-date-picker"
                v-model="endDate"
                required
              ></b-form-datepicker>
            </b-form-group>
          </div>
        </div>

        <b-form-group label="여행 내용" label-for="content-input">
          <b-form-textarea id="content-input" v-model="content" required></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
      title: "",
      content: "",
      startDate: null,
      endDate: null,
      plans: [
        {
          id: 1,
          title: "여행 계획 1",
          content: "여행 계획 1의 내용입니다.",
          images: [
            { id: 1, url: "image1.jpg" },
            { id: 2, url: "image2.jpg" },
            { id: 3, url: "image3.jpg" },
            { id: 4, url: "image4.jpg" },
          ],
        },
        {
          id: 2,
          title: "여행 계획2",
          content: "여행 계획 2의 내용입니다.",
          images: [
            { id: 5, url: "image5.jpg" },
            { id: 6, url: "image6.jpg" },
            { id: 7, url: "image7.jpg" },
            { id: 8, url: "image8.jpg" },
          ],
        },
        // 다른 여행 계획들을 추가할 수 있습니다.
      ],
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    submitForm() {
      // 여행 계획을 저장하는 로직을 추가하세요.
      // this.title, this.content, this.startDate, this.endDate 값을 활용합니다.
      console.log("여행 계획이 저장되었습니다.");
      this.modalOpen = false; // 저장 후 모달을 닫습니다.
      this.$router.push({ name: "PlanRegist" });
    },
    goToDetailPage(planId) {
      // 상세보기 페이지로 이동하는 로직을 추가하세요.
      console.log(`Go to detail page for planId: ${planId}`);
      this.$router.push({ name: "PlanDetail" });
    },
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.page-title {
  font-family: "Arial", sans-serif;
  font-size: 24px;
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

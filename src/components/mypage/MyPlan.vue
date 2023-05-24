<template>
    <div>
        <div v-for="(plan, index) in myPlan" :key="plan.planId">
            <template v-if="index % 2 === 0">
                <div class="card-wrapper">
                    <div class="card-row">
                        <b-card class="plan-card" @click="goToDetailPage(plan.planId)">
                            <h4 class="card-title">{{ plan.subject }}</h4>
                            <b-card-text>{{ plan.content }}</b-card-text>
                            <div class="d-flex justify-content-between">
                                <div v-for="image in plan.representativeImage" :key="image.id">
                                    <img :src="image" alt="여행 사진" class="img-thumbnail" />
                                </div>
                            </div>
                        </b-card>
                        <b-card v-if="myPlan[index + 1]" class="plan-card" @click="goToDetailPage(plan.planId)">
                            <h4 class="card-title">{{ plan.subject }}</h4>
                            <b-card-text>{{ plan.content }}</b-card-text>
                            <div class="d-flex justify-content-between">
                                <div v-for="image in plan.representativeImage" :key="image.id">
                                    <img :src="image" alt="여행 사진" class="img-thumbnail" />
                                </div>
                            </div>
                        </b-card>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyPlan',
    components: {},
    props: {
        myPlan: Array,
    },
    data() {
        return {
            message: 'MyPlan',
        };
    },
    created() { },
    methods: {
        goToDetailPage(planId) {
            // 상세보기 페이지로 이동하는 로직을 추가하세요.
            console.log(`Go to detail page for planId: ${planId}`);
            this.$router.push({ name: "PlanDetail" });
        },
    },
};
</script>

<style scoped>
.card-wrapper {
    margin-bottom: 20px;
}

.card-row {
    display: flex;
    justify-content: space-between;
}

.plan-card {
    width: 46%;
    margin-left: 2%;
    margin-right: 2%;
}

img {
    width: 150px;
}
</style>
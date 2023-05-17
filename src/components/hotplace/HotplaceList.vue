<template>
  <div class="container">
    <h1>핫플레이스 목록</h1>
    <div class="card-deck">
      <b-card v-for="post in posts" :key="post.id" class="mb-4">
        <img :src="post.image" class="card-img-top" alt="Post Image" />
        <b-card-body>
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
        </b-card-body>
        <b-card-footer>
          <small class="text-muted">{{ post.date }}</small>
        </b-card-footer>
      </b-card>
    </div>
    <div class="text-center mt-4">
      <b-button variant="primary" @click="movePlaceWrite">핫플레이스 작성</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    let temp = [
      {
        id: 1,
        title: "게시글 제목 1",
        content: "게시글 내용 1",
        image: "https://placeimg.com/300/200/arch",
        date: "2023-05-17",
      },
      {
        id: 2,
        title: "게시글 제목 2",
        content: "게시글 내용 2",
        image: "https://placeimg.com/300/200/nature",
        date: "2023-05-16",
      },
      {
        id: 3,
        title: "게시글 제목 3",
        content: "게시글 내용 3",
        image: "https://placeimg.com/300/200/tech",
        date: "2023-05-15",
      },
    ];
    this.posts = temp;
  },
  methods: {
    movePlaceWrite() {
      this.$router.push({ name: "placewrite" });
    },
  },
};
</script>

<style>
.card-deck {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.card {
  flex: 1 0 33.33333%;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
}
.card-img-top {
  border-radius: 10px 10px 0 0;
}
</style>

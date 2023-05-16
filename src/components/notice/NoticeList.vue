<template>
  <div class="main-container">
    <div class="table-container">
      <b-table
        class="table"
        striped
        hover
        :items="posts"
        :fields="fields"
        @row-clicked="viewPost"
        responsive
      >
        <template #cell(id)="row">
          {{ row.value }}
        </template>
      </b-table>
    </div>
    <div class="button-container">
      <b-button class="create-button" variant="primary" @click="goToCreatePost">글 작성</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "번호", sortable: true },
        { key: "title", label: "제목", sortable: true },
        { key: "author", label: "작성자", sortable: true },
        { key: "views", label: "조회수", sortable: true },
        { key: "timestamp", label: "작성 시간", sortable: true },
      ],
      posts: [
        {
          id: 1,
          title: "첫 번째 공지사항",
          author: "작성자1",
          views: 120,
          timestamp: "2023-05-15 10:30:00",
        },
        {
          id: 2,
          title: "두 번째 공지사항",
          author: "작성자2",
          views: 98,
          timestamp: "2023-05-14 15:45:00",
        },
        {
          id: 3,
          title: "세 번째 공지사항",
          author: "작성자3",
          views: 45,
          timestamp: "2023-05-13 09:20:00",
        },
      ],
    };
  },
  methods: {
    viewPost() {
      // 게시물 상세보기로 이동하는 메소드를 구현하세요
    },
    goToCreatePost() {
      // 글 작성 페이지로 이동하는 메소드를 구현하세요
    },
  },
};
</script>

<style scoped>
.main-container {
  margin: 20px;
  font-family: "Arial", sans-serif;
}

.table-container {
  overflow-x: auto;
}

.table {
  font-size: 14px;
}

.b-table th,
.b-table td {
  vertical-align: middle;
}

.b-table th {
  font-weight: bold;
  background-color: #f5f5f5;
  color: #333333;
  border-color: #dddddd;
}

.b-table td {
  background-color: #ffffff;
  color: #333333;
  border-color: #dddddd;
}

.b-table tbody tr:hover {
  background-color: #f8f8f8;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.create-button {
  font-weight: bold;
}
</style>

<!-- <template>
  <div>
    <h2>게시판</h2>
    <b-table striped hover :items="posts">
      <template #cell(id)="data">
        {{ data.value }}
      </template>
      <template #cell(title)="data">
        <b-link @click="viewPost(data.item)">{{ data.value }}</b-link>
      </template>
      <template #cell(views)="data">
        <b-badge variant="secondary">{{ data.value }}</b-badge>
      </template>
    </b-table>
  </div>
</template>

<script>
import { BTable, BLink, BBadge } from "bootstrap-vue";

export default {
  components: {
    BTable,
    BLink,
    BBadge,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "첫 번째 게시물",
          author: "작성자1",
          views: 10,
          timestamp: "2023-05-15 10:30:00",
        },
        {
          id: 2,
          title: "두 번째 게시물",
          author: "작성자2",
          views: 5,
          timestamp: "2023-05-14 15:45:00",
        },
        // 다른 게시물 데이터도 추가할 수 있습니다.
      ],
    };
  },
  methods: {
    viewPost(post) {
      // 게시물 보기 동작을 수행하는 로직을 추가할 수 있습니다.
      console.log("게시물 보기:", post);
    },
  },
};
</script>

<style>
/* 추가적인 스타일링을 할 수 있습니다. */
</style> -->

<!-- <template>
  <div>
    <h1 class="underline">도서 목록</h1>
    <div style="text-align: right">
      <button @click="movePage">도서 등록</button>
    </div>
    <div v-if="articles.length">
      <table id="article-list">
        <colgroup>
          <col style="width: 5%" />
          <col style="width: 65%" />
          <col style="width: 10%" />
          <col style="width: 5%" />
          <col style="width: 15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <notice-list-item
            v-for="article in articles"
            :key="article.articleno"
            :article="article"
          ></notice-list-item>
        </tbody>
      </table>
    </div>
    <div class="text-center" v-else>게시글이 없습니다.</div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import NoticeListItem from "@/components/notice/NoticeListItem";

export default {
  name: "NoticeList",
  components: {
    NoticeListItem,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.

    // axios
    // http.get("/notice").then((response) => {
    //   console.log(response.data);
    //   this.articles = response.data;
    // });

    http.get("/notices").then(({ data }) => {
      console.log(data);
      this.articles = data;
    });
  },
  methods: {
    movePage() {
      this.$router.push({ name: "noticewrite" });
    },
  },
};
</script>

<style></style> -->

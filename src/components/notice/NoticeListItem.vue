<template>
  <tr>
    <td>{{ article.noticeId }}</td>
    <td>
      <router-link :to="{ name: 'noticeview', params: { noticeid: article.noticeId } }">
        {{ article.subject }}
      </router-link>
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.registerTime }}</td>
  </tr>
</template>

<script>
export default {
  name: "NoticeListItem",
  props: {
    article: Object,
  },
};
</script>

<style></style>

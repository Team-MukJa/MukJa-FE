<template>
  <div
    style="
       {
        border-color: black;
        border-width: 10;
      }
    "
  >
    <div><img src="@/assets/logo.png" /></div>
    <div>
      <!-- <router-link :to="{ name: 'boardview', params: { articleno: article.articleno } }"> -->
      {{ item.subject }}
      <!-- </router-link> -->
    </div>
    <div>{{ item.userId }}</div>
    <div>{{ item.hit }}</div>
    <div>{{ item.registerTime }}</div>
  </div>
</template>

<script>
export default {
  name: "BoardListItem",
  props: {
    item: Object,
  },
};
</script>

<style></style>

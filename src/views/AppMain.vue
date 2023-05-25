<template>
  <div>
    <section
      v-for="(section, index) in sections"
      :key="index"
      class="section section-announcement theme-dark"
      data-analytics-section-engagement="name:announcement hero"
      style="display: flex; height: 33vh; width: 100%; background-color: #000000; color: #ffffff"
    >
      <div
        class="section-content"
        style="flex: 1; display: flex; align-items: center; justify-content: center"
      >
        <h2 class="typography-hero-product-headline large-10 medium-12 small-12 large-centered">
          {{ section.title }}
        </h2>
        <button class="button">예쁜 버튼</button>
      </div>
      <p
        class="typography-body"
        style="flex: 1; display: flex; align-items: center; justify-content: center"
      >
        <a
          href="/105/media/kr/macbook-pro-14-and-16/2022/1baf5961-c793-48e7-9efd-0d23cac1e101/films/product/macbook-pro-14-and-16-product-tpl-kr-2022_16x9.m3u8"
          data-analytics-intrapage-link=""
        >
          <span class="icon-copy">발표 동영상 보기</span
          ><span class="icon icon-after icon icon-playsolid"></span>
        </a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [{ title: "첫 번째 섹션" }, { title: "두 번째 섹션" }, { title: "세 번째 섹션" }],
    };
  },
};
</script>

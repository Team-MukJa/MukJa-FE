<template>
  <div class="destination-info">
    <div class="destination-image">
      <img
        :src="spotInfo.img"
        alt="Destination Image"
        class="rounded img-fluid"
      />
    </div>
    <div class="destination-details">
      <h3 class="destination-title">{{ spotInfo.subject }}</h3>
      <div class="destination-divider"></div>
      <button
        @click="toggleDescription"
        class="custom-button"
        :class="{ 'button-visible': isDescriptionVisible }"
      >
        {{ isDescriptionVisible ? "숨기기" : "내용보기" }}
      </button>
      <div
        v-show="isDescriptionVisible"
        class="destination-description-wrapper"
      >
        <p class="destination-description text-center">
          {{ spotInfo.content }}
        </p>
      </div>
      <div class="destination-divider"></div>
      <p class="destination-address text-center">
        <strong>주소:</strong> {{ spotInfo.addr }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.destination-info {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
}

.destination-image {
  max-width: 250px;
  height: auto;
  text-align: center;
  margin-bottom: 10px;
  overflow: hidden;
}

.destination-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}

.destination-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.destination-divider {
  height: 2px;
  background-color: #dddddd;
  margin-bottom: 10px;
}

.custom-button {
  background-color: transparent;
  border: none;
  color: #000000;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.custom-button:hover {
  color: #333333;
}

.button-visible {
  background-color: transparent;
  width: 120px;
}

.button-visible:hover {
  background-color: transparent;
  color: #333333;
}

.destination-details {
  height: 200px; /* 원하는 크기로 조정해주세요 */
  overflow: hidden;
  text-align: center;
  overflow-y: auto;
}

.destination-description-wrapper {
  max-height: 300px;
  overflow: hidden;
  transition: max-height 0.3s;
}

.destination-description {
  margin-bottom: 10px;
  text-align: center;
  line-height: 1.5;
  font-size: 10px;
}

.destination-address {
  margin-bottom: 0;
  text-align: center;
}
</style>

<script>
export default {
  props: {
    spotInfo: Object,
  },
  data() {
    return {
      isDescriptionVisible: false,
    };
  },
  methods: {
    toggleDescription() {
      this.isDescriptionVisible = !this.isDescriptionVisible;
    },
  },
};
</script>

<template>
  <v-app id="inspire">
    <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-toolbar-title>MukJa</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dog</v-icon>
      </v-btn>

      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="#" size="48">
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <!-- <v-avatar color="brown">
                <span class="white--text text-h5">{{ members.userName }}</span>
              </v-avatar> -->
              <h3>{{ members.userId }}</h3>
              <p class="text-caption mt-1">
                {{ members.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> 마이 페이지 </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> 로그아웃 </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: "the-header",
  components: {},
  data() {
    return {
      members: {
        userId: "John Doe",
        email: "john.doe@doe.com",
      },
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>

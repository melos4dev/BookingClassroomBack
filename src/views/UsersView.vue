<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <Navbar />
    <v-container>
      <v-row>
          <v-col cols="12" sm="12">
            <br/>
            <H1>PROFESORES</H1>
            <br/>
            <UsersTableCrud />
          </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
// @ is an alias to /src
import SideBar from "@/components/SideBar.vue";
import Navbar from "@/components/NavBar.vue";
import UsersTableCrud from "@/components/users/UsersTableCrud.vue";

export default {
  data: () => ({

  }),

  components: {
    SideBar,
    Navbar,
    UsersTableCrud

  },
};
</script>
  
  
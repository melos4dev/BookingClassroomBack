<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <Navbar />
 
    <v-container>
      <br>
      <v-row justify="center" align="center" class="h-100">
          <v-col cols="12" sm="6" md="4" class="text-center">
            <div class="d-flex align-center justify-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/booking-classroom-app.appspot.com/o/project%2Flogo_horizontal_naranja.png?alt=media&token=30a071fd-6ef1-4751-b404-45df501913c5&_gl=1*1tqvsg8*_ga*MjEzMTU3Nzk4Ni4xNjgwMTk5NDcx*_ga_CW55HF8NVT*MTY4NTgwMzIzNC40Ny4xLjE2ODU4MTA0NDYuMC4wLjA." alt="Imagen" class="centered-image"/>
            </div>
          </v-col>
        </v-row>
    </v-container>  

 
  </v-app>
</template>

<style>
.centered-image {
  max-width: 175%;
  max-height: 175%;
}
</style>


<script>
// @ is an alias to /src
import SideBar from "@/components/SideBar.vue";
import Navbar from "@/components/NavBar.vue";


export default {
  data: () => ({

  }),

  components: {
    SideBar,
    Navbar,
   

  },
};
</script>


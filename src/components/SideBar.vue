<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    color="#F57C00"
    expand-on-hover
    mini-variant
    mini-variant-width="80"
  >
    <v-avatar class="d-block text-center mx-auto mt-4 mb-16" color="" size="75">
      <v-img src="https://firebasestorage.googleapis.com/v0/b/booking-classroom-app.appspot.com/o/project%2Fclip_fondo_naranja.png?alt=media&token=6e5f2737-39cf-4445-bd08-7bd06d309092&_gl=1*1ip3lnl*_ga*MjEzMTU3Nzk4Ni4xNjgwMTk5NDcx*_ga_CW55HF8NVT*MTY4NTgwMzIzNC40Ny4xLjE2ODU4MDQ3MTUuMC4wLjA."></v-img>
    </v-avatar>
    
   
    <v-list flat class="mt-16" justify-center>
      <v-list-item-group v-model="selectedItem" justify-center>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          tag="v-list-item"
          active-class="border"
          :ripple="false"
          @mouseover="selectedItem = i"
          @mouseleave="selectedItem = null"
          :class="{ hover: selectedItem === i }"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" :color="selectedItem === i ? 'white' : ''"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.text" class="ml-2"></v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <div
      style="
        position: absolute;
        bottom: 24px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      "
    >
      <v-icon class="mb-5" color="white">fas fa-cog</v-icon>
      <br />
      <v-icon color="white">fas fa-info-circle</v-icon>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { VListItem } from "vuetify/lib";

export default {
  data: () => ({
    selectedItem: null,
    drawer: null,
    items: [
      { icon: "mdi mdi-home", to: "/", text: "Home" },
      { icon: "mdi mdi-email", to: "/notifications", text: "Notificaciones" },
      { icon: "mdi mdi-alert", to: "/incidences", text: "Incidencias" },
      { icon: "mdi mdi-google-classroom", to: "/classrooms", text: "Aulas" },
      { icon: "mdi mdi-calendar-edit", to: "/bookings", text: "Reservas" },
      { icon: "mdi mdi-account-school", to: "/users", text: "Profesores" },
// Aqui metemos mas enlaces con sus iconos
    ],
  }),

  components: {
    VListItem,
  },
 
  
};
</script>

<style>

.v-list-item-group .v-list-item--active {
  color: white !important;
}

</style>







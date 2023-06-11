<template>
  <div>
    <v-app-bar
      color="#F57C00"
      dense
      dark
    >
      <v-toolbar-title>Booking Classroom</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="confirmDialogLogout = true">
        <v-icon>mdi-export</v-icon>
      </v-btn>
  
    </v-app-bar>

    <v-dialog v-model="confirmDialogLogout" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmar cierre de sesión</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas cerrar la sesión?
        </v-card-text>
        <v-card-actions>

          <v-btn color="error" text @click = "confirmDialogLogout = false">Cancelar</v-btn>
          <v-btn color="success" text @click="logout()">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Auth, signOut } from '@/config/firebase';
export default {

  data: () => ({
    confirmDialogLogout: false
  }),

  methods: {

    async logout() {
      try {
        await signOut(Auth)
        this.confirmDialogLogout = false
        this.$router.push("/login")
      } catch (error) {
        console.log(error)

      }
    }

  }

}
</script>
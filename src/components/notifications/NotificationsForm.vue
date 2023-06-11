<template>
  <v-card>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="subject" label="Asunto"></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field type="date" v-model="date" label="Fecha" placeholder="dd/mm/yyyy"></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea v-model="message" outlined name="input-7-4" label="Mensaje" value=""></v-textarea>
          </v-col>
        </v-row>
        <v-btn @click="save()" color="primary">Enviar</v-btn>
      </v-container>
    </v-form>

  </v-card>
</template>
  
<script>
import notificationsRepository from '@/repository/NotificationsRepository.js';
export default {

  data() {
    return {
      subject: '',
      date: '',
      message: ''
    };
  },
  methods: {
    async save() {
      const nuevoRegistro = {
        subject: this.subject,
        date: new Date(this.formatDate(this.date)),
        message: this.message,

      };

      try {
        await notificationsRepository.save(nuevoRegistro)
        this.$emit("createNotification")
      } catch (error) {
        console.log(error)
      }

      this.resetForm();
    },
    resetForm() {

      this.subject = '';
      this.date = '';
      this.message = '';
    },
    formatDate(fecha) {
      const fechaCompleta = fecha + "T00:00:00.000Z";
      return fechaCompleta;
    }
  }
};
</script>
<template>
  <v-card>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="classroomName" label="Nombre del Aula"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="classroomType" :items="tipos" :menu-props="{ maxHeight: '400' }" label="Tipo de aula"
              hint="Selecciona el tipo de aula" persistent-hint></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="floor" :items="plantas" :menu-props="{ maxHeight: '400' }" label="Planta"
              hint="Selecciona la planta del aula" persistent-hint></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="zone" :items="zonas" :menu-props="{ maxHeight: '400' }" label="Zona"
              hint="Selecciona la zona del aula" persistent-hint></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="emailUser" label="Profesor"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="studentGroup" label="Grupo alumnos"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field type="date" v-model="date" label="Fecha Reserva" placeholder="dd/mm/yyyy"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="hour" :items="horas" :menu-props="{ maxHeight: '400' }" label="Hora reserva"
              hint="Selecciona horas disponibles" persistent-hint></v-select>
          </v-col>
        </v-row>

        <br />
        <v-btn @click="save()" color="primary">Enviar</v-btn>

      </v-container>
    </v-form>

  </v-card>
</template>

<script>
import BookingsRepository from '@/repository/BookingsRepository.js';
export default {

  data() {
    return {
      classroomName: '',
      classroomType: [],
      zone: [],
      date: '',
      hour: '',
      floor: '',
      studentGroup: '',
      emailUser: '',
      horas: ['1ª', '2ª', '3ª', '4ª', '5ª', '6ª'],
      zonas: ['Zona 1', 'Zona 2', 'Zona 3', , 'Zona 4'],
      plantas : ['Planta calle', 'Planta 1', 'Planta 2'],
      tipos: ['Aula ordenadores', 'Carro ordenadores', 'Aula simple']
    };
  },
  methods: {
    async save() {
      const nuevoRegistro = {
        classroomName: this.classroomName,
        classroomType: this.classroomType,
        zone: this.zone,
        floor: this.floor,
        date: new Date(this.formatDate(this.date)),
        hour: this.hour,
        studentGroup: this.studentGroup,
        emailUser: this.emailUser,

      };

      try {
        await BookingsRepository.save(nuevoRegistro)
        this.$emit("bookingCreate")
      } catch (error) {
        console.log(error)
      }

      this.resetForm();
    },
    resetForm() {
      this.classroomName = '',
        this.classroomType = [],
        this.zone = [],
        this.floor = [],
        this.date = '',
        this.hour = '',
        this.studentGroup = '',
        this.emailUser = ''
    },
    formatDate(fecha) {
      const fechaCompleta = fecha + "T00:00:00.000Z";
      return fechaCompleta;
    }
  }
};
</script>
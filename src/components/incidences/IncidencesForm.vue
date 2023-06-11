<template>
  <v-card>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="classroomName" label="Aula"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="studentGroup" label="Grupo Alumnos"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field type="date" v-model="date" label="Fecha Incidencia" placeholder="dd/mm/yyyy"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="emailUser" label="Email Profesor"></v-text-field>
          </v-col> 
          <v-col cols="12" md="4">
              <v-text-field v-model="image" label="Imagen Incidencia"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-container class="px-0" fluid>
              <v-checkbox v-model="fixed" :label="`Solucionado`"></v-checkbox>
            </v-container>
          </v-col>
       
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-textarea v-model="description" outlined name="input-7-4" label="Descripción de la incidencia"
              value=""></v-textarea>
            </v-col>
  

        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-textarea v-model="response" outlined name="input-7-4" label="Solución de la incidencia"
              value=""></v-textarea>
          </v-col>
        </v-row>
        <v-btn @click="save()" color="primary">Enviar</v-btn>
      </v-container>
    </v-form>

  </v-card>
</template>

<script>
import incidencesRepository from '@/repository/IncidencesRepository';
export default {

  data() {
    return {
      classroomName: '',
      date: '',
      description: '',
      emailUser:'',
      image: '',
      response: '',
      studentGroup: '',
      fixed: false
    };
  },
  methods: {
    async save() {
      const nuevoRegistro = {
        classroomName: this.classroomName,
        date: new Date(this.formatDate(this.date)),
        description: this.description,
        image: this.image,
        response: this.response,
        studentGroup: this.studentGroup,
        fixed: this.fixed
      };

      try {
        await incidencesRepository.save(nuevoRegistro)
        this.$emit("incidenceCreate")
      } catch (error) {
        console.log(error)
      }

      this.resetForm();
    },
    resetForm() {

      this.classroomName = '';
      this.date = '';
      this.description = '';
      this.image = '';
      this.response = '';
      this.studentGroup = '';
      this.checkbox = false;
    },
    formatDate(fecha) {
      const fechaCompleta = fecha + "T00:00:00.000Z";
      return fechaCompleta;
    }
  }
};
</script>
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
          <v-col cols="12" md="12">
            <v-select v-model="monday" :items="horas" :menu-props="{ maxHeight: '400' }" label="Lunes" multiple
              hint="Selecciona horas disponibles" persistent-hint></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-select v-model="tuesday" :items="horas" :menu-props="{ maxHeight: '400' }" label="Martes" multiple
              hint="Selecciona horas disponibles" persistent-hint></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-select v-model="wednesday" :items="horas" :menu-props="{ maxHeight: '400' }" label="Miercoles" multiple
              hint="Selecciona horas disponibles" persistent-hint></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-select v-model="thursday" :items="horas" :menu-props="{ maxHeight: '400' }" label="Jueves" multiple
              hint="Selecciona horas disponibles" persistent-hint></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-select v-model="friday" :items="horas" :menu-props="{ maxHeight: '400' }" label="Viernes" multiple
              hint="Selecciona horas disponibles" persistent-hint></v-select>
          </v-col>
        </v-row>
        <br/>
        <v-btn @click="save()" color="primary">Enviar</v-btn>
 
      </v-container>
    </v-form>

  </v-card>
</template>

<script>
import classroomsRepository from '@/repository/ClassroomsRepository';
export default {

  data() {
    return {
      classroomName: '',
      classroomType: [],
      floor:[],
      zone: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
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
        floor:this.floor,
        zone: this.zone,
        monday: this.monday,
        tuesday: this.tuesday,
        wednesday: this.wednesday,
        thursday: this.thursday,
        friday: this.friday
      };

      try {
        await classroomsRepository.save(nuevoRegistro)
        this.$emit("classroomCreate")
      } catch (error) {
        console.log(error)
      }

      this.resetForm();
    },
    resetForm() {

      this.classroomName = '';
      this.floor = [];
      this.zone = [];
      this.classroomType = [];
      this.monday = [];
      this.tuesday = [];
      this.wednesday = [];
      this.thursday = [];
      this.friday = [];
    }
  }
};
</script>
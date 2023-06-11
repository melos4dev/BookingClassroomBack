<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            <div class="text-center">
                <v-btn class="mx-2" fab dark color="#F57C00" @click="dialogCreate = true">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="classrooms" :search="search" :dense="true">
            <template v-slot:item.actions="{ item }">
                <v-icon small color="blue" @click="openUpdateDialog(item)">mdi-pencil</v-icon>
                <v-icon small class="mr-2" color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="dialogUpdate">
            <v-card>
                <v-form>

                    <v-container>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="selectedItem && selectedItem.classroomName"
                                    label="Nombre del Aula"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-select v-model="selectedItem && selectedItem.classroomType" :items="tipos"
                                    :menu-props="{ maxHeight: '400' }" label="Tipo de aula"
                                    hint="Selecciona el tipo de aula" persistent-hint></v-select>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-select v-model="selectedItem && selectedItem.floor" :items="plantas"
                                    :menu-props="{ maxHeight: '400' }" label="Planta" hint="Selecciona la zona del aula"
                                    persistent-hint></v-select>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-select v-model="selectedItem && selectedItem.zone" :items="zonas"
                                    :menu-props="{ maxHeight: '400' }" label="Zona" hint="Selecciona la zona del aula"
                                    persistent-hint></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-select v-model="selectedItem && selectedItem.monday" :items="horas"
                                    :menu-props="{ maxHeight: '400' }" label="Lunes" multiple
                                    hint="Selecciona horas disponibles" persistent-hint></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-select v-model="selectedItem && selectedItem.tuesday" :items="horas"
                                    :menu-props="{ maxHeight: '400' }" label="Martes" multiple
                                    hint="Selecciona horas disponibles" persistent-hint></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-select v-model="selectedItem && selectedItem.wednesday" :items="horas"
                                    :menu-props="{ maxHeight: '400' }" label="Miercoles" multiple
                                    hint="Selecciona horas disponibles" persistent-hint></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-select v-model="selectedItem && selectedItem.thursday" :items="horas"
                                    :menu-props="{ maxHeight: '400' }" label="Jueves" multiple
                                    hint="Selecciona horas disponibles" persistent-hint></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-select v-model="selectedItem && selectedItem.friday" :items="horas"
                                    :menu-props="{ maxHeight: '400' }" label="Viernes" multiple
                                    hint="Selecciona horas disponibles" persistent-hint></v-select>
                            </v-col>
                        </v-row>
                        <br />
                        <v-btn @click="confirmUpdate(selectedItem)" color="primary">Enviar</v-btn>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCreate">
            <classroomsForm @classroomCreate=create />
        </v-dialog>

    </v-card>
</template>


<script>


import classroomsRepository from '@/repository/ClassroomsRepository';
import classroomsForm from '@/components/classrooms/ClassroomsForm.vue'


export default {
    data() {
        return {
            selectedItem: null,
            dialogUpdate: false,
            dialogCreate: false,
            search: '',
            headers: [
                {
                    text: 'Nombre del aula',
                    align: 'start',
                    //       filterable: false,
                    value: 'classroomName',
                },
                { text: 'Tipo de aula', value: 'classroomType' },
                { text: 'Planta', value:'floor'},
                { text: 'Zona', value: 'zone' },
                { text: 'Lunes', value: 'monday' },
                { text: 'Martes', value: 'tuesday' },
                { text: 'Miercoles', value: 'wednesday' },
                { text: 'Jueves', value: 'thursday' },
                { text: 'Viernes', value: 'friday' },
                { text: 'Acciones', value: 'actions' }

            ],
            classrooms: [
            ],
            horas: ['1ª', '2ª', '3ª', '4ª', '5ª', '6ª'],
            zonas: ['Zona 1', 'Zona 2', 'Zona 3', , 'Zona 4'],
            plantas : ['Planta calle', 'Planta 1', 'Planta 2'],
            tipos: ['Aula ordenadores', 'Carro ordenadores', 'Aula simple']
        }
    },
    created() {
        this.get()
    },

    components: {
        classroomsForm
    },

    methods: {

        async get() {
            try {

                this.classrooms = await classroomsRepository.getAll()
            }

            catch (error) {
                console.error(error)
            }
        },

        async delete(item) {

            try {
                await classroomsRepository.delete(item)
                this.get()
            }

            catch (error) {
                console.error(error)
            }

        },

        confirmDelete(item) {
            if (confirm("Estas seguro de eliminar")) {
                this.delete(item)
            }
        },

        async update(item) {
            try {
                await classroomsRepository.upDate(item)
                this.get()
            }

            catch (error) {
                console.error(error)
            }
        },

        confirmUpdate(item) {
            if (confirm("Estas seguro de actualizar")) {
                this.update(item)
                this.dialogUpdate = false
            }
        },
        openUpdateDialog(item) {
            this.selectedItem = { ...item }
            this.dialogUpdate = true
        },
        create() {
            this.dialogCreate = false
            this.get()
        }
    }
}
</script>
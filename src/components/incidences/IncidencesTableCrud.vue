<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            <!--         <div class="text-center">
                <v-btn class="mx-2" fab dark color="#F57C00" @click="dialogCreate = true">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </div>-->
        </v-card-title>
        <v-data-table :headers="headers" :items="incidences" :search="search" :dense="true">
            <template v-slot:item.image="{ item }">
                <a v-if="item.image !== ''" class="link-button" :href="item.image" target="_blank">
                    <span class="link-text">Ver imagen</span>
                </a>
                <span v-else class="link-text">No disponible</span>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small color="blue" @click="openUpdateDialog(item)">mdi-pencil</v-icon>
                <v-icon small class="mr-2" color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:item.date="{ item }">
                {{ formatDate(item.date) }}
            </template>


        </v-data-table>
        <v-dialog v-model="dialogUpdate">
            <v-card>
                <v-form>

                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="selectedItem && selectedItem.classroomName"
                                    label="Aula"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="selectedItem && selectedItem.studentGroup"
                                    label="Grupo Alumnos"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field type="date" v-model="formattedDateTextField" label="Fecha Incidencia">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="selectedItem && selectedItem.emailUser"
                                    label="Email Profesor"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="selectedItem && selectedItem.image"
                                    label="Imagen Incidencia"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-container class="px-0" fluid>
                                    <v-checkbox v-model="selectedItem && selectedItem.fixed"
                                        :label="`Solucionado`"></v-checkbox>
                                </v-container>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-textarea v-model="selectedItem && selectedItem.description" outlined name="input-7-4"
                                    label="Descripción de la incidencia" value=""></v-textarea>
                            </v-col>


                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-textarea v-model="selectedItem && selectedItem.response" outlined name="input-7-4"
                                    label="Solución de la incidencia" value=""></v-textarea>
                            </v-col>
                        </v-row>
                        <v-btn @click="confirmUpdate(selectedItem)" color="primary">Enviar</v-btn>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCreate">
            <incidencesForm @incidenceCreate=create />
        </v-dialog>

    </v-card>
</template>


<script>


import incidencesRepository from '@/repository/IncidencesRepository';
import incidencesForm from '@/components/incidences/IncidencesForm.vue'


export default {
    data() {
        return {
            selectedItem: null,
            dialogUpdate: false,
            dialogCreate: false,
            search: '',
            headers: [
                {
                    text: 'Aula',
                    align: 'start',
                    //       filterable: false,
                    value: 'classroomName',
                },
                { text: 'Fecha', value: 'date' },
                { text: 'Grupo', value: 'studentGroup' },
                { text: 'Profesor', value: 'emailUser' },
                { text: 'Descripcion', value: 'description' },
                { text: 'Imagen', value: 'image' },
                { text: 'Solucionado', value: 'fixed' },
                { text: 'Solución', value: 'response' },
                { text: 'Acciones', value: 'actions' }
            ],
            incidences: [
            ],
        }
    },
    created() {
        this.get()
    },
    computed: {
        formattedDateTextField: {
            get() {
                if (this.selectedItem && this.selectedItem.date) {
                    const dateObj = new Date(this.selectedItem.date.seconds * 1000);
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                    const day = String(dateObj.getDate()).padStart(2, "0");
                    return `${year}-${month}-${day}`;
                }
                return "";
            },
            set(value) {
                if (this.selectedItem) {
                    const parts = value.split("-");
                    const year = parseInt(parts[0]);
                    const month = parseInt(parts[1]) - 1;
                    const day = parseInt(parts[2]);
                    const date = new Date(year, month, day);
                    this.selectedItem.date = {
                        seconds: Math.floor(date.getTime() / 1000), // Convertir de milisegundos a segundos
                    };
                }
            },
        },
    },
    components: {
        incidencesForm
    },

    methods: {

        formatDate(timestamp) {
            const date = new Date(timestamp.seconds * 1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        async get() {
            try {

                this.incidences = await incidencesRepository.getAll()
            }

            catch (error) {
                console.error(error)
            }
        },

        async delete(item) {

            try {
                await incidencesRepository.delete(item)
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
            const data = {
                id: this.selectedItem.id,
                classroomName: this.selectedItem.classroomName,
                studentGroup: this.selectedItem.studentGroup,
                date: new Date(this.formattedDateTextField),
                emailUser: this.selectedItem.emailUser,
                description: this.selectedItem.description,
                image: this.selectedItem.image,
                fixed: this.selectedItem.fixed,
                response: this.selectedItem.response
            };
            try {
                await incidencesRepository.upDate(data)
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


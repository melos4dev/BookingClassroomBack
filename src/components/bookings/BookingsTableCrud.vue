<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
 <!--            <div class="text-center">
                <v-btn class="mx-2" fab dark color="#F57C00" @click="dialogCreate = true">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn> 
            </div>  -->
        </v-card-title>
        <v-data-table :headers="headers" :items="bookings" :search="search" :dense="true">
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
                            <v-col cols="12" md="3">
                                <v-text-field v-model="selectedItem && selectedItem.emailUser"
                                    label="Profesor"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="selectedItem && selectedItem.studentGroup"
                                    label="Grupo alumnos"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field type="date" v-model="formattedDateTextField" label="Fecha Reserva">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-select v-model="selectedItem && selectedItem.hour" :items="horas"
                                    :menu-props="{ maxHeight: '400' }" label="Hora reserva"
                                    hint="Selecciona horas disponibles" persistent-hint></v-select>
                            </v-col>
                        </v-row>
                        <v-btn @click="confirmUpdate(selectedItem)" color="primary">Enviar</v-btn>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCreate">
            <bookingsForm @bookingCreate=create />
        </v-dialog>

    </v-card>
</template>


<script>


import bookingsRepository from '@/repository/BookingsRepository';
import bookingsForm from '@/components/bookings/BookingsForm.vue'


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
                { text: 'Planta', value: 'floor' },
                { text: 'Zona', value: 'zone' },
                { text: 'Profesor', value: 'emailUser' },
                { text: 'Grupo alumnos', value: 'studentGroup' },
                { text: 'Fecha reserva', value: 'date' },
                { text: 'Hora reserva', value: 'hour' },
                { text: 'Acciones', value: 'actions' }

            ],
            bookings: [
            ],
            horas: ['1ª', '2ª', '3ª', '4ª', '5ª', '6ª'],
            zonas: ['Zona 1', 'Zona 2', 'Zona 3', 'Zona 4'],
            plantas: ['Planta calle', 'Planta 1', 'Planta 2'],
            tipos: ['Aula ordenadores', 'Carro ordenadores', 'Aula simple']
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
        bookingsForm
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

                this.bookings = await bookingsRepository.getAll()
            }

            catch (error) {
                console.error(error)
            }
        },

        async delete(item) {

            try {
                await bookingsRepository.delete(item)
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
                classroomType: this.selectedItem.classroomType,
                floor: this.selectedItem.floor,
                zone: this.selectedItem.zone,
                hour: this.selectedItem.hour
            };
            try {
                await bookingsRepository.upDate(data)
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
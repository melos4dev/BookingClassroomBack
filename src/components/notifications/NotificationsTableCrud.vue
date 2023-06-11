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
        <v-data-table :headers="headers" :items="notifications" :search="search">
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

                        <v-col cols="12" md="12">
                            <v-text-field v-model="selectedItem && selectedItem.subject" label="Asunto"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field type="date" v-model="formattedDateTextField" label="Fecha">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="12">
                            <v-textarea v-model="selectedItem && selectedItem.message" outlined name="input-7-4"
                                label="Mensaje" value=""></v-textarea>
                            <v-btn @click="confirmUpdate(selectedItem)" color="primary">Enviar</v-btn>
                        </v-col>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCreate">
            <notificationsForm @createNotification=create />
        </v-dialog>

    </v-card>
</template>


<script>


import notificationsRepository from '@/repository/NotificationsRepository.js';
import notificationsForm from '@/components/notifications/NotificationsForm.vue'


export default {
    data() {
        return {
            selectedItem: null,
            dialogUpdate: false,
            dialogCreate: false,
            search: '',
            headers: [
                {
                    text: 'Asunto',
                    align: 'start',
                    filterable: false,
                    value: 'subject',
                },
                { text: 'Fecha', value: 'date' },
                { text: 'Mensaje', value: 'message' },
                { text: 'Acciones', value: 'actions' }
            ],
            notifications: [
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
        notificationsForm
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

                this.notifications = await notificationsRepository.getAll()
            }

            catch (error) {
                console.error(error)
            }
        },

        async delete(item) {

            try {
                await notificationsRepository.delete(item)
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
                subject: this.selectedItem.subject,
                message: this.selectedItem.message,
                date: new Date(this.formattedDateTextField),
            };
            try {
                await notificationsRepository.upDate(data)
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
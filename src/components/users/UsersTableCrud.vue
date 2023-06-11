<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>

        </v-card-title>
        <v-data-table :headers="headers" :items="users" :search="search" :dense="true">
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
                            <v-col cols="12" md="6">
                                <v-text-field v-model="selectedItem && selectedItem.email"
                                    label="Email profesor"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="selectedItem && selectedItem.username"
                                    label="Nombre profesor"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="selectedItem && selectedItem.password"
                                    label="Contraseña" type="password"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-container class="px-0" fluid>
                                    <v-checkbox v-model="selectedItem && selectedItem.locked"
                                        :label="`Bloqueado`"></v-checkbox>
                                </v-container>
                            </v-col>
                        </v-row>

                        <v-btn @click="confirmUpdate(selectedItem)" color="primary">Enviar</v-btn>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </v-card>
</template>


<script>


import usersRepository from '@/repository/UsersRepository';



export default {
    data() {
        return {
            selectedItem: null,
            dialogUpdate: false,
            search: '',
            headers: [
                {
                    text: 'Email profesor',
                    align: 'start',
                    //       filterable: false,
                    value: 'email',
                },
      //          { text: 'Contraseña',value: 'password' },
                { text: 'Profesor', value: 'username' },
                { text: 'Bloqueado', value: 'locked' },
                { text: 'Acciones', value: 'actions' }

            ],
            users: [
            ],
           
        }
    },
    created() {
        this.get()
    },

    components: {

    },

    methods: {

        async get() {
            try {

                this.users = await usersRepository.getAll()
            }

            catch (error) {
                console.error(error)
            }
        },

        async delete(item) {

            try {
                await usersRepository.delete(item)
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
                await usersRepository.upDate(item)
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
        }
    }
}
</script>
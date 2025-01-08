<template>
    <div class="users-container" :class="{ 'dark-mode': isDarkMode }">
      <div class="header">
        <h1>Gestión de Usuarios</h1>
        <v-btn color="primary" @click="openModal">
          <i class="fas fa-plus"></i>
          Añadir Usuario
        </v-btn>
      </div>
  

      <div class="filters-container">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar por nombre..."
          single-line
          hide-details
          variant="outlined"
          density="comfortable"
          class="search-field"
        ></v-text-field>
        
        <v-select
          v-model="itemsPerPage"
          :items="[5, 10, 15, 20]"
          label="Items por página"
          variant="outlined"
          density="comfortable"
          hide-details
          class="items-per-page"
        ></v-select>
      </div>
  

      <v-card>
        <div class="table-responsive">
          <v-table fixed-header height="calc(100vh - 250px)">
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Nombre</th>
                <th class="text-left hide-sm">Usuario</th>
                <th class="text-left hide-xs">Email</th>
                <th class="text-left hide-md">Ciudad</th>
                <th class="text-left hide-sm">Empresa</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td class="hide-sm">{{ user.username }}</td>
                <td class="hide-xs">{{ user.email }}</td>
                <td class="hide-md">{{ user.address.city }}</td>
                <td class="hide-sm">{{ user.company.name }}</td>
                <td class="text-center">
                  <v-btn 
                    icon="mdi-pencil"
                    size="small"
                    color="info" 
                    class="mr-2"
                    variant="tonal"
                  >
                  </v-btn>
                  <v-btn 
                    icon="mdi-trash-can"
                    size="small"
                    color="error"
                    variant="tonal"
                  >
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
  

        <div class="pagination-container">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-card>
  

      <v-dialog v-model="showModal" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Añadir Nuevo Usuario</span>
          </v-card-title>
  
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newUser.name"
                      label="Nombre"
                      required
                      :rules="[v => !!v || 'Nombre es requerido']"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newUser.username"
                      label="Usuario"
                      required
                      :rules="[v => !!v || 'Usuario es requerido']"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newUser.email"
                      label="Email"
                      required
                      :rules="[
                        v => !!v || 'Email es requerido',
                        v => /.+@.+\..+/.test(v) || 'Email debe ser válido'
                      ]"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newUser.address.city"
                      label="Ciudad"
                      variant="outlined"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newUser.company.name"
                      label="Empresa"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="showModal = false">Cancelar</v-btn>
            <v-btn color="primary" @click="addUser" :disabled="!valid">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  
  const props = defineProps({
    isDarkMode: {
      type: Boolean,
      default: false
    }
  })
  
  const users = ref([])
  const showModal = ref(false)
  const valid = ref(false)
  const form = ref(null)
  
  const newUser = ref({
    name: '',
    username: '',
    email: '',
    address: {
      city: ''
    },
    company: {
      name: ''
    }
  })
  
  const search = ref('')
  const page = ref(1)
  const itemsPerPage = ref(10)
  

  const filteredUsers = computed(() => {
    return users.value.filter(user => 
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.username.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  

  const pageCount = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
  })
  

  const paginatedUsers = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredUsers.value.slice(start, end)
  })
  

  watch(search, () => {
    page.value = 1
  })
  

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      users.value = await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  

  const openModal = () => {
    showModal.value = true
    resetForm()
  }
  

  const resetForm = () => {
    newUser.value = {
      name: '',
      username: '',
      email: '',
      address: {
        city: ''
      },
      company: {
        name: ''
      }
    }
    if (form.value) {
      form.value.reset()
    }
  }
  

  const addUser = async () => {
    if (!valid.value) return
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(newUser.value),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await response.json()
      

      data.id = users.value.length + 1
      users.value.push(data)
      showModal.value = false
      resetForm()
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }
  
  onMounted(() => {
    fetchUsers()
  })
  </script>
  
  <style scoped>
  .users-container {
    padding: 1rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  

  @media (max-width: 1200px) {
    .hide-md {
      display: none;
    }
  }
  
  @media (max-width: 960px) {
    .hide-sm {
      display: none;
    }
  }
  
  @media (max-width: 600px) {
    .hide-xs {
      display: none;
    }
    
    .users-container {
      padding: 0.5rem;
    }

    .header {
      flex-direction: column;
      align-items: stretch;
    }

    .header h1 {
      text-align: center;
    }

    .v-btn {
      width: 100%;
    }
  }
  

  .v-btn {
    margin: 0 4px;
    transition: all 0.3s ease;
  }
  
  .v-btn:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
  

  :deep(.v-table) {
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  :deep(.v-table th) {
    font-weight: bold !important;
    background-color: rgba(0, 0, 0, 0.03);
  }
  
  .dark-mode :deep(.v-table th) {
    background-color: rgba(255, 255, 255, 0.05);
  }
  

  .dark-mode .v-btn.info {
    background-color: rgba(33, 150, 243, 0.2);
  }
  
  .dark-mode .v-btn.error {
    background-color: rgba(244, 67, 54, 0.2);
  }
  
  .v-table {
    max-height: calc(100vh - 250px);
  }
  
  .filters-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  
  .search-field {
    flex: 1;
    min-width: 200px;
  }
  
  .items-per-page {
    width: 150px;
  }
  
  .pagination-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background: white;
  }
  
  .dark-mode .pagination-container {
    background: #1E1E1E;
  }
  
  /* Ajustes responsivos */
  @media (max-width: 600px) {
    .filters-container {
      flex-direction: column;
    }
    
    .search-field,
    .items-per-page {
      width: 100%;
    }
  }
  </style>
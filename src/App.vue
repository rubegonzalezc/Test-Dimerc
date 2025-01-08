<template>
  <v-app :theme="isDarkMode ? 'dark' : 'light'">
    <div class="app-layout" :class="{ 'dark-mode': isDarkMode }">
      <Sidebar :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
      <v-main class="main-content" :class="{ 'dark-mode': isDarkMode }">
        <router-view :isDarkMode="isDarkMode" />
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode')
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.v-main {
  flex: 1;
  transition: background-color 0.3s ease;
}

/* Estilos para modo oscuro */
.dark-mode .v-main {
  background-color: #121212;
}

body.dark-mode {
  color: #fff;
}

.main-content {
  flex: 1;
  margin-left: 280px; /* Mismo ancho que el sidebar */
  transition: background-color 0.3s ease;
}

.main-content.dark-mode {
  background-color: #121212 !important;
}
</style>
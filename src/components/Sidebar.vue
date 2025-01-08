<template>
    <aside class="sidebar" :class="{ 'dark-mode': isDarkMode }">
      <div class="profile-section">
        <img src="https://www.dimerc.cl//skin/frontend/dimerc_office/b2b/images/logodimerc.png" alt="Logo" class="logo"/>
        <div class="profile-info">
          <img src="https://media.licdn.com/dms/image/v2/D4E03AQE1RYQTzes74g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722004027057?e=1741824000&v=beta&t=HgcxP3Gf7rS8Q4JdOIBosdR7bWQyyuV9yK1c_3vSZ_I" alt="Avatar" class="avatar"/>
          <div class="user-details">
            <h3>{{ userName }}</h3>
            <span class="role">{{ userRole }}</span>
          </div>
        </div>
      </div>
  
      <nav class="navigation">
        <router-link to="/" class="nav-item">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </router-link>
        <router-link to="/usuarios" class="nav-item">
          <i class="fas fa-users"></i>
          <span>Usuarios</span>
        </router-link>
        <router-link to="/fotos" class="nav-item">
          <i class="fas fa-images"></i>
          <span>Fotos</span>
        </router-link>
      </nav>
  
      <div class="bottom-section">
        <button class="theme-toggle" @click="$emit('toggle-dark-mode')">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          <span>{{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
        </button>
        <button class="logout-btn" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'

  defineProps({
    isDarkMode: {
      type: Boolean,
      default: false
    }
  })

  defineEmits(['toggle-dark-mode'])

  const userName = ref('Rubén González')
  const userRole = ref('Administrador')
  
  const handleLogout = () => {
    console.log('Cerrando sesión...')
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 280px;
    height: 100vh;
    background: linear-gradient(180deg, #2c3e50 0%, #3498db 100%);
    color: white;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow-y: auto;
  }
  
  .sidebar.dark-mode {
    background: linear-gradient(180deg, #1a1a1a 0%, #2c3e50 100%);
  }
  
  .profile-section,
  .navigation,
  .bottom-section {
    position: relative;
    z-index: 1;
  }
  
  .theme-toggle i {
    transition: transform 0.5s ease;
  }
  
  .dark-mode .theme-toggle i {
    transform: rotate(360deg);
  }
  
  .profile-section {
    margin-bottom: 2rem;
  }
  
  .logo {
    width: 200px;
    margin-bottom: 1.5rem;
  }
  
  .profile-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  
  .user-details h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  
  .role {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .navigation {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    text-decoration: none;
    color: white;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
  
  .nav-item i {
    font-size: 1.2rem;
  }
  
  .bottom-section {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .theme-toggle,
  .logout-btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .theme-toggle:hover,
  .logout-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .logout-btn {
    background: rgba(231, 76, 60, 0.2);
  }
  
  .logout-btn:hover {
    background: rgba(231, 76, 60, 0.3);
  }
  
  .router-link-active {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .router-link-active::before {
    content: '';
    position: absolute;
    left: -1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 70%;
    background: #fff;
    border-radius: 0 4px 4px 0;
  }
  

  .dark-mode .router-link-active {
    background: rgba(255, 255, 255, 0.1);
  }
  </style>
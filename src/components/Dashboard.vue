<template>
    <div class="dashboard" :class="{ 'dark-mode': isDarkMode }" style="margin: 1% 1% 1% 1%">
      <div class="stats-container">
        <div class="stat-card">
          <i class="fas fa-users stat-icon"></i>
          <div class="stat-info">
            <h3>Total Usuarios</h3>
            <span class="stat-number">{{ users.length }}</span>
          </div>
        </div>
  
        <div class="stat-card">
          <i class="fas fa-images stat-icon"></i>
          <div class="stat-info">
            <h3>Total Fotos</h3>
            <span class="stat-number">{{ photos.length }}</span>
          </div>
        </div>
  
        <div class="stat-card">
          <i class="fas fa-building stat-icon"></i>
          <div class="stat-info">
            <h3>Empresas</h3>
            <span class="stat-number">{{ uniqueCompanies.length }}</span>
          </div>
        </div>
  
        <div class="stat-card">
          <i class="fas fa-globe stat-icon"></i>
          <div class="stat-info">
            <h3>Ciudades</h3>
            <span class="stat-number">{{ uniqueCities.length }}</span>
          </div>
        </div>
      </div>
  
      <div class="recent-users">
        <h2>Usuarios Recientes</h2>
        <div class="users-grid">
          <div v-for="user in recentUsers" :key="user.id" class="user-card">
            <div class="user-info">
              <img :src="`https://ui-avatars.com/api/?name=${user.name}&background=random`" alt="Avatar" class="user-avatar">
              <div class="user-details">
                <h3>{{ user.name }}</h3>
                <p>{{ user.email }}</p>
                <span class="company-tag">{{ user.company.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="recent-photos">
        <h2>Fotos Recientes</h2>
        <div class="photos-grid">
          <div v-for="photo in recentPhotos" :key="photo.id" class="photo-card">
            <img :src="photo.thumbnailUrl" :alt="photo.title">
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  
  const props = defineProps({
    isDarkMode: {
      type: Boolean,
      default: false
    }
  })
  
  const users = ref([])
  const photos = ref([])

  const fetchData = async () => {
    try {
      const [usersResponse, photosResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/photos')
      ])
      
      users.value = await usersResponse.json()
      photos.value = await photosResponse.json()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  

  const uniqueCompanies = computed(() => {
    return [...new Set(users.value.map(user => user.company.name))]
  })
  
  const uniqueCities = computed(() => {
    return [...new Set(users.value.map(user => user.address.city))]
  })
  
  const recentUsers = computed(() => {
    return users.value.slice(0, 6)
  })
  
  const recentPhotos = computed(() => {
    return photos.value.slice(0, 8)
  })
  
  onMounted(() => {
    fetchData()
  })
  </script>
  
  <style scoped>
  :deep(.dashboard) {
    padding: 2rem 3rem;
    background: #f5f7fb;
    transition: all 0.3s ease;
  }
  
  :deep(.dashboard.dark-mode) {
    background: #121212 !important;
    color: #fff !important;
    margin-left: 1%!important;
  }
  
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
  }
  
  .dark-mode .stat-card {
    background: #1E1E1E !important;
    color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
  }
  
  .stat-icon {
    font-size: 2rem;
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
    padding: 1rem;
    border-radius: 10px;
  }
  
  .dark-mode .stat-icon {
    color: #64B5F6;
    background: rgba(100, 181, 246, 0.2);
  }
  
  .stat-info h3 {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .dark-mode .stat-info h3 {
    color: #aaa;
  }
  
  .stat-number {
    font-size: 1.8rem;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .dark-mode .stat-number {
    color: #fff;
  }
  
  .recent-users, .recent-photos {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .dark-mode .recent-users,
  .dark-mode .recent-photos {
    background: #1E1E1E !important;
    color: #fff;
  }
  
  .users-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .user-card {
    padding: 1rem;
    border-radius: 8px;
    background: #f8f9fa;
    transition: all 0.3s ease;
  }
  
  .dark-mode .user-card {
    background: #2D2D2D !important;
    color: #fff;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .user-details h3 {
    margin: 0;
    font-size: 1rem;
  }
  
  .dark-mode .user-details h3 {
    color: #fff;
  }
  
  .user-details p {
    margin: 0.2rem 0;
    color: #666;
    font-size: 0.9rem;
  }
  
  .dark-mode .user-details p {
    color: #aaa;
  }
  
  .company-tag {
    display: inline-block;
    background: #e1f0ff;
    color: #3498db;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .dark-mode .company-tag {
    background: rgba(100, 181, 246, 0.2);
    color: #64B5F6;
  }
  
  .photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .photo-card {
    background: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .dark-mode .photo-card {
    background: #2D2D2D !important;
  }
  
  .photo-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .photo-card p {
    padding: 0.5rem;
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .dark-mode .photo-card p {
    color: #aaa;
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  .dark-mode h2 {
    color: #fff;
  }
  
  .dark-mode h2,
  .dark-mode .stat-number {
    color: #fff !important;
  }
  
  .dark-mode .stat-info h3,
  .dark-mode .user-details p,
  .dark-mode .photo-card p {
    color: #aaa !important;
  }
  </style>
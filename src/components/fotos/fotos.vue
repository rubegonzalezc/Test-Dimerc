<template>
    <div class="photos-container" :class="{ 'dark-mode': isDarkMode }">
      <div class="header">
        <h1>Galería de Fotos</h1>
      </div>
  
      <div class="filters-container">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar por título..."
          single-line
          hide-details
          variant="outlined"
          density="comfortable"
          class="search-field"
        ></v-text-field>
        
        <v-select
          v-model="itemsPerPage"
          :items="[8, 12, 16, 24]"
          label="Fotos por página"
          variant="outlined"
          density="comfortable"
          hide-details
          class="items-per-page"
        ></v-select>
      </div>
  
      <div class="photos-grid">
        <v-card
          v-for="photo in paginatedPhotos"
          :key="photo.id"
          class="photo-card"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <v-img
            :src="photo.url"
            :aspect-ratio="1"
            cover
            class="photo-image"
          ></v-img>
  
          <v-card-title class="photo-title">{{ photo.title }}</v-card-title>

          <v-card-text>
            <div class="comments-section">
              <div v-for="comment in photo.comments" :key="comment.id" class="comment">
                <v-avatar size="32" class="mr-2">
                  <v-img :src="comment.avatar"></v-img>
                </v-avatar>
                <div class="comment-content">
                  <div class="comment-author">{{ comment.author }}</div>
                  <div class="comment-text">{{ comment.text }}</div>
                </div>
              </div>
            </div>
  
            <v-form @submit.prevent="addComment(photo.id)" class="comment-form">
              <v-text-field
                v-model="newComments[photo.id]"
                label="Añadir comentario"
                variant="outlined"
                density="comfortable"
                hide-details
                append-inner-icon="mdi-send"
                @click:append-inner="addComment(photo.id)"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
  
      <div class="pagination-container">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  const props = defineProps({
    isDarkMode: {
      type: Boolean,
      default: false
    }
  })
  
  const photos = ref([])
  const search = ref('')
  const page = ref(1)
  const itemsPerPage = ref(12)
  const newComments = ref({})
  

  const fetchPhotos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos')
      const data = await response.json()
      photos.value = data.map(photo => ({
        ...photo,
        comments: []
      }))
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }
  

  const filteredPhotos = computed(() => {
    return photos.value.filter(photo => 
      photo.title.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  

  const pageCount = computed(() => {
    return Math.ceil(filteredPhotos.value.length / itemsPerPage.value)
  })
  

  const paginatedPhotos = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredPhotos.value.slice(start, end)
  })
  

  const addComment = (photoId) => {
    if (!newComments.value[photoId]?.trim()) return
  
    const photo = photos.value.find(p => p.id === photoId)
    if (photo) {
      photo.comments.push({
        id: Date.now(),
        author: 'Usuario Actual', 
        avatar: `https://ui-avatars.com/api/?name=Usuario+Actual&background=random`,
        text: newComments.value[photoId]
      })
      newComments.value[photoId] = ''
    }
  }
  

  watch(search, () => {
    page.value = 1
  })
  

  onMounted(() => {
    fetchPhotos()
  })
  </script>
  
  <style scoped>
  .photos-container {
    padding: 2rem;
  }
  
  .header {
    margin-bottom: 2rem;
  }
  
  .filters-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  
  .search-field {
    flex: 1;
    min-width: 200px;
  }
  
  .items-per-page {
    width: 150px;
  }
  
  .photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .photo-card {
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s;
  }
  
  .photo-card:hover {
    transform: translateY(-5px);
  }
  
  .photo-title {
    font-size: 1rem;
    line-height: 1.4;
    padding: 1rem;
  }
  
  .comments-section {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 1rem;
  }
  
  .comment {
    display: flex;
    align-items: start;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.03);
  }
  
  .comment-content {
    flex: 1;
    margin-left: 0.5rem;
  }
  
  .comment-author {
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .comment-text {
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
  
  .comment-form {
    margin-top: 1rem;
  }
  
  .pagination-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
  
 
  .dark-mode .comment {
    background: rgba(255, 255, 255, 0.05);
  }
  

  @media (max-width: 600px) {
    .photos-container {
      padding: 1rem;
    }
  
    .filters-container {
      flex-direction: column;
    }
  
    .search-field,
    .items-per-page {
      width: 100%;
    }
  
    .photos-grid {
      gap: 1rem;
    }
  }
  </style>
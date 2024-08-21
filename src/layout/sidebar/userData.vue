<template>
    <div class="user-data">
        <img class="profile-image" :src="fotoUrl" alt="" />
        <div class="profile-info">
          <h3 >{{ nombre }} {{ apellido }}</h3>
          <p>{{ correo }}</p>
          <p>Pet Owner</p>
        </div>
      </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        foto:'',
      };
    },
    computed: {
    fotoUrl() {
      // Base URL del servidor donde se almacenan las imágenes
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}/${this.foto}`;
    }
  },
    mounted() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró ningún token, redireccionando para iniciar sesión');
        this.$router.push('/login');
        return;
      }
  
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      // fetch("https://devs-devitm.com/api/pet_owner/me", requestOptions)
      fetch("http://127.0.0.1:8000/api/pet_owner/me", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .then(data => {
          this.nombre = data.user.name;
          this.apellido = data.user.last_name;
          this.correo = data.user.email;  // Assuming this field is available
          this.telefono = data.user.phone; // Assuming this field is available
          this.foto = data.user.profile_photo; // Assuming this field is available and fallback to default
        })
        .catch(error => console.error('Error al obtener datos:', error));
    }
  };
  </script>
  
  <style scoped>
  .user-data {
    display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
  margin-top: 20px; /* Separation from the top */
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  h3{
    font-size: 1.5em; /* Adjust size as needed */
    margin: 0;
  }
  .profile-info {
     margin-top: 10px;
  }
  </style>
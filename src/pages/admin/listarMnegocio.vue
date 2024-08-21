<template>
  <Breadcrumbs  title="Mis Negocios"/>
    <div class="card">
          <div class="card-header pb-0 ml-2 ">
              <router-link class="btn btn-success active left" to="/nuevo-negocio">Nuevo negocio</router-link>
          </div>
          <div class="ml-4">
            <h1 class="text-center h1 txt-secondary">Mis Negocios Registrados</h1>
        </div>
      </div>   
  <!-- Contenedor para los negocios -->
  <div class="row">
    <div class="col-md-6 col-xl-4 mb-4" v-for="negocio in negocio" :key="negocio.id">
      <div class="card h-100">
        <div class="row no-gutters">
          <!-- Imagen del negocio -->
          <div class="col-12">
            <div class="img-container"> 
                <img class="img-fluid profile-photo" alt="Imagen del negocio" :src="getFotoUrl(negocio.profile_photo)">
                <div class="product-hover">
                  <ul>
                      <li @click="eliminar(negocio.id)">
                        <i class="icofont icofont-ui-delete"></i>
                      </li>
                    
                      <li @click="detalles(negocio.id)">
                        <i class="icon-eye"></i>
                      </li>                   
                  </ul>
                </div>
              </div>
          </div>
          
        </div>
        <!-- Acciones -->
         
          <div class=" kanban-item align-items-center p-3 card-body" :style="{ backgroundColor: '#f8f9fa'}">
              <h3 class="mb-1 f-20 txt-primary">{{ negocio.name }}</h3>
              <p class="card-text"><strong>Teléfono:</strong> {{ negocio.phone_number }}</p>
              <p class="card-text"><strong>Correo:</strong> {{ negocio.email }}</p>
                  <div class="d-flex  justify-content-between mt-3">
                    <button class="btn btn-secondary" @click="personal(negocio.id)"> Horario</button>
                    <button class="btn btn-info ml-2" @click="personal(negocio.id)"> Personal</button>
                  </div>
          </div>          
             
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return { 
      negocio: [],
      error: null,
    };
  },
  created() {
    this.listarNegocios();
  },
  methods: {
    // ...mapActions(['refreshToken']),
    getFotoUrl(profile_photo) {
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}${profile_photo}`;
    },
    detalles(id) {
      this.$router.push({ name: 'detalleMinegocio', params: { id: id } });
    },
    personal(id) {
      this.$router.push({ name: 'personal', params: { id: id } });
    },
    personal(id) {
      this.$router.push({ name: 'horariosN', params: { id: id } });
    },
    async listarNegocios() {
      const token = localStorage.getItem('token');
            // const newToken = await this.refreshToken();
            //  const token = newToken || localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      } 
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const response = await fetch("http://127.0.0.1:8000/api/business", requestOptions);
        const result = await response.json();
        this.negocio = result.businesses.data;
      } catch (err) {
        console.error('Error al obtener los negocios:', err);
        this.error = 'Error al obtener los detalles de los negocios';
      }
    },
    eliminar(id) {
      Swal.fire({
        title: '¿Está seguro de eliminar este negocio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          if (!token) {
            this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
            this.$router.push('/auth/login');
            return;
          }

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);

          const requestOptions = {
            method: "DELETE", 
            headers: myHeaders,
            redirect: "follow",
          };

          fetch(`http://127.0.0.1:8000/api/business/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              if (result.status === 'success') {
                Swal.fire(
                  'Eliminado!',
                  'El negocio ha sido eliminado correctamente.',
                  'success'
                );
                this.listarNegocios();
              } else {
                Swal.fire(
                  'Error!',
                  result.message || 'Hubo un problema al eliminar el negocio.',
                  'error'
                );
              }
            })
            .catch(err => {
              console.error('Error al eliminar el negocio:', err);
              Swal.fire(
                'Error!',
                'Hubo un problema al eliminar el negocio.',
                'error'
              );
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.blog-wrraper img {
  width: 100%; 
  max-width: 200px; 
  height: auto;
}
/* .card.h-100 {
  max-height: 900px; 
  overflow: hidden;
} */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title-centered {
  margin: 20px 0; 
  text-align: center;
}

.profile-photo {
  width: auto; 
  height: 180px; 
  object-fit: cover;
}

/* Hover */
.img-container {
  /* Ajusta la altura de la imagen */
  /* height: 180px;  */
  /* overflow: hidden; */
   /* position: relative; */
  /* overflow: hidden;  */
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

.profile-photo {
  display: block;
  /* width: 100%; */
  width: 70%;
  height: auto;
 
  /* object-fit: cover; */
  transition: transform 0.3s ease-in-out;
}

.img-container:hover .profile-photo {
  transform: scale(1.05); /* Efecto de zoom */
}

/* Overlay (velo negro) */
.product-hover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.product-hover ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
}

.product-hover li {
  background-color: rgb(255, 255, 255); /* Color de fondo del círculo */
  padding: 10px;
  border-radius: 50%; /* Asegura que los círculos sean perfectamente redondos */
  width: 40px; /* Fija el ancho del círculo */
  height: 40px; /* Fija la altura del círculo */
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.product-hover li:hover {
  transform: scale(1.1);
  background-color: #eeb82f; /* Color azul al hacer hover */
}

.img-container:hover .product-hover {
  opacity: 1;
}

</style>
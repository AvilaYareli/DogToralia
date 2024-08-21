<template>
    <div class="container-fluid h-100 d-flex flex-column">
      <div class="card flex-grow-1">

        <div class="card-header">
                <!-- <a class="fa fa-institution icon" @click="agregar">Agregar Nuevo Negocio</a> -->
                <router-link class="btn btn-success active left" to="/nuevo-negocio">Nuevo negocio</router-link>
                </div>
        <div class="card-body">
          <h1 class="text-center">Mis Negocios registrados</h1>
          <div class="d-flex flex-column align-items-start mb-4">
            <div class="w-100">
              <table class="table table-striped">
                <thead class="table-dark">
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <!-- <th>Descripción</th> -->
                    <th>Acciones</th>
                    
                    <!-- <th>Id dueño</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="negocio in negocio" :key="negocio.id">
                    <td>{{ negocio.id }}</td>
                    <td>{{ negocio.name }}</td>
                    <td>{{ negocio.phone_number }}</td>
                    <td>{{ negocio.email }}</td>
                    <!-- <td>{{ negocio.description }}</td> -->
                    <td class="text-center">
                        <!-- <router-link :to="{ name: 'verDetalle', params: { id: negocio.id } }">Ver datalle</router-link> -->
                        <button class="btn btn-outline-info mx-1"  @click="detalles(negocio.id)">
                            <i class="fa fa-eye  fa-lg"></i>
                        </button>

                        <button class="btn btn-outline-danger mx-1"  @click="eliminar(negocio.id)">
                                <i class="fa fa-trash-o  fa-lg"></i>
                        </button>
<!-- 
                        <button class="btn btn-outline-success-2x "  @click="editar(pet.id)">
                                <i class="fa fa-pencil fa-lg"></i>
                        </button> -->
                    </td>         
                    
                    <!-- <td>{{ negocio.business_owner_id }}</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
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
        detalles(id){
            this.$router.push({ name: 'detalleMinegocio', params: { id: id } });
        },
        agregar(){
            this.$router.push("/nuevo-negocio");
        },
      async listarNegocios() {
        const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }
        try {
            const token=localStorage.getItem('token');
            // const newToken = await this.refreshToken();
            //  const token = newToken || localStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

                const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
                };

                // fetch("https://devs-devitm.com/api/business/all", requestOptions)
                fetch("http://127.0.0.1:8000/api/business", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    let datos = JSON.parse( result);                   
                    this.negocio = datos.businesses.data;

                });                
      
             } catch (err) {
                console.log('Error al obtener los negocios:', err);
                this.error = 'Error al obtener los detalles de los negocios';    
            }
      },
      eliminar(id){
Swal.fire({
    title: '¿Está seguro de que desea eliminar esta mascota?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
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

  console.log('ID de la mascota:', id);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  // fetch(`https://devs-devitm.com/api/pets/${id}`, requestOptions)
  fetch(`http://127.0.0.1:8000/api/business${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('Resultado de la eliminación:', result);
      // Vuelve a listar las mascotas para reflejar los cambios
      this.listarMisMascotas();
    })
    .catch(err => {
      console.error('Error al eliminar la mascota:', err);
      if (err.response && err.response.data && err.response.data.message) {
        this.error = err.response.data.message;
      } else {
        this.error = 'Error al eliminar la mascota';
      }
      Swal.fire(
            'Error!',
            'Hubo un problema al eliminar la mascota.',
            'error'
          );
    });
}
  });


       }
    }
};
  </script>
  
  <style scoped>

.h-100 {
  height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
  justify-content: center;
}

/* .table-hover tbody tr:hover {
  background-color: #f8f9fa;
} */

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f2f2f2;
}

.table-dark th {
  background-color: #5c61f2;
  color: white;
  border-right: 5px solid #ffffff;
  padding: 8px 20px;
  text-align: center;
}
.table-dark td {
 
  padding: 8px 20px;
 
}


.table-dark th:last-child {
  border-right: none;
}

.card-header {
  /* Aplica el tipo de letra deseado a todo el contenedor */
  font-family: 'Arial', sans-serif;
}

.icon {
  font-size: 150%; 
  transition: font-size 0.3s ease; /* Añade una transición suave */
}

.icon:hover {
  /* Cambia el tamaño de la letra al pasar el cursor */
  font-size: 1.6em; /* Ajusta este valor según lo necesites */
}

  </style>
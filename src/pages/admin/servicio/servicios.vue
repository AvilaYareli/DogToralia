<template>
    <div class="col-12 colorfull-kanban">
        <div class="card-body pb-0">
          <div class="d-flex row" id="demo2">
                <div class="kanban-container" v-for="(servi, index) in servi" :key="servi.id">
                <div class="kanban-board col-xxl-4 col-md-12" style="width: 400px; margin-left: 10px; margin-right: 10px">
                    <!-- Genera estilos aleatorios para cada tarjeta -->
                    <div :style="styles = getRandomStyle()">
                        <header class="kanban-board-header" :style="styles.headerStyle">
                            <div class="kanban-title-board" style="font-size: 1.2em; font-weight: bold;">{{ servi.name }}</div>
                        </header>
                        <div class="card-body">
                            <div class="kanban-item" :style="styles.bodyStyle">
                                <h5 class="f-w-600">Descripción:
                                    <h5 class="f-w-300">{{ servi.description }}</h5>
                                </h5>
                                <h5 class="f-w-600">Precio:
                                    <h5 class="f-w-300">{{ servi.price }} {{ servi.currency }}</h5> 
                                </h5>
                                <h5 class="f-w-600">Duración:
                                    <h5 class="f-w-300">{{ servi.duration }} min</h5>
                                </h5>
                           </div>
                           <div div class="d-flex ">
                        <button class="btn btn-outline-danger mx-1" @click="eliminar(servi.id)">
                            <i class="icofont icofont-ui-delete"></i>
                        </button>
                        <button class="btn btn-outline-success-2x" @click="verDetalle(servi.id)">
                            <!-- <i class="icon-eye"></i> -->
                            <i class="icofont icofont-pencil-alt-2"></i>
                        </button>
                        </div>
                        </div>
                       
                    </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { mapActions } from 'vuex';
  export default {
    props: {
      negocioId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        servi: [],  // Asegúrate de definir el array para almacenar los servicios
      };
    },
    created() {
      this.obtenerServicios();
    },
    methods: {
      // ...mapActions(['refreshToken']),
      verDetalle(id) {
      this.$router.push({ name: 'verServicio', params: { id: id } });
    },
    getRandomStyle() {
        const colors = [
            { light: '#a2d9ff', dark: '#4faad5' }, 
            { light: '#c2eaf2', dark: '#4faad5' }, 
            { light: '#b0d8eb', dark: '#4faad5' }, 
            { light: '#f7d794', dark: '#e6ae30' },
            { light: '#d4a1d4', dark: '#9b59b6' },
            { light: '#a3d9a5', dark: '#61ae41' }, 
            { light: '#f5b7b1', dark: '#e74c3c' }, 
        ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return {
            headerStyle: {
            backgroundColor: randomColor.dark,
            color: 'white',
            padding: '10px',
            borderRadius: '8px 8px 0 0'
            },
            bodyStyle: {
            backgroundColor: randomColor.light,
            padding: '25px',
            borderRadius: '0 0 8px 8px'
            }
        };
},
async obtenerServicios() {
  const token = localStorage.getItem('token');

            // const newToken = await this.refreshToken();
            // const token = newToken || localStorage.getItem('token');
            if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/services/business/${this.negocioId}`);
          this.servi = response.data.services.data;  // Guarda los datos de los servicios en el array
          console.log(this.servi);  // Opcional: para ver qué se está guardando
        } catch (error) {
          console.error("Error al obtener los servicios:", error);
        }
      },
      eliminar(id) {
        
      Swal.fire({
        title: '¿Está seguro de eliminar este servicio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
            // const newToken = await this.refreshToken();
            // const token = newToken || localStorage.getItem('token');
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
          fetch(`http://127.0.0.1:8000/api/services/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                  Swal.fire(
                    'Eliminado!',
                    'El servicio ha sido eliminado correctamente.',
                    'success'
                  );
                  this.obtenerServicios(); // Asegúrate de que listarNegocios esté definido y vinculado correctamente
                } else {
                  Swal.fire(
                    'Error!',
                    result.message || 'Hubo un problema al eliminar el servicio.',
                    'error'
                  );
                }
              })
            .catch(err => {
              console.error('Error al eliminar el servicio:', err);
              Swal.fire(
                'Error!',
                'Hubo un problema al eliminar el servicio.',
                'error'
              );
            });
        }
      });
    },



    }
  };
  </script>
  
  <style>

  </style>
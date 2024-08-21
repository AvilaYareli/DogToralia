<template> 

  <Breadcrumbs title="Mis Mascotas"/>
    <div class="container-fluid h-100 d-flex flex-column">
      <div class="card flex-grow-1">
                <!--         -->
    <div class="card-header">
     <router-link class="btn btn-success active left" to="/nueva-mascota">Agregar mascota</router-link>
    </div>
                <!--  -->
                
        <div class="card-body"> 
          <h1 class="text-center">Mascotas registradas</h1>
          <div class="d-flex flex-column align-items-start mb-4">
            <div class="w-100">
              <table class="table table-striped">
                <thead class="table-dark">
                  <tr class="text-center">
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Raza</th>
                    <th >Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pet in pet" :key="pet.id">
                    <td>{{pet.id }}</td>
                    <td>{{pet.name}}</td>
                    <td>{{pet.species }}</td>
                    <td>{{pet.breed  }}</td>
                    <td class="text-center">
                       
                        <button class="btn btn-outline-danger mx-1"  @click="eliminar(pet.id)">
                                <i class="fa fa-trash-o  fa-lg"></i>
                        </button>
                        <button class="btn btn-outline-success-2x "  @click="editar(pet.id)">
                                <i class="fa fa-pencil fa-lg"></i>
                        </button>
                    </td>

                  </tr>
                </tbody>
              </table>
              <!-- <div class="d-flex justify-content-end mt-3">
                <ul class="pagination pagination-primary">
                        <li class="page-item"><a class="page-link" href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">«</span><span class="sr-only">Previous</span></a></li>
                        <li class="page-item"><a class="page-link" href="javascript:void(0)">1</a></li>
                        <li class="page-item"><a class="page-link" href="javascript:void(0)">2</a></li>
                        <li class="page-item"><a class="page-link" href="javascript:void(0)">3</a></li>
                        <li class="page-item"><a class="page-link" href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">»</span><span class="sr-only">Next</span></a></li>
                </ul>
              </div> -->
            </div>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        pet: [],
        error: null
      };
    },
    created() {
      this.listarMisMascotas();
    },
    methods: {
      // ...mapActions(['refreshToken']),

        detalles(id){
            this.$router.push({ name: 'detalleMimascota', params: { id: id } });
        },
        editar(id){
            this.$router.push({ name: 'editarMimascota', params: { id: id } });
        },
        agregar(){
            this.$router.push("/nueva-mascota"); 
        },
      async listarMisMascotas() {
        const token = localStorage.getItem('token');
      //      // Refrescar el token antes de realizar la acción
      // const newToken = await this.refreshToken();
      // // Usar el nuevo token para realizar la acción
      // const token = newToken || localStorage.getItem('token');
    
      if (!token) {
        this.errorMessage = 'No se encontró ningún token, redireccionando para iniciar sesión';
        this.$router.push('/auth/login');
        return;
      }
        try {

          const token=localStorage.getItem('token');
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);

                const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
                };

                // fetch("https://devs-devitm.com/api/pets/index", requestOptions)
                fetch("http://127.0.0.1:8000/api/pets/index", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    let datos = JSON.parse( result);   
                    console.log('ddd:',datos);    
                    // this.pet = datos.data;               
                    // this.pet = datos.pets.data;
                    this.pet = datos.pets;
                   
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
  fetch(`http://127.0.0.1:8000/api/pets/${id}`, requestOptions)
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


       }//metodo de eliminar 
 


    }

};//llave del export
  </script>
  
  <style scoped>
.h-100 {
  height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
  justify-content: center;
}

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

.actions-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions-cell button {
  margin: 0 5px;
}

.custom-button {
  padding: 4px 6px; /* Ajusta el padding según sea necesario */
  font-size: 5px; /* Ajusta el tamaño de la fuente según sea necesario */
}
.table td:last-child {
    width: 20%;
    white-space: nowrap; 
}

/* boton de agregar */
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
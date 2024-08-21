<template>
  <div class="col-sm-12">
    <div class="card">
      <div class="card-header pb-0">
        <h3 class="h3 txt-success">Mi personal </h3>
        <span>!La medicina cura al ser humano, la veterinaria cura a la humanidad¡</span>
      </div>
      <div class="card-body">
        <div class="table-responsive theme-scrollbar data-table">
          <form>
            <div class="mb-3 row justify-content-end">
              <label for="table-complete-search" class="col-xs-3 col-sm-auto col-form-label">Buscar:</label>
              <div class="col-xs-3 col-sm-auto">
                <input id="table-complete-search" type="text" class="form-control" v-model="filterQuery" placeholder="Buscar..." />
              </div>
            </div> 
          </form>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th> 
                <th scope="col">Teléfono</th>
                <!-- <th scope="col">bussiness</th> -->
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="personal in filteredPersonal" :key="personal.id">
                <td scope="row">
                  <img class="img-40 me-2" :src="getFotoUrl(personal.profile_photo)" alt="" />
                  {{ personal.name }} {{ personal.last_name }}
                </td>
                <td>{{ personal.email }}</td>
                <td>{{ personal.phone_number }}</td>
                <!-- <td>{{ personal.business_id }}</td> -->
                <td class="text-center">
                  <span @click="editar(personal.id)"><i class="fa fa-pencil fa-lg"></i></span>
                  <span @click="eliminar(personal.id)"><i class="icofont icofont-close-circled font-danger ps-2"></i></span>
                </td>
              </tr>
            </tbody>
          </table>
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
      personal: [],
      filterQuery: "",
      busiId: this.$route.params.id,
    };
  },
  computed: {
    filteredPersonal() {
      return this.personal.filter(personal => {
        return (
          personal.business_id == this.busiId &&
          (
            personal.name.toLowerCase().includes(this.filterQuery.toLowerCase()) ||
            personal.last_name.toLowerCase().includes(this.filterQuery.toLowerCase()) ||
            personal.email.toLowerCase().includes(this.filterQuery.toLowerCase()) ||
            personal.phone_number.toLowerCase().includes(this.filterQuery.toLowerCase())
          )
        );
      });
    }
  },
  created() {
    this.listarPersonal();
  },
  watch: {
    '$route.params.id': function(newId) {
      this.busiId = newId;
      this.listarPersonal();
    }
  },
  methods: {
    // ...mapActions(['refreshToken']),
    
    getFotoUrl(profile_photo) {
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}${profile_photo}`;
    },
    editar(id) {
      this.$router.push({ name: 'editPersonal', params: { id } });
    },
    async listarPersonal() {
      const token = localStorage.getItem('token');
        //      const newToken = await this.refreshToken();
        //      const token = newToken || localStorage.getItem('token');
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
          redirect: "follow"
        };

        const response = await fetch("http://127.0.0.1:8000/api/staff", requestOptions);
        const result = await response.json();

        // Asegurarse de que result sea un array
        if (Array.isArray(result.stylists)) {
          this.personal = result.stylists;
        } else {
          this.personal = []; // O maneja el error adecuadamente
        }
      } catch (err) {
        console.log('Error al obtener el personal:', err); 
        this.error = 'Error al obtener los detalles del personal';
      }
    },
    eliminar(id) {
      Swal.fire({
        title: '¿Está seguro de eliminar este miembro del personal?',
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

          console.log('ID del personal:', id);

          const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
          };

          fetch(`http://127.0.0.1:8000/api/staff/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log('Resultado de la eliminación:', result);
              this.listarPersonal();
            })
            .catch(err => {
              console.error('Error al eliminar el usuario:', err);
              if (err.response && err.response.data && err.response.data.message) {
                this.error = err.response.data.message;
              } else {
                this.error = 'Error al eliminar el usuario';
              }
              Swal.fire(
                'Error!',
                'Hubo un problema al eliminar el usuario.',
                'error'
              );
            });
        }
      });
    }
  }
};
</script>
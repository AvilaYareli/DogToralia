<template>
    <breadcrumbs title="Nuevo Servicio" main="Servicios" mainPath="/menu-Negocio" />
  
    <div class="card">
      <form class="card" @submit.prevent="Nuevo">
        <div class="card-header pb-0">
          <!-- <h4 class="card-title mb-0">Registrar Nuevo Servicio{{ busiId}}</h4> -->
          <h4 class="card-title mb-0">Registrar Nuevo Servicio</h4>
        </div>
        <div class="card-body"> 
          <div class="row align-items-center">
               <!-- Nombre -->
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label f-w-500">Nombre del servicio</label>
                <input v-model="dataserv.name" class="form-control" @input="filterName">
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label f-w-500">Duración(min)</label>
                <input v-model="dataserv.duration" type="number" @input="limpiarError"  class="form-control" placeholder="00">
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                  <label class="form-label">Categoria</label>
                  <select v-model="dataserv.category"class="form-select"> 
                      <option></option>
                      <option>Estetica</option>
                      <option>Veterinaria</option>
                      <option>Estetica Veterianeria</option>
                  </select>                          
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label f-w-500">Maximo de Servicios simultaneos</label>
                <input v-model="dataserv.max_services_simultaneously" type="number" @input="limpiarError"  class="form-control" >
              </div>
            </div>
            <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label f-w-500">Descripción:</label>
                  <textarea v-model="dataserv.description" @input="limpiarError" class="form-control" rows="5" placeholder="Agrega la descripción del servicio"></textarea>
                </div>
              </div>
              <!-- precio -->
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label f-w-500">Precio</label>
                <input v-model="dataserv.price"  type="number" class="form-control" @input="filterApe">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
                  <div class="mb-3">
                    <div class="d-flex">
                      <div class="form-check form-check-inline radio radio-primary">
                        <input class="form-check-input" id="radioinline1" type="radio" name="genero" value="USD" v-model="dataserv.currency">
                        <label class="form-check-label mb-0" for="radioinline1">USD</label>
                      </div>
                      <div class="form-check form-check-inline radio radio-primary">
                        <input class="form-check-input" id="radioinline2" type="radio" name="genero" value="MXN" v-model="dataserv.currency">
                        <label class="form-check-label mb-0" for="radioinline2">MXN</label>
                      </div>
                    </div> 
                  </div>
                </div>
                   <!--  --> 
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end">
        <button class="btn btn-primary" type="submit" @click="editarperfil">Guardar cambios</button>
        </div>
      </form>
    </div>
  </template>
    
    <script>
    import { useToast } from 'vue-toastification';
    // import { mapActions } from 'vuex';

    export default {
      data() {
        return {
          dataserv: {},
          servId: this.$route.params.id,
          errorMessage: '',
          okMessage: '',
        };
      },
    
      watch: {
        // ...mapActions(['refreshToken']),

        '$route.params.id': function(newId) {
          this.servId = newId;
          this.mostrarInfo();
        }
      },
      
      created() {
        this.mostrarInfo();
      },
      methods: {
        async mostrarInfo(){
          try {
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
              method: "GET",
              headers: myHeaders,
              redirect: "follow"
            };
    
            const response = await fetch(`http://127.0.0.1:8000/api/services/${this.servId}`, requestOptions);
            const result = await response.text();
            const datos = JSON.parse(result);
            this.dataserv = datos.service;
          } catch (err) {
            this.errorMessage = 'Error al obtener los detalles del miembro del personal';
            console.error(err);
          }
        },
        async editarperfil(){
          const toast = useToast();
          try {
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
    
            const raw = JSON.stringify({
              "name": this.dataserv.name,
              "duration": this.dataserv.duration,
              "category": this.dataserv.category,
              "price": this.dataserv.price,
              "currency": this.dataserv.currency,
              "description": this.dataserv.description,
              "max_services_simultaneously":this.dataserv.max_services_simultaneously
            });
    
            const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };
    
            const response = await fetch(`http://127.0.0.1:8000/api/services/${this.servId}`, requestOptions);
            const result = await response.json();
    
            if (result.status === "error") {
              toast.error(`${result.message}: ${result.error}`);
            } else {
              toast.success('Datos actualizados correctamente');
              this.dataserv = {
                name: '',
                duration: '',
                category: '',
                price: '',
                currency: '',
                description: ''
              };
              this.mostrarInfo();
            }
          } catch (err) {
            toast.error('Error al actualizar los datos');
            console.error(err);
          }
        }
      }
    }
    </script>
    
    <style>
    .avatar {
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .avatar img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    </style>
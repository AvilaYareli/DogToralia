<template>
  <breadcrumbs title="Nuevo Servicio" main="Servicios" mainPath="/menu-Negocio" />

  <div class="card">
    <form class="card" @submit.prevent="Nuevo">
      <div class="card-header pb-0">
        <h4 class="card-title mb-0">Registrar Nuevo Servicio</h4>
      </div>
      <div class="card-body"> 
        <div class="row align-items-center">
             <!-- Nombre -->
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Nombre del servicio</label>
              <input v-model="nombre" class="form-control" @input="filterName">
            </div>
          </div> 
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Duración(min)</label>
              <input v-model="duracion" type="number" @input="limpiarError"  class="form-control" placeholder="00">
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
                <label class="form-label">Categoria</label>
                <select v-model="categoria"class="form-select"> 
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
              <input v-model="maxServ" type="number" @input="limpiarError"  class="form-control" >
            </div>
          </div>
          <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label f-w-500">Descripción:</label>
                <textarea v-model="descripcion" @input="limpiarError" class="form-control" rows="5" placeholder="Agrega la descripción del servicio"></textarea>
              </div>
            </div>
            <!-- precio -->
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label f-w-500">Precio</label>
              <input v-model="precio"  type="number" class="form-control" @input="filterApe">
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
                <div class="mb-3">
                  <div class="d-flex">
                    <div class="form-check form-check-inline radio radio-primary">
                      <input class="form-check-input" id="radioinline1" type="radio" name="genero" value="USD" v-model="currency">
                      <label class="form-check-label mb-0" for="radioinline1">USD</label>
                    </div>
                    <div class="form-check form-check-inline radio radio-primary">
                      <input class="form-check-input" id="radioinline2" type="radio" name="genero" value="MXN" v-model="currency">
                      <label class="form-check-label mb-0" for="radioinline2">MXN</label>
                    </div>
                  </div> 
                </div>
              </div>
                 <!--  --> 
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <button class="btn btn-secondary" type="submit">Registrar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      nombre: '',      
      duracion: '',
      categoria: '',
      descripcion: '',
      precio: '',
      currency: '',
      errorMessage: '',
      okMessage: '',
      busiId: this.$route.params.id,
      type: 'password',
    };
  },
  setup() {
    const toast = useToast();
    return { toast }; 
  },
  watch: {
    '$route.params.id': function(newId) {
      this.busiId = newId;
    }
  },
  methods: {
    // ...mapActions(['refreshToken']),

    limpiarError() {
      this.errorMessage = '';
    },
    filterName(event) {
      const onlyLettersAndSpaces = event.target.value.replace(/[^a-zA-Z\s]/g, '');
      this.nombre = onlyLettersAndSpaces;
      this.errorMessage = '';
    },
    validarCampos({ nombre, duracion, categoria, descripcion, precio, currency }) {
      if (!nombre || !currency || !duracion || !categoria || !descripcion || ! precio) {
        return 'Todos los campos son obligatorios.';
      }
     
      return '';
    },
    async Nuevo(){
          const toast = useToast();
          try {
            const token = localStorage.getItem('token');
            // const newToken = await this.refreshToken();
            // const token = newToken || localStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            const raw = JSON.stringify({
              'name': this.nombre,
              'duration': this.duracion ,
              'category': this.categoria,
              'description': this.descripcion,
              'price':this.precio,
              'currency':this.currency,
              'max_services_simultaneously':this.maxServ
            });
    
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };
    
            const response = await fetch(`http://127.0.0.1:8000/api/services/${this.busiId}`, requestOptions);
            const result = await response.json();
    
            if (result.status === "error") {
              toast.error(`${result.message}: ${result.error}`);
            } else {
              toast.success('Servicio registrado correctamente.');
              this.dataserv = {
                nombre: '',
                duracion: '',
                categoria: '',
                descripcion: '',
                precio: '',
                currency: '',
                maxServ:'',
              };
              
            }
          } catch (err) {
            toast.error('Error al registrar el servicio.');
            console.error(err);
          }
        },
  
  },
};
</script>

<style>
.profile-photo {
  width: 150px; 
  height: 150px; 
  object-fit: cover; 
  border-radius: 0; 
}
</style>
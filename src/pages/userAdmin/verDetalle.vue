<template>
  <breadcrumbs title="Ver Negocio" main="Negocios Registrados " mainPath="/listar-negocios" />
  <div class="card">
    <div class="card-header pb-0">
      <h4>Información del negocio</h4>
    </div>
    <div class="card-body">
      <div class="contact-form">
        <form class="theme-form">
          <div class="form-icon">
            <i class="fa fa-briefcase"></i>
          </div>
          <div class="row">
              <!-- <div class="col-xl-6 col-12">
              <div class="blog-wrapper">
                <img class="img-fluid profile-photo" alt="" :src="getFotoUrl(business.profile_photo)">
              </div>
            </div>  -->
          <!--  -->
            <div class="col-sm-3 col-md-3 d-flex flex-column align-items-center">
              <div class="blog-wrapper">    <!-- <div class="mb-3 "> -->
                <img class="img-fluid profile-photo" :src="getFotoUrl(business.profile_photo)" alt="Foto de perfil">
              </div>
            </div>
            <div class="col-sm-9 col-md-9">
              <div class="row">
                <div class="col-sm-6 col-md-4">
                  <div class="mb-3">
                    <label for="exampleInputName">Nombre</label>
                    <p class="form-control">{{ business.name }}</p>
                  </div>
                </div>
                <div class="col-sm-6 col-md-4">
                  <div class="mb-3">
                    <label class="col-form-label" for="exampleInputEmail1">Email</label>
                    <p class="form-control">{{ business.email }}</p>
                  </div>
                </div>
                <div class="col-sm-6 col-md-4">
                  <div class="mb-3">
                    <label class="col-form-label" for="exampleInputEmail1">Teléfono</label>
                    <p class="form-control">{{ business.phone_number }}</p>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="form-label f-w-500">Descripción:</label>
                    <textarea v-model="business.description" @input="limpiarError" class="form-control" rows="5" placeholder="Agrega la descripción del negocio">{{ business.description }}</textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="text-sm-end">
          <!-- <router-link class="btn btn-success active" to="/listar-negocios">Regresar</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
   import axios from 'axios';
export default {
  data() {
    return {
      business: [],
      userId: this.$route.params.id
    };
  },
  watch: {
    '$route.params.id': function(newId) {
      this.userId = newId;
    }
  },
  created() {
      this.verDatalles();
    },
    methods: { 
      getFotoUrl(profile_photo) {
        const baseUrl = 'http://127.0.0.1:8000/storage/';
      return `${baseUrl}${profile_photo}`;
    },
      async verDatalles(){
        try {
         
          // const response = await axios.get(`https://devs-devitm.com/api/business/${this.userId}`);
          const response = await axios.get(`http://127.0.0.1:8000/api/business/${this.userId}`);
          console.log('response',response)
          this.business = response.data.business;
          console.log('Respuestaaaa:',this.business);
          this.error = null;
        } catch (err) {
          // Captura y muestra el error detallado en la consola
          console.error('¿Cual es el error?', err);
          
          // Establece el mensaje de error basado en la respuesta de la API, si está disponible
          if (err.response && err.response.business && err.response.business.message) {
            this.error = err.response.business.message;
          } else {
            this.error = 'Error al obtener los detalles del dueño de mascotas';
          }
          
          this.business = null;
        }
        } 
     }
     

      
  
};

</script>
<style>

.profile-photo {
  /* width: 150px;  */
  width:auto; 
  height: 180px; 
  object-fit: cover; 
}
/* .profile-photo {
  border-radius: 50%;
  width: 100%;
  max-width: 150px; /* Ajusta el tamaño según sea necesario 
} */
</style>
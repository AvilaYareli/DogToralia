<template>
  <breadcrumbs title="Servicios" />
    <div class="card" v-for="negocio in negocio" :key="negocio.id">
      <div class="ribbon ribbon-bookmark ribbon-vertical-left ribbon-secondary"><i class="icofont icofont-animal-paw"></i></div>
      <div class="job-search">
        <div class="card-body">
          <div class="d-sm-flex align-items-start">
            <img class="img-40 img-fluid m-l-30 m-r-20" src="@/assets/images/mascotas/img.png" alt="Business Image">
            <div class="flex-grow-1">
              <button class="btn btn-primary pull-right"  @click="nuevo(negocio.id)">Agregar Servicios</button>
              <h3 class="h3 txt-info">{{ negocio.name }}</h3>
              <p class="business-email">{{ negocio.email }}</p>
            </div>
            
          </div>    
          <div> 
            <servicios v-if="negocio.id" :negocio-id="negocio.id"/>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

 import axios from 'axios';
  import Swal from 'sweetalert2';
  import servicios from "@/pages/admin/servicio/servicios.vue"
  // import { mapActions } from 'vuex';
  
  export default {
    components:{
        servicios,
    },
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

      nuevo(id) {
      this.$router.push({ name: 'nuevoServicio', params: { id: id } }); 
      // this.$router.push({ name: 'nuevo-servicio'});
    },
        async listarNegocios() {
        const token = localStorage.getItem('token');
            //  const newToken = await this.refreshToken();
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
    },

}

</script>
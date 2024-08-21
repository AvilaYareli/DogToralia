<template>
    <div class="account-user"><vue-feather type="user"></vue-feather></div>
               <ul class="profile-dropdown onhover-show-div">
                 <li><a @click="cerrarSesion" > <vue-feather type="log-in"></vue-feather><span>Cerrar Sesion</span></a> </li>
                 
               </ul>
  </template>
  <script> 
  import {mapActions} from 'vuex';
  export default {
   components:{
          
   },
    methods: {
  
        ...mapActions(['logout']),
      cerrarSesion(){
        this.logout().then(() => {
          // Verifica si la ruta actual tiene un parámetro :id o es dinámica
          if (this.$route.params.id || this.$route.path.includes(':id')) {
            console.log('Ruta con ID detectada:', this.$route.path);
            this.$router.replace({ path: '/' }).then(() => {
              window.location.reload();
            });
          } else {
            this.$router.push({ path: '/' }).then(() => {
              window.location.reload();
            });
          }
        }).catch(error => {
          console.error('Error al cerrar sesión:', error);
        });
        
       
      },
  
              },
     
  
  }
  </script>
  <style scoped>
    /* Estilos para los botones de texto */
    .nav-menus button {
        background: none;
        border: none;
        cursor: pointer;
        color: #333; /* Color por defecto */
        padding: 5px 10px;
        /* text-decoration: underline; Subrayado por defecto */
  
    }
  
    .nav-menus button.active {
        color: blue; /* Color cuando está seleccionado */
        text-decoration: none; /* Sin subrayado cuando está seleccionado */
    }
  </style>
  
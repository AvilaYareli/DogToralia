<template>
    <div class="container-fluid p-0">
       <div class="row">
         <div class="col-12">     
           <div class="login-card">
             <div>
               <div><a class="logo" ><router-link to="/"><img class="img-fluid for-light" src="@/assets/images/logo/logo2.png" alt="looginpage"></router-link> </a></div>
               <div class="login-main"> 
                 <form class="theme-form">                   
                   <h4>Restablecer su contraseña </h4>
                   <div class="form-group">
                     <label class="col-form-label">Correo electrónico</label>
                     <div class="form-input position-relative">
                       <input class="form-control" type="password" name="login[password]"  placeholder="***">
                       <div class="show-hide"><span class="show"></span></div>
                     </div>
                   </div>

                   <h6 class="mt-4">Crea tu Contraseña</h6>
                   <div class="form-group">
                     <label class="col-form-label">Nueva Contraseña</label>
                     <div class="form-input position-relative">
                       <input class="form-control" type="password" name="login[password]"  placeholder="***">
                       <div class="show-hide"><span class="show"></span></div>
                     </div>
                   </div>
                   <div class="form-group">
                     <label class="col-form-label">Confirma tu Contraseña</label>
                     <input class="form-control" type="password" name="login[password]"  placeholder="***">
                   </div>
                   <div class="form-group mb-0">
                     <div class="checkbox p-0">
                       <input id="checkbox1" type="checkbox">
                       <label class="text-muted" for="checkbox1">Recordar Contraseña</label>
                     </div>
                     <button class="btn btn-primary btn-block w-100 mt-3" type="submit">Recuperar                         </button>
                   </div>
                   <p class="mt-4 mb-0 text-center">Ya tienes tu contraseña?<router-link class="ms-2" to="/auth/login">Iniciar sesión</router-link></p>
                 </form>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  </template>
  
  <script>
  export default {
    name: 'ForgetPassword'
  }
  </script>
  
  <style scoped>
  /* Estilos para tu componente de registro */
  </style>  
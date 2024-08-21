<template>
<breadcrumbs title="Mi personal" main="Mis Negocios" mainPath="/listar-Minegocio" />
    <!-- <Breadcrumbs main="Mis Negocios "  title="Mi personal"/> -->
     <div class="container-fluid">
             <div class="row starter-main">
                     <registrarPersonal />
                     <listarPersonal/>
             </div>
     </div> 
 </template> 
 <script>
 
import registrarPersonal from "@/pages/admin/personal/regisPersonal.vue"
import listarPersonal from "@/pages/admin/personal/listPersonal.vue"
 
 export default {
         components:{
            registrarPersonal ,
            listarPersonal
         }
 }
 </script>
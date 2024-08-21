<template>
    <breadcrumbs title="Horario" main="Mis Negocios" mainPath="/listar-Minegocio" />
         <div class="container-fluid">
                 <div class="row starter-main">
                    <listarHorario/>
                         <registrarHorario />
                        
                 </div>
         </div> 
     </template> 
     <script>
     
    import registrarHorario from "@/pages/admin/horarios/regisHorario.vue"
    import listarHorario from "@/pages/admin/horarios/listHorario.vue"
     
     export default {
             components:{
                registrarHorario,
                listarHorario
             }
     }
     </script>
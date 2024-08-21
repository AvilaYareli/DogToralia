<template>
   <Breadcrumbs title="Dogtoralia: Estetica Veterinaria"/>
    <div class="container-fluid">
            <div class="row starter-main">
                    <starterMain/>
                    <simpleCard/>
            </div>            
    </div>
</template>
<script>

import starterMain from "@/components/starterMain.vue"
import simpleCard from "@/components/simpleCard.vue"
export default {
        components:{
                starterMain,
                simpleCard                
        },
        
   data() {      
      return {
        token: localStorage.getItem('token'),
        userType: localStorage.getItem('userType') // 'pet_owner' o 'business_owner'
      };
    },    
    computed: {
      isPetOwner() {
        return this.userType === 'pet_owner';
      },
      isBusinessOwner() {
        return this.userType === 'business_owner';
      }
    },
    // mounted:{
    //   // dispatchEvent("",true,{});
    // }
    
}
    
    
        // // method:{
        // //         init: function() {
        // //            location.reload(); //  actualizar el header
        // //         }          
        // // },
        // methods:{
                
        // },
        // mounted()
        //              {
        //                 // location.reload();
        //              }
    


</script>
<template>
   <Breadcrumbs title="Dogtoralia: Estetica Veter"/>
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
        }
}
</script>
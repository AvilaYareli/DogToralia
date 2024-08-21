
  <template>
   <Breadcrumbs title="Pagina de Busines Owner"/>
    <div class="container-fluid">
            <div class="row starter-main">
                    <starterMain/>
                    <simpleCard/>
            </div>
    </div>
</template>
  
  <script>
import indexView from "@/layout/header/indexView.vue"
import starterMain from "@/components/starterMain.vue"
import simpleCard from "@/components/simpleCard.vue"
export default {
  name: 'indexUser',
        components:{
                starterMain,
                simpleCard
        }
}
  
  </script>
  
  <style >
  
  </style>
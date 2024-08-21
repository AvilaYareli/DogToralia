<template>
    <div class="card">
        <div class="card-header pb-0">
        <h3 class="h3 txt-success"> Direccion {{ userId }} </h3>
        <span>Selecciona la ubicación de tu negocio en el mapa y envia la ubicación</span>
      </div>
    <div class="card-body">
      <l-map
        :zoom="13"
        :center="center"
        style="height: 500px; width: 100%;"
        @click="setLocation"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker :lat-lng="marker"></l-marker>
      </l-map>
  
      <div class="card-footer d-flex justify-content-between">
        <p >Latitud: {{ marker.lat }}</p>
        <p >Longitud: {{ marker.lng }}</p>
       
        <button class="btn btn-secondary" @click="submitLocation">Enviar ubicación</button>
        
      </div>
    </div>
</div>
  </template>
  
  <script>
  
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
//   import { LMap, LTileLayer, LMarker } from "vue-leaflet";
//   import "leaflet/dist/leaflet.css";
  import axios from "axios";
  import { useToast } from 'vue-toastification';
  
  export default {
    props: {
    userId: {
      type: String,
      required: true,
    },
  },
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    data() {
      return {
        center: [19.3942, -99.0757], // Coordenadas iniciales
        marker: {
          lat: 19.3942,
          lng: -99.0757,
        
        },
      };
    },    
    methods: {
        //   ...mapActions(['refreshToken']),
      setLocation(event) {
        // Actualiza la ubicación del marcador
        this.marker = {
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        };
      },
      async submitLocation() {
        const toast = useToast(); // Definir toast aquí
        // Enviar la latitud y longitud a la API
        const token = localStorage.getItem('token');
        const data = {
          lat: this.marker.lat,
          lon: this.marker.lng,
        };
  
                    try {
                const response = await axios.post(
                `http://127.0.0.1:8000/api/business/set-address/${this.userId}`,
                data,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                );
                // alert('Ubicación enviada correctamente');
                toast.success('Ubicación Registrada correctamente.');
            } catch (error) {
                console.error(error);
                // alert('Error al enviar la ubicación');
                toast.error(response.data.message || 'Error al enviar la ubicación');
            }
      },
    },
  };
  </script>
  
  <style>
  /* Ajusta el tamaño del mapa */
  .l-map {
    height: 500px;
    width: 100%;
  }
  </style>
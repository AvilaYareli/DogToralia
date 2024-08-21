<template>
  <div class="card">
    <div class="container mt-5">
      <h1 class="text-center">Registrar Horario para Negocio {{ busiId }}</h1>
      <div class="row align-items-center">
      <form>
        <div v-for="(day, index) in schedule" :key="index" class="mb-4">
          <h4>{{ day.day_of_week }}</h4>

          <div class="d-flex justify-content-end">
            <button class="btn btn-outline-info-2x" @click.prevent="addSlot(index)">Añadir Franja Horaria</button>
          </div>

          <div v-for="(slot, idx) in day.time_slots" :key="idx" class="row mb-2">
            <div class="col-sm-6 col-md-3">
              <label>Apertura</label>
              <input type="time" v-model="slot.start_time" class="form-control" required />
            </div>
            <div class="col-sm-6 col-md-3">
              <label>Cierre</label>
              <input type="time" v-model="slot.end_time" class="form-control" required />
            </div>
            <div class="col-2 d-flex align-items-end">
              <span @click="removeSlot(index, idx)">
                <i class="icofont icofont-close-circled font-danger fs-4"></i>
              </span>
            </div>
          </div>                 
          <div class="d-flex justify-content mt-2">
            <button @click.prevent="fixSlots(index)" class="btn btn-primary">Fijar Horario del día</button>
          </div>
          <div class="custom-line"></div>
        </div>
      </form>
      </div>
      <div class=" p-3">
           <div class="d-flex justify-content-end mt-2">
           <button class="btn btn-outline-success" @click.prevent="submitSchedule(index)">Fijar Horarios</button>
          </div>
      </div>
    </div>
  </div>
  <!-- modal -->
  <div class="modal fade" id="scheduleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="scheduleModal">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="h5 txt-info-center">¿Deseas guardar el mismo horario para los siguientes días?</h5>
                <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" @click="hideModal"></button>
            </div>
            <div class="modal-body">
                <p>Seleccionaste el lunes. ¿Quieres aplicar el mismo horario para otros días?</p>
                
                <div class="days-checkboxes">
                    <label v-for="(day, index) in days" :key="index" class="day-checkbox">
                        <input type="checkbox" :value="day" v-model="selectedDays">
                        {{ day }}
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" @click.prevent="applyScheduleToSelectedDays" type="button">Sí</button>
                <button class="btn btn-secondary" type="button" @click="hideModal">No</button>
            </div>
        </div>
    </div>
</div>
 
</template>
<script>
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      selectedDays: [],
      busiId: this.$route.params.id,

      schedule: [
        { day_of_week: 'Monday', time_slots: [{ start_time: '', end_time: '' }] },
        { day_of_week: 'Tuesday', time_slots: [{ start_time: '', end_time: '' }] },
        { day_of_week: 'Wednesday', time_slots: [{ start_time: '', end_time: '' }] },
        { day_of_week: 'Thursday', time_slots: [{ start_time: '', end_time: '' }] },
        { day_of_week: 'Friday', time_slots: [{ start_time: '', end_time: '' }] },
        { day_of_week: 'Saturday', time_slots: [{ start_time: '', end_time: '' }] },
        { day_of_week: 'Sunday', time_slots: [{ start_time: '', end_time: '' }] }
      ]
    };
  },
  setup() {
    
    const toast = useToast();
    return { toast };
  },
  methods: {
    addSlot(index) {
        this.schedule[index].time_slots.push({ start_time: '', end_time: '' });
    },

    removeSlot(dayIndex, slotIndex) {
        this.schedule[dayIndex].time_slots.splice(slotIndex, 1);
    },

    showModal() {
      const modalElement = this.$refs.scheduleModal;
      const modal = new Modal(modalElement); // Crear una nueva instancia de Modal
      modal.show();
    },
    hideModal() {
      const modalElement = this.$refs.scheduleModal;
      const modal = Modal.getInstance(modalElement); // Obtener la instancia existente del modal
      if (modal) {
        modal.hide();
      }
    },

    async fixSlots(dayIndex) {
        const token = localStorage.getItem('token');
        if (!token) {
            this.toast.error('No se encontró ningún token, redireccionando para iniciar sesión');
            this.$router.push('/auth/login');
            return;
        }

        const selectedDay = this.schedule[dayIndex];
        const incompleteSlots = selectedDay.time_slots.some(slot => !slot.start_time || !slot.end_time);
        if (incompleteSlots) {
            this.toast.error('Por favor completa todas las franjas horarias antes de fijarlas.');
            return;
        }

        const invalidTimes = selectedDay.time_slots.some(slot => slot.start_time >= slot.end_time);
        if (invalidTimes) {
            this.toast.error('La hora de inicio debe ser antes que la hora de fin.');
            return;
        }

        // Verificar si es lunes y mostrar el modal
        if (selectedDay.day_of_week === 'Monday') {
            this.showModal();
            return; // No continuar con la solicitud hasta que el usuario seleccione una opción en el modal
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/business/schedule/${this.busiId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    schedule: [
                        {
                            day_of_week: selectedDay.day_of_week,
                            time_slots: selectedDay.time_slots  
                        }
                    ]
                })
            });

            if (!response.ok) throw new Error('Error al registrar las franjas horarias');

            this.toast.success('Franjas horarias registradas correctamente.');
        } catch (error) {
            this.toast.error('Hubo un error al registrar las franjas horarias.');
        }
    },

    applyScheduleToSelectedDays() {
        // Lógica para aplicar el mismo horario a los días seleccionados
        this.selectedDays.forEach(day => {
            const dayIndex = this.schedule.findIndex(d => d.day_of_week === day);
            if (dayIndex !== -1) {
                this.schedule[dayIndex].time_slots = [...this.schedule[0].time_slots]; // Copiar franjas horarias del lunes
            }
        });

        // Cierra el modal
        this.hideModal();
    },
    async submitSchedule() {
    const token = localStorage.getItem('token');
    if (!token) {
        this.toast.error('No se encontró ningún token, redireccionando para iniciar sesión');
        this.$router.push('/auth/login');
        return;
    }

    // Asegúrate de que todos los días tengan un array time_slots, aunque esté vacío
    const schedulePayload = this.schedule.map(day => {
        return {
            day_of_week: day.day_of_week,
            time_slots: day.time_slots.length > 0 ? day.time_slots : []
        };
    });

    // Imprimir el payload para verificarlo
    console.log(JSON.stringify({ schedule: schedulePayload }, null, 2));

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/business/schedule/${this.busiId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ schedule: schedulePayload })
        });

        if (!response.ok) throw new Error('Error al registrar el horario');

        this.toast.success('Horario registrado correctamente.');
    } catch (error) {
        this.toast.error('Todos las franjas horarias son obligatorias.');
    }
}
}
};
</script>
<style>
.days-checkboxes {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
}

.day-checkbox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.day-checkbox input {
    margin-bottom: 5px;
}
.custom-line {
    width: 100%;             /* La línea ocupa el 100% del contenedor */
    height: 1px;             /* Define la altura de la línea */
    background-color: #e0e0e0; /* Color gris claro */
    margin: 20px 0;          /* Ajusta el espacio superior e inferior */
}
</style>
<template>
    <h2>Event Management</h2>
    <div class="centered-container">
        <FullCalendar :options="calendarOptions" />

        <!-- Modal -->
        <Dialog v-model:visible="isModalOpen" header="Add Event" :modal="true">
            <InputText v-model="eventTitle" placeholder="Event Title" class="w-full-mb-4" />
            <Button label="Save" @click="saveEvent" />
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

//Prime Vue Components
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

//FullCalendar import
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'  // For month view
import timeGridPlugin from '@fullcalendar/timegrid' // For week view
import interactionPlugin from '@fullcalendar/interaction' // For drag and drop

import { useModalStore } from '@/stores/modalStore'  
const modalStore = useModalStore();
const events = ref([]); 

const currentUser = computed(() => modalStore.username || 'Guest');  

const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: events.value, 
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: (info) => {
        isModalOpen.value = true; 
        selectedDate.value = info.dateStr;
    },
}));

const isModalOpen = ref(false);
const eventTitle = ref('');
const selectedDate = ref('');


const saveEvent = () => {
    if (eventTitle.value) {
     
        events.value.push({
            title: `${eventTitle.value} - ${currentUser.value}`,  
            start: selectedDate.value,
            allDay: true,
        });

        
        eventTitle.value = '';
        isModalOpen.value = false;
    }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
  font-size: 2rem;
}

.centered-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.fc {
    font-size: 1.1rem; 
}
</style>

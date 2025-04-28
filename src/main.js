import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'

//Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// PrimeVue setup
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'


// PrimeVue components
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Ripple from 'primevue/ripple'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message';



// FullCalendar components
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

//



// Router
import router from './router'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(PrimeVue, { ripple: true })
app.directive('ripple', Ripple)
app.use(router) 

// Global component registration
app.component('Menubar', Menubar)
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Button', Button)
app.component('Card', Card)
app.component('Dialog', Dialog)
app.component('FloatLabel', FloatLabel)
app.component('Message', Message)

// FullCalendar components
app.component('FullCalendar', FullCalendar)
app.component('dayGridPlugin', dayGridPlugin)
app.component('timeGridPlugin', timeGridPlugin)
app.component('interactionPlugin', interactionPlugin)


app.mount('#app') 

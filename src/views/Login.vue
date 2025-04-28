<template>
  {{ modalStore.$state.username }}
  <div class="center-align">
    <Card class="card-container">
      <template #header>
        <h3>Login</h3>
      </template>

      

      
      <template #content>
        <Message v-if="showLoginError" severity="error">Invalid username or Password</Message>
        <Message v-if="showLoginSuccess" severity="success">Logged in!</Message>
        <Message v-if="showRegisterSuccess" severity="success">Account Created</Message>
        <div class="p-fluid p-mt-3" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <FloatLabel>
            <InputText id="username" v-model="username" />
            <label for="username">Username</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="password" v-model="password" type="password" />
            <label for="password">Password</label>
          </FloatLabel>
        </div>
      </template>
      
      <template #footer>
        <div class="button-gap">
          <Button label="Login" icon="pi pi-check" class="p-button-success w-full"  @click="login" />
          <Button label="Register" icon="pi pi-user-plus" severity="secondary" class="w-full" @click="visible = true" />
        </div>
      </template>
    </Card>
  </div>


  
    <Dialog class="modal-container" v-model:visible="visible" header="Register" :modal="true">
          <div class="p-fluid p-mt-3" style="display: flex; flex-direction: column; gap: 1.5rem;">
            <FloatLabel>
              <InputText id="new-username" v-model="newUsername" />
              <label for="new-username">New Username</label>
            </FloatLabel>

            <FloatLabel>
              <InputText id="new-password" v-model="newPassword" type="password" />
              <label for="new-password">New Password</label>
            </FloatLabel>
          </div>

          <template #footer>
            <div class="flex gap-2 justify-content-end">
                <Button label="Cancel" severity="secondary" icon="pi pi-times" class="w-full mt-2" @click="visible = false" />
                <Button label="Register" icon="pi pi-user-plus" class="p-button-success w-full mt-2" @click="register" />
            </div>
          </template>
    </Dialog>
</template>


<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore } from '@/stores/modalStore';  // Import the store to manage modal state


import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';


const username = ref('');
const password = ref('');
const newUsername = ref('');
const newPassword = ref('');
const visible = ref(false);
const router = useRouter();
const modalStore = useModalStore();
const showRegisterSuccess = ref(false);
const showLoginSuccess = ref(false);
const showLoginError = ref(false);


const register = () => {
  if( newUsername.value && newPassword.value ){
    modalStore.registerUser(newUsername.value, newPassword.value)
    //console.log('registered user', modalStore.username, modalStore.password);
    
    showRegisterSuccess.value = true;
    setTimeout(() => showRegisterSuccess.value=false, 3000);
    router.push('/');
  
  }else{
    alert('Please fill in both fields to register');
  }
  visible.value = false;
  newUsername.value = '';
  newPassword.value = '';
}

const login = () => {
  if( username.value && password.value ){
     
      modalStore.loginUser(username.value, password.value);

      if(modalStore.isLogin){
        visible.value = false;
        showLoginSuccess.value = true;

      setTimeout(() => {
        showLoginSuccess.value = false;
        router.push('/'); 
      }, 1000);
      
  } else {
      showLoginError.value = true;
      setTimeout(() => showLoginError.value=false, 3000);
  }
    
  
  } else {
    alert('Please fill in both fields to login');
  }
  username.value = '';
  password.value = '';

}
</script>

<style scoped>

.center-align {
  text-align: center;
  margin-top: 20px;
  font-size: 2rem;
}

.card-container {
  max-width: 500px;
  height:auto;
  margin:  auto;
  padding: 2rem;
}

.p-card-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.button-gap {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.button-gap .p-button {
  flex: 1;
}

.modal-container {
  width: 700px;
  max-width: 100%;
  margin: auto;
}

</style>


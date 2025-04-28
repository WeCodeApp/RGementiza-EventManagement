import {defineStore} from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isLogin: false,
        isVisible: false,
        username: '',
        password: '',
        persist: true,
        users: [
            {username: 'admin', password: '111'},
            {username: 'rl', password: '111'},
            
        ]

    }),
    actions: {
        openModal() {
            this.isVisible = true;
        },
        closeModal() {
            this.isVisible = false;
        },
        setUsername(username) {
            this.username = username;
        },
        setPassword(password) {
            this.password = password;
        },
        registerUser(username,password){
            this.username = username;
            this.password = password;
            this.isLogin = true;
        },
        loginUser(username, password) {
            const user = this.users.find(user => user.username === username && user.password === password);
            if (user) {
              this.isLogin = true;
              this.username = username;
              this.password = password;
            } else {
              this.isLogin = false;
            }
          },
        
        logoutUser(){
            this.username = '';
            this.password = '';
            this.isLogin = false;
        }
    },
    persist:  true
});
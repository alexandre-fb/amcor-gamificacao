import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { api } from '../services/api.js'

export const useUserStore = defineStore('userStore', {
    //state
    state() {

        const token = ref(localStorage.getItem('token'))
        const user = ref(JSON.parse(localStorage.getItem('user')))

        function setToken(tokenValue) {
            localStorage.setItem('token', tokenValue)
            token.value = tokenValue
        }

        function setUser(userValue) {
            localStorage.setItem('user', JSON.stringify(userValue))
            user.value = userValue
        }


        function clear() {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            token.value = ''
            user.value = ''
        }

        async function verifyToken() {
            // const response = await api.get('/token')

            // if(token.value === response.data.token) {
            if(token.value) {
                
                return true
            } else {
                return false
            }
            // const currentToken = localStorage.getItem('token')

            // // if(token.value === response.data.token) {
            // if(token.value === currentToken) {
            //     console.log('true')
            //     return true
            // } else {
            //     console.log('false')
            //     return false
            // }
        }

        return {
            token,
            user,
            setToken,
            setUser,
            verifyToken,
            clear
        }
    },
})
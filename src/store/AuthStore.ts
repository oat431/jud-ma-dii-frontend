import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth',() => {
    const data = ref();

    function $reset() {
        data.value = null;
    }
    return { data, $reset }
})
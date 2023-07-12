import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequesterStore = defineStore('requesterStore',() => {
    const data = ref();
    const details = ref(false);

    function $toggleDetails() {
        details.value = !details.value;
    }

    return { data , details, $toggleDetails }
})
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApproverStore = defineStore('approverStore',() => {
    const data = ref();
    const details = ref(false);

    function $toggleDetails() {
        details.value = !details.value;
    }

    return {
        data,
        details,
        $toggleDetails
    }
})
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequesterStore = defineStore('requesterStore',() => {
    const data = ref();
    const details = ref(false);
    const create = ref(false);
    const itemCreate = ref(false);

    function $toggleDetails() {
        details.value = !details.value;
    }

    function $toggleCreate() {
        create.value = !create.value;
    }

    function $toggleItemCreate() {
        itemCreate.value = !itemCreate.value;
    }

    return {
        data,
        details,
        $toggleDetails,
        create,
        $toggleCreate,
        itemCreate,
        $toggleItemCreate
    }
})
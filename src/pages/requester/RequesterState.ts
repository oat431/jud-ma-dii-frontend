import { defineStore } from 'pinia'
import { ref } from 'vue'
import ItemService from '../../services/ItemService';

export const useRequesterStore = defineStore('requesterStore',() => {
    const data = ref();
    const details = ref(false);
    const create = ref(false);
    const itemCreate = ref(false);
    const items = ref<any[]>([]);

    function $toggleDetails() {
        details.value = !details.value;
    }

    function $toggleCreate() {
        create.value = !create.value;
    }

    function $toggleItemCreate() {
        itemCreate.value = !itemCreate.value;
    }

    async function $refreshItemList() {
        const response = await ItemService.getItems();
        items.value = response.data;
    }

    return {
        data,
        details,
        $toggleDetails,
        create,
        $toggleCreate,
        itemCreate,
        $toggleItemCreate,
        items,
        $refreshItemList
    }
})
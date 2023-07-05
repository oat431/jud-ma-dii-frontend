import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoListStore = defineStore('requestBill',() => {
    const data = ref();
    return { data }
})
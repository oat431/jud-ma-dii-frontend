<script setup lang="ts">
import { useRequesterStore } from './RequesterState';
import { useRouter } from 'vue-router';
import RequesterAddItemModal from './RequesterAddItemModal.vue';
import RequesterService from '../../services/RequesterService';
import { onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const requester = useRequesterStore();
// const itemLists = ref();
const itemOrder = ref<any[]>([]);
const itemListRequest = ref<any[]>([]);
const billItemRequest = ref<any[]>([]);
const billRequest = ref<any>({
    name: String,
    description: String,
    items: billItemRequest.value
});
const close = () => {
    requester.$toggleCreate();
};
async function createOrder(values: { [x: string]: any }) {
    for (let i = 0; i < itemOrder.value.length; i++) {
        let billItemReq = {
            itemId: String,
            amount: Number
        }
        billItemReq.itemId = itemOrder.value[i].id;
        billItemReq.amount = itemListRequest.value[i];
        billItemRequest.value.push(billItemReq);
    }
    billRequest.value.name = values.name;
    billRequest.value.description = values.description;
    billRequest.value.billItems = billItemRequest.value;
    await RequesterService.createRequest(billRequest.value);
    router.go(0);
}
const schema = yup.object({
    name: yup
        .string()
        .required(),
    description: yup
        .string()
        .required(),
});

onMounted(async () => {
    requester.$refreshItemList();
});

const itemInOrder = ref();
function addItem(): void {
    if (itemInOrder.value === 'addmore') {
        requester.$toggleItemCreate();
        return;
    }
    for (let item of itemOrder.value) {
        if (item === itemInOrder.value) {
            alert('item already added')
            return;
        }
    }
    itemOrder.value.push(itemInOrder.value);
}

</script>
<template>
    <div class="modal" :class="{ 'modal-open': requester.create }">
        <div class="modal-box w-8/12 max-w-5xl">
            <section class="max-w-4xl my-6 p-6 mx-auto bg-white rounded-md shadow-md">
                <h2 class="text-lg font-semibold text-gray-700 capitalize">
                    Create New Order
                </h2>
                <Form @submit="createOrder" :validation-schema="schema">
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
                        <div>
                            <label class="text-gray-700" for="name">title</label>
                            <Field name="name" type="text"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                            <ErrorMessage name="name" class="text-red-500" />
                        </div>
                        <div>
                            <label class="text-gray-700" for="description">description</label>
                            <Field name="description" type="text"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                            <ErrorMessage name="description" class="text-red-500" />
                        </div>
                    </div>
                    <h2 class="text-lg font-semibold text-gray-700 mt-6 capitalize">
                        Item list
                    </h2>
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">

                        <div v-for="(order, index) in itemOrder">
                            <div>
                                <span>{{ order.name }}</span>
                            </div>
                            <div>
                                <input v-model="itemListRequest[index]"
                                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                    type="text" placeholder="amount" />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end mt-6">
                        <button class="btn btn-primary btn-sm">
                            create order
                        </button>
                    </div>
                </Form>
                <div>
                    <label class="label">
                        <span class="label-text text-xl">select item</span>
                    </label>
                    <select v-model="itemInOrder" @change="addItem()"
                        class="select select-bordered text-lg w-full max-w-xs m-3" name="item" placeholder="item">
                        <option disabled selected>Select item</option>
                        <option v-for="item in requester.items" :value="item" @click="addItem()">
                            {{ item.name }}
                        </option>
                        <option value="addmore">add more item</option>
                    </select>
                </div>
            </section>
            <div class="modal-action">
                <button @click="close()" class="btn btn-sm">close</button>
            </div>
        </div>
    </div>
    <RequesterAddItemModal />
</template>
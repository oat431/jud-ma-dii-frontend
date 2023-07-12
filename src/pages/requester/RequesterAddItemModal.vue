<script setup lang="ts">
import { useRequesterStore } from './RequesterState';
// import ItemService from '../../services/ItemService';
// import RequesterService from '../../services/RequesterService';
// import { ref } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ItemService from '../../services/ItemService';
import { ItemRequest } from '../../model/request/ItemRequest';

const requester = useRequesterStore();
const close = () => {
    requester.$toggleItemCreate();
};
async function createItem(item: { [x: string]: any }) {
    let request : ItemRequest = {
        name: item.name,
        description: item.description,
        price: item.price
    };
    await ItemService.createItem(request);
    requester.$toggleItemCreate();
}
const schema = yup.object({
    name: yup
        .string()
        .required(),
    description: yup
        .string()
        .required(),
    price: yup
        .number()
        .required(),
});
</script>
<template>
    <div class="modal" :class="{ 'modal-open': requester.itemCreate }">
        <div class="modal-box w-8/12 max-w-5xl">
            <section class="max-w-4xl my-6 p-6 mx-auto bg-white rounded-md shadow-md">
                <h2 class="text-lg font-semibold text-gray-700 capitalize">
                    Create New Order
                </h2>
                <Form @submit="createItem" :validation-schema="schema">
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
                        <div>
                            <label class="text-gray-700" for="price">price</label>
                            <Field name="price" type="text"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                            <ErrorMessage name="price" class="text-red-500" />
                        </div>
                    </div>
                    <div class="flex justify-end mt-6">
                        <button class="btn btn-primary btn-sm">
                            create item
                        </button>
                    </div>
                </Form>
            </section>
            <div class="modal-action">
                <button @click="close()" class="btn btn-sm">close</button>
            </div>
        </div>
    </div>
</template>
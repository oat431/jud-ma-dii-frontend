<script setup lang="ts">
import { useRequesterStore } from './RequesterState';
import { useRouter } from 'vue-router';
import RequesterService from '../../services/RequesterService';
import { ref } from 'vue';

const router = useRouter();
const requester = useRequesterStore();

const props = defineProps({
    details: {
        type: Object,
        required: true,
    },
});

const name = ref();
const description = ref();
const itemLists = ref<any[]>([]);

const close = () => {
    requester.$toggleDetails();
};

const totalEach = (item: { [x: string]: any }) => {
    return item.item.price * item.amount;
};

const updateMode = ref(false);
const toogleUpdateMode = () => {
    updateMode.value = !updateMode.value;
};

const billItemRequest = ref<any[]>([]);

const billRequest = ref<any>({
    name: String,
    description: String,
    items: billItemRequest.value
});

async function deleteRequest() {
    let check = confirm("Are you sure to delete this request?");
    if(check) {
        await RequesterService.deleteRequest(props.details.id);
        requester.$toggleDetails();
        router.go(0);
    }
}

async function updateBill() {
    let billItemRequest = ref<any[]>([]);
    let newName = name.value;
    let newDescription = description.value;
    let item = props.details.itemLists;

    for (let i = 0; i < item.length; i++) {
        let billItemReq = {
            itemId: String,
            amount: Number
        }
        billItemReq.itemId = item[i].item.id;
        billItemReq.amount = itemLists.value[i];
        billItemRequest.value.push(billItemReq);
    }
    billRequest.value.name = newName;
    billRequest.value.description = newDescription;
    billRequest.value.items = billItemRequest.value;
    await RequesterService.updateRequest(props.details.id, billRequest.value);
    toogleUpdateMode();
    router.go(0);
}
</script>
<template>
    <div v-if="props.details" class="modal" :class="{ 'modal-open': requester.details }">
        <div class="modal-box w-8/12 max-w-5xl">
            <h3 v-if="!updateMode" class="font-bold text-3xl">
                {{ props.details.name }}
                <span class="badge badge-ghost badge-sm">{{ props.details.status }}</span>
            </h3>
            <h3 v-else class="font-bold text-3xl">
                <input v-model="name" name="name" type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
            </h3>
            <p v-if="!updateMode" class="py-4 text-xl">{{ props.details.description }}</p>
            <p v-else class="py-4 text-xl">
                <input v-model="description" name="description" type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
            </p>
            <p class="py-4 text-xl">
                <span class="font-bold">total:</span>
                {{ props.details.total }} Bath
            </p>
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Price (Bath)</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in props.details.itemLists">
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center space-x-3">
                                <div>
                                    {{ item.item.name }}
                                </div>
                            </div>
                        </td>
                        <td>{{ item.item.description }}</td>
                        <td>{{ item.item.price }}</td>
                        <td>
                            <span v-if="!updateMode">
                                {{ item.amount }}
                            </span>
                            <span v-else>
                                <input v-model="itemLists[index]" name="description" type="text"
                                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                            </span>
                        </td>
                        <td>{{ totalEach(item) }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Total</th>
                        <th class="text-lg">
                            {{ props.details.total }}
                        </th>
                    </tr>
                </tfoot>
            </table>
            <p class="py-4 text-xl">
                <span class="font-bold">created by:</span>
                {{ props.details.createdBy }}
            </p>
            <p v-if="props.details.status === 'REJECTED'" class="py-4 text-xl">
                <span class="font-bold">reject because:</span>
                {{ props.details.reason }}
            </p>
            <p v-if="props.details.status === 'DELIVERED'" class="py-4 text-xl">
                <span class="font-bold">location of package:</span>
                {{ props.details.location.address }}, {{ props.details.location.state }},
                {{ props.details.location.city }} {{ props.details.location.zip }}
            </p>
            <div class="modal-action">
                <button @click="close()" class="btn btn-sm">close</button>
            </div>
            <div v-if="!updateMode">
                <button @click="toogleUpdateMode()" class="btn btn-sm m-3">update</button>
                <button @click="deleteRequest()" class="btn btn-sm m-3 btn-error">delete</button>
            </div>
            <div v-if="updateMode">
                <button @click="toogleUpdateMode()" class="btn btn-sm m-3">cancel</button>
                <button @click="updateBill()" class="btn btn-sm m-3">update</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import RequesterService from '../../services/RequesterService';
import RequesterDetailsModal from './RequesterDetailsModal.vue';
import { useRequesterStore } from './RequesterState';

const data = ref();
const reqDetails = ref();
const requester = useRequesterStore();
onMounted(async () => {
    const response = await RequesterService.getRequests(1, 10);
    data.value = response.data;
});

async function getRequesterDetails(id:number) {
    const response = await RequesterService.getRequest(id);
    reqDetails.value = response.data;
    requester.$toggleDetails();
}
</script>
<template>
    <DefaultLayout>
        <div class="overflow-x-auto">
            <h1 class="text-3xl m-3">
                Order
            </h1>
            <button class="btn btn-ghost">create new order</button>
        </div>
    </DefaultLayout>
    <DefaultLayout>
        <div v-if="data" class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data.content">
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center space-x-3">
                                <div>
                                    <div class="font-bold">{{ item.name }}</div>
                                    <div class="text-sm opacity-50">{{ item.username }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ item.description }}
                            <br />
                            <span class="badge badge-ghost badge-sm">{{ item.status }}</span>
                        </td>
                        <td>{{ item.total }}</td>
                        <th>
                            <button @click="getRequesterDetails(item.id)" class="btn btn-ghost btn-xs">Details</button>
                        </th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </DefaultLayout>
    <RequesterDetailsModal v-if="data" :details="reqDetails" />
</template>

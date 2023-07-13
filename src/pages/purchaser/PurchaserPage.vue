<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import PurchaserService from '../../services/PurchaserService';
import { usePurchaserStore } from './PurchaserState';
import PurchaserActionModal from './PurchaserActionModal.vue';

const purchaser = usePurchaserStore();
const data = ref();
const purchsing = ref();
const details = ref();

onMounted(async () => {
    const response = await PurchaserService.getRequests(1, 10);
    const response2 = await PurchaserService.getPurchasingRequests(1, 10);
    data.value = response.data;
    purchsing.value = response2.data;
});

async function seeBillDetails(id: string) {
    const response = await PurchaserService.getRequest(id);
    details.value = response.data;
    purchaser.$toggleDetails();
}

const textOverflow = (word: string) => {
    if (word.length > 20) {
        return word.substring(0, 20) + '...';
    }
    return word;
}
const titleOverflow = (word: string) => {
    if (word.length > 10) {
        return word.substring(0, 10) + '...';
    }
    return word;
}
</script>
<template>
    <DefaultLayout>
        <div v-if="data" class="overflow-x-auto">
            <h2 class="text-xl m-3">
                <span class="font-bold">Approved Requests</span>
            </h2>
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
                        <th>from</th>
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
                                    <div class="font-bold">{{ titleOverflow(item.name) }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ textOverflow(item.description) }}
                            <br />
                            <span class="badge badge-ghost badge-sm">{{ item.status }}</span>
                        </td>
                        <td>{{ item.total }}</td>
                        <td>{{ item.createdBy }}</td>
                        <th>
                            <button @click="seeBillDetails(item.id)" class="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th>from</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </DefaultLayout>
    <DefaultLayout>
        <div v-if="purchsing" class="overflow-x-auto">
            <h2 class="text-xl m-3">
                <span class="font-bold">Purchasing status</span>
            </h2>
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
                        <th>from</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in purchsing.content">
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center space-x-3">
                                <div>
                                    <div class="font-bold">{{ titleOverflow(item.name) }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ textOverflow(item.description) }}
                            <br />
                            <span class="badge badge-ghost badge-sm">{{ item.status }}</span>
                        </td>
                        <td>{{ item.total }}</td>
                        <td>{{ item.createdBy }}</td>
                        <th>
                            <button @click="seeBillDetails(item.id)" class="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th>from</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </DefaultLayout>
    <PurchaserActionModal :details="details"/>
</template>
<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import PurchaserService from '../../services/PurchaserService';
import { useRouter } from 'vue-router';

const router = useRouter();
const data = ref();

onMounted(async () => {
    const response = await PurchaserService.getRequests(1, 10);
    data.value = response.data;
});
async function purchase(id: string) {
    await PurchaserService.purchaserAction(id,false);
    router.go(0);
}
</script>
<template>
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
                        <td>{{ item.createdBy }}</td>
                        <th>
                            <button @click="purchase(item.id)" class="btn btn-ghost btn-xs">submit</button>
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
</template>
<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import ApproverService from '../../services/ApproverService';
import ApproverApprovePage from './ApproverApprovePage.vue';
import { useApproverStore } from './ApproverState';

const approver = useApproverStore();
const data = ref();
const details = ref();

onMounted(async () => {
    const response = await ApproverService.getRequests(1, 10);
    data.value = response.data;
});
async function seeBillDetails(id: number) {
    const response = await ApproverService.getRequest(id);
    details.value = response.data;
    approver.$toggleDetails();
}

const textOverflow = (text: string) => {
    if (text.length > 20) {
        return text.substring(0, 20) + '...';
    }
    return text;
};
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
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="truncate ...">
                                {{ textOverflow(item.description) }}
                            </span> 
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
    <ApproverApprovePage v-if="data" :details="details"/>
</template>
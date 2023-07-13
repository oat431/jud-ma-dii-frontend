<script setup lang="ts">
import { useApproverStore } from './ApproverState';
import { ref } from 'vue';
import ApproverService from '../../services/ApproverService';
import { useRouter } from 'vue-router';

const router = useRouter();
const approver = useApproverStore();

const props = defineProps({
    details: {
        type: Object,
        required: true,
    },
});

const close = () => {
    approver.$toggleDetails();
};

const totalEach = (item: { [x: string]: any }) => {
    return item.item.price * item.amount;
};

const action = ref(false);
const reason = ref('');

async function approverAction() {
    let rea = {
        reason: reason.value,
    }
    await ApproverService.ApproverAction(props.details.id, action.value, rea);
    router.go(0);
}

</script>
<template>
    <div v-if="props.details" class="modal" :class="{ 'modal-open': approver.details }">
        <div class="modal-box w-8/12 max-w-5xl">
            <h3 class="font-bold text-3xl">
                {{ props.details.name }}
                <span class="badge badge-ghost badge-sm">{{ props.details.status }}</span>
            </h3>
            <p class="py-4 text-xl">{{ props.details.description }}</p>
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
                    <tr v-for="item in props.details.itemLists">
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
                            {{ item.amount }}
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
            <div class="border p-4">
                <h2 class="text-2xl font-bold m-3">Approve form</h2>
                <div class="flex w-full">
                    <select v-model="action" class="select select-bordered select-md m-1">
                        <option disabled selected>action</option>
                        <option value=true >APPROVE</option>
                        <option value=false >REJECT</option>
                    </select>
                    <input v-model="reason" type="text" placeholder="reason" class="input input-bordered w-full m-1" />
                    <button @click="approverAction()" class="btn m-1">submit</button>
                </div>
            </div>
            <div class="modal-action">
                <button @click="close()" class="btn btn-sm">close</button>
            </div>
        </div>
    </div>
</template>

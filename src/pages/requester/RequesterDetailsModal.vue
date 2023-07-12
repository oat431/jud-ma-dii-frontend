<script setup lang="ts">
import { useRequesterStore } from './RequesterState';
const requester = useRequesterStore();
const close = () => {
    requester.$toggleDetails();
};
const props = defineProps({
    details: {
        type: Object,
        required: true,
    },
});
const totalEach = (item: { [x: string]: any }) => {
    return item.item.price * item.amount;
};
</script>
<template>
    <div v-if="props.details" class="modal" :class="{ 'modal-open': requester.details }">
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
                                    <div class="font-bold">{{ item.item.name }}</div>
                                </div>
                            </div>
                        </td>
                        <td>{{ item.item.description }}</td>
                        <td>{{ item.item.price }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ totalEach(item) }}</td>
                        <th>
                            <!-- <button @click="getRequesterDetails(item.id)" class="btn btn-ghost btn-xs">Details</button> -->
                        </th>
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
            <p v-if="props.details.status === 'REJECT'" class="py-4 text-xl">
                <span class="font-bold">reject because:</span>
                {{ props.details.reason }}
            </p>
            <p v-if="props.details.status === 'DELIVERED'" class="py-4 text-xl">
                <span class="font-bold">location of package:</span>
                {{ props.details.location.address }}, {{ props.details.location.city }}
                {{ props.details.location.zip }}
            </p>
            <div class="modal-action">
                <button @click="close()" class="btn btn-sm">close</button>
            </div>
        </div>
    </div>
</template>
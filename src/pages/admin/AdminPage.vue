<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import AdminService from '../../services/AdminService';
import { useRouter } from 'vue-router';

const router = useRouter();
const data = ref();

onMounted(async () => {
    const response = await AdminService.getUsers(1, 10, true);
    data.value = response.data;
});
const name = (msg: string) => msg.substring(5)

function seeDetail(uuid:string) {
    router.push({name: 'AdminAssign', params: {uuid: uuid}});
}
</script>
<template>
    <DefaultLayout>
        <div v-if="data" class="overflow-x-auto">
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Ages</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="item in data.content">
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center space-x-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img :src="item.profilePicture" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{{ item.platformName }}</div>
                                    <div class="text-sm opacity-50">{{ item.username }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ item.name }}
                            <br />
                            <span class="badge badge-ghost badge-sm">{{ name(item.role) }}</span>
                        </td>
                        <td>{{ item.age }}</td>
                        <th>
                            <button @click="seeDetail(item.id)" class="btn btn-ghost btn-xs">Details</button>
                        </th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Roles</th>
                        <th>Ages</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </DefaultLayout>
</template>
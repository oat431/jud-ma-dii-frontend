<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import AuthService from '../../services/AuthService';
import { onMounted,ref } from 'vue';
const data = ref();
const name = (msg: string) => msg.substring(5)
onMounted(async () => {
    const res = await AuthService.getAccountDetails();
    data.value = res.data;
});
</script>
<template>
    <DefaultLayout>
        <div v-if="data" class="card card-side bg-base-100 shadow-xl">
            <figure><img :src="data.profilePicture" alt="Movie" /></figure>
            <div class="card-body">
                <h2 class="card-title mb-2">
                    {{ data.name }}
                    <span class="badge badge-neutral">{{ name(data.role) }}</span>
                </h2>
                <p><span class="font-bold">platform name:</span>{{ data.platformName }}</p>
                <p><span class="font-bold">username:</span>{{ data.username }}</p>
                <p><span class="font-bold">age:</span>{{ data.age }}</p>
                <p><span class="font-bold">email:</span>{{ data.email }}</p>
                <p><span class="font-bold">tel:</span>{{ data.tel }}</p>
                <p>
                    <span class="font-bold">location:</span>
                    {{ data.location.address }}, {{ data.location.city }}
                    {{ data.location.country }}, {{ data.location.zip }}
                </p>
            </div>
        </div>
    </DefaultLayout>
</template>
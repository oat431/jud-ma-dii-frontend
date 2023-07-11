<script setup lang="ts">
import { useAuthStore } from '../store/AuthStore';
import AuthService from '../services/AuthService';
import { onMounted } from 'vue';
import { useRouter } from "vue-router";

const authData = useAuthStore();
const router = useRouter();
function logout() {
    AuthService.logout();
    authData.$reset();
    router.push({name: 'Home'});
}
onMounted(async() => {
    if(localStorage.getItem('token') && !authData.data) {
        const response = await AuthService.getCredentials();
        authData.data = response.data;
        switch(authData.data.role) {
            case 'ROLE_ADMIN':
                router.push({name: 'Admin'});
                break;
            case 'ROLE_REQUESTER':
                router.push({name: 'Requester'});
                break;
            case 'ROLE_APPROVER':
                router.push({name: 'Approver'});
                break;
            case 'ROLE_PURCHASER':
                router.push({name: 'Purchaser'});
                break;
        }
    }

});
</script>
<template>
    <div class="navbar bg-base-100 shadow">
        <div class="flex-1">
            <router-link to="/" class="btn btn-ghost normal-case text-xl">JudSue JudJang</router-link>
        </div>
        <div v-if="authData.data" class="flex-none">
            <div>
                Welcome {{ authData.data.sub }}
            </div>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://picsum.photos/id/237/200/300" />
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a @click="logout()">Logout</a></li>
                </ul>
            </div>
        </div>
        <div v-else class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><router-link to="/login">Login</router-link></li>
                <li><router-link to="/register">Register</router-link></li>
            </ul>
        </div>
    </div>
</template>

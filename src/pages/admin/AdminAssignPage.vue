<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import AdminService from '../../services/AdminService';
import { useRoute,useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const route = useRoute();
const router = useRouter();
const uuid = route.params.uuid;
const data = ref();
const name = (msg: string) => msg.substring(5)
const schema = yup.object({
    role: yup
        .string()
        .required()
});
onMounted(async () => {
    const response = await AdminService.getUser(uuid.toString());
    data.value = response.data;
});
function assignRole(value: { [x: string]: string }) {
    AdminService.assignRole(uuid.toString(), value.role);
    router.go(0);
}
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
    <DefaultLayout>
        <Form @submit="assignRole" :validation-schema="schema">
            <label class="label">
                <span class="label-text text-xl">select role for this account</span>
            </label>
            <Field class="select select-bordered w-full max-w-xs m-3" name="role" as="select" placeholder="Role">
                <option disabled selected>Select Role</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_REQUESTER">Requester</option>
                <option value="ROLE_APPROVER">APPROVER</option>
                <option value="ROLE_PURCHASER">PURCHASER</option>
            </Field>
            <ErrorMessage name="role" />
            <button class="btn" type="submit">Submit</button>
        </Form>
    </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "../../services/AuthService";
import nProgress from 'nprogress';
import * as yup from "yup";
import { useRouter } from "vue-router";

const router = useRouter();
const schma = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
});
const handleLogin = async (value: { [x: string]: string }) => {
    nProgress.start();
    const response = await AuthService.login(value.username, value.password)
    localStorage.setItem('token', response.data.token);
    nProgress.done();
    router.go(0)
}

</script>
<template>
    <DefaultLayout>
        <section class="max-w-md p-6 my-10 mx-auto bg-white rounded-md shadow-md">
            <h2 class="text-3xl font-bold text-center font-semibold text-gray-700 capitalize">
                Sign In
            </h2>

            <Form @submit="handleLogin" :validation-schema="schma">
                <div>
                    <div class="my-4">
                        <label class="text-gray-700" for="username">Username</label>
                        <Field name="username" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="username" class="text-red-500" />
                    </div>
                    <div class="my-4">
                        <label class="text-gray-700" for="password">Password</label>
                        <Field name="password" type="password"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="password" class="text-red-500" />
                    </div>
                </div>
                <div class="flex justify-center mt-6">
                    <button
                        class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                        Login
                    </button>
                </div>
            </Form>
        </section>
    </DefaultLayout>
</template>
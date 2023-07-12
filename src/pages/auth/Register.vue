<script setup lang="ts">
import DefaultLayout from '../../layout/DefaultLayout.vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { RegisterForm } from '../../model/request/RegisterForm';
import AuthService from '../../services/AuthService';
import { useRouter } from 'vue-router';

const router = useRouter();
async function handleRegister(value: { [x: string]: string }) {
    let user : RegisterForm = {
        profilePicture: 'https://picsum.photos/id/237/200/300',
        platformName: value.username,
        username: value.username,
        firstName: value.firstname,
        lastName: value.lastname,
        tel: value.tel,
        password: value.password,
        birthday: value.birth,
        email: value.email,
        address: value.address,
        city: value.city,
        state: value.state,
        country: 'Thailand',
        zip: value.zip
    };
    await AuthService.register(user);
    router.push({ name: 'Login'});
}
const schema = yup.object({
    username: yup
        .string()
        .required()
        .min(4, 'Username must be at least 4 characters')
        .max(20, 'Username must be at most 20 characters'),
    password: yup
        .string()
        .required()
        .min(8, 'Password must be at least 8 characters')
        .max(30, 'Password must be at most 30 characters')
        ,
    passwordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'Passwords must match'),
    email: yup
        .string()
        .required()
        .email('Email must be a valid email'),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    birth: yup.string().required(),
    tel: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
});

</script>
<template>
    <DefaultLayout>
        <section class="max-w-4xl my-6 p-6 mx-auto bg-white rounded-md shadow-md">
            <h2 class="text-lg font-semibold text-gray-700 capitalize">
                Account settings
            </h2>

            <Form @submit="handleRegister" :validation-schema="schema">
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-gray-700" for="username">Username</label>
                        <Field name="username" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="username" class="text-red-500" />
                    </div>

                    <div>
                        <label class="text-gray-700" for="email">Email Address</label>
                        <Field name="email" type="email"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="email" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="firstname">Firstname</label>
                        <Field name="firstname" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="firstname" class="text-red-500" />
                    </div>

                    <div>
                        <label class="text-gray-700" for="lastname">Lastname</label>
                        <Field name="lastname" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="lastname" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="birth">Birth day</label>
                        <Field name="birth" type="date"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="birth" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="password">Password</label>
                        <Field name="password" type="password"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="password" class="text-red-500" />
                    </div>

                    <div>
                        <label class="text-gray-700" for="passwordConfirmation">Password Confirmation</label>
                        <Field name="passwordConfirmation" type="password"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="passwordConfirmation" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="tel">Tel</label>
                        <Field name="tel" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="tel" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="address">Address</label>
                        <Field name="address" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="address" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="city">city</label>
                        <Field name="city" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="city" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="state">state</label>
                        <Field name="state" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="state" class="text-red-500" />
                    </div>
                    <div>
                        <label class="text-gray-700" for="zip">zip</label>
                        <Field name="zip" type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        <ErrorMessage name="zip" class="text-red-500" />
                    </div>
                </div>
                <div class="flex justify-end mt-6">
                    <button
                        class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                        Sign up
                    </button>
                </div>
            </Form>
        </section>
    </DefaultLayout>
</template>../../model/request/RegisterForm
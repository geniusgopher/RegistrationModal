<template>
    <div class="relative">
        <input v-if="inputTypePhone" type="text" v-mask="'+7 (###) ###-##-##'" :id="props.name" placeholder=" "
            :value="props.modelValue" @input="handleInput"
            class="peer 2xl:h-16 h-14 2xl:p-4 2xl:pb-2 p-3 pb-1 2xl:text-lg text-base text-blue-800 font-medium w-full rounded-lg border-2 border-gray-100  placeholder-transparent focus:outline-none focus:border-blue-600" />
        <input v-else :type="props.type" :id="props.name" placeholder=" " :value="props.modelValue" @input="handleInput"
            class="peer 2xl:h-16 h-14 2xl:p-4 2xl:pb-2 p-3 pb-1 2xl:text-lg text-base text-blue-800 font-medium w-full rounded-lg border-2 border-gray-100  placeholder-transparent focus:outline-none focus:border-blue-600" />
        <label :for="props.name"
            class="absolute text-sm left-4 top-1 text-blue-800 transition-all duration-200 2xl:peer-placeholder-shown:top-5  peer-placeholder-shown:top-4 peer-placeholder-shown:text-blue-800  peer-focus:top-1 peer-focus:text-blue-800 peer-placeholder-shown:text-base  peer-focus:text-sm">
            {{ props.label }}
        </label>

        <div class="text-sm text-red-500 h-6 2xl:h-8 mt-1 ">
            {{ errorText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
    label: string;
    modelValue: string;
    name: string;
    errorText?: string;
    type: 'text' | 'email' | 'phone';
}>()


const inputTypePhone = computed(() => props.type === 'phone')

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const handleInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}

</script>
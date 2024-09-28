<template>

    <div class="grid grid-cols-2 gap-x-4">
        <p class="col-span-2 2xl:mb-1">{{ label }}</p>

        <div class="relative">
            <input :type="type" v-model="modelValue.from" @input="handleInput($event, true)"
                class="2xl:h-16 h-14 2xl:p-4 2xl:pb-2 p-3 pb-1 w-full rounded-lg border-2 border-gray-100 text-gray-900 text-right" />
            <label class="absolute text-sm left-4 top-5 text-blue-800">
                От
            </label>
        </div>
        <div class="relative">
            <input :type="type" v-model="modelValue.to" @input="handleInput($event, false)"
                class="2xl:h-16 h-14 2xl:p-4 2xl:pb-2 p-3 pb-1 w-full rounded-lg border-2 border-gray-100 text-gray-900  text-right" />
            <label class="absolute text-sm left-4 top-5 text-blue-800">
                До
            </label>
        </div>

        <div class="text-sm text-red-500 h-6 2xl:h-8 mt-1 col-span-2">
            {{ errorText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const {
    label,
    type = 'number',
    modelValue,
    errorText,
} = defineProps<{
    label: string;
    type?: 'date' | 'number';
    errorText?: string;
    modelValue: {
        from: Date | string | number | undefined;
        to: Date | string | number | undefined;
    };
}>()


const emit = defineEmits<{
    (e: 'input', value: {
        from: string;
        to: string;
    }): void
}>()

const handleInput = (e: Event, isFromField: boolean) => {
    if (isFromField) {
        emit('input', {
            from: (e.target as HTMLInputElement).value,
            to: modelValue.to as string,
        })
        return
    }
    emit('input', {
        from: modelValue.from as string,
        to: (e.target as HTMLInputElement).value,
    })
}

</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
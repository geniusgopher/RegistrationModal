<template>
    <div class="w-full">
        <div class="relative mt-1" v-click-outside="close">
            <div class="relative w-full cursor-pointer rounded-md 2xl:h-16 h-14 border border-gray-100 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                @click="toggleDropdown">
                <label v-if="label" class="block font-normal text-blue-800"
                    :class="{ 'text-base mt-2': !selectedLabel, ' text-sm': selectedLabel }">{{ label }}</label>
                <span v-if="selectedLabel" class="block truncate 2xl:text-lg text-base font-medium">
                    {{ selectedLabel }}
                </span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.292 7.707a1 1 0 011.415 0L10 11l3.293-3.293a1 1 0 111.415 1.414l-4 4a1 1 0 01-1.415 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </div>

            <div v-if="isOpen"
                class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <ul class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm"
                    tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3">
                    <li v-for="option in options" :key="option.value" @click="toggleSelection(option)"
                        class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" :class="{
                            'bg-indigo-600 text-white': isSelected(option.value),
                            'text-gray-900 hover:bg-gray-100': !isSelected(option.value),
                        }">
                        <span
                            :class="{ 'font-semibold': isSelected(option.value), 'font-normal': !isSelected(option.value) }"
                            class="block truncate">
                            {{ option.label }}
                        </span>
                        <span v-if="isSelected(option.value)"
                            class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>

            <div class="text-sm text-red-500 h-6 2xl:h-8 mt-1 col-span-2">
                {{ errorText }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';

interface Option {
    label: string;
    value: string | number;
}

interface Props {
    modelValue: string | number | (string | number)[];
    options: Option[];
    label?: string;
    multiple?: boolean;
    errorText?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | (string | number)[]): void;
}>();

const isOpen = ref<boolean>(false);
const selectedValues = ref<(string | number)[]>(props.modelValue ? props.modelValue as (string | number)[] : []);

watch(() => props.modelValue, (newVal) => {
    selectedValues.value = Array.isArray(newVal) ? newVal : [newVal];
});

const close = (): void => {
    isOpen.value = false;
};

const toggleDropdown = (): void => {
    isOpen.value = !isOpen.value;
};

const toggleSelection = (option: Option): void => {
    if (props.multiple) {
        if (selectedValues.value.includes(option.value)) {
            selectedValues.value = selectedValues.value.filter(value => value !== option.value) ?? [];
        } else {
            selectedValues.value.push(option.value);
        }
    } else {
        selectedValues.value = [option.value];
        isOpen.value = false;
    }
    emit('update:modelValue', props.multiple ? selectedValues.value : selectedValues.value[0]);
};

const isSelected = (value: string | number): boolean => {
    return selectedValues.value.includes(value);
};

const selectedLabel = computed((): string => {
    if (props.multiple) {
        return props.options
            .filter(option => selectedValues.value.includes(option.value))
            .map(option => option.label)
            .join(', ') || '';
    }
    const selectedOption = props.options.find(option => {
        return option.value === selectedValues.value[0];
    });
    return selectedOption ? selectedOption.label : '';
});
</script>
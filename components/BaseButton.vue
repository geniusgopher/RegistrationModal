<template>
    <button :type="type" class="rounded-full bg-blue-800 text-sm text-white hover:bg-blue-900"
        :class="className" @click="emit('click')">
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const {
    text = 'Отправить',
    type = 'button',
    class: className = 'px-10 py-3',
} = defineProps<{
    text: string;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
}>();

const emit = defineEmits<{
    (e: 'click'): void
}>()
</script>
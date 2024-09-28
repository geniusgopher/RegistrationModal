<template>
    <div>
        <header class="h-24 bg-slate-200 flex items-center px-8">
            <h1 class="text-lg text-blue-900 grow font-semibold">
                Заполните заявку, чтобы стать резидентом
            </h1>

            <BaseButton @click="open" @close="close" class="px-10 py-3" text="Стать резидентом" />
        </header>

        <ClientOnly>
            <ModalsContainer />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import { ModalsContainer } from 'vue-final-modal'
import ModalLegalForm from '~/components/ModalLegalForm.vue'
import BaseButton from '~/components/BaseButton.vue';

const { open, close } = useModal({
    component: ModalLegalForm,
})
</script>

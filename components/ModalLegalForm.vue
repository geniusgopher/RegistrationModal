<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import TextField from './TextField.vue';
import { ref } from 'vue'
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import BaseRange from './BaseRange.vue';

import { useForm } from 'vee-validate';
import * as yup from 'yup';

const options = ref([
    { label: 'Производственная площадь', value: 1 },
    { label: 'Офисная площадь', value: 2 },
    { label: 'Складская площадь', value: 3 },
    { label: 'Торговая площадь', value: 4 },
]);

const emit = defineEmits<{
    (e: 'close'): void
}>()

const schema = yup.object({
    name: yup.string().required('Введите наименование организации'),
    phone: yup.string()
        .required('Введите контактный телефон')
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите телефон в формате +7 (999) 999-99-99'),
    address: yup.string().required('Введите адрес'),
    space: yup.string().required('Выберите тип помещения'),
    spaceArea: yup.object().shape({
        from: yup.number()
            .positive('Площадь не может быть отрицательной')
            .required('Введите начальную площадь')
            .typeError('Введите начальную площадь в числовом формате'),
        to: yup.number()
            .positive('Площадь не может быть отрицательной')
            .required('Введите конечную площадь')
            .typeError('Введите конечную площадь в числовом формате')
            .when('from', (from: any, schema: any) => {
                if (from) return schema.min(from, 'Конечная площадь должна быть больше начальной');
            }),
    }),
    rangeDatesValue: yup.object().shape({
        from: yup.date()
            .required('Введите начальную дату')
            .typeError('Введите начальную дату в формате ГГГГ-ММ-ДД'),
        to: yup.date()
            .required('Введите конечную дату')
            .typeError('Введите конечную дату в формате ГГГГ-ММ-ДД')
            .when('from', (from: any[], schema: any) => {
                const [fromValue] = from
                if (fromValue) return schema.min(fromValue, 'Конечная дата должна быть больше начальной');
            }),
    }),
});

const { handleSubmit, errors, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        phone: '',
        address: '',
        space: '',
        spaceArea: {
            from: 0,
            to: 100,
        },
        rangeDatesValue: {
            from: null,
            to: null,
        },
    },
});

const onSubmit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2));
    emit('close');
});

const [name, nameAttrs] = defineField('name');
const [phone, phoneAttrs] = defineField('phone');
const [address, addressAttrs] = defineField('address');
const [spaceArea, spaceAreaAttrs] = defineField('spaceArea');
const [rangeDatesValue, rangeDatesAttrs] = defineField('rangeDatesValue');
const [space, spaceAttrs] = defineField('space');

</script>

<template>
    <VueFinalModal class="flex justify-center items-center" content-class="relative p-12 bg-white"
        content-transition="vfm-fade" overlay-transition="vfm-fade">

        <div class="w-[720px] 2xl:w-[800px]">
            <h1 class="2xl:text-2xl text-xl 2xl:mb-6 mb-4 font-bold text-blue-900">Заполните заявку, чтобы стать
                резидентом</h1>
            <form @submit.prevent="onSubmit">
                <div class="grid grid-cols-1 text-blue-800">
                    <TextField type="text" name="name" v-model="name" v-bind="nameAttrs" :error-text="errors.name"
                        label="Наименование организации / ИП" />
                    <TextField type="phone" name="phone" label="Контактный телефон" v-model="phone" v-bind="phoneAttrs"
                        :error-text="errors.phone" />
                    <BaseSelect v-model="space" :options="options" label="Тип помещения" v-bind="spaceAttrs"
                        :error-text="errors.space" />
                    <TextField type="text" name="address" label="Адрес" v-model="address" v-bind="addressAttrs"
                        :error-text="errors.address" />
                    <BaseRange label="Площадь помещения (м2)" type="number" v-model="spaceArea" v-bind="spaceAreaAttrs"
                        :error-text="errors.spaceArea" />
                    <BaseRange label="Дата начала аренды" type="date" v-model="rangeDatesValue" v-bind="rangeDatesAttrs"
                        :error-text="errors.rangeDatesValue" />

                    <div class="flex justify-center">
                        <BaseButton text="Отправить" class="px-10 py-3" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    </VueFinalModal>
</template>
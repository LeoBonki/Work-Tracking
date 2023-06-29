<template>
    <h5>Filter</h5>
    <div v-for="(item, index) in FILTER_MODENAME" :key="index" style="padding: 5px;">
        <button @click="ChangeFilterSelected(index)" type="button"
            :class="{ 'btn btn-light close-button': true, 'active-item': formFilterSelected === index }">{{ item }}</button>
    </div>

    <div v-if="formFilterSelected === 1">
        <ComponentModal :isOpenModal="isOpenModal" @ModalClose="ModalClose">
            <div class="space-container"></div>
            <div class="container">
                <ComponentCalendar :SettingOnlyMonth="true" @user-inputs="eventInputCalendarData" />
            </div>
            <div class="space-container"></div>
        </ComponentModal>
    </div>
    <div v-else-if="formFilterSelected === 2">
        <ComponentModal :isOpenModal="isOpenModal" @ModalClose="ModalClose">
            <div class="space-container"></div>
            <div class="container">
                <ComponentCalendar :SettingOnlyMonth="false" @user-inputs="eventInputCalendarData" />
            </div>
            <div class="space-container"></div>
        </ComponentModal>
    </div>
</template>

<script>
import ComponentModal from './ComponentModal.vue';
import ComponentCalendar from './ComponentCalendar.vue';

const FILTER_MODENAME = ['all time', 'for month', 'select in calendar'];
const DATE_CURRENT = new Date();
const DATE_CURRENT_FORMAT = `${DATE_CURRENT.getFullYear()}-${(DATE_CURRENT.getMonth() + 1).toString().padStart(2, '0')}-${(DATE_CURRENT.getDate()).toString().padStart(2, '0')}`;

export default {
    data() {
        return {
            isOpenModal: false,
            formFilterDate: DATE_CURRENT_FORMAT,
            formFilterSelected: 0,
            FILTER_MODENAME,
        };
    },
    components: {
        ComponentModal,
        ComponentCalendar
    },
    emits: ['user-inputs'],
    methods: {
        ChangeFilterSelected(index) {
            this.formFilterSelected = index;
            if (index !== 0) this.ModalOpen();
            else this.$emit('user-inputs', this.formFilterSelected, '');
        },
        ModalOpen() {
            this.isOpenModal = true;
        },
        ModalClose() {
            this.isOpenModal = false;
        },
        eventInputCalendarData(date) {
            if (this.formFilterSelected === 0) return;

            this.ModalClose();
            this.formFilterDate = date;
            this.$emit('user-inputs', this.formFilterSelected, this.formFilterDate);
        },
    },
};
</script>

<style scoped>
.space-container {
    width: 100%;
    height: 70px;
    background-color: transparent;
}

.active-item {
    background-color: #41B883;
}

button {
    width: 100%;

}
</style>

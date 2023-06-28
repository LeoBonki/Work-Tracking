<template>
    <!-- ADD POST -->

    <div class="element-item">
        <!--Input date-->
        <div class="element-form">
            <h6>Date</h6>
            <button @click="ModalOpen()" type="button" class="btn btn-light close-button">Date:{{ this.formAddDate
            }}</button>
        </div>

        <!--Input hours-->
        <div class="element-form">
            <h6>Hours</h6><select class="form-control" v-model="this.formAddPostHours">
                <option disabled value="">Выберите вариант</option>
                <option v-for="hour in computedRangeArr" :value="hour" :key="hour">{{ hour }}</option>
            </select>
        </div>

        <!--Input descirption-->
        <div class="element-form">
            <h6>Description</h6>
            <input class="form-control" v-model="formAddPostDescription" />
        </div>

        <!--Input task-->
        <div v-if="UseInputAutoHink" class="element-form">
            <h6>Task</h6>
            <ComponentInputAutoHint :DataStore="computedSelectNameInObj" @user-inputs="eventInputTaskName" />
        </div>

        <!--Add button-->
        <div style="padding: 15px; margin-top: 20px;">
            <div v-if="this.UseInputAutoHink">
                <button :disabled="isButtonPostAddDisable === -1" type="button" class="btn btn-success"
                    @click="eventClickAddPost">Ok</button>
            </div>
            <div v-else>
                <button :disabled="!(this.formAddPostDescription.length)" type="button" class="btn btn-success"
                    @click="eventClickAddPost">Ok</button>
            </div>
        </div>

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
import ComponentCalendar from './ComponentCalendar.vue';
import ComponentInputAutoHint from './ComponentInputAutoHint.vue';
import ComponentModal from './ComponentModal.vue';
import { DATA_API, requestGet } from '../api_request.js';

const DATA_INPUT_FORMS = [["Please input name", "Please input code", "Please input status"], ["Please input name", "Please input status"]];
const DATE_CURRENT = new Date();
const DATE_CURRENT_FORMAT = `${DATE_CURRENT.getFullYear()}-${(DATE_CURRENT.getMonth() + 1).toString().padStart(2, '0')}-${(DATE_CURRENT.getDate()).toString().padStart(2, '0')}`;

export default {
    // Loading the current vue variables
    data() {
        return {
            // CONST
            DATE_CURRENT,
            DATA_INPUT_FORMS,
            formAddDate: DATE_CURRENT_FORMAT,

            // API
            dataApiTask: [],

            // JOB POST
            isOpenModal: false,
            formAddPostTaskName: '',
            formAddPostDescription: '',
            formAddPostHours: 1,
        }
    },
    props: {
        UseInputAutoHink: { UseInputAutoHink: Boolean, required: true },
    },
    // Loading other vue components
    components: {
        ComponentCalendar,
        ComponentInputAutoHint,
        ComponentModal
    },
    computed: {
        computedRangeArr() {
            return Array.from({ length: 24 }, (_, index) => index + 1);
        },
        computedSelectNameInObj() {
            return this.dataApiTask
                .filter(obj => obj.status === true)
                .map(obj => obj.name);
        },
        isButtonPostAddDisable() {
            if (this.formAddPostTaskName.length && this.formAddPostDescription.length) {
                const foundObject = this.dataApiTask.find(item => item.name === this.formAddPostTaskName && item.status);
                if (foundObject) return foundObject.index;
            }
            return -1;
        },
    },
    methods: {

        // API ASYNC REQUEST
        async GetTask() {
            const response = await requestGet(DATA_API.API_TASK);
            if (response !== false) this.dataApiTask = response;
        },

        // EVENT INPUT
        eventInputCalendarData(date) {
            this.formAddDate = date;
            this.ModalClose();
        },
        eventInputTaskName(taskName) {
            this.formAddPostTaskName = taskName;
        },
        eventClickAddPost() {
            if (this.UseInputAutoHink) {
                const valueIndexTask = this.isButtonPostAddDisable;
                if (!valueIndexTask) return;
                this.$emit('user-inputs', [this.formAddDate, this.formAddPostHours, this.formAddPostDescription, valueIndexTask]);
            }
            else this.$emit('user-inputs', [this.formAddDate, this.formAddPostHours, this.formAddPostDescription]);

            this.formAddPostHours = 1;
            this.formAddPostTaskName = ''
            this.formAddPostDescription = '';
        },
        // MODAL
        ModalOpen() {
            this.isOpenModal = true;
        },
        ModalClose() {
            this.isOpenModal = false;
        },
    },
    // Mounted function
    mounted() {
        this.GetTask();
    },
};
</script>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    color: white;
}

.space-container {
    width: 100%;
    height: 75px;
    background-color: transparent;
}

.element-item {
    margin-bottom: 50px;
    width: 800px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
}

.element-item button {
    margin-top: 5px;
    width: 100%;
}

.element-form {
    padding: 10px;
}

option {
    background-color: white;
    width: 300px;
    height: 35px;
    font-size: 20px;
}
</style>
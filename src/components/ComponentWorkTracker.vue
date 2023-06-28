<template>
    <!-- DESCRIPTION PROJECT -->
    <div class="container">
        <div class="element-description">
            <h5>Work tracking</h5>
            <p>It`s my first project in Vue.js</p>
            <p>Front-end: Vue.js</p>
            <p>Back-end: c# AspNetCore</p>
        </div>
    </div>

    <!-- ONLY PROJECT & TASK -->
    <div v-if="this.ElementIndex !== 2">

        <!-- DESCRIPTION ELEMENT -->
        <div class="container">
            <div class="element-description">
                <h5>{{ GetElementTitle }}</h5>
                <li>Get</li>
                <li>Post</li>
                <li>Put</li>
                <li>Delete</li>
            </div>
        </div>

        <!-- ADD ELEMENT -->
        <div class="space-container"></div>
        <div class="container">
            <h5>Add element</h5>
            <ComponentInputForms :DataInputForms="DATA_INPUT_FORMS[ElementIndex]" @user-inputs="HandlerInput_AddItem" />
        </div>
        <div class="space-container"></div>

        <!-- Cycle by project list -->
        <div class="container" v-for="(item, index) in dataApiResponse" :key="index">

            <!-- PROJECT -->
            <div v-if="ElementIndex === 0" class="element-item">
                <img src="./img/project_img.jpg" @click="RedirectToTask(item.index)">
                <h3 class="title-project" @click="RedirectToTask(item.index)">{{ item.name }} </h3>
                <p>{{ item.description }}</p>
                <p>Code project: {{ item.code }}</p>
                <p>Status project:<span v-if="item.status">🟢</span><span v-else>🔴</span></p>
                <button type="button" class="btn btn-light" @click="ModalOpen(item.index)">Edit</button>
                <button type="button" class="btn btn-danger" @click="DeleteItem(item.index)">Delete</button>
            </div>

            <!-- TASK -->
            <div v-show="item.projectIndex == GetProjectIndex()" v-if="ElementIndex === 1" class="element-item">
                <h5>{{ item.name }}</h5>
                <p>Status project: {{ item.status }}<span v-if="item.status">🟢</span><span v-else>🔴</span></p>
                <button type="button" class="btn btn-light" @click="ModalOpen(item.index)">Edit</button>
                <button type="button" class="btn btn-danger" @click="DeleteItem(item.index)">Delete</button>
            </div>
        </div>

        <!-- EDIT ITEM -->
        <div class="container">
            <ComponentModal :isOpenModal="isOpenModal" @ModalClose="ModalClose">
                <div class="space-container"></div>
                <div class="container">
                    <ComponentInputForms :DataInputForms="DATA_INPUT_FORMS[ElementIndex]"
                        @user-inputs="HandlerInput_PutItem" />
                </div>
                <div class="space-container"></div>
            </ComponentModal>
        </div>
        <div class="space-container"></div>

    </div>
    <div v-else>
        <div class="space-container"></div>
        <!-- ADD POST -->
        <div class="space-container"></div>
        <div class="container">
            <ComponentPostAdd @user-inputs="HandlerInput_AddItem" :UseInputAutoHink="true"></ComponentPostAdd>
        </div>
        <!-- FILTER -->
        <div class="container">
            <div class="element-item">
                <ComponentPostFilter @user-inputs="HandlerFilter_Post" />
            </div>
        </div>
        <div class="space-container"></div>

        <!-- VISUALIZATION PROGRESS -->
        <div v-if="this.formFilterSelected === 2" class="container">
            <div class="element-item">
                <h5>Progress</h5>
                <p>Hours: {{ GetCounterHoursInPostsObj }}</p>
                <div class="element-progress" :style="{ backgroundColor: GetProgressColor }"></div>
            </div>
        </div>
        <div class="space-container"></div>

        <!-- POST -->
        <div class="container" v-for="(item, index) in dataApiResponse" :key="index">
            <div v-if="methodFilterHandler(item.date)" class="element-item">
                <h4>{{ new Object(methodFindTaskIndexInObj(item.taskIndex)).name }}</h4><br />
                <p>Data post: {{ item.date }}</p>
                <p>Hours: {{ item.hours }}</p>
                <p>Description: {{ item.description }}</p>
                <button type="button" class="btn btn-light" @click="ModalOpen(item.index)">Edit</button>
                <button type="button" class="btn btn-danger" @click="DeleteItem(item.index)">Delete</button>
            </div>

        </div>

        <!-- EDIT ITEM -->
        <div class="container">
            <ComponentModal :isOpenModal="isOpenModal" @ModalClose="ModalClose">
                <div class="space-container"></div>
                <div class="container">
                    <ComponentPostAdd @user-inputs="HandlerInput_PutItem" :UseInputAutoHink="true" />
                </div>
            </ComponentModal>
        </div>

        <!-- MESSAGE ERROR -->
        <div class="container">
            <ComponentModal :isOpenModal="isOpenModalMessage" @ModalClose="ModalCloseMessage">
                <div class="container">
                    <h5>Error</h5>
                    <p>Limit hours: 24 max!</p>
                </div>
            </ComponentModal>
        </div>

    </div>
</template>


<script>
import ComponentInputForms from './ComponentInputForms.vue'
import ComponentModal from './ComponentModal.vue';
import ComponentPostAdd from './ComponentPostAdd.vue';
import ComponentPostFilter from './ComponentPostFilter.vue';
import { DATA_API, requestGet, requestDelete, requestPost, requestPut } from '../api_request.js';

const DATA_INPUT_FORMS = [["Please input name", "Please input code", "Please input status"], ["Please input name", "Please input status"]];

export default {
    // Loading the current vue variables
    data() {
        return {
            isOpenModal: false,
            isOpenModalMessage: false,

            // CONST
            DATA_INPUT_FORMS,

            // API
            dataApiTask: [],
            dataApiResponse: [],

            // JOB POST
            formFilterSelected: 0,
            formFilterDate: '',
            elementItemSelected: 0,
            taskIndex: 0,
        }
    },
    props: {
        ElementIndex: { type: Number, required: true },
    },
    // Loading other vue components
    components: {
        ComponentInputForms,
        ComponentModal,
        ComponentPostFilter,
        ComponentPostAdd,

    },
    computed: {
        GetElementTitle() {
            switch (this.ElementIndex) {
                case 0: return 'Project';
                case 1: return 'Task';
                default: return null;
            }
        },
        GetCounterHoursInPostsObj() {
            const totalHours = this.dataApiResponse
                .filter(item => item.date === this.formFilterDate)
                .map(item => item.hours)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return totalHours;
        },
        GetProgressColor() {
            const hours = this.GetCounterHoursInPostsObj;
            switch (true) {
                case hours < 8: return '#F4CA16';
                case hours > 8: return '#EB4C42';
                default: return '#41B883';
            }
        }
    },
    methods: {
        // REQUEST FORM
        GetObjectWrite(inputs) {
            switch (this.ElementIndex) {
                case 0: return { 'name': inputs[0], 'code': inputs[1], 'status': inputs[2] === 'true' ? true : false };
                case 1: return { 'name': inputs[0], 'projectIndex': this.GetProjectIndex(), 'status': inputs[1] === 'true' ? true : false };
                case 2: return { 'date': inputs[0], 'hours': inputs[1], 'description': inputs[2], 'taskIndex': inputs[3] };
                default: return null;
            }
        },
        GetObjectEdit(inputs) {
            switch (this.ElementIndex) {
                case 0: return { 'index': this.elementItemSelected, 'name': inputs[0], 'code': inputs[1], 'status': inputs[2] === 'true' ? true : false };
                case 1: return { 'index': this.elementItemSelected, 'name': inputs[0], 'projectIndex': this.GetProjectIndex(), 'status': inputs[2] === 'true' ? true : false };
                case 2: return { 'index': this.elementItemSelected, 'date': inputs[0], 'hours': inputs[1], 'description': inputs[2], 'taskIndex': inputs[3] };
                default: return null;
            }
        },
        GetNameApi() {
            switch (this.ElementIndex) {
                case 0: return DATA_API.API_PROJECT;
                case 1: return DATA_API.API_TASK;
                case 2: return DATA_API.API_JOB_POST;
                default: return null;
            }
        },

        // ROUTER
        GetProjectIndex() {
            return this.$route.params.id;
        },
        RedirectToJobPost(index) {
            this.$router.push({ name: 'JobPost', params: { id: index } });
        },
        RedirectToTask(index) {
            this.$router.push({ name: 'Project', params: { id: index } });
        },
        // API ASYNC REQUEST
        async GetTask() {
            const response = await requestGet(DATA_API.API_TASK);
            if (response !== false) this.dataApiTask = response;
        },
        // API ASYNC REQUEST
        async GetItem() {
            const response = await requestGet(this.GetNameApi());
            if (response !== false) this.dataApiResponse = response;
        },
        async DeleteItem(index) {
            const response = await requestDelete(this.GetNameApi(), index);
            if (response !== false) this.dataApiResponse = response;
        },
        async CreateItem(array) {
            const response = await requestPost(this.GetNameApi(), array);
            if (response !== false) this.dataApiResponse = response;
        },
        async PutItem(array) {
            const response = await requestPut(this.GetNameApi(), array);
            if (response !== false) this.dataApiResponse = response;
        },
        // USER INPUT EVENT
        async HandlerInput_PutItem(inputs) {
            if (this.ElementIndex === 2) {
                if (!this.methodCheckLimitHours(inputs[0], inputs[1])) return;
            }

            this.PutItem(this.GetObjectEdit(inputs));
            this.ModalClose();
        },
        async HandlerInput_AddItem(inputs) {
            if (this.ElementIndex === 2) {
                if (!this.methodCheckLimitHours(inputs[0], inputs[1])) return;
            }
            this.CreateItem(this.GetObjectWrite(inputs));
        },
        HandlerFilter_Post(formFilterSelected, formFilterDate) {
            this.formFilterSelected = formFilterSelected;
            this.formFilterDate = formFilterDate;
        },
        // OTHER
        methodFindTaskIndexInObj(taskIndex) {
            return this.dataApiTask.find(item => item.index === taskIndex);
        },
        methodFilterHandler(stringDate) {
            switch (this.formFilterSelected) {
                case 0: return true;
                case 1: return (this.formFilterDate === new Date(stringDate).getMonth());
                case 2: return (this.formFilterDate === stringDate);
            }
        },
        methodCheckLimitHours(dateValue, currentHours) {
            this.formFilterDate = dateValue;
            if (this.GetCounterHoursInPostsObj + currentHours > 24) {
                this.ModalOpenMessage();
                return false;
            }
            return true;
        },

        // MODAL
        ModalOpen(index = 0) {
            this.isOpenModal = true;
            this.elementItemSelected = index;
        },
        ModalClose() {
            this.isOpenModal = false;
        },
        ModalOpenMessage() {
            this.isOpenModalMessage = true;
        },
        ModalCloseMessage() {
            this.isOpenModalMessage = false;
        },
    },
    // Mounted function
    mounted() {
        this.GetItem();
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
}

/* DESCRIPTION */
.element-description {
    margin-top: 75px;
    width: 100%;
    border: 1px solid #363854;
    border-radius: 5px;
    padding: 20px;
}

.element-description h5 {
    margin-bottom: 15px;
}

.element-description p {
    margin: 3px;
    padding-left: 15px;
}

.space-container {
    width: 100%;
    height: 75px;
    background-color: transparent;
}

/* ALL ITEMS */
.element-item h3 {
    background-color: #16171E;
    word-wrap: break-word;
}

.element-item h4 {
    word-wrap: break-word;
}


.element-item h5 {
    word-wrap: break-word;
}

.element-item {
    margin-bottom: 50px;
    width: 800px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
}

.element-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
}

.element-item p {
    font-size: 18px;
    color: #888;
    margin-bottom: 10px;
}

.element-item button {
    margin-top: 5px;
    width: 100%;
}


/* CREATE */

.title-project:hover {
    color: tomato;
}

.title-project {

    font-size: 18px;
    margin-bottom: 10px;
    cursor: pointer;
}

/* PROGRESS */

.element-progress {
    width: 100%;
    height: 100px;
    border: 1px solid #363854;
    border-radius: 5px;
    padding: 20px;
}
</style>
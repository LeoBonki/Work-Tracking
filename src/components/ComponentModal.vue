<template>
    <!-- MODAL FILTER -->
    <div class="modal-window" v-if="this.isOpenModal">
        <div class="modal-content">
            <button @click="ModalClose" type="button" class="btn btn-danger close-button">X</button>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpenModal: { type: Boolean, required: true },
    },
    methods: {
        ModalClose() {
            this.$emit('ModalClose');
        },
    },
};
</script>

<style scoped>
/* MODAL */
.modal-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #16171E;
    padding: 20px;
    border-radius: 5px;

    max-width: 1000px;
}

button {
    margin-left: 90%;
}
</style>
<template>
  <!-- INPUT FORM -->
  <div>
    <div v-for="(item, index) in DataInputForms" :key="index">
      <input class="form-control" :placeholder="item" v-model="DataInputModel[index]" />
    </div>
    <button :disabled="isButtonDisable" type="button" class="btn btn-success" @click="eventUserClick">Ok</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DataInputModel: [],
    };
  },
  props: {
    DataInputForms: { DataInputForms: Array, required: true },
  },
  computed: {
    isButtonDisable() {
      if (!this.DataInputForms || this.DataInputModel.length != this.DataInputForms.length) return true;
      for (let i = 0; i < this.DataInputModel.length; i++) {
        if (!this.DataInputModel[i] || this.DataInputModel[i] === '') {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    eventUserClick() {
      this.$emit('user-inputs', this.DataInputModel);
      this.DataInputModel = [];
    },
  }
};
</script>

<style scoped>
* {
  max-width: 230px;
  margin-top: 5px;
}

button {
  margin-top: 30px;
  width: 100%;
}
</style>
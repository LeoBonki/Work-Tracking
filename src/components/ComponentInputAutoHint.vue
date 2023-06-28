<template>
  <div class="element-container">

    <!-- INPUT ELEMENT -->
    <div class="input-container">
      <input class="form-control" type="text" v-model="userInputText" @input="eventUserInput" />
    </div>

    <!-- HINT ELEMENT -->
    <div class="select-container" v-if="showHint">
      <select class="form-control" @change="selectHint" @dblclick="selectHint">
        <option disabled value="">Выберите вариант</option>
        <option v-for="item in filterData" :value="item" :key="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInputText: '',
      showHint: false,
    };
  },
  props: {
    DataStore: { type: Array, required: true },
  },
  computed: {
    filterData() {
      if (!this.DataStore) return;
      return this.DataStore.filter((item) => item.toLowerCase().includes(this.userInputText.toLowerCase())
      ).slice(0, 10);
    },
  },
  methods: {
    eventUserInput() {
      this.showHint = this.userInputText.length > 0;
      this.$emit('user-inputs', this.userInputText);
    },
    selectHint(event) {
      this.userInputText = event.target.value;
      this.$emit('user-inputs', this.userInputText);
      this.showHint = false;
    },
  },
};
</script>

<style scoped>
.element-container {
  display: flex;

}

.input-container {
  flex: 1;
}

.select-container {
  margin-left: 20px;
  width: 30%;

}

.select-container option {
  color: black;
  background-color: white;
}
</style>

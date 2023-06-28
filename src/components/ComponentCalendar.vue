<template>
  <div class="element-container">

    <div v-if="SettingOnlyMonth === true">
      <h4>{{ DATE_CURRENT_YEAR }}</h4>
      <li v-for="(item, index) in MONTHNAME" :key="index" class='list-group-item' @click="eventChooseMonth(index)">{{ item
      }}</li>
    </div>

    <div v-if="SettingOnlyMonth === false">
      <!-- MONTH SWITCH -->
      <ul>
        <div class="month-back"><button type="button" class="btn btn-success" @click="setBackMonth">&#11013;</button>
        </div>
        <div class="month-next"><button type="button" class="btn btn-success" @click="setNextMonth">&#11157;</button>
        </div>
        <h5>{{ MONTHNAME[currentMonth] }}<br>{{ currentYear }}</h5>
      </ul>

      <!-- CYCLE FOR DAYS -->
      <ul>
        <li v-for="day in getDaysInMonth" :key="day" @click="eventChooseDay(day)">{{ day }}</li>
      </ul>
    </div>
  </div>
</template>
  
<script>

const MONTHNAME = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DATE_CURRENT_YEAR = new Date().getFullYear();

export default {
  data() {
    return {
      MONTHNAME,
      DATE_CURRENT_YEAR,
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      SelectedMonth: 0,
    };
  },
  props: {
    SettingOnlyMonth: { SettingOnlyMonth: Boolean, required: true },
  },
  computed: {
    getDaysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    getChooseDate() {
      return `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${this.currentDay.toString().padStart(2, '0')}`;
    }
  },
  methods: {
    setBackMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    setNextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    eventChooseDay(day) {
      this.currentDay = day;
      this.$emit('user-inputs', this.getChooseDate);
    },
    eventChooseMonth(month) {
      this.SelectedMonth = month;
      this.$emit('user-inputs', month);
    }
  },
};
</script>
  
<style scoped>
.element-container {
  color: #333;
  width: 400px;
}

.month-back {
  float: left;
}

.month-next {
  float: right;
}

h5 {
  text-align: center;
  color: black;
  letter-spacing: 3px;
  background-color: #41B883;
  border-radius: 10px;
}

h4 {
  text-align: center;
  color: white;
}

li {
  display: inline-block;
  width: 11.6%;
  text-align: center;
  color: black;
  background-color: #41B883;
  padding: 8px;
  margin: 3px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

.list-group-item {
  width: 100%;
}

li:hover {
  background-color: #157347;
}

li:hover {
  background-color: #157347;
}

button {
  margin-left: 8px;
  margin-right: 8px;
  width: 50px;
  height: 48px;
  background-color: #41B883;
  border: 0px;
  color: black;
}
</style>
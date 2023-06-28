<template>
  <!-- Loading header, footer, main content -->
  <ViewHeader/>
  <ComponentWorkTracker :ElementIndex="2" />
  <ViewFooter/>
</template>

<script>
// import vue components
import ViewHeader from './ViewHeader.vue'
import ViewFooter from './ViewFooter.vue'
import ComponentWorkTracker from '../ComponentWorkTracker.vue'

export default {
  // Loading other vue components
  components: {
    ViewHeader,
    ViewFooter,
    ComponentWorkTracker,
  },
};
</script>
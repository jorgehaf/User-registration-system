<template>
  <div class="register">
    <div class="register-form">
      <div class="register-head">
        <p>Etapa <span class="stage">{{ stage }}</span> de 4</p>
      </div>
      <EmailStage v-if="stage === STAGES.EMAIL" @confirmEmailStage="confirmEmailStage"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { STAGES } from '../../enums/registrationStages.js'
import EmailStage from './components/EmailStage/EmailStage.vue'

const stage = ref(1);

const confirmEmailStage = (data) => {
  console.log("confirmEmailStage: ", data);

  if (stage.value < 4) {
    stage.value += 1;
  }
};
</script>

<style scoped>
@import './Register.scss';
</style>

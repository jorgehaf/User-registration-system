<template>
  <div class="register">
    <div class="register-form">
      <p>
        Etapa <span class="stage">{{ stage }}</span> de 4
      </p>

      <EmailStage
        v-if="stage === STAGES.EMAIL"
        @confirmEmailStage="confirmEmailStage"
      />
      <PhysicalPersonStage
        v-if="stage === STAGES.PHYSICAL_PERSON"
        @backPhysicalPersonStage="backPhysicalPersonStage"
        @confirmPhysicalPersonStage="confirmPhysicalPersonStage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { STAGES } from "../../enums/registrationStages.js";
import EmailStage from "./components/EmailStage/EmailStage.vue";
import PhysicalPersonStage from "./components/PhysicalPersonStage/PhysicalPersonStage.vue";

const stage = ref(1);

const confirmEmailStage = (data) => {
  console.log("confirmEmailStage: ", data);

  if (stage.value < 4) {
    stage.value += 1;
  }
};

const backPhysicalPersonStage = (data) => {
  console.log("confirmPhysicalPersonStage: ", data);

  stage.value = STAGES.EMAIL;
};

const confirmPhysicalPersonStage = (data) => {
  console.log("confirmPhysicalPersonStage: ", data);

  stage.value = STAGES.ACCESS_PASSWORD;
};
</script>

<style scoped>
@import "./Register.scss";
</style>

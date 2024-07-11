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
        v-if="
          stage === STAGES.PHYSICAL_PERSON &&
          personType === PERSON.PHYSICAL_PERSON
        "
        @backPhysicalPersonStage="backPhysicalPersonStage"
        @confirmPhysicalPersonStage="confirmPhysicalPersonStage"
      />
      <LegalPersonStage
        v-if="
          stage === STAGES.LEGAL_PERSON && personType === PERSON.LEGAL_PERSON
        "
        @backPhysicalPersonStage="backPhysicalPersonStage"
        @confirmPhysicalPersonStage="confirmPhysicalPersonStage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { STAGES, PERSON } from "../../enums/registrationStages.js";
import EmailStage from "./components/EmailStage/EmailStage.vue";
import PhysicalPersonStage from "./components/PhysicalPersonStage/PhysicalPersonStage.vue";
import LegalPersonStage from "./components/LegalPersonStage/LegalPersonStage.vue";

const stage = ref(1);
const personType = ref("");

const confirmEmailStage = (data) => {
  console.log("confirmEmailStage: ", data);
  personType.value = data.personType;

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

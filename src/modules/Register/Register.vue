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
        @backLegalPersonStage="backLegalPersonStage"
        @confirmLegalPersonStage="confirmLegalPersonStage"
      />

      <PasswordStage
        v-if="stage === STAGES.PASSWORD"
        @backPasswordStage="backPasswordStage"
        @confirmPasswordStage="confirmPasswordStage"
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
import PasswordStage from "./components/PasswordStage/PasswordStage.vue";

const stage = ref(1);
const personType = ref("");

const confirmEmailStage = (data) => {
  console.log("confirmEmailStage: ", data);
  personType.value = data.personType;

  stage.value += 1;
};

const backPhysicalPersonStage = (data) => {
  console.log("backPhysicalPersonStage: ", data);

  stage.value = STAGES.EMAIL;
};

const confirmPhysicalPersonStage = (data) => {
  console.log("confirmPhysicalPersonStage: ", data);

  stage.value = STAGES.PASSWORD;
};

const backLegalPersonStage = (data) => {
  console.log("backLegalPersonStage: ", data);

  stage.value = STAGES.EMAIL;
};

const confirmLegalPersonStage = (data) => {
  console.log("confirmLegalPersonStage: ", data);

  stage.value = STAGES.PASSWORD;
};

const backPasswordStage = (data) => {
  console.log("backPasswordStage: ", data);

  stage.value -= 1;
};

const confirmPasswordStage = (data) => {
  console.log("confirmPasswordStage: ", data);

  stage.value = STAGES.REVIEW;
};
</script>

<style scoped>
@import "./Register.scss";
</style>

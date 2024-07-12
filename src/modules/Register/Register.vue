<template>
  <div class="register">
    <div class="register-form">
      <p>
        Etapa <span class="stage">{{ stage }}</span> de 4 teste:
      </p>

      <EmailStage
        v-if="isEmailStage"
        @handleStage="handleStage"
        :userInfo="userInfo"
      />

      <PhysicalPersonStage
        v-if="isPhysicalPersonStage"
        @handleStage="handleStage"
        :userInfo="userInfo"
      />

      <LegalPersonStage
        v-if="isLegalPersonStage"
        @handleStage="handleStage"
        :userInfo="userInfo"
      />

      <PasswordStage
        v-if="isPasswordStage"
        @handleStage="handleStage"
        :userInfo="userInfo"
      />

      <ReviewStage
        v-if="isReviewStage"
        @handleStage="handleStage"
        :userInfo="userInfo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { STAGES, PERSON } from "../../enums/registrationStages.js";
import EmailStage from "./components/EmailStage/EmailStage.vue";
import PhysicalPersonStage from "./components/PhysicalPersonStage/PhysicalPersonStage.vue";
import LegalPersonStage from "./components/LegalPersonStage/LegalPersonStage.vue";
import PasswordStage from "./components/PasswordStage/PasswordStage.vue";
import ReviewStage from "./components/ReviewStage/ReviewStage.vue";

const stage = ref(1);
const isEmailStage = computed(() => {
  return stage.value === STAGES.EMAIL;
});
const isPhysicalPersonStage = computed(() => {
  return (
    stage.value === STAGES.PHYSICAL_PERSON &&
    userInfo.value.personType === PERSON.PHYSICAL_PERSON
  );
});
const isLegalPersonStage = computed(() => {
  return (
    stage.value === STAGES.LEGAL_PERSON &&
    userInfo.value.personType === PERSON.LEGAL_PERSON
  );
});
const isPasswordStage = computed(() => {
  return stage.value === STAGES.PASSWORD;
});
const isReviewStage = computed(() => {
  return stage.value === STAGES.REVIEW;
});

const userInfo = ref({
  email: "",
  personType: "",
  name: "",
  cpf: "",
  birthDate: "",
  number: "",
  corporateName: "",
  cnpj: "",
  corporateOpeningDate: "",
  password: "",
});

const handleStage = async (data) => {
  userInfo.value = { ...userInfo.value, ...data.infos };

  if (isReviewStage.value && data.stage === STAGES.EMAIL) await postUser();

  stage.value = data.stage;
};

const postUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ENDPOINT_BACKEND}/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo.value),
      }
    );

    const result = await response.json();

    alert(result.message);
  } catch (error) {
    alert(result.message);
  } finally {
    clearUserInfo();
  }
};

const clearUserInfo = () => {
  Object.keys(userInfo.value).forEach((key) => {
    userInfo.value[key] = "";
  });
};
</script>

<style scoped>
@import "./Register.scss";
</style>

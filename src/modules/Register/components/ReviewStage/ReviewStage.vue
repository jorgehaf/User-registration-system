<template>
  <form
    @submit.prevent="
      $emit('handleStage', {
        stage: STAGES.EMAIL,
        infos: {
          email,
          name,
          cpf,
          birthDate,
          number,
          corporateName,
          cnpj,
          corporateOpeningDate,
          password,
        },
      })
    "
  >
    <p id="form-title">Revise suas informações</p>

    <label for="email">Endereço de e-mail</label>
    <input type="email" id="email" v-model="email" required />

    <label v-if="isPhysicalPerson" for="name">Nome</label>
    <input
      v-if="isPhysicalPerson"
      type="text"
      id="name"
      v-model="name"
      required
    />

    <label v-if="isLegalPerson" for="corporateName">Razão social</label>
    <input
      v-if="isLegalPerson"
      type="text"
      id="corporateName"
      v-model="corporateName"
      required
    />

    <label v-if="isPhysicalPerson" for="cpf">CPF</label>
    <input
      v-if="isPhysicalPerson"
      type="text"
      id="cpf"
      v-model="cpf"
      @input="handleFormatCpf"
      placeholder="___.___.___-__"
      required
    />

    <label v-if="isLegalPerson" for="cnpj">CNPJ</label>
    <input
      v-if="isLegalPerson"
      type="text"
      id="cnpj"
      v-model="cnpj"
      @input="handleFormatCnpj"
      placeholder="__.___.___/____-__"
      required
    />

    <label v-if="isPhysicalPerson" for="birthDate">Data de nascimento</label>
    <input
      v-if="isPhysicalPerson"
      id="birthDate"
      type="date"
      v-model="birthDate"
    />

    <label v-if="isLegalPerson" for="corporateOpeningDate"
      >Data de abertura</label
    >
    <input
      v-if="isLegalPerson"
      id="corporateOpeningDate"
      type="date"
      v-model="corporateOpeningDate"
    />

    <label for="number">Telefone</label>
    <input
      id="number"
      type="tel"
      v-model="number"
      @input="handleFormatNumber"
      placeholder="(__)_____-____"
      required
    />

    <label for="password">Sua senha</label>
    <input type="password" id="password" v-model="password" required />

    <div class="buttons-group">
      <button
        @click.prevent="
          $emit('handleStage', {
            stage: STAGES.PASSWORD,
            infos: { ...userInfo },
          })
        "
      >
        Voltar
      </button>
      <button type="submit">Cadastrar</button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { STAGES, PERSON } from "../../../../shared/enums/registrationStages";
import {
  formatCnpj,
  formatNumber,
  formatCpf,
} from "../../../../shared/functions/formattingFunctions";

const props = defineProps({
  userInfo: Object,
});

const email = ref(props.userInfo.email || "");
const name = ref(props.userInfo.name || "");
const cpf = ref(props.userInfo.cpf || "");
const birthDate = ref(props.userInfo.birthDate || "");
const number = ref(props.userInfo.number || "");
const corporateName = ref(props.userInfo.corporateName || "");
const cnpj = ref(props.userInfo.cnpj || "");
const corporateOpeningDate = ref(props.userInfo.corporateOpeningDate || "");
const password = ref(props.userInfo.password || "");

const isPhysicalPerson = computed(() => {
  return props.userInfo.personType === PERSON.PHYSICAL_PERSON;
});
const isLegalPerson = computed(() => {
  return props.userInfo.personType === PERSON.LEGAL_PERSON;
});

const handleFormatCnpj = (event) => {
  cnpj.value = formatCnpj(event.target.value);
};

const handleFormatNumber = (event) => {
  number.value = formatNumber(event.target.value);
};

const handleFormatCpf = (event) => {
  cpf.value = formatCpf(event.target.value);
};
</script>

<style scoped>
@import "./ReviewStage.scss";
</style>

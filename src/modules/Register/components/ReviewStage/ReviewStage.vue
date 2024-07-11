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
      @input="formatCpf"
      placeholder="___.___.___-__"
      required
    />

    <label v-if="isLegalPerson" for="cnpj">CNPJ</label>
    <input
      v-if="isLegalPerson"
      type="text"
      id="cnpj"
      v-model="cnpj"
      @input="formatCnpj"
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
      @input="formatNumber"
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
import { STAGES, PERSON } from "../../../../enums/registrationStages";

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

const formatNumber = (event) => {
  let input = event.target.value.replace(/\D/g, "");

  if (input.length > 0) {
    input = `(${input.substring(0, 2)}) ${input.substring(
      2,
      7
    )}-${input.substring(7, 11)}`;
  }

  corporateNumber.value = input;
};

const formatCpf = (event) => {
  let input = event.target.value.replace(/\D/g, "");

  if (input.length > 11) {
    input = input.substring(0, 11);
  }

  if (input.length <= 3) {
    input = input.replace(/^(\d{0,3})/, "$1");
  } else if (input.length <= 6) {
    input = input.replace(/^(\d{0,3})(\d{0,3})/, "$1.$2");
  } else if (input.length <= 9) {
    input = input.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, "$1.$2.$3");
  } else if (input.length <= 11) {
    input = input.replace(
      /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
      "$1.$2.$3-$4"
    );
  }

  cpf.value = input;
};

const formatCnpj = (event) => {
  let input = event.target.value.replace(/\D/g, "");

  if (input.length > 14) {
    input = input.substring(0, 14);
  }

  if (input.length <= 2) {
    input = input.replace(/^(\d{0,2})/, "$1");
  } else if (input.length <= 5) {
    input = input.replace(/^(\d{0,2})(\d{0,3})/, "$1.$2");
  } else if (input.length <= 8) {
    input = input.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})/, "$1.$2.$3");
  } else if (input.length <= 12) {
    input = input.replace(
      /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})/,
      "$1.$2.$3/$4"
    );
  } else if (input.length <= 14) {
    input = input.replace(
      /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  cnpj.value = input;
};
</script>

<style scoped>
@import "./ReviewStage.scss";
</style>

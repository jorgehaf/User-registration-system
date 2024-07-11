<template>
  <form
    @submit.prevent="
      $emit('handleStage', {
        stage: STAGES.PASSWORD,
        infos: {
          corporateName,
          cnpj,
          corporateOpeningDate,
          number,
        },
      })
    "
  >
    <p id="form-title">Pessoa Jurídica</p>

    <label for="corporateName">Razão social</label>
    <input type="text" id="corporateName" v-model="corporateName" required />

    <label for="cnpj">CNPJ</label>
    <input
      type="text"
      id="cnpj"
      v-model="cnpj"
      @input="formatCnpj"
      placeholder="__.___.___/____-__"
      required
    />

    <label for="corporateOpeningDate">Data de abertura</label>
    <input
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

    <div class="buttons-group">
      <button
        @click.prevent="
          $emit('handleStage', {
            stage: STAGES.EMAIL,
            infos: {
              corporateName: '',
              cnpj: '',
              corporateOpeningDate: '',
              number: '',
            },
          })
        "
      >
        Voltar
      </button>
      <button type="submit">Continuar</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { STAGES } from "../../../../enums/registrationStages";

const props = defineProps({
  userInfo: Object,
});

const corporateName = ref(props.userInfo.corporateName || "");
const cnpj = ref(props.userInfo.cnpj || "");
const corporateOpeningDate = ref(props.userInfo.corporateOpeningDate || "");
const number = ref(props.userInfo.number || "");

const formatNumber = (event) => {
  let input = event.target.value.replace(/\D/g, "");

  if (input.length > 0) {
    input = `(${input.substring(0, 2)}) ${input.substring(
      2,
      7
    )}-${input.substring(7, 11)}`;
  }

  number.value = input;
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
@import "./LegalPersonStage.scss";
</style>

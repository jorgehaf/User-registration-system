<template>
  <form
    @submit.prevent="
      $emit('confirmLegalPersonStage', {
        corporateReason,
        cnpj,
        openingDate,
        corporateNumber,
      })
    "
  >
    <p id="form-title">Pessoa Jurídica</p>

    <label for="corporateReason">Razão social</label>
    <input
      type="text"
      id="corporateReason"
      v-model="corporateReason"
      required
    />

    <label for="cnpj">CNPJ</label>
    <input
      type="text"
      id="cnpj"
      v-model="cnpj"
      @input="formatCnpj"
      placeholder="__.___.___/____-__"
      required
    />

    <label for="openingDate">Data de abertura</label>
    <input id="openingDate" type="date" v-model="openingDate" />

    <label for="corporateNumber">Telefone</label>
    <input
      id="corporateNumber"
      type="tel"
      v-model="corporateNumber"
      @input="formatNumber"
      placeholder="(__)_____-____"
      required
    />

    <div class="buttons-group">
      <button @click="$emit('backLegalPersonStage')">Voltar</button>
      <button type="submit">Continuar</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const corporateReason = ref("");
const cnpj = ref("");
const openingDate = ref("");
const corporateNumber = ref("");

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

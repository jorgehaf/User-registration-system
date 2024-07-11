<template>
  <form
    @submit.prevent="
      $emit('confirmReviewStage', {
        corporateReason,
        cnpj,
        openingDate,
        corporateNumber,
      })
    "
  >
    <p id="form-title">Revise suas informações</p>

    <label for="email">Endereço de e-mail</label>
    <input type="email" id="email" v-model="email" required />

    <label for="name">Nome</label>
    <input type="text" id="name" v-model="name" required />

    <label for="corporateReason">Razão social</label>
    <input
      type="text"
      id="corporateReason"
      v-model="corporateReason"
      required
    />

    <label for="cpf">CPF</label>
    <input
      type="text"
      id="cpf"
      v-model="cpf"
      @input="formatCpf"
      placeholder="___.___.___-__"
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

    <label for="date">Data de nascimento</label>
    <input id="date" type="date" v-model="date" />

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
      <button @click="$emit('backReviewStage')">Voltar</button>
      <button type="submit">Cadastrar</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const name = ref("");
const corporateReason = ref("");
const cnpj = ref("");
const date = ref("");
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

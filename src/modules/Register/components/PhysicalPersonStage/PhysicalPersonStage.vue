<template>
  <form
    @submit.prevent="
      $emit('confirmPhysicalPersonStage', { name, cpf, date, number })
    "
  >
    <p id="form-title">Pessoa Física(a)</p>

    <label for="name">Nome</label>
    <input type="text" id="name" v-model="name" required />

    <label for="cpf">CPF</label>
    <input
      type="text"
      id="cpf"
      v-model="cpf"
      @input="formatCpf"
      placeholder="___.___.___-__"
      required
    />

    <label for="date">Data de nascimento</label>
    <input id="date" type="date" v-model="date" />

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
      <button @click="$emit('backPhysicalPersonStage')">Voltar</button>
      <button type="submit">Continuar</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const cpf = ref("");
const date = ref("");
const number = ref("");

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
</script>

<style scoped>
@import "./PhysicalPersonStage.scss";
</style>

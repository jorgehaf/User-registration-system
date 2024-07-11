<template>
  <form @submit.prevent="$emit('confirmEmailStage', { email, userType })">
    <p id="form-title">Seja bem vindo(a)</p>

    <label for="email">Endereço de e-mail</label>
    <input type="email" id="email" v-model="email" required />

    <div class="radio-group">
      <label>
        <input type="radio" v-model="userType" value="Pessoa física" required />
        Pessoa física
      </label>
      <label>
        <input
          type="radio"
          v-model="userType"
          value="Pessoa jurídica"
          required
        />
        Pessoa jurídica
      </label>
    </div>

    <button type="submit">Continuar</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const userType = ref("");
</script>

<style scoped>
@import "./EmailStage.scss";
</style>

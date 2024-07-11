<template>
  <form @submit.prevent="$emit('confirmPasswordStage', { password })">
    <p id="form-title">Senha de acesso</p>

    <label for="password">Sua senha</label>
    <input type="password" id="password" v-model="password" required />

    <div class="buttons-group">
      <button @click="$emit('backPasswordStage')">Voltar</button>
      <button type="submit">Continuar</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
</script>

<style scoped>
@import "./PasswordStage.scss";
</style>

<template>
  <form
    @submit.prevent="
      $emit('handleStage', { stage: 2, infos: { email, personType } })
    "
  >
    <p id="form-title">Seja bem vindo(a)</p>

    <label for="email">Endereço de e-mail</label>
    <input type="email" id="email" v-model="email" required />

    <div class="radio-group">
      <label>
        <input
          type="radio"
          v-model="personType"
          value="Pessoa física"
          required
        />
        Pessoa física
      </label>
      <label>
        <input
          type="radio"
          v-model="personType"
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

const props = defineProps({
  userInfo: Object,
});

const email = ref(props.userInfo.email || "");
const personType = ref(props.userInfo.personType || "");
</script>

<style scoped>
@import "./EmailStage.scss";
</style>

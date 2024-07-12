<template>
  <form
    @submit.prevent="
      $emit('handleStage', {
        stage: STAGES.PASSWORD,
        infos: { name, cpf, birthDate, number },
      })
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

    <label for="birthDate">Data de nascimento</label>
    <input id="birthDate" type="date" v-model="birthDate" />

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
            infos: { name: '', cpf: '', birthDate: '', number: '' },
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
import { STAGES } from "../../../../shared/enums/registrationStages";
import {
  formatNumber,
  formatCpf,
} from "../../../../shared/functions/formattingFunctions";

const props = defineProps({
  userInfo: Object,
});

const name = ref(props.userInfo.name || "");
const cpf = ref(props.userInfo.cpf || "");
const birthDate = ref(props.userInfo.birthDate || "");
const number = ref(props.userInfo.number || "");
</script>

<style scoped>
@import "./PhysicalPersonStage.scss";
</style>

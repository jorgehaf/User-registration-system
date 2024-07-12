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
import { STAGES } from "../../../../shared/enums/registrationStages";
import {
  formatCnpj,
  formatNumber,
} from "../../../../shared/functions/formattingFunctions";

const props = defineProps({
  userInfo: Object,
});

const corporateName = ref(props.userInfo.corporateName || "");
const cnpj = ref(props.userInfo.cnpj || "");
const corporateOpeningDate = ref(props.userInfo.corporateOpeningDate || "");
const number = ref(props.userInfo.number || "");
</script>

<style scoped>
@import "./LegalPersonStage.scss";
</style>

<template>
  <form
    @submit.prevent="
      $emit('handleStage', { stage: STAGES.REVIEW, infos: { password } })
    "
  >
    <p id="form-title">Senha de acesso</p>

    <label for="password">Sua senha</label>
    <input type="password" id="password" v-model="password" required />

    <div class="buttons-group">
      <button
        @click.prevent="
          $emit('handleStage', { stage: STAGES.REVIEW, infos: { password } })
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

const props = defineProps({
  userInfo: Object,
});

const password = ref(props.userInfo.password || "");
</script>

<style scoped>
@import "./PasswordStage.scss";
</style>

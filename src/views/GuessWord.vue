<!-- src/views/GuessWord.vue -->
<template>
  <div>
    <div class="mb-3">
      <GuessArticle />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GuessArticle from "@/components/GuessArticle.vue";

export default defineComponent({
  name: "GuessWord",
  components: {
    GuessArticle,
  },
});
</script>

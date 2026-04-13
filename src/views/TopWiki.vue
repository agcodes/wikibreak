<!-- src/views/TopWiki.vue -->
<template>
  <div>
    <div class="mb-3">
      <TopWikipediaArticles />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopWikipediaArticles from "@/components/TopWikipediaArticles.vue";

export default defineComponent({
  name: "TopWiki",
  components: {
    TopWikipediaArticles,
  },
});
</script>

<!-- src/components/TopWikipediaArticles.vue -->
<template>
  <div>
    <h2 class="mb-3">Top Wikipedia Articles</h2>
    <ol>
      <li v-for="article in articles" :key="article.article">
        {{ article.article }} - {{ article.views }} views
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchTopWikipediaArticles } from "@/services/wikiService";

export default defineComponent({
  name: "TopWikipediaArticles",
  setup() {
    const articles = ref<Array<{ article: string; views: number }>>([]);

    const loadArticles = async () => {
      try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Soustraire un jour

        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
        const day = String(yesterday.getDate()).padStart(2, "0");

        const formattedDate = `${year}/${month}/${day}`;
        const data = await fetchTopWikipediaArticles(formattedDate, 2000, 300);
        articles.value = data;
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    onMounted(loadArticles);

    return {
      articles,
    };
  },
});
</script>

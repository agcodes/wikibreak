<!-- src/components/RandomArticle.vue -->
<template>
  <div>
    <h2>Guess</h2>

    <div class="mb-4" v-if="randomArticle">
      <div>
        <div class="mb-4">
          <p>Views: {{ randomArticle.views }}</p>

          <div class="mb-4">{{ randomArticle.scrambledContent }}</div>

          <div class="mb-4">
            <button class="btn btn-secondary" @click="toggleContentVisibility">
              {{ showContent ? "Hide Content" : "Show Content" }}
            </button>
          </div>

          <div v-if="showContent" class="mb-4">
            <p>Content: {{ randomArticle.content }}</p>
          </div>
        </div>

        <div class="mb-4">
          <div class="mb-4">
            <input
              v-model="userGuess"
              type="text"
              placeholder="Enter the article title"
              class="form-control mb-2"
            />
            <button class="btn btn-primary mb-2" @click="checkGuess">
              Check Guess
            </button>
            <div v-if="feedback" class="mb-4 alert" :class="feedbackClass">
              {{ feedback }}
            </div>
          </div>

          <div class="mb-4">
            <button class="btn btn-warning" @click="toggleSoluceVisibility">
              Show soluce
            </button>
          </div>

          <div v-if="showSoluce" class="mb-4">
            <p>{{ randomArticle.title }}</p>
          </div>
        </div>

        <div>
          <button class="btn btn-primary" @click="loadRandomArticle">
            Load Random Article
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  getRandomArticle,
  scrambleArticleContent,
  maskTitleWordsInContent,
} from "@/services/wikiService";
import { Article } from "@/services/wikiService"; // Assurez-vous que le chemin est correct

export default defineComponent({
  name: "RandomArticle",
  setup() {
    const randomArticle = ref<Article | null>(null);
    const userGuess = ref<string>("");
    const feedback = ref<string>("");
    const showContent = ref<boolean>(false);
    const showSoluce = ref<boolean>(false);
    const feedbackClass = ref<string>("");

    const loadRandomArticle = async () => {
      try {
        showContent.value = false;
        showSoluce.value = false;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, "0");
        const day = String(yesterday.getDate()).padStart(2, "0");

        const formattedDate = `${year}/${month}/${day}`;
        const article = await getRandomArticle(formattedDate);
        if (article && article.content) {
          // Tronquer et masquer le contenu
          article.content = article.content.substring(0, 500);
          article.content = maskTitleWordsInContent(
            article.content,
            article.title
          );
          article.scrambledContent = scrambleArticleContent(article.content);
          randomArticle.value = article;
        }
      } catch (error) {
        console.error("Failed to get random article:", error);
      }
    };

    const normalizeString = (str: string): string => {
      return str
        .normalize("NFD") // Normalise la chaîne en décomposant les caractères accentués
        .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques (accents)
        .replace(/\s+/g, "") // Supprime les espaces
        .replace(".", "")
        .replace("-", "")
        .toLowerCase(); // Convertit en minuscules
    };

    const toggleContentVisibility = () => {
      showContent.value = !showContent.value;
    };

    const toggleSoluceVisibility = () => {
      showSoluce.value = !showSoluce.value;
    };

    const checkGuess = () => {
      if (randomArticle.value && userGuess.value.trim()) {
        const normalizedUserGuess = normalizeString(userGuess.value);
        const normalizedArticleTitle = normalizeString(
          randomArticle.value.title
        );

        if (normalizedUserGuess === normalizedArticleTitle) {
          feedback.value = "Correct! Well done!";
          feedbackClass.value = "alert-success";
        } else {
          feedback.value = "Incorrect. Try again!";
          feedbackClass.value = "alert-danger";
        }
      } else {
        feedback.value = "Please enter a guess.";
        feedbackClass.value = "alert-warning";
      }
    };

    onMounted(() => {
      loadRandomArticle();
    });

    return {
      randomArticle,
      loadRandomArticle,
      userGuess,
      checkGuess,
      showContent,
      toggleContentVisibility,
      toggleSoluceVisibility,
      showSoluce,
      feedback,
      feedbackClass,
    };
  },
});
</script>
<style scoped>
.alert {
  padding: 0.75rem 1.25rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}
</style>

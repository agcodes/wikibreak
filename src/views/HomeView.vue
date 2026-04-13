<template>
  <div>
    <h2>Deviner l'article</h2>
    <ul class="list-group expressive-menu">
      <li class="expressive-menu-item mb-4">
        <router-link :to="{ name: 'GuessWiki', params: { mode: 'anagram' } }"
          >Anagramme</router-link
        >
      </li>
      <li class="expressive-menu-item mb-4">
        <router-link :to="{ name: 'GuessWiki', params: { mode: 'anagram-2' } }"
          >Anagramme (difficile)</router-link
        >
      </li>
      <li class="expressive-menu-item mb-4">
        <router-link :to="{ name: 'GuessWiki', params: { mode: 'words' } }"
          >Mots</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: doc } = await useAsyncData(() =>
  queryContent(route.path).findOne(),
);
</script>

<template>
  <main id="main">
    <article
      v-if="doc"
      class="mx-auto max-w-3xl px-4 py-10 text-[var(--color-text)]"
    >
      <h1 class="mb-4 text-3xl font-semibold text-[var(--color-dark)]">
        {{ doc.title }}
      </h1>
      <ContentRenderer :value="doc" />
    </article>
    <section v-else class="mx-auto max-w-3xl px-4 py-10">
      <h1 class="text-2xl font-semibold text-[var(--color-dark)]">
        Document not found
      </h1>
      <p class="text-[var(--color-text)]">
        The content you’re looking for doesn’t exist yet.
      </p>
    </section>
  </main>
</template>

<style scoped>
main {
  min-height: 39vh;
}
</style>

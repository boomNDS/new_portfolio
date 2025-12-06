<template>
  <main>
    <ContentDoc>
      <template #default="slotProps">
        <template v-if="slotProps?.doc">
          <article
            class="mx-auto max-w-3xl px-4 py-10 text-[var(--color-text)]"
          >
            <h1 class="mb-4 text-3xl font-semibold text-[var(--color-dark)]">
              {{ slotProps.doc.title }}
            </h1>
            <ContentRenderer :value="slotProps.doc" />
          </article>
        </template>
        <template v-else>
          <section class="mx-auto max-w-3xl px-4 py-10">
            <h1 class="text-2xl font-semibold text-[var(--color-dark)]">
              Document not found
            </h1>
            <p class="text-[var(--color-text)]">
              The content you’re looking for doesn’t exist yet.
            </p>
          </section>
        </template>
      </template>
    </ContentDoc>
  </main>
</template>

<style scoped>
main {
  min-height: 39vh;
}
</style>

<script setup lang="ts">
import { ContentDoc, ContentRenderer } from "#components";
</script>

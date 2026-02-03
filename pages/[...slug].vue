<script setup lang="ts">
// Get content document
const route = useRoute();
const { data: doc } = await useAsyncData(
  `content-${route.path}`,
  () => queryContent(route.path).findOne(),
  {
    server: true,
    default: () => null,
  },
);

// SEO
useSeoMeta(() => ({
  title: doc.value?.title || "Not Found",
  description: doc.value?.description || "The content you're looking for doesn't exist.",
}));
</script>

<template>
  <main id="main" class="flex-1">
    <article
      v-if="doc"
      class="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20"
    >
      <!-- Header -->
      <header class="mb-8 sm:mb-10">
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-4"
        >
          {{ doc.title }}
        </h1>
        <div
          v-if="doc.date || doc.tags"
          class="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]"
        >
          <time v-if="doc.date" :datetime="String(doc.date)">
            {{ new Date(doc.date).toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            }) }}
          </time>
          <span v-if="doc.date && doc.tags?.length">•</span>
          <div v-if="doc.tags?.length" class="flex flex-wrap gap-2">
            <span
              v-for="tag in doc.tags"
              :key="tag"
              class="px-2 py-0.5 rounded-full bg-[var(--color-light)] text-[var(--color-text)] text-xs"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <ContentRenderer
        :value="doc"
        class="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-[var(--color-dark)] prose-p:text-[var(--color-text)] prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--color-dark)] prose-code:text-[var(--color-primary)] prose-pre:bg-[var(--color-light)] prose-pre:text-[var(--color-dark)] prose-blockquote:border-[var(--color-primary)] prose-blockquote:text-[var(--color-text-muted)]"
      />
    </article>

    <!-- Not Found -->
    <section
      v-else
      class="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-center"
    >
      <span
        class="i-tabler:file-off text-5xl sm:text-6xl text-[var(--color-text-muted)] mb-4 block"
        aria-hidden="true"
      />
      <h1 class="text-2xl sm:text-3xl font-bold text-[var(--color-dark)] mb-3">
        Page not found
      </h1>
      <p class="text-[var(--color-text)] mb-6">
        The content you're looking for doesn't exist yet.
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-mid)] hover:-translate-y-0.5 transition-all duration-200"
      >
        <span class="i-tabler:home" aria-hidden="true" />
        Go home
      </NuxtLink>
    </section>
  </main>
</template>

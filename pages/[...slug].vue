<script setup lang="ts">
import { stagger, useAnimate } from "motion-v";
import { computed, onMounted, onUnmounted, ref } from "vue";

const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join("/")
  : (route.params.slug ?? "");

// Map URL paths to collection names
const collectionMap: Record<string, string> = {
  blog: "blog",
  "dev-logs": "devLogs",
  learning: "learning",
  showcases: "showcases",
};

// Determine which collection to query based on path
const pathParts = slug.split("/");
const urlPath = pathParts[0];
const collectionName = collectionMap[urlPath];

// Validate collection name
const isValidCollection = !!collectionName;

// Fetch content from the appropriate collection
const { data: content, pending } = await useAsyncData(
  `content-${slug}`,
  async () => {
    if (!isValidCollection) return null;
    try {
      return await queryCollection(collectionName).path(`/${slug}`).first();
    } catch {
      return null;
    }
  },
  {
    server: true,
    default: () => null,
  },
);

// Content not found state
const notFound = computed(() => !pending.value && !content.value);

// Generate TOC from content body
const toc = computed(() => {
  if (!content.value?.body?.children) return [];

  const items: { id: string; text: string }[] = [];
  content.value.body.children.forEach((child: any) => {
    if (child.tag === "h2") {
      const text = child.children?.[0]?.value || "";
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      items.push({ id, text });
    }
  });
  return items;
});

// Type config (by URL path)
const typeConfig: Record<string, { label: string; color: string }> = {
  "dev-logs": { label: "Dev Log", color: "bg-blue-100 text-blue-700 border-blue-200" },
  learning: { label: "Learning", color: "bg-green-100 text-green-700 border-green-200" },
  blog: { label: "Blog", color: "bg-purple-100 text-purple-700 border-purple-200" },
  showcases: { label: "Showcase", color: "bg-orange-100 text-orange-700 border-orange-200" },
};

// Calculate read time
const readTime = computed(() => {
  if (!content.value?.body) return "3 min read";
  const wordCount = JSON.stringify(content.value.body).split(" ").length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
});

// Fetch related articles from same collection
const { data: relatedArticles } = await useAsyncData(
  `related-${slug}`,
  async () => {
    if (!isValidCollection || !content.value) return [];
    try {
      return await queryCollection(collectionName)
        .where("path", "!=", `/${slug}`)
        .where("published", "!=", false)
        .limit(3)
        .all();
    } catch {
      return [];
    }
  },
  {
    server: true,
    default: () => [],
  },
);

const relatedContent = computed(() => {
  if (!relatedArticles.value) return [];
  return relatedArticles.value.map((item: any) => ({
    path: item.path,
    type: collectionName,
    title: item.title,
    description: item.description,
  }));
});

// Motion animation
const prefersReducedMotion = useMotionPreference();
const [heroScope, heroAnimate] = useAnimate();
const [contentScope, contentAnimate] = useAnimate();

onMounted(async () => {
  if (prefersReducedMotion.value === "reduce" || notFound.value) return;

  await nextTick();

  setTimeout(() => {
    try {
      heroAnimate(
        "[data-animate-hero]",
        { opacity: [0, 1], y: [30, 0] },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: stagger(0.1) },
      );
    } catch {
      // Ignore
    }

    setTimeout(() => {
      try {
        contentAnimate(
          "[data-animate-content]",
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        );
      } catch {
        // Ignore
      }
    }, 300);
  }, 100);
});

// Reading progress
const progress = ref(0);
const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
};

onMounted(() => {
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateProgress);
});

// SEO
useSeoMeta({
  title: () => content.value?.title || "Article Not Found",
  description: () => content.value?.description || "The requested article could not be found.",
});

// Scroll to section
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] pt-16">
    <!-- 404 Not Found State -->
    <div v-if="notFound || !isValidCollection" class="min-h-[60vh] flex items-center justify-center px-4">
      <div class="text-center max-w-md">
        <span class="i-tabler:file-x text-6xl text-gray-300 mb-4 block mx-auto" />
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Article Not Found</h1>
        <p class="text-gray-600 mb-6">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <NuxtLink
          to="/writing"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
        >
          <span class="i-tabler:arrow-left" />
          Back to Writing
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="pending" class="min-h-[60vh] flex items-center justify-center">
      <div class="animate-pulse flex flex-col items-center">
        <div class="h-8 w-32 bg-gray-200 rounded mb-4"></div>
        <div class="h-4 w-64 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Article Content -->
    <div v-else-if="content">
      <!-- Reading Progress Bar -->
      <div class="fixed top-16 left-0 right-0 h-1 bg-gray-100 z-50">
        <div
          class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-150"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <!-- Sticky Header -->
      <div class="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <NuxtLink
            to="/writing"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition-all shadow-sm"
          >
            <span class="i-tabler:arrow-left" />
            Back to Writing
          </NuxtLink>
        </div>
      </div>

      <!-- Hero Section -->
      <div
        ref="heroScope"
        class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-b border-gray-100"
      >
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div class="max-w-3xl">
            <!-- Type + Tags -->
            <div data-animate-hero class="flex items-center gap-2 mb-6 flex-wrap">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium border',
                  typeConfig[urlPath]?.color ||
                    'bg-gray-100 text-gray-700 border-gray-200',
                ]"
              >
                {{ typeConfig[urlPath]?.label || urlPath }}
              </span>
              <span
                v-if="content.milestone"
                class="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200"
              >
                🎯 Milestone
              </span>
              <span
                v-if="content.difficulty"
                class="px-2.5 py-1 rounded-full text-xs font-medium border"
                :class="{
                  'bg-emerald-100 text-emerald-700 border-emerald-200':
                    content.difficulty === 'beginner',
                  'bg-amber-100 text-amber-700 border-amber-200':
                    content.difficulty === 'intermediate',
                  'bg-rose-100 text-rose-700 border-rose-200':
                    content.difficulty === 'advanced',
                }"
              >
                {{ content.difficulty }}
              </span>
            </div>

            <h1
              data-animate-hero
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
            >
              {{ content.title }}
            </h1>
            <p data-animate-hero class="text-lg text-gray-700 leading-relaxed mb-8">
              {{ content.description }}
            </p>

            <!-- Meta -->
            <div data-animate-hero class="flex items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1.5">
                <span class="i-tabler:calendar" />
                {{ new Date(content.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) }}
              </span>
              <span class="flex items-center gap-1.5">
                <span class="i-tabler:clock" />
                {{ readTime }}
              </span>
              <span v-if="content.project" class="flex items-center gap-1.5">
                <span class="w-1 h-1 rounded-full bg-gray-300" />
                <span class="i-tabler:folder" />
                {{ content.project }}
              </span>
            </div>

            <!-- Progress Bar -->
            <div v-if="content.progress !== undefined" class="mt-6 max-w-md">
              <div class="flex justify-between text-sm text-text mb-2">
                <span>Project Progress</span>
                <span class="font-medium">{{ content.progress }}%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full bg-indigo-500 rounded-full transition-all"
                  :style="{ width: `${content.progress}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Article Content -->
          <article class="flex-1 max-w-3xl">
            <!-- Prerequisites -->
            <div
              v-if="content.prerequisites?.length"
              class="mb-8 p-6 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
            >
              <h3 class="font-semibold text-[var(--color-dark)] mb-3 flex items-center gap-2">
                <span class="i-tabler:book-open text-[var(--color-primary)]" />
                Before You Start
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="prereq in content.prerequisites"
                  :key="prereq"
                  class="text-[var(--color-text)] text-sm flex items-center gap-2"
                >
                  <span class="i-tabler:check text-[var(--color-primary)]" />
                  {{ prereq }}
                </li>
              </ul>
            </div>

            <!-- TOC (Mobile) -->
            <nav
              v-if="toc.length > 0"
              aria-label="Table of contents"
              class="lg:hidden mb-8 p-4 rounded-xl border border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-sm"
            >
              <p class="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">
                On this page
              </p>
              <ul class="list-none space-y-0.5">
                <li v-for="item in toc" :key="item.id">
                  <button
                    type="button"
                    @click="scrollToSection(item.id)"
                    class="block w-full text-left py-1.5 text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                  >
                    {{ item.text }}
                  </button>
                </li>
              </ul>
            </nav>

            <!-- Content -->
            <div ref="contentScope" data-animate-content class="prose prose-lg max-w-none">
              <ContentRenderer :value="content" />
            </div>

            <!-- Tags -->
            <div v-if="content.tags?.length" class="mt-12 pt-8 border-t border-gray-100">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm text-gray-500 mr-1">Tags:</span>
                <NuxtLink
                  v-for="tag in content.tags"
                  :key="tag"
                  :to="`/writing?tag=${tag}`"
                  class="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors"
                >
                  {{ tag }}
                </NuxtLink>
              </div>
            </div>
          </article>

          <!-- TOC Sidebar (Desktop) -->
          <aside v-if="toc.length > 0" class="hidden lg:block lg:w-64 shrink-0">
            <div class="sticky top-24">
              <nav
                aria-label="Table of contents"
                class="p-4 rounded-xl border border-gray-200/80 bg-white/90 shadow-sm"
              >
                <p class="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">
                  On this page
                </p>
                <ul class="list-none space-y-1">
                  <li v-for="item in toc" :key="item.id">
                    <button
                      type="button"
                      @click="scrollToSection(item.id)"
                      class="block w-full text-left py-1.5 text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                    >
                      {{ item.text }}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>

      <!-- Related Articles -->
      <div
        v-if="relatedContent.length"
        class="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white"
      >
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div class="flex items-center gap-3 mb-8">
            <span class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <span class="i-tabler:book-open text-indigo-600" />
            </span>
            <h2 class="text-xl font-bold text-gray-900">Continue Reading</h2>
          </div>
          <div class="grid sm:grid-cols-2 gap-6">
            <NuxtLink
              v-for="item in relatedContent"
              :key="item.path"
              :to="item.path"
              class="group flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
            >
              <div
                class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center"
              >
                <span
                  v-if="item.type === 'blog'"
                  class="i-tabler:article text-purple-500 text-xl"
                />
                <span
                  v-else-if="item.type === 'dev-logs'"
                  class="i-tabler:code text-blue-500 text-xl"
                />
                <span v-else class="i-tabler:book text-green-500 text-xl" />
              </div>
              <div class="min-w-0">
                <span
                  :class="[
                    'inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide mb-1.5',
                    typeConfig[item.type]?.color || 'bg-gray-100 text-gray-700',
                  ]"
                >
                  {{ typeConfig[item.type]?.label || item.type }}
                </span>
                <h3
                  class="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1"
                >
                  {{ item.title }}
                </h3>
                <p class="text-sm text-gray-500 line-clamp-2">
                  {{ item.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

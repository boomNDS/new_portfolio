<script setup lang="ts">
import { stagger, useAnimate } from "motion-v";
import { computed, ref } from "vue";

// Motion animation setup
const prefersReducedMotion = useMotionPreference();
const [headerScope, headerAnimate] = useAnimate();
const [listScope, listAnimate] = useAnimate();
const [sidebarScope, sidebarAnimate] = useAnimate();

// Animate on mount
onMounted(async () => {
  if (prefersReducedMotion.value === "reduce") return;

  await nextTick();

  setTimeout(() => {
    // Header animation
    try {
      headerAnimate(
        "[data-animate-header]",
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: stagger(0.1) },
      );
    } catch {
      // Ignore animation errors
    }

    // Cards animation (delayed)
    setTimeout(() => {
      try {
        listAnimate(
          "[data-animate-card]",
          { opacity: [0, 1], y: [30, 0] },
          { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: stagger(0.08) },
        );
      } catch {
        // Ignore animation errors
      }
    }, 200);

    // Sidebar animation (delayed)
    setTimeout(() => {
      try {
        sidebarAnimate(
          "[data-animate-sidebar]",
          { opacity: [0, 1], x: [20, 0] },
          { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: stagger(0.1) },
        );
      } catch {
        // Ignore animation errors
      }
    }, 400);
  }, 100);
});

// Filter state
const activeFilter = ref("all");

// Fetch content from all collections
const { data: blogPosts, pending: pendingBlog } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").where("published", "!=", false).order("date", "DESC").all(),
);

const { data: devLogs, pending: pendingDev } = await useAsyncData("dev-logs-posts", () =>
  queryCollection("devLogs").where("published", "!=", false).order("date", "DESC").all(),
);

const { data: learningNotes, pending: pendingLearning } = await useAsyncData("learning-posts", () =>
  queryCollection("learning").where("published", "!=", false).order("date", "DESC").all(),
);

const pending = computed(() => pendingBlog.value || pendingDev.value || pendingLearning.value);

// Combine all content
const articles = computed(() => {
  const items = [];

  // Add blog posts
  if (blogPosts.value) {
    for (const item of blogPosts.value) {
      const wordCount = item.body ? JSON.stringify(item.body).split(" ").length : 0;
      items.push({
        path: item.path,
        type: "blog" as const,
        title: item.title,
        description: item.description,
        date: item.date,
        readTime: `${Math.ceil(wordCount / 200) || 3} min read`,
        tags: item.tags || [],
        body: item.body,
      });
    }
  }

  // Add dev logs
  if (devLogs.value) {
    for (const item of devLogs.value) {
      const wordCount = item.body ? JSON.stringify(item.body).split(" ").length : 0;
      items.push({
        path: item.path,
        type: "dev-logs" as const,
        title: item.title,
        description: item.description,
        date: item.date,
        readTime: `${Math.ceil(wordCount / 200) || 3} min read`,
        tags: item.tags || [],
        project: item.project,
        milestone: item.milestone,
        progress: item.progress,
        body: item.body,
      });
    }
  }

  // Add learning notes
  if (learningNotes.value) {
    for (const item of learningNotes.value) {
      const wordCount = item.body ? JSON.stringify(item.body).split(" ").length : 0;
      items.push({
        path: item.path,
        type: "learning" as const,
        title: item.title,
        description: item.description,
        date: item.date,
        readTime: `${Math.ceil(wordCount / 200) || 3} min read`,
        tags: item.tags || [],
        topic: item.topic,
        difficulty: item.difficulty,
        prerequisites: item.prerequisites,
        body: item.body,
      });
    }
  }

  // Sort by date descending
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Filtered content
const filteredContent = computed(() => {
  if (activeFilter.value === "all") return articles.value;
  return articles.value.filter((item) => item.type === activeFilter.value);
});

// Stats
const stats = computed(() => {
  const total = articles.value.length;
  const devLogs = articles.value.filter((i) => i.type === "dev-logs").length;
  const learning = articles.value.filter((i) => i.type === "learning").length;
  const blog = articles.value.filter((i) => i.type === "blog").length;
  return { total, devLogs, learning, blog };
});

// Type config (for display labels and colors)
const typeConfig: Record<string, { label: string; color: string }> = {
  "dev-logs": { label: "Dev Log", color: "bg-blue-100 text-blue-700 border-blue-200" },
  learning: { label: "Learning", color: "bg-green-100 text-green-700 border-green-200" },
  blog: { label: "Blog", color: "bg-purple-100 text-purple-700 border-purple-200" },
};

const difficultyColor: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  advanced: "bg-rose-100 text-rose-700 border-rose-200",
};

useSeoMeta({
  title: "Writing",
  description: "My thoughts, learnings, and development journey.",
});
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] pt-16">
    <!-- Sticky Header Banner -->
    <div class="sticky top-16 z-40 bg-white border-b border-gray-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-[var(--color-dark)] font-semibold hover:text-[var(--color-primary)] transition-colors"
        >
          <span class="i-tabler:arrow-left" />
          Back
        </NuxtLink>
      </div>
    </div>

    <!-- Welcome Section -->
    <div
      ref="headerScope"
      class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-b border-gray-100"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div class="max-w-2xl">
          <span
            data-animate-header
            class="inline-block px-3 py-1 rounded-full bg-white/80 border border-gray-200 text-xs font-medium text-gray-900 mb-4"
          >
            📝 My Digital Garden
          </span>
          <h1
            data-animate-header
            class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Welcome to my writing space
          </h1>
          <p data-animate-header class="text-lg text-text leading-relaxed">
            A collection of thoughts on software engineering, tutorials I'm writing, and logs from my
            development journey. Grab a coffee and explore!
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Left: Content List -->
        <div class="flex-1">
          <!-- Loading State -->
          <div v-if="pending" class="space-y-6">
            <div
              v-for="i in 3"
              :key="i"
              class="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse"
            >
              <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <!-- Filter Tabs -->
          <div v-else class="flex flex-wrap gap-2 mb-8">
            <button
              v-for="filter in [
                { key: 'all', label: 'All Posts', count: stats.total },
                { key: 'dev-logs', label: 'Dev Logs', count: stats.devLogs },
                { key: 'learning', label: 'Learning', count: stats.learning },
                { key: 'blog', label: 'Blog', count: stats.blog },
              ]"
              :key="filter.key"
              type="button"
              class="group/btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              :class="
                activeFilter === filter.key
                  ? 'bg-gray-200 text-gray-900 border-2 border-gray-400'
                  : 'bg-white text-gray-900 border border-gray-300 hover:border-gray-400 hover:bg-gray-100'
              "
              @click="activeFilter = filter.key"
            >
              {{ filter.label }}
              <span
                class="ml-1.5 text-xs transition-colors duration-200"
                :class="
                  activeFilter === filter.key
                    ? 'text-gray-700'
                    : 'text-gray-500 group-hover/btn:text-gray-700'
                "
              >
                ({{ filter.count }})
              </span>
            </button>
          </div>

          <!-- Articles Grid -->
          <div v-if="!pending" ref="listScope" class="space-y-6">
            <article
              v-for="item in filteredContent"
              :key="item.path"
              data-animate-card
              class="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <!-- Tags Row -->
              <div class="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-medium border',
                    typeConfig[item.type]?.color || 'bg-gray-100 text-gray-700 border-gray-200',
                  ]"
                >
                  {{ typeConfig[item.type]?.label || item.type }}
                </span>
                <span
                  v-if="item.milestone"
                  class="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200"
                >
                  🎯 Milestone
                </span>
                <span
                  v-if="item.difficulty"
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-medium border',
                    difficultyColor[item.difficulty],
                  ]"
                >
                  {{ item.difficulty }}
                </span>
                <span class="text-xs text-text-muted ml-auto flex items-center gap-1">
                  <span class="i-tabler:clock" />
                  {{ item.readTime }}
                </span>
              </div>

              <!-- Title -->
              <NuxtLink :to="item.path" class="block mb-3">
                <h2
                  class="text-xl font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors"
                >
                  {{ item.title }}
                </h2>
              </NuxtLink>

              <!-- Description -->
              <p class="text-text text-sm leading-relaxed mb-4">
                {{ item.description }}
              </p>

              <!-- Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-50">
                <div class="flex items-center gap-3 text-sm text-text">
                  <span>{{ new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) }}</span>
                  <span v-if="item.project" class="flex items-center gap-1">
                    <span class="w-1 h-1 rounded-full bg-gray-300" />
                    <span class="i-tabler:folder text-xs" />
                    {{ item.project }}
                  </span>
                  <span v-if="item.topic" class="flex items-center gap-1">
                    <span class="w-1 h-1 rounded-full bg-gray-300" />
                    {{ item.topic }}
                  </span>
                </div>
                <NuxtLink
                  :to="item.path"
                  class="text-sm font-medium text-[var(--color-primary)] hover:opacity-90 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read more
                  <span class="i-tabler:arrow-right" />
                </NuxtLink>
              </div>

              <!-- Progress Bar (for dev logs) -->
              <div v-if="item.progress !== undefined" class="mt-4">
                <div class="flex justify-between text-xs text-text mb-1">
                  <span>Progress</span>
                  <span>{{ item.progress }}%</span>
                </div>
                <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-indigo-500 rounded-full transition-all"
                    :style="{ width: `${item.progress}%` }"
                  />
                </div>
              </div>
            </article>
          </div>

          <!-- Empty State -->
          <div v-if="!pending && filteredContent.length === 0" class="text-center py-16">
            <span class="i-tabler:search text-5xl text-gray-300 mb-4 block" />
            <h3 class="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
            <p class="text-text">Try selecting a different filter</p>
          </div>
        </div>

        <!-- Right: Sidebar CTA -->
        <div ref="sidebarScope" class="lg:w-72 shrink-0">
          <div class="sticky top-24 space-y-6">
            <!-- CTA Card (InfoCard-style) -->
            <div
              data-animate-sidebar
              class="group rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300 p-6"
            >
              <h3
                class="text-base font-semibold text-[var(--color-dark)] mb-1 group-hover:text-[var(--color-primary)] transition-colors"
              >
                Let's connect!
              </h3>
              <p class="text-sm text-[var(--color-text)] mb-4">
                I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>
              <NuxtLink
                to="/"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-card)] text-[var(--color-dark)] border-2 border-[var(--color-border)] font-semibold text-sm hover:scale-105 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
              >
                Get in touch
                <span class="i-tabler:arrow-right" />
              </NuxtLink>
            </div>

            <!-- Topics -->
            <div
              data-animate-sidebar
              class="rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300 p-6"
            >
              <h4 class="text-base font-semibold text-[var(--color-dark)] mb-4">Popular Topics</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] bg-[var(--color-light)] text-[var(--color-text-muted)]"
                  >#Vue.js</span
                >
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] bg-[var(--color-light)] text-[var(--color-text-muted)]"
                  >#TypeScript</span
                >
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] bg-[var(--color-light)] text-[var(--color-text-muted)]"
                  >#Rust</span
                >
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] bg-[var(--color-light)] text-[var(--color-text-muted)]"
                  >#Nuxt</span
                >
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] bg-[var(--color-light)] text-[var(--color-text-muted)]"
                  >#CLI</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

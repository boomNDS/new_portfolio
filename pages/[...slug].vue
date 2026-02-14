<script setup lang="ts">
const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join("/")
  : (route.params.slug ?? "");

// Content body types
interface ContentNode {
  type: string;
  tag?: string;
  value?: string;
  props?: { id?: string; class?: string };
  children?: ContentNode[];
}

interface ContentBody {
  type: string;
  children?: ContentNode[];
}

interface Article {
  type: "blog" | "dev-log" | "learning";
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  isMock: boolean;
  body: ContentBody;
  milestone?: boolean;
  difficulty?: "beginner" | "intermediate" | "advanced";
  project?: string;
  progress?: number;
  prerequisites?: string[];
  topic?: string;
}

// Generate TOC from content
const generateTOC = (body: ContentBody | undefined) => {
  const toc: { id: string; text: string; level: number }[] = [];
  if (body?.children) {
    body.children.forEach((child: ContentNode, index: number) => {
      if (child.tag === "h2") {
        const text = child.children?.[0]?.value || "";
        toc.push({ id: `section-${index}`, text, level: 2 });
      }
    });
  }
  return toc;
};

// Mock content database
const mockArticles: Record<string, Article> = {
  "blog/welcome": {
    type: "blog",
    title: "Welcome to My Blog",
    description:
      "This is a placeholder blog post to demonstrate the layout. Real content coming soon!",
    date: "2026-02-14",
    readTime: "3 min read",
    tags: ["introduction", "placeholder"],
    isMock: true,
    body: {
      type: "root",
      children: [
        {
          type: "element",
          tag: "p",
          children: [
            {
              type: "text",
              value:
                "Welcome! This is a mock blog post to show how the layout will look when real content is added. The actual blog will feature thoughts on software engineering, tutorials, and experiences from my journey as a developer.",
            },
          ],
        },
        {
          type: "element",
          tag: "h2",
          props: { id: "what-to-expect" },
          children: [{ type: "text", value: "What to Expect" }],
        },
        {
          type: "element",
          tag: "p",
          children: [{ type: "text", value: "Here are some topics I plan to write about:" }],
        },
        {
          type: "element",
          tag: "ul",
          children: [
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Web development tutorials and tips" }],
            },
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Project retrospectives and lessons learned" }],
            },
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Tool recommendations and reviews" }],
            },
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Random thoughts on tech industry" }],
            },
          ],
        },
        {
          type: "element",
          tag: "h2",
          props: { id: "get-in-touch" },
          children: [{ type: "text", value: "Get in Touch" }],
        },
        {
          type: "element",
          tag: "p",
          children: [
            {
              type: "text",
              value:
                "I'd love to hear from you! Whether you have questions, feedback, or just want to say hi, feel free to reach out.",
            },
          ],
        },
      ],
    },
  },
  "dev-logs/project-alpha": {
    type: "dev-log",
    title: "Project Alpha: Getting Started",
    description: "Kicking off a new project with modern tech stack. Excited to share the journey!",
    date: "2026-02-12",
    readTime: "5 min read",
    project: "Project Alpha",
    milestone: true,
    progress: 25,
    tags: ["vue", "nuxt", "beginning"],
    isMock: true,
    body: {
      type: "root",
      children: [
        {
          type: "element",
          tag: "p",
          children: [
            {
              type: "text",
              value:
                "Today marks the beginning of Project Alpha! This is a full-stack application built with Nuxt 3, FastAPI, and PostgreSQL.",
            },
          ],
        },
        {
          type: "element",
          tag: "h2",
          props: { id: "tech-stack" },
          children: [{ type: "text", value: "Tech Stack" }],
        },
        {
          type: "element",
          tag: "ul",
          children: [
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Frontend: Nuxt 3 with TypeScript" }],
            },
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Backend: FastAPI (Python)" }],
            },
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Database: PostgreSQL" }],
            },
            {
              type: "element",
              tag: "li",
              children: [{ type: "text", value: "Hosting: Vercel + Railway" }],
            },
          ],
        },
        {
          type: "element",
          tag: "h2",
          props: { id: "goals" },
          children: [{ type: "text", value: "Goals" }],
        },
        {
          type: "element",
          tag: "p",
          children: [
            {
              type: "text",
              value:
                "The main objectives for this project are to learn Nuxt 3 patterns, implement proper auth, and create a scalable API architecture.",
            },
          ],
        },
      ],
    },
  },
  "learning/typescript-basics": {
    type: "learning",
    title: "TypeScript Basics for Beginners",
    description:
      "A comprehensive guide to getting started with TypeScript. Learn the fundamentals.",
    date: "2026-02-09",
    readTime: "8 min read",
    topic: "TypeScript",
    difficulty: "beginner",
    prerequisites: ["Basic JavaScript knowledge", "Node.js installed"],
    tags: ["typescript", "javascript", "tutorial"],
    isMock: true,
    body: {
      type: "root",
      children: [
        {
          type: "element",
          tag: "p",
          children: [
            {
              type: "text",
              value:
                "TypeScript adds static typing to JavaScript, making your code more reliable and easier to maintain.",
            },
          ],
        },
        {
          type: "element",
          tag: "h2",
          props: { id: "why-typescript" },
          children: [{ type: "text", value: "Why TypeScript?" }],
        },
        {
          type: "element",
          tag: "p",
          children: [
            {
              type: "text",
              value:
                "TypeScript catches errors at compile time rather than runtime. This means fewer bugs in production!",
            },
          ],
        },
        {
          type: "element",
          tag: "h2",
          props: { id: "basic-types" },
          children: [{ type: "text", value: "Basic Types" }],
        },
        {
          type: "element",
          tag: "pre",
          props: { class: "language-typescript" },
          children: [
            {
              type: "element",
              tag: "code",
              children: [
                {
                  type: "text",
                  value: '// Basic types\nlet name: string = "John";\nlet age: number = 30;',
                },
              ],
            },
          ],
        },
        {
          type: "element",
          tag: "h2",
          props: { id: "interfaces" },
          children: [{ type: "text", value: "Interfaces" }],
        },
        {
          type: "element",
          tag: "p",
          children: [
            { type: "text", value: "Interfaces define the shape of objects in TypeScript." },
          ],
        },
      ],
    },
  },
};

// Get content
const content = computed(() => mockArticles[slug] || null);
const toc = computed(() => (content.value ? generateTOC(content.value.body) : []));

// Related content
const relatedContent = computed(() => {
  if (!content.value) return [];
  const others = Object.entries(mockArticles)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, value]) => ({ ...value, path: `/${key}` }));
  return others;
});

if (!content.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

// Scroll to section
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Copy code functionality
const copiedCode = ref<string | null>(null);
const copyCode = async (code: string) => {
  await navigator.clipboard.writeText(code);
  copiedCode.value = code;
  setTimeout(() => (copiedCode.value = null), 2000);
};

// Reading progress
const progress = ref(0);
const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
};
// Enhance code blocks with copy buttons and language labels
const enhanceCodeBlocks = () => {
  setTimeout(() => {
    const preBlocks = document.querySelectorAll(".prose pre");
    preBlocks.forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code || pre.querySelector(".copy-btn")) return;

      // Get language from class
      const langClass = Array.from(code.classList).find((c) => c.startsWith("language-"));
      const lang = langClass ? langClass.replace("language-", "") : "code";
      pre.setAttribute("data-language", lang);

      // Add copy button
      const copyBtn = document.createElement("button");
      copyBtn.className =
        "copy-btn absolute top-2 right-2 z-10 px-3 py-1.5 text-xs font-medium text-gray-400 bg-[#313244] hover:bg-[#45475a] hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100";
      copyBtn.innerHTML = '<span class="i-tabler:copy" /> Copy';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(code.textContent || "");
        copyBtn.innerHTML = '<span class="i-tabler:check" /> Copied!';
        copyBtn.classList.add("text-green-400");
        setTimeout(() => {
          copyBtn.innerHTML = '<span class="i-tabler:copy" /> Copy';
          copyBtn.classList.remove("text-green-400");
        }, 2000);
      };

      pre.classList.add("group");
      pre.appendChild(copyBtn);

      // Show button on hover
      pre.addEventListener("mouseenter", () => copyBtn.classList.remove("opacity-0"));
      pre.addEventListener("mouseleave", () => copyBtn.classList.remove("opacity-0"));
    });
  }, 100);
};

onMounted(() => {
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
  enhanceCodeBlocks();
});
onUnmounted(() => {
  window.removeEventListener("scroll", updateProgress);
});

const typeConfig: Record<string, { label: string; color: string }> = {
  blog: { label: "Blog", color: "bg-purple-100 text-purple-700 border-purple-200" },
  "dev-log": { label: "Dev Log", color: "bg-blue-100 text-blue-700 border-blue-200" },
  learning: { label: "Learning", color: "bg-green-100 text-green-700 border-green-200" },
};

useSeoMeta({
  title: () => content.value?.title || "Article",
  description: () => content.value?.description,
});
</script>

<template>
  <div v-if="content" class="min-h-screen bg-[#fafafa] pt-16">
    <!-- Reading Progress Bar -->
    <div class="fixed top-16 left-0 right-0 h-1 bg-gray-100 z-50">
      <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-150" :style="{ width: `${progress}%` }" />
    </div>

    <!-- Sticky Header -->
    <div class="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <NuxtLink to="/writing" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition-all shadow-sm">
          <span class="i-tabler:arrow-left" />
          Back to Writing
        </NuxtLink>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-b border-gray-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div class="max-w-3xl">
          <!-- Type + Tags -->
          <div class="flex items-center gap-2 mb-6 flex-wrap">
            <span :class="['px-2.5 py-1 rounded-full text-xs font-medium border', typeConfig[content.type]?.color || 'bg-gray-100 text-gray-700 border-gray-200']">
              {{ typeConfig[content.type]?.label || 'Article' }}
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
                'bg-emerald-100 text-emerald-700 border-emerald-200': content.difficulty === 'beginner',
                'bg-amber-100 text-amber-700 border-amber-200': content.difficulty === 'intermediate',
                'bg-rose-100 text-rose-700 border-rose-200': content.difficulty === 'advanced',
              }"
            >
              {{ content.difficulty }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {{ content.title }}
          </h1>
          <p class="text-lg text-gray-700 leading-relaxed mb-8">
            {{ content.description }}
          </p>

          <!-- Meta -->
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span class="flex items-center gap-1.5">
              <span class="i-tabler:calendar" />
              {{ new Date(content.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
            </span>
            <span class="w-1 h-1 rounded-full bg-gray-300" />
            <span class="flex items-center gap-1.5">
              <span class="i-tabler:clock" />
              {{ content.readTime }}
            </span>
          </div>

          <!-- Progress Bar -->
          <div v-if="content.progress !== undefined" class="mt-6 max-w-md">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>Project Progress</span>
              <span class="font-medium">{{ content.progress }}%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-500 rounded-full transition-all" :style="{ width: `${content.progress}%` }" />
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
              <li v-for="prereq in content.prerequisites" :key="prereq" class="text-[var(--color-text)] text-sm flex items-center gap-2">
                <span class="i-tabler:check text-[var(--color-primary)]" />
                {{ prereq }}
              </li>
            </ul>
          </div>

          <!-- TOC (Mobile) - same minimal style -->
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
          <div class="prose prose-lg max-w-none 
            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:no-underline
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:relative prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-0 prose-pre:overflow-hidden
            prose-pre:shadow-lg prose-pre:shadow-gray-900/20
            prose-ul:my-6 prose-li:my-2">
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
      </div>
    </div>

    <!-- Related Articles -->
    <div v-if="relatedContent.length" class="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white">
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
            <div class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center">
              <span v-if="item.type === 'blog'" class="i-tabler:article text-purple-500 text-xl" />
              <span v-else-if="item.type === 'dev-log'" class="i-tabler:code text-blue-500 text-xl" />
              <span v-else class="i-tabler:book text-green-500 text-xl" />
            </div>
            <div class="min-w-0">
              <span :class="['inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide mb-1.5', typeConfig[item.type]?.color || 'bg-gray-100 text-gray-700']">
                {{ typeConfig[item.type]?.label || 'Article' }}
              </span>
              <h3 class="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
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
</template>

<style>
/* Fix heading link styling - remove purple/underline */
.prose h2,
.prose h3,
.prose h2 a,
.prose h3 a {
  color: #111827 !important;
  text-decoration: none !important;
  font-weight: 700;
}

.prose h2 {
  font-size: 1.75rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.375rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}

.prose ul, .prose ol {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}

.prose li {
  margin: 0.5rem 0;
}

/* Code blocks styling */
.prose pre {
  position: relative;
  margin: 1.5rem 0;
  background: #1e1e2e !important;
  border: 1px solid #313244;
}

.prose pre::before {
  content: attr(data-language);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6c7086;
  background: #181825;
  border-bottom: 1px solid #313244;
}

.prose pre code {
  display: block;
  padding: 3.5rem 1.25rem 1.25rem !important;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, Monaco, monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  background: transparent !important;
  color: #cdd6f4;
}

/* Inline code */
.prose :not(pre) > code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  font-weight: 500;
  padding: 0.2em 0.5em;
  border-radius: 0.375rem;
  background: #f3f4f6 !important;
  color: #db2777 !important;
  border: 1px solid #e5e7eb;
}

/* Syntax highlighting colors for dark theme */
.prose pre code .line {
  display: block;
  padding: 0 0.5rem;
}

.prose pre code .line.highlighted {
  background: rgba(137, 180, 250, 0.1);
  margin: 0 -0.5rem;
  border-left: 2px solid #89b4fa;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <footer
    class="w-full h-[200px] bg-[var(--color-light)] mt-[5rem] pt-[5rem] border-t-4 border-[var(--color-border)]"
  >
    <section
      class="flex flex-col sm:flex-row justify-center items-center mx-auto gap-3"
    >
      <NuxtLink to="mailto:contact@pachorn.dev?Subject=Hello%20Boom">
        <button
          class="w-[145px] sm:w-[199px] scale-100 active:scale-92 transition duration-100 text-[20px] sm:text-[24px] text-[var(--color-dark)] px-4 py-2 border-4 border-[var(--color-border)] bg-[var(--color-accent)] cursor-pointer focus:outline-none rounded-xl ease-in shadow-[6px_6px_0px_0px_rgba(0,0,0,0.22)] flex items-center justify-center gap-2"
          :prefetch="false"
        >
          <span class="i-tabler:message-circle text-xl"></span>
          Let’s talk
        </button>
      </NuxtLink>
      <NuxtLink
        to="https://cal.com/pachara-sri/30min"
        target="_blank"
        rel="noreferrer"
        :prefetch="false"
      >
        <button
          class="w-[170px] sm:w-[199px] scale-100 active:scale-92 transition duration-100 text-[16px] sm:text-[18px] text-[var(--color-dark)] px-4 py-2 border-4 border-[var(--color-border)] bg-[var(--color-card)] cursor-pointer focus:outline-none rounded-xl ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <span class="i-tabler:calendar-event text-lg"></span>
          Book a meeting
        </button>
      </NuxtLink>
    </section>
    <section
      class="mt-10 mx-auto flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-[14px] sm:text-[18px] text-center sm:text-left font-medium"
    >
      <p class="m-0 text-[var(--color-text)]">make with 💖 by boomNDS</p>
      <p class="m-0 sm:ml-2 text-[var(--color-text)]">
        © {{ $dayjs().year() }} All rights reserved.
      </p>
    </section>
    <section class="mt-4 flex justify-center gap-4 text-[var(--color-dark)]">
      <NuxtLink
        to="https://www.linkedin.com/in/pachara-sriyodwieng-2a9503149"
        target="_blank"
        rel="noreferrer"
        :prefetch="false"
        class="hover:text-[var(--color-primary)] transition-colors"
      >
        <span class="i-tabler:brand-linkedin text-2xl"></span>
      </NuxtLink>
      <NuxtLink
        to="https://github.com/boomNDS"
        target="_blank"
        rel="noreferrer"
        :prefetch="false"
        class="hover:text-[var(--color-primary)] transition-colors"
      >
        <span class="i-tabler:brand-github text-2xl"></span>
      </NuxtLink>
    </section>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
  <footer
    class="w-full h-[200px] bg-[var(--color-light)] mt-[5rem] pt-[5rem] border-t-4 border-[var(--color-border)]"
  >
    <section class="flex justify-center mx-auto">
      <NuxtLink to="mailto:contact@pachorn.dev?Subject=Hello%20Boom">
        <button
          class="w-[145px] sm:w-[199px] scale-100 active:scale-92 transition duration-100 text-[20px] sm:text-[24px] text-[var(--color-dark)] px-4 py-2 border-4 border-[var(--color-border)] bg-[var(--color-primary)] cursor-pointer focus:outline-none rounded-xl ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] text-white"
          :prefetch="false"
        >
          Let’s talk
        </button>
      </NuxtLink>
    </section>
    <section
      class="mt-10 mx-auto flex flex-col sm:flex-row justify-center text-[14px] sm:text-[18px] text-center sm:text-left font-medium"
    >
      <p class="m-0">make with 💖 by boomNDS</p>
      <p class="m-0 sm:ml-2">© {{ $dayjs().year() }} All rights reserved.</p>
    </section>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>

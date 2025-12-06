<template>
  <footer
    w="100%"
    h="200px"
    bg="var(--color-light)"
    m="t-[5rem]"
    p="t-[5rem]"
    class="border-t-4 border-[var(--color-border)]"
  >
    <section class="flex justify-center mx-auto">
      <NuxtLink to="mailto:contact@pachorn.dev?Subject=Hello%20Boom">
        <button
          w="145px sm:199px"
          scale="active:92"
          duration="100"
          text="20px sm:24px var(--color-dark)"
          p="2 1"
          border="4 var(--color-border)"
          bg="var(--color-primary)"
          class="cursor-pointer focus:outline-none rounded-xl ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] text-white"
          :prefetch="false"
        >
          Let’s talk
        </button>
      </NuxtLink>
    </section>
    <section
      m="t-10 x-auto"
      class="flex flex-col sm:flex-row justify-center"
      text="14px sm:18px center sm:left"
      font="medium"
    >
      <p class="m-0">make with 💖 by boomNDS</p>
      <p class="m-0 sm:ml-2">© {{ $dayjs().year() }} All rights reserved.</p>
    </section>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
  <footer w="100%" h="200px" bg="#d9d9d9" m="t-[5rem]" p="t-[5rem]">
    <section class="flex justify-center mx-auto">
      <NuxtLink to="mailto:contact@pachorn.dev?Subject=Hello%20Boom">
        <button
          w="145px sm:199px"
          scale="active:92"
          duration="100"
          text="20px sm:24px black"
          p="2 1"
          border="4 #333333"
          bg="#ffc107"
          class="cursor-pointer focus:outline-none rounded-xl ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]"
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

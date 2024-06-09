<template>
  <div w="full" h="225px" bg="#d9d9d9" m="t-[5rem]" p="t-[5rem]">
    <section class="flex justify-center mx-auto">
      <NuxtLink to="mailto:pachara.sriyodwieng@gmail.com?Subject=Hello%20Boom">
        <button
          w="199px"
          scale="active:92"
          duration="100"
          text="24px black"
          p="2 1"
          border="4 #333333"
          bg="#ffc107"
          class="cursor-pointer focus:outline-none rounded-xl ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]"
        >
          Let’s talk
        </button>
      </NuxtLink>
    </section>
    <section
      m="t-10 x-auto"
      class="flex justify-center"
      text="18px"
      font="medium"
    >
      <p>make with 💖 by boomNDS</p>
      <p class="ml-2">© {{ $dayjs().year() }} All rights reserved.</p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

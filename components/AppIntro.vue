<template>
  <div
    class="flex min-[1045px]:flex-row flex-col w-full h-500px min-[1045px]:mx-8 mx-0 min-[1045px]:mt-[6rem] mt-[2rem] flex justify-center"
  >
    <div class="relative min-[1045px]:mx-0 mx-auto">
      <div
        class="w-[7.125rem] h-[7.125rem] bg-[#ffc107] rounded-full absolute top-[7rem]"
      />
      <div class="relative ml-[2rem]">
        <div
          class="w-[13.994rem] h-[13.994rem] flex-grow-0 bg-[#7d26cd] rounded-full bottom-0 left-[2rem]"
        />
        <nuxt-img
          class="absolute top-[-4.5rem] rounded-full"
          src="/img/me.png"
          loading="lazy"
          alt="me"
          format="webp"
          w="225px"
          h="3.299.3px"
          placeholder
        />
        <h4 font="normal" text="22px center" m="b-0">Bangkok, Thailand</h4>
        <div class="flex justify-center" space="x-[0.5rem]">
          <NuxtLink
            target="_blank"
            rel="noreferrer"
            to="https://www.linkedin.com/in/pachara-sriyodwieng-2a9503149"
          >
            <div
              text="black"
              class="i-mdi-github ease-in"
              w="24px"
              h="24px"
              scale="active:92"
            />
          </NuxtLink>
          <NuxtLink
            target="_blank"
            rel="noreferrer"
            to="https://github.com/boomNDS"
          >
            <div
              text="black"
              class="i-mdi-linkedin ease-in"
              w="24px"
              h="24px"
              scale="active:92"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <section p="min-[1045px]:l-[9.063rem] l-[4rem] w-full h-auto relative">
      <h1 text="min-[1045px]:3.75rem 2rem" m="0">
        Hello there, I’m <span text="primary">Boom</span>
      </h1>
      <h1 text="min-[1045px]:3.75rem 2rem" m="0">foodie developer</h1>
      <nuxt-img
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-5.2rem] left-[-2.2rem]"
        alt="sparkle icon"
      />
      <nuxt-img
        v-if="isLargeScreen"
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-4rem] left-[30rem]"
        alt="sparkle icon"
      />
      <nuxt-img
        v-if="isLargeScreen"
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-3.2rem] left-[31rem]"
        alt="sparkle icon"
        w="20px"
      />
      <nuxt-img
        v-if="isLargeScreen"
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-2.2rem] left-[28rem]"
        alt="sparkle icon"
        w="30px"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const isLargeScreen = useMediaQuery("(min-width: 1045px)");
</script>

<style scoped></style>

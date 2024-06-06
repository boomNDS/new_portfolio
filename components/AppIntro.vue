<template>
  <div
    class="flex min-[1045px]:flex-row flex-col w-full min-h-450px min-[1045px]:mx-8 mx-0 min-[1045px]:mt-[6rem] mt-[4rem] flex justify-center"
  >
    <div class="relative min-[1045px]:mx-0 mx-auto">
      <div
        h="5rem md:7.125rem"
        w="5rem md:7.125rem"
        bg="#ffc107"
        class="rounded-full absolute top-[7rem]"
      />
      <div class="relative container">
        <div
          class="w-[189px] md:w-[13.994rem] h-[190px] md:h-[13.994rem] flex-grow-0 bg-[#7d26cd] rounded-full bottom-0 left-[2rem]"
        />
        <nuxt-img
          class="absolute top-[-64px] md:top-[-4.5rem] rounded-full"
          src="/img/me.png"
          loading="lazy"
          alt="me"
          format="webp"
          w="190px md:225px"
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
    <section
      text="25px min-[629px]:32px"
      p="min-[1045px]:l-[8.063rem] l-[1rem]  w-full h-auto relative"
      m="auto min-[1045px]:0"
    >
      <h1 m="0">
        Hello there,<br class="block sm:hidden" />
        I’m <span text="primary">Boom</span>
      </h1>
      <h1 m="0">foodie developer</h1>
      <nuxt-img
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-5.2rem] left-[-2.2rem] hidden lg:inline-block"
        alt="sparkle icon"
      />
      <nuxt-img
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-4rem] left-[26rem] hidden lg:inline-block"
        alt="sparkle icon"
      />
      <nuxt-img
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-3.2rem] left-[27rem] hidden lg:inline-block"
        alt="sparkle icon"
        w="20px"
      />
      <nuxt-img
        src="/img/lucide_sparkle.svg"
        loading="lazy"
        class="relative top-[-2.2rem] left-[24rem] hidden lg:inline-block"
        alt="sparkle icon"
        w="30px"
      />
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
  <nav class="mx-30px mt-20px">
    <div class="container mx-auto flex justify-between items-center">
      <nuxt-img
        duration="120"
        delay="100"
        cursor="pointer"
        class="transition ease-in-out hover:-translate-y-1 hover:scale-105"
        src="/img/logo.svg"
        loading="lazy"
        sizes="148px 60px"
      />
      <button class="md:hidden focus:outline-none">Menu</button>
      <div>
        <ul
          cursor="pointer"
          space="x-[4rem]"
          list="none"
          class="flex w-full"
          font="size-38px regular"
        >
          <li
            duration="120"
            delay="100"
            class="transition ease-in-out hover:-translate-y-1 hover:scale-110"
            p="x-4"
          >
            <p p="0" m="0">Experience</p>
          </li>
          <li
            duration="120"
            delay="100"
            class="transition ease-in-out hover:-translate-y-1 hover:scale-110"
            p="x-4"
          >
            Tech stack
          </li>
          <li
            duration="120"
            delay="100"
            class="transition ease-in-out hover:-translate-y-1 hover:scale-110"
            p="x-4"
          >
            Showcase
          </li>
        </ul>
      </div>
      <button>TH</button>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>

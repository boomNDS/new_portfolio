<template>
  <nav class="ml-30px mt-20px">
    <div class="container mx-auto flex justify-between items-center">
      <img
        duration="120"
        delay="100"
        cursor="pointer"
        class="transition ease-in-out hover:-translate-y-1 hover:scale-105"
        src="/img/logo.svg"
        placeholder="[50, 25, 75, 5]"
        format="svg"
      />
      <button
        class="text-white md:hidden focus:outline-none"
        @click="toggleMenu"
      >
        Menu
      </button>
      <div>
        <ul
          cursor="pointer"
          space="x-[4rem]"
          list="none"
          class="flex"
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
    </div>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped></style>

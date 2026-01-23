<template>
  <div>
    <button
      class="rounded ease-in active:scale-92 transition duration-100 text-[14px] px-2 py-1 bg-transparent hover:bg-[var(--color-light)] border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
      @click="onToggle"
    >
      {{ modelValue }}
      <div
        :class="[
          isActive ? `i-mdi-keyboard-arrow-up` : 'i-mdi-keyboard-arrow-down',
        ]"
        class="ease-in-out text-xl transition duration-200"
        aria-hidden="true"
      ></div>
    </button>
    <ul
      v-show="isActive"
      class="absolute ease-in-out rounded mt-1 m-0 p-0 w-[65px] bg-[var(--color-card)] border border-[var(--color-border)]/15 shadow-[var(--shadow-soft)] list-none duration-100"
    >
      <li
        v-for="text in list"
        :key="`li-` + text"
        class="rounded"
      >
        <button
          type="button"
          class="w-full text-left rounded px-2 py-1 hover:bg-[var(--color-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
          @click="($emit('on-click', text), onToggle())"
        >
          {{ text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  modelValue: string;
  list: Array<string>;
}>();

defineEmits(["on-click"]);

const isActive = ref<boolean>(false);

const onToggle = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped></style>

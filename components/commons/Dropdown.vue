<template>
  <div>
    <button
      class="rounded ease-in active:scale-92 transition duration-100 text-[14px] px-2 py-1 bg-transparent hover:bg-[#e8e8e8] border-none"
      @click="onToggle"
    >
      {{ modelValue }}
      <div
        :class="[
          isActive ? `i-mdi-keyboard-arrow-up` : 'i-mdi-keyboard-arrow-down',
        ]"
        class="ease-in-out text-xl transition duration-200"
      ></div>
    </button>
    <ul
      v-show="isActive"
      class="absolute ease-in-out rounded mt-1 m-0 p-0 w-[65px] bg-[#e8e8e8] list-none duration-100"
    >
      <li
        v-for="text in list"
        :key="`li-` + text"
        class="rounded px-2 py-1 hover:bg-[#d9d9d9]"
        @click="($emit('on-click', text), onToggle())"
      >
        {{ text }}
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

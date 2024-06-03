<template>
  <div>
    <button
      scale="active:92"
      duration="100"
      text="14px"
      p="2 1"
      bg="transparent hover:[#e8e8e8]"
      border="none"
      class="rounded ease-in"
      @click="onToggle"
    >
      {{ modelValue }}
      <div
        :duration="200"
        :class="[
          isActive ? `i-mdi-keyboard-arrow-up` : 'i-mdi-keyboard-arrow-down',
        ]"
        class="ease-in-out text-xl"
      />
    </button>
    <ul
      v-show="isActive"
      duration="100"
      bg="#e8e8e8"
      list="none"
      class="absolute ease-in-out rounded mt-1 m-0 p-0 w-[65px]"
    >
      <li
        v-for="text in list"
        :key="`li-` + text"
        bg="hover:[#d9d9d9]"
        class="rounded px-2 py-1"
        @click="$emit('on-click', text), onToggle()"
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

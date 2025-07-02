<template>
  <figure class="my-10">
    <img :src="formattedSrc" :alt="caption" class="mx-auto">
    <figcaption class="mt-2 text-sm italic text-center text-zinc-400">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  }
});

const formattedSrc = import.meta.env.BASE_URL + props.src;
</script>
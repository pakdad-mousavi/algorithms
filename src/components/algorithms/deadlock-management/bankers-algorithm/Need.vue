<template>
  <div>
    <p class="mb-2 font-medium">Need:</p>
    <table>
      <thead>
        <tr>
          <th>Process</th>
          <th v-for="resource in numberOfResources">R{{ resource }}</th>
        </tr>
      </thead>
      <tbody class="highlight-first-column">
        <tr v-for="processNeed, index in needMatrix">
          <td>P{{ index + 1 }}</td>
          <td v-for="need in processNeed">{{ need }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  numberOfResources: {
    required: true,
    type: Number,
  },
  needMatrix: {
    type: Array,
    default: () => [],
  }
});
</script>
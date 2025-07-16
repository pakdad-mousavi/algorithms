<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <!-- Explanation for "__ALGORITHM_NAME__" goes here -->
        <p>
          The <span class="text-main">__ALGORITHM_NAME__</span> is a well known algorithm, used in ... its purpose is to
          ...
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Sub Section
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          You can break your content into smaller pieces like this!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat magnam delectus fuga sit consectetur minus
          enim, reiciendis dicta explicabo impedit! Est perspiciatis aperiam nesciunt ex reiciendis, vero exercitationem
          quisquam obcaecati.
        </p>
        <Figure src="/favicon.svg" class="max-w-xl" caption="Use a Figure To Explain Concepts Visually"></Figure>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <!-- Visualizer goes here -->
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <form class="space-y-4" ref="form">
          <!-- Top bar -->
          <div class="flex items-end gap-4">
            <div class="flex flex-col flex-1 gap-2">
              <label class="font-medium">Singular Value:</label>
              <input type="number" class="w-full field sm:max-w-max" v-model="singularValue">
            </div>
            <button type="button" class="btn" :disabled="sampleData.length === 5" @click="addRow">Add Row</button>
          </div>
          <!-- Input table -->
          <table>
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th></th> <!-- Extra header for delete button -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vector, outerIndex) in sampleData">
                <td v-for="(_, innerIndex) in vector">
                  <input type="number" v-model="sampleData[outerIndex][innerIndex]" min="1" max="5">
                </td>
                <td class="w-20 mx-auto text-center">
                  <TrashButton @click="removeRow(outerIndex)" v-if="sampleData.length > 1"></TrashButton>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" class="btn" @click.prevent="runAlgorithm">Run Algorithm</button>
        </form>

        <!-- Result component -->
        <h2 class="mt-10 text-xl font-semibold">
          Results
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div v-if="hasAlgorithmBeenRan">
          {{ algResults.x }}
          {{ algResults.y }}
        </div>
        <EmptySpace v-else>
          <p class="mb-4">
            No results to display yet, try running the algorithm...
          </p>
          <button @click.prevent="() => runAlgorithm()" class="btn">
            Run Algorithm
          </button>
        </EmptySpace>
      </div>
    </template>
  </TabSwitcher>
</template>

<script setup>
import { tabs } from '@/state/tabState';
import Figure from '@/components/general/Figure.vue';
import TrashButton from '@/components/general/TrashButton.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import { reactive, ref, watch } from 'vue';
import { runGenericAlgorithm } from '@/composables/__ALGORITHM_DIRNAME__';
import EmptySpace from '@/components/general/EmptySpace.vue';

const form = ref(null);

// Initialize sample data
const sampleData = reactive([
  [1, 2],
  [3, 4]
]);
const singularValue = ref(20);

// Store results and keep track of algorithm state
const algResults = reactive({
  x: null,
  y: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([sampleData, singularValue], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  sampleData.push([4, 5]);
};

const removeRow = (index) => {
  sampleData.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const { x, y } = runGenericAlgorithm();
  algResults.x = x;
  algResults.y = y;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
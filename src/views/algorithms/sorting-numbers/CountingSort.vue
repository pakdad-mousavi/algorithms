<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Counting Sort</span> is a non-comparitive sorting algorithm used to sort a series of
          numbers in order, either from smallest to largest (ascending order), or from largest to smallest (descending
          order).
        </p>
        <p>
          Unlike most other algorithms, such as <span class="text-main"
            @click="$router.push('/sorting-numbers/quick-sort')">Quick Sort</span> or <span class="text-main"
            @click="$router.push('/sorting-numbers/quick-sort')">Merge Sort</span>, which rely on comparing numbers
          together, counting sort - as the name suggests - relies on counting the occurences of each value.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Sorting Colored Balls
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          To understand how counting sort works, we first sort a bunch of colored balls. Consider the following:
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/colored-balls.svg" class="max-w-lg"
          caption="A Series of Colored Balls"></Figure>
        <p>
          We have 8 colored balls of 4 different colors: green, blue, orange, and pink. To sort these balls, we'll give
          each color a value, green will be 1, blue will be 2, orange will be 3, and pink will be 4. This will be the
          order we will be sorting in.
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/valued-colored-balls.svg" class="max-w-lg"
          caption="A Series of Valued Colored Balls"></Figure>
        <p>
          Perfect, now lets start sorting! Counting sort relies on counting the number of occurences of each value, so
          we will need to use a <span class="text-main">counting array</span>. This will help us keep track of how many
          of each color there is.
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/balls-counting-array.svg" class="max-w-xs"
          caption="A Counting Array"></Figure>
        <p>
          After a quick manual count, we can see that there are 2 balls with the value of one, 3 balls with the value of
          2, 1 ball with the value of 3, and 2 balls with the value of 4.
        </p>
        <p>
          Now, we can simply put the balls back in order using our counting array without ever needing to compare a
          single value. First, we need to place 2 balls with the value of 1 (green):
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/sorting-balls-1.svg" class="max-w-xs"
          caption="Placing the First Colored Balls Back Into Place"></Figure>
        <p>
          Next, we need 3 balls with the value of 2 (blue):
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/sorting-balls-2.svg" class="max-w-xs"
          caption="Placing the Second Set of Colored Balls Back Into Place"></Figure>
        <p>
          Then comes a single ball with the value of 3 (orange):
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/sorting-balls-3.svg" class="max-w-sm"
          caption="Placing the Third Set of Colored Balls Back Into Place"></Figure>
        <p>
          Finally, we need 2 balls with the value of 4 (pink):
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/sorting-balls-4.svg" class="max-w-lg"
          caption="Placing the Final Set of Colored Balls Back Into Place"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          Using Counting Sort On Real Numbers
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Counting sort works the exact same way for real numbers, with the exception that we no longer have to assign
          the values ourselves; the numbers are our values! Consider the following list of unsorted numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/unsorted-numbers.svg" class="max-w-sm"
          caption="A List of Unsorted Numbers"></Figure>
        <p>
          Here, we can directly create our counting array without assigning values manually:
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/counting-array.svg" class="max-w-lg"
          caption="A Counting Array"></Figure>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              Look carefully, do you notice that we have the values 5, 6, and 7 in our counting array with counts of
              zero? Why do we need to include that?
            </p>
            <p>
              Our counting array doesn't know the values or their counts beforehand, so when we are creating the
              counting array, it will have to be big enough for all the possible values which may exist.
            </p>
            <p>
              Specifically, our counting array will always be of size <span class="text-main">max - min + 1</span>. In
              the example above, that's 8 - 1 + 1, which is equal to 8, giving us 8 slots in our counting array.
            </p>
          </div>
        </Alert>
        <p>
          Finally, we can reconstruct the sorted array like so:
        </p>
        <Figure src="/algorithms/sorting-numbers/counting-sort/sorted-numbers.svg" class="max-w-sm"
          caption="Reconstructing the Sorted Array"></Figure>
        <p>
          To sort in descending order, we just need to go the opposite way in our counting array.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Key Metrics
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Counting sort has a <span class="text-main">time complexity</span> of <span class="text-main">O(n + k)</span>,
          where n is the number of elements in our unsorted list, and k is the range of values that exist (max - min +
          1).
        </p>
        <p>
          Counting sort is best used when k is not much larger than n. If it was, you'd waste a ton of memory making a
          giant counting array. For example, if you wanted to sort 10,000 numbers which range from 0 to 1 billion, k
          would be equal to 1 billion, which is awful compared to other sorting algorithms!
        </p>
        <p>
          On the other hand, when sorting 1,000,000 exam scores which range from 0 - 100, n is 1,000,000 and k is only
          101, making counting sort a perfect choice for this problem.
        </p>
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
              <label class="font-medium">Ascending / Descending:</label>
              <select class="field" v-model="direction">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
            <button type="button" class="btn" :disabled="unsortedNumbers.length === 8" @click="addRow">Add Row</button>
          </div>
          <!-- Input table -->
          <table>
            <thead>
              <tr>
                <th>Numbers to Sort</th>
                <th></th> <!-- Extra header for delete button -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(_, index) in unsortedNumbers">
                <td>
                  <input type="number" v-model="unsortedNumbers[index]" min="1" :max="MAX_NUM">
                </td>
                <td class="w-20 mx-auto text-center">
                  <TrashButton @click="removeRow(index)" v-if="unsortedNumbers.length > 1"></TrashButton>
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
          <CountingSort :unsorted-numbers="unsortedNumbers" :range="algResults.range" :counts="algResults.counts"
            :reconstructed-arrays="algResults.reconstructedArrays"></CountingSort>
          {{ algResults.log }}
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
import { computed, reactive, ref, watch } from 'vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import { countSort } from '@/composables/sorting-numbers';
import CountingSort from '@/components/algorithms/sorting-numbers/CountingSort.vue';
import Alert from '@/components/general/Alert.vue';

const form = ref(null);
const MAX_NUM = 8;

// Initialize sample data
const unsortedNumbers = reactive([4, 2, 2, 8, 3, 3, 1]);
const direction = ref('ascending');
const isAscending = computed(() => direction.value === 'ascending');

// Store results and keep track of algorithm state
const algResults = reactive({
  range: null,
  counts: null,
  reconstructedArrays: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([unsortedNumbers, direction], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const randomNumber = Math.round((Math.random() * MAX_NUM));
  unsortedNumbers.push(randomNumber);
};

const removeRow = (index) => {
  unsortedNumbers.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const { range, counts, reconstructedArrays } = countSort(unsortedNumbers, isAscending.value);
  algResults.range = range;
  algResults.counts = counts;
  algResults.reconstructedArrays = reconstructedArrays;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
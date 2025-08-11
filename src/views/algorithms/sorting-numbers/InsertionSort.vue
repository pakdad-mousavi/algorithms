<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Insertion Sort</span> is a sorting algorithm used to sort a series of numbers in
          order, either from smallest to largest (ascending order), or from largest to smallest (descending order).
        </p>
        <p>
          To learn more about how the sorting problem, see <span class="cursor-pointer text-main"
            @click="$router.push('/sorting-numbers/bubble-sort')">Bubble Sort</span>.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          The Playing Card Analogy
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Insertion sort works by inserting each number into its correct sorted position repeatedly, until the entire
          list is sorted.
        </p>
        <p>
          To put this into perspective, imagine you have a hand of playing cards, which you've already sorted. You then
          draw a card from the deck and need to place it in the correct position in your hand:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/cards-analogy.svg" class="max-w-lg"
          caption="A Sorted Hand of Cards, and a Newly Drawn Card"></Figure>
        <p>
          Your brain would recognize that the card needs to be placed between the 5 of spades, and the 2 of clubs. This
          is because all the cards to the right of the 5 of spades are guaranteed to be larger, and all the cards to the
          left of the 2 of clubs are guaranteed to be smaller.
        </p>
        <p>
          You would then proceed to <span class="text-main">slide</span> the card in to the correct position in your
          hand, and <span class="text-main">shift</span> the other cards if necessary:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/shifting-cards.svg" class="max-w-lg"
          caption="Shifting All Larger Cards to the Right, Making Space for the New Card"></Figure>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/new-hand.svg" class="max-w-lg"
          caption="New Hand of Cards"></Figure>
        <p>
          Insertion sort uses the same logic to sort a list of numbers.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          An Example of Insertion Sort
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Consider the following list of numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/unsorted-numbers.svg" class="max-w-xs"
          caption="A List of Unsorted Numbers"></Figure>
        <p>
          The first number is assumed to be already sorted, and the next item will be the first item the algorithm is
          going to begin sorting:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/initializing-insertion-sort.svg" class="max-w-xs"
          caption="Initializing the Sorting Algorithm"></Figure>
        <p>
          For each pass through the numbers, the algorithm finds the range of numbers (from the numbers to the left of
          the current number) that are less than the current number. Those are then shifted to the right and the current
          number is inserted into the empty slot.
        </p>
        <p>
          During the first pass, since 47 is already larger than 27, nothing happens:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/example-pass-1.svg" class="max-w-xs"
          caption="First Pass of Insertion Sort"></Figure>
        <p>
          During the second pass, 19 is less than both the numbers to the left, so they are shifted to the right and 19
          is inserted into the empty slot:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/example-pass-2.svg" class="max-w-xs"
          caption="Second Pass of Insertion Sort"></Figure>
        <p>
          During the third pass, 32 is only less than 47, so 47 is shifted to the right to once again make space for 32,
          which is then inserted into the list:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/example-pass-3.svg" class="max-w-xs"
          caption="Third Pass of Insertion Sort"></Figure>
        <p>
          Finally, during the fourth and last pass, 12 is less than all of the numbers to the left, so they are all
          shifted to the right and the number is then inserted into the empty slot:
        </p>
        <Figure src="/algorithms/sorting-numbers/insertion-sort/example-pass-4.svg" class="max-w-xs"
          caption="Fourth and Final Pass of Insertion Sort"></Figure>
        <p>
          To sort the list in descending order, the exact same process is repeated, however, the numbers are only
          shifted if the current number is larger than the ones on the left, not less than.
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
          <InsertionSort :log="algResults.log" :is-ascending="isAscending"></InsertionSort>
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
import { insertionSort } from '@/composables/sorting-numbers';
import InsertionSort from '@/components/algorithms/sorting-numbers/InsertionSort.vue';

const form = ref(null);
const MAX_NUM = 100;

// Initialize sample data
const unsortedNumbers = reactive([5, 1, 4, 2, 8]);
const direction = ref('ascending');
const isAscending = computed(() => direction.value === 'ascending');

// Store results and keep track of algorithm state
const algResults = reactive({
  log: null,
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
  const log = insertionSort(unsortedNumbers, isAscending.value);
  algResults.log = log;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
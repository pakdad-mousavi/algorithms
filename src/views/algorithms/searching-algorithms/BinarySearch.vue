<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Binary Search</span> is a searching technique for finding an item inside of a list of
          items. It is an extremely efficient algorithm and attempts to solve the <span class="cursor-pointer text-main"
            @click="$router.push('/searching-algorithms/linear-search')">searching problem</span> in logarithmic time.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How Binary Search Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Binary search works by dividing the list of elements being searched into half after each repetition, resulting
          in extremely fast search times, specially with larger datasets.
        </p>
        <p>
          To put this into perspective, imagine you are given a dictionary and are tasked with finding a word in it.
          Would you start flipping through the dictionary page by page from page 1 and check each and every single item
          in each page until you find the word?
        </p>
        <p>
          Of course not, that would take forever! Instead, you'd open the dictionary in the middle and see where you
          landed. If the word appears further down in the dictionary, then you would skip the pages before, and vice
          versa: you just split the number of pages to check in half!
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          An Example of Binary Search
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Lets pretend we have a simple dictionary with 7 words. We will be looking for the word "Tiger":
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/dictionary.svg" class="max-w-md"
          caption="An Example Dictionary"></Figure>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              Note that the words in a dictionary (as well as our dictionary) are sorted alphabetically. Binary search
              only works if the items in your list are sorted, so if they are not, they need to be sorted first.
            </p>
            <p>
              Only then can binary search be used on the list of items.
            </p>
          </div>
        </Alert>
        <p>
          Lets give each item on our dictionary an <span class="text-main">index</span>. An index is the position of an
          item in a list; it points to the word at that position.
        </p>
        <p>
          The smallest index will be labeled as <span class="text-main">low</span>. This will be the beginning of the
          range items we are going to search. Like so, the largest index will be labeled as <span
            class="text-main">high</span>; this will be the end of the searchable range:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/labeled-dictionary.svg" class="max-w-md"
          caption="Labelling the Dictionary"></Figure>
        <p>
          The first step of binary search to find the middle index from our range. This can be calculated as shown
          below:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/middle-formula.svg" class="max-w-xs"
          caption="Calculating the Middle Index"></Figure>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              If the list contains an even number of items, then the middle value with be between the two center
              elements; the resulting value of the middle calculation will not be an integer.
            </p>
            <p>
              To solve this simply round the value down by removing the decimal part to get the first element of the two
              center ones.
            </p>
          </div>
        </Alert>
        <p>
          After finding the middle index, we check to see if the word at that position is equal to the word we are
          searching for. If it is, then congratulations, you have found the word you were looking for!
        </p>
        <p>
          If it isn't, then we need to check whether the word we're searching for comes before or after the word at the
          middle index. If the word comes before the middle index word, we need to change our high label to middle - 1.
        </p>
        <p>
          On the other hand, if the word appears after the middle index word, then we need to change our low label to
          middle + 1. This is effectively how binary search can instantly cut the words we need to search for into half:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/binary-search-example-1.svg" class="max-w-md"
          caption="Using Binary Search on the Dictionary"></Figure>
        <p>
          Just like that, we have cut the words we need to check in our dictionary in half!
        </p>
        <p>
          This same process repeats with the new low and high indexes until either a match is found, or the list is down
          to 1 element and there is no match found (meaning the value is not in the list).
        </p>
        <p>
          Lets repeat this process on our dictionary. First, lets calculate our new middle value:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/calculating-middle.svg" class="max-w-xs"
          caption="Calculating the Middle Index"></Figure>
        <p>
          Using our new middle value, we can perform the next step of binary search. The following diagram illustrates
          the same repeated process for our dictionary:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/binary-search-example-2.svg" class="max-w-md"
          caption="Calculating the Middle Index"></Figure>
        <p>
          We have a match at position 6 for the word "Tiger"!
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Key Metrics
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Binary search is extremely efficient, with a <span class="text-main">time complexity</span> of <span
            class="text-main">O(log n)</span>, where "n" is the number of element in the list. This means that in the
          worst case scenario, binary search will need to make log(n) operations.
        </p>
        <Alert alert-style="note">
          <p>
            In reality, binary search will take <span class="text-main">O( log<sub>2</sub>(n) )</span> time, however, in
            <span class="text-main">big O notation</span> all constants are removed from the final answer. This is
            because we only care about the trend of the growth rate, not the exact number of steps. That is why we say
            binary search has a time complexity of log(n).
          </p>
        </Alert>
        <p>
          To illustrate how we can deduce the time complexity of binary search, consider the following diagram:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/binary-search-division.svg" class="max-w-lg"
          caption="The Division of 8 Items With Binary Search"></Figure>
        <p>
          Look closely, do you see a pattern? After each step binary search takes, our list is cut in half. Therefore,
          we can reach the conclusion that:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/statistics.svg" class="max-w-xs"
          caption="The Trend in Binary Search"></Figure>
        <p>
          In the worst case scenario, which is what big O is all about, binary search ends when the list is down to 1
          element. Therefore:
        </p>
        <Figure src="/algorithms/searching-algorithms/binary-search/time-complexity.svg" class="max-w-50"
          caption="The Time Complexity"></Figure>
        <p>
          This is why binary search solves the searching problem in logarithmic time.
        </p>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              To understand how efficient binary search is, imagine you need to search a 10,000,000 item list (for the
              sake of brevity, we will assume each operation takes 1ms).
            </p>
            <p>
              With linear search, which has a time complexity of <span class="text-main">O(n)</span>, it would take
              10,000,000 ms to search the entire list, which is about 2 hours and 47 minutes.
            </p>
            <p>
              With binary search (assuming the list is sorted), which has a time complexity of <span
                class="text-main">O(log n)</span>, (we will use a logarithm with a base of 2) it would take about 23
              milliseconds to search the entire list!
            </p>
          </div>
        </Alert>
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
              <label class="font-medium">Target:</label>
              <input type="number" class="w-full field" v-model="target" min="0" max="100">
            </div>
            <button type="button" class="btn" :disabled="numbers.length === 9" @click="addRow">Add Row</button>
          </div>
          <!-- Input table -->
          <table>
            <thead>
              <tr>
                <th>Numbers</th>
                <th></th> <!-- Extra header for delete button -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(_, idx) in numbers">
                <td>
                  <input type="number" v-model="numbers[idx]" min="0" max="100">
                </td>
                <td class="w-20 mx-auto text-center">
                  <TrashButton @click="removeRow(idx)" v-if="numbers.length > 1"></TrashButton>
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
          <BinarySearch :target="target" :numbers="numbers" :log="algResults.log" :position="algResults.position"
            :sorted-arr="algResults.sortedArr">
          </BinarySearch>
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
import { binarySearch } from '@/composables/searching-algorithms';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import BinarySearch from '@/components/algorithms/searching-algorithms/BinarySearch.vue';

const form = ref(null);

// Initialize sample data
const numbers = reactive([14, 5, 83, 3, 59, 76, 84, 34, 54]);
const target = ref(3);

// Store results and keep track of algorithm state
const algResults = reactive({
  log: null,
  sortedArr: null,
  position: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([numbers, target], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const num = Math.floor(Math.random() * 100);
  numbers.push(num);
};

const removeRow = (index) => {
  numbers.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const { log, sortedArr, position } = binarySearch(numbers, target.value);
  algResults.log = log;
  algResults.sortedArr = sortedArr;
  algResults.position = position;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
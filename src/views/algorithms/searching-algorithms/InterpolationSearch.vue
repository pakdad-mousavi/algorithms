<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Interpolation Search</span> is a searching technique for finding an item inside of a
          list of items. It is an extremely efficient algorithm, specifically used on evenly distributed datasets, and
          attempts to solve the <span class="cursor-pointer text-main"
            @click="$router.push('/searching-algorithms/linear-search')">searching problem</span> in an even faster time
          than <span class="text-main">binary search</span>.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          The Concept of Interpolation Search
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Unlike <span class="text-main">binary search</span>, which blindly checks the middle element for a match, and
          then proceeds to split the list into half if a match isn't present, interpolation search tries to get a more
          accurate guess on where the correct index of the value is.
        </p>
        <p>
          Imagine you are given a dictionary and are tasked with finding the word "Zebra". Would you begin by opening
          the dictionary in the middle?
        </p>
        <p>
          No! You would open the dictionary towards the final pages, because you know that the dictionary is
          alphabetically sorted and that "Z" would appear closer towards the end. Interpolation search uses the same
          concept to get more accurate choices.
        </p>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              The only downside to interpolation search is that it can only be used with data that is sorted AND evenly
              spaced. The more unevenly the data is spread out, the less effective interpolation search becomes. In the
              worst case, its performance can degrade to that of linear search.
            </p>
            <p>
              Here is an example of sorted, evenly spread out data: 10, 20, 30, 40, 50, 60.
            </p>
            <p>
              And here is an example of sorted, unevenly spread out data: 10, 11, 12, 18, 50, 1000.
            </p>
          </div>
        </Alert>
        <h2 class="mt-10 text-xl font-semibold">
          The Interpolation Search Formula
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Interpolation search relies on a formula to find the potential position of the <span
            class="text--main">target</span> we are looking for. Given that "x" is the target, "arr" is the array of
          numbers we have, "low" is the lowest index, and "high" is the highest index:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/interpolation-formula.svg" class="max-w-md"
          caption="The Interpolation Search Formula"></Figure>
        <Alert alert-style="note">
          <p>
            Note that <span class="text-main">arr[low]</span> and <span class="text-main">arr[high]</span> basically
            mean "the value in the array <span class="text-main">arr</span> at position <span
              class="text-main">low</span>" and "the value in the array <span class="text-main">arr</span> at position
            <span class="text-main">high</span>" respectively. This is known as <span class="text-main">index
              notation</span>.
          </p>
        </Alert>
        <p>
          Lets break down the formula to see how it works. First we have the main fraction:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/proportion-in-value-space.svg"
          class="max-w-3xs" caption="The Ratio Part of the Interpolation Search Formula"></Figure>
        <p>
          This part of the formula answers the question: "Where does the target value "x" lie <span
            class="text-main">proportionally</span> between the lowest and highest values?" For example, if "x" is
          halfway between arr[low] and arr[high], then the fraction will be 0.5. If "x" is 25% of the way, the fraction
          will be 0.25, and so on.
        </p>
        <p>
          For example, lets say we have a bookshelf with 11 books numbered from 10 to 20. Each book also has an index,
          starting from 0 all the way up to 10:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/bookshelf-analogy.svg" class="max-w-md"
          caption="A Bookshelf with Books Numbered From 10 to 20"></Figure>
        <p>
          Book 10 is at index 0, and book 20 is at index 10. Suppose we want book 15.
        </p>
        <p>
          First we find the distance of book 15 from the starting book (book 10): <span class="text-main">15 - 10 =
            5</span>.
        </p>
        <p>
          Then we find the total distance from the starting book: <span class="text-main">20 - 10 = 10</span>.
        </p>
        <p>
          Finally, we divide the distance of the target from the beginning by the total distance: <span
            class="text-main">5 ÷ 10 = 0.5</span>. We get 0.5 (or rather 50%), meaning that book 15 is halfway up the
          bookshelf.
        </p>
        <p>
          Lets look at the next part of the formula:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/proportion-in-index-space.svg"
          class="max-w-md" caption="Conversion of the Ratio to Index-Space from Value-Space"></Figure>
        <p>
          After figuring out how far up the book is in our bookshelf based on the <span class="text-main">values</span>,
          we need to use that ratio to figure out the index of the book. To accomplish this, we need to stretch this
          fraction into index-space.
        </p>
        <p>
          This is simply done by multiplying the fraction by the range of the indices (high - low): <span
            class="text-main">0.5 * (10 - 0) = 5</span>.
        </p>
        <p>
          And sure enough, if we look at index 5 in our bookshelf, we will find book 15. There is one more part to the
          formula, which is adding the "low" index to our result. In this case the value won't change because "low" is
          zero, but we'll later see why we need this.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Interpolation Search With Unevenly Distributed Numbers
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Now that you grasp the basic concept of interpolation search, lets look at an example with some unevenly
          distributed numbers.
        </p>
        <p>
          Consider the following number line for the numbers 1, 2, 3, 4, 5, and 7. We will be looking for the number
          "5":
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/number-line-example-1.svg" class="max-w-lg"
          caption="Numbers Spread on a Number Line"></Figure>
        <p>
          Lets begin the process. First we need to solve for the ratio part of the formula. On a number line, you can
          see the two distances and visually understand how the math behind it works:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/number-line-value-proportion-1.svg"
          class="max-w-2xl" caption="Measuring Distances on the Number Line"></Figure>
        <p>
          After doing the following calculations, we will get 0.33:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/space-proportion-calculation-1.svg"
          class="max-w-sm" caption="Calculating the Space Proportion"></Figure>
        <p>
          Then we multiply it by the index range:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/index-proportion-calculation-1.svg"
          class="max-w-lg" caption="Converting the Fraction to Index-Space"></Figure>
        <Alert alert-style="note">
          <p>
            This time, since the numbers are not perfectly evenly spread out, the proportion we get from how far along
            "5" is relative to the values does not map perfectly to the indices. This is why interpolation sort works
            best with evenly spread out data, as it maps precisely onto the indices.
          </p>
        </Alert>
        <p>
          And finally, we add the "low" index to get our position:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/position-calculation-1.svg" class="max-w-sm"
          caption="Adjusting the Index to Match the Low"></Figure>
        <p>
          Lets check our number line. The number at index 3 is "4", but we're looking for "5", so there isn't a match.
          Similarly to binary search, we'll need to update the "low" to position + 1, since 5 is greater than 4:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/number-line-example-2.svg" class="max-w-lg"
          caption="Measuring Distances on the Number Line"></Figure>
        <p>
          As you can see, we are now dealing with a much smaller range of numbers. Lets repeat the process again to get
          a new position. First lets calculate ratio part of the formula:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/number-line-value-proportion-2.svg"
          class="max-w-2xl" caption="Measuring Distances on the Number Line"></Figure>
        <p>
          After doing the following calculations, we will get 0:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/space-proportion-calculation-2.svg"
          class="max-w-sm" caption="Calculating the Space Proportion"></Figure>
        <p>
          Then we multiply it by the index range:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/index-proportion-calculation-2.svg"
          class="max-w-lg" caption="Converting the Fraction to Index-Space"></Figure>
        <p>
          Finally, we need to add the "low" index so that the position we have calculated is aligned to our new range of
          numbers. This is the purpose of this part of the formula:
        </p>
        <Figure src="/algorithms/searching-algorithms/interpolation-search/position-calculation-2.svg" class="max-w-sm"
          caption="Adjusting the Index to Match the Low"></Figure>
        <p>
          Lets check our number line at index 4. Sure enough, we get "5"!
        </p>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              Interpolation search always works on the first try with no need to split the list like in binary search,
              as long as the data is perfectly sorted and evenly distributed.
            </p>
            <p>
              It still works quite well if the data is slightly skewed and not exactly even in distribution, but if the
              data is very skewed, it takes <span class="text-main">O(n)</span> time to find the number, just like
              linear search.
            </p>
            <p>
              In the best case, where the data is evenly distributed, interpolation search takes <span
                class="text-main">O(log (log n))</span> time, which is even faster than binary search!
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
          <InterpolationSearch :target="target" :numbers="numbers" :log="algResults.log" :position="algResults.position"
            :sorted-arr="algResults.sortedArr">
          </InterpolationSearch>
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
import { interpolationSearch } from '@/composables/searching-algorithms';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import InterpolationSearch from '@/components/algorithms/searching-algorithms/InterpolationSearch.vue';

const form = ref(null);

// Initialize sample data
const numbers = reactive([1, 2, 3, 4, 5, 6, 8]);
const target = ref(6);

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
  const { log, sortedArr, position } = interpolationSearch(numbers, target.value);
  algResults.log = log;
  algResults.sortedArr = sortedArr;
  algResults.position = position;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
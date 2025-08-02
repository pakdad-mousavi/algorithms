<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">C-SCAN (circular SCAN)</span> algorithm is a variant of the <span
            class="cursor-pointer text-main" @click="$router.push('/disk-scheduling/scan')">SCAN</span> algorithm, used
          to minimize the <span class="text-main">seek time</span> when responding to incoming disk requests. It works
          similarly to SCAN, however, instead of scanning back and forth, it only scans in one direction.
        </p>
        <p>
          This is a disk scheduling algorithm, which requires some basic knowledge about a hard disk. To learn more
          about disk architecture, see the <span class="cursor-pointer text-main"
            @click="$router.push('/disk-scheduling/first-come-first-serve')">First Come First Serve (FCFS)</span>
          algorithm.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Just like the SCAN algorithm, the C-SCAN variant goes towards the <span class="text-main">head
            direction</span> (either left or right), then jumps to the opposite end of the disk while ignoring any
          requests during the jump, and finally continues in the same direction to respond to any pending requests.
        </p>
        <p>
          To illustrate this, we need a set of disk requests, and a current head position:
        </p>
        <Figure src="/algorithms/disk-scheduling/c-scan/disk-requests.svg" caption="A Set of Disk Requests"
          class="max-w-lg"></Figure>
        <p>
          Then, lets order the requests from smallest to largest, including the first and the last track of the disk (0
          and 199):
        </p>
        <Figure src="/algorithms/disk-scheduling/c-scan/ordered-disk-requests.svg"
          caption="Disk Requests Sorted in Ascending Order" class="max-w-xl"></Figure>
        <p>
          Now, C-SCAN assumes that the requests are all put inside of a circle (hence the name), so to understand how it
          works, we need to connect the first and last track together and form a circular queue of disk requests:
        </p>
        <Figure src="/algorithms/disk-scheduling/c-scan/circular-disk-requests.svg"
          caption="The Left-Most and Right-Most Tracks Connected Together" class="max-w-md"></Figure>
        <p>
          The <span class="text-main">head direction</span> determines whether the C-SCAN algorithm goes towards the
          left or the right.
        </p>
        <p>
          Assuming a left head direction, the algorithm starts from the current head position and moves towards the
          left, responding to any pending requests. If you look carefully, you'll notice how there's a huge gap from the
          first track and the last track (0 - 199):
        </p>
        <Figure src="/algorithms/disk-scheduling/c-scan/c-scan-left.svg"
          caption="C-SCAN Algorithm with a Left Head Direction" class="max-w-xl"></Figure>
        <Alert alert-style="note">
          <p>
            The jump from 0 to 199 is important because in reality, the tracks of the disk are not arranged in a
            circular manner, so the disk head cannot go from 199 to 0 in 1 unit. It will actually have to travel back to
            the opposite end before servicing any remaining requests.
          </p>
        </Alert>
        <p>
          Similarly, if the head direction is right, then the C-SCAN algorithm will travel right and service any
          requests along the way:
        </p>
        <Figure src="/algorithms/disk-scheduling/c-scan/c-scan-right.svg"
          caption="C-SCAN Algorithm with a Right Head Direction" class="max-w-xl"></Figure>
        <p>
          Now, using the final order of the requests, a <span class="text-main">seek-time graph</span> can be plotted.
          The following graph illustrates the seek-time graph for the points shown earlier, with a left head direction:
        </p>
        <Figure src="/algorithms/disk-scheduling/c-scan/c-scan-seek-time-graph.svg"
          caption="The Seek Time Graph for the C-LOOK Algorithm"></Figure>
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
          <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-medium">Current Head Position:</label>
              <input type="number" class="field" :min="MIN_REQUEST" :max="MAX_REQUEST" v-model="headPosition">
            </div>
            <div class="flex flex-col flex-1 gap-2">
              <label class="font-medium">Head Direction:</label>
              <select class="field" v-model="headDirection">
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <button type="button" class="btn" :disabled="diskRequests.length === 15" @click="addRow">Add Row</button>
          </div>
          <!-- Input table -->
          <table>
            <thead>
              <tr>
                <th>Disk Requests</th>
                <th></th> <!-- Extra header for delete button -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(_, index) in diskRequests">
                <td>
                  <input type="number" v-model="diskRequests[index]" :min="MIN_REQUEST" :max="MAX_REQUEST">
                </td>
                <td class="w-20 mx-auto text-center">
                  <TrashButton @click="removeRow(index)" v-if="diskRequests.length > 1"></TrashButton>
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
          <SeekTimeGraph :ordered-requests="algResults.orderedRequests" :total-seek-time="algResults.totalSeekTime">
          </SeekTimeGraph>
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
import { runDiskSchedulingAlgorithm } from '@/composables/disk-scheduling';
import EmptySpace from '@/components/general/EmptySpace.vue';
import SeekTimeGraph from '@/components/algorithms/disk-scheduling/SeekTimeGraph.vue';
import Alert from '@/components/general/Alert.vue';

const form = ref(null);

// Initialize sample data
const diskRequests = reactive([98, 183, 37, 122, 14, 124, 65, 67]);
const headPosition = ref(53);
const headDirection = ref('left');
const MAX_REQUEST = 199;
const MIN_REQUEST = 0;

// Store results and keep track of algorithm state
const algResults = reactive({
  orderedRequests: null,
  totalSeekTime: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([diskRequests, headPosition, headDirection], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const randomRequest = Math.round(Math.random() * MAX_REQUEST);
  diskRequests.push(randomRequest);
};

const removeRow = (index) => {
  diskRequests.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const { orderedRequests, totalSeekTime } = runDiskSchedulingAlgorithm(
    headPosition.value,
    diskRequests.slice(),
    "cScan",
    headDirection.value
  );
  algResults.orderedRequests = orderedRequests;
  algResults.totalSeekTime = totalSeekTime;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
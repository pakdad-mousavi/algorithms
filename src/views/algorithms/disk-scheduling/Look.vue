<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">LOOK</span> algorithm is a variant of the <span class="cursor-pointer text-main"
            @click="$router.push('/disk-scheduling/scan')">SCAN</span> algorithm, used to minimize the <span
            class="text-main">seek time</span> when responding to incoming disk requests. It works similarly to SCAN,
          however, it avoids traveling to the end of the disk, but rather to the last request.
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
          Similarly to the SCAN algorithm, LOOK travels towards the last request on the left or right, depending on
          the head direction, and then back towards the last request on the opposite side. The main difference is that
          LOOK avoids traveling to the ends of the disk if there are no requests, thus saving time.
        </p>
        <p>
          To illustrate this, consider the following diagram, with disk requests plotted horizontally without any
          vertical order:
        </p>
        <Figure src="/algorithms/disk-scheduling/look/direction-of-head.svg" caption="Direction of Head Variations"
          class="max-w-2xl"></Figure>
        <p>
          The <span class="text-main">head direction</span> determines whether the LOOK algorithm first goes to the left
          most request, or towards the right most request.
        </p>
        <p>
          The following diagram shows how the algorithm would serve the pending disk requests if the direction of the
          head was towards the left. It also displays the final order of the requests served:
        </p>
        <Figure src="/algorithms/disk-scheduling/look/look-left-to-right.svg"
          caption="An Example of Left Head Direction" class="max-w-3xl"></Figure>
        <p>
          Once the order in which the requests are served is determined, a <span class="text-main">seek time
            graph</span> can be drawn to determine the total seek time. The following diagram shows the seek time graph
          for the algorithm with a left head direction:
        </p>
        <Figure src="/algorithms/disk-scheduling/look/look-seek-time-graph.svg"
          caption="The Seek Time Graph for the Look Algorithm"></Figure>
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
    "look",
    headDirection.value
  );
  algResults.orderedRequests = orderedRequests;
  algResults.totalSeekTime = totalSeekTime;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
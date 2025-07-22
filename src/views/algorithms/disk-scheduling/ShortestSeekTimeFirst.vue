<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">Shortest Seek Time First (SSTF)</span> algorithm is a disk scheduling algorithm
          used to minimize the <span class="text-main">seek time</span> when responding to incoming disk requests. It
          operates by responding to the closest request to the current head.
        </p>
        <p>
          This is a disk scheduling algorithm for which basic knowledge about a hard disk is recommended. To learn more
          about disk architecture, see the <span class="cursor-pointer text-main"
            @click="$router.push('/disk-scheduling/first-come-first-serve')">First Come First Serve (FCFS)</span>
          algorithm.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The SSTF algorithm is an example of a <span class="text-main">greedy algorithm</span>, meaning that it chooses
          the request with the shortest immediate seek time, hoping that it leads to the most optimal solution.
        </p>
        <p>
          To put this into perspective, consider the following disk request queue, along with the new order in which the
          requests will be served:
        </p>
        <Figure src="/algorithms/disk-scheduling/shortest-seek-time-first/disk-requests.svg" class="max-w-lg"
          caption="A Sample Disk Request Queue"></Figure>
        <p>
          The SSTF algorithm calculates the distance between the current head and each of the disk requests, by
          subtracting the larger value from the smaller value (to avoid negative distances).
        </p>
        <p>
          For example, to calculate the distance from the head (53) to the first request (98), the larger value would
          need to be subtracted: 98 - 53 = 45. But to calculate the distance from the head and to the third request
          (37), the calculation would be 53 - 37 = 16.
        </p>
        <p>
          It then chooses the disk request which resulted in the smallest distance from the current head, i.e., the disk
          request with the shortest seek time from the current head.
        </p>
        <Figure src="/algorithms/disk-scheduling/shortest-seek-time-first/calculating-sst-request-primary.svg"
          class="max-w-lg" caption="Calculating Which Request Currently Has the Shortest Seek Time"></Figure>
        <p>
          Once the request is served, the head will be at a new position (65), and the process will be repeated again,
          with the requested which have not yet been served and the new head:
        </p>
        <Figure src="/algorithms/disk-scheduling/shortest-seek-time-first/calculating-sst-request-secondary.svg"
          class="max-w-lg" caption="Calculating the Next Request With the Shortest Seek Time"></Figure>
        <p>
          Once the process is repeated for all of the remaining disk requests in the queue, we will get the order in
          which the processes have been served:
        </p>
        <Figure src="/algorithms/disk-scheduling/shortest-seek-time-first/final-order.svg" class="max-w-lg"
          caption="The Final Order of Disk Requests Served"></Figure>
        <p>
          To visualize this using a <span class="text-main">seek time graph</span>, the requests will be plotted in the
          final order resulting from the SSTF algorithm, and the total seek time can be calculated like so:
        </p>
        <Figure src="/algorithms/disk-scheduling/shortest-seek-time-first/sstf-algorithm.svg"
          caption="The Seek Time Graph for the SSTF Algorithm"></Figure>
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
              <label class="font-medium">Current Head Position:</label>
              <input type="number" class="field" :min="MIN_REQUEST" :max="MAX_REQUEST" v-model="headPosition">
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
const MAX_REQUEST = 199;
const MIN_REQUEST = 0;

// Store results and keep track of algorithm state
const algResults = reactive({
  orderedRequests: null,
  totalSeekTime: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([diskRequests, headPosition], () => {
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
  const { orderedRequests, totalSeekTime } = runDiskSchedulingAlgorithm(headPosition.value, diskRequests.slice(), 'sstf');
  algResults.orderedRequests = orderedRequests;
  algResults.totalSeekTime = totalSeekTime;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
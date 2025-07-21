<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">First Come First Serve (FCFS)</span> is a disk scheduling algorithm used to
          minimize the <span class="text-main">seek time</span> when responding to incoming disk requests.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Basic Disk Architecture
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          A <span class="text-main">hard disk</span> is flat, circular storage device that uses magnetic technology to
          read or write information from and to it. It is placed on a platter which spins the disk counter-clockwise,
          allowing different parts of the disk to be accessed.
        </p>
        <Figure src="/algorithms/disk-scheduling/first-come-first-serve/hard-disk.svg" class="max-w-md"
          caption="A Plain Hard Disk"></Figure>
        <p>
          The disk is divided into <span class="text-main">tracks</span> and <span class="text-main">disk
            sectors</span>, which are both made up of individual <span class="text-main">sectors</span>. Tracks consist
          of a series of sectors together in a row, while a disk sector is a series of sectors together in a column.
        </p>
        <p>
          The disk also needs an <span class="text-main">actuator arm</span> which has a <span
            class="text-main">head</span> attached to it. The arm rotates left and right, while the head is used to read
          or write data from and to the disk.
        </p>
        <Figure src="/algorithms/disk-scheduling/first-come-first-serve/hard-disk-labelled.svg" class="max-w-lg"
          caption="Components of a Hard Disk"></Figure>
        <p>
          The actuator arm rotates left and right to move the head to the correct track, and then the disk rotates
          to the correct sector. The time it takes for the actuator arm to move to the correct track is the <span
            class="text-main">seek time</span>, while the time it takes for the disk to rotate to the correct sector is
          the <span class="text-main">rotation latency</span>.
        </p>
        <p>
          Disk scheduling algorithms are only concerned with reducing the seek time rather than rotation latency. This
          is because the seek time is the variable which can be controlled by the OS, while the rotation latency is
          determined by the physical characteristics of the disk.
        </p>
        <Figure src="/algorithms/disk-scheduling/first-come-first-serve/actuator-arm.svg" class="max-w-lg"
          caption="How the Actuator Arm Moves"></Figure>
        <p>
          The question then arises, given a set of different tracks which need to be accessed on the disk, what is the
          best way to meet every request to minimize seek time? The following diagram gives two example paths which
          could be taken, given 4 tracks which need to be accessed:
        </p>
        <Figure src="/algorithms/disk-scheduling/first-come-first-serve/different-possible-paths.svg" class="max-w-lg"
          caption="Two Different Possible Paths That Can Be Taken by the Actuator Arm"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          First Come First Serve Disk Scheduling
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Given a list of disk requests, the First Come First Serve (FCFS) algorithm goes from point to point in the
          order of arrival. Although not the most efficient at minimizing seek time, it is quite relatively simple to
          implement.
        </p>
        <p>
          To visualize this, a <span class="text-main">seek time graph</span> is used. The following diagram depicts an
          example of a seek time graph, with the following disk requests: 98, 183, 37, 122, 14, 124, 65, and 67. The
          current head position is at 53:
        </p>
        <Figure src="/algorithms/disk-scheduling/first-come-first-serve/plotted-points.svg" class="max-w-2xl"
          caption="Plotted Points on a Seek Time Graph"></Figure>
        <p>
          The X-axis is the track number of the request, while the Y-axis is the order in which the requests are served
          by the algorithm. To calculate the total seek time, the plotted points are connected and the distance between
          each point is measured and summed up:
        </p>
        <Figure src="/algorithms/disk-scheduling/first-come-first-serve/seek-time-graph.svg" class=""
          caption="A Complete Seek Time Graph"></Figure>
        <p>
          The steeper the line between two points, the lesser the seek time. When calculating the distance between the
          points, it is important to always subtract the greater value from the smaller one to avoid negative values, as
          the distance between the two points should be an absolute value.
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
  const { orderedRequests, totalSeekTime } = runDiskSchedulingAlgorithm(headPosition.value, diskRequests.slice(), 'fcfs');
  algResults.orderedRequests = orderedRequests;
  algResults.totalSeekTime = totalSeekTime;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>
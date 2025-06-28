<template>
  <div class="p-4 space-y-4 border rounded-md border-zinc-700">
    <!-- Process eligibility -->
    <div class="flex flex-col gap-4 lg:items-center lg:flex-row">
      <div class="overflow-x-scroll lg:!w-3/5">
        <table>
          <thead>
            <tr>
              <th></th>
              <th class="text-center" v-for="resource in numberOfResources">R{{ resource }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Need</td>
              <td class="text-center" v-for="need in curNeed">{{ need }}</td>
            </tr>
            <tr>
              <td>Available</td>
              <td class="text-center" v-for="available in curAvailable">{{ available }}</td>
            </tr>
            <tr>
              <td>Need ≤ Available</td>
              <td v-for="(need, index) in curNeed">
                <div class="flex items-center justify-center w-5 mx-auto rounded-md aspect-square" :class="{
                  'bg-emerald-700': need <= curAvailable[index],
                  'bg-rose-700': need > curAvailable[index]
                }">
                  <Icon>
                    <Check v-if="need <= curAvailable[index]"></Check>
                    <X v-else></X>
                  </Icon>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="space-y-4 lg:w-2/5">
        <p>
          Compare the need for every resource of P{{ processId + 1 }} with the current available of each
          resource.
        </p>
        <p v-if="canRun">
          The need for every resource of P{{ processId + 1 }} <span class="text-emerald-600">is
            less than or equal to</span> the current available resources, so P{{ processId + 1 }} can
          run.
        </p>
        <p v-else>
          The need for every resource of P{{ processId + 1 }} is <span class="text-rose-600">not
            less than or equal to</span> the current available resources, so skip P{{ processId + 1 }}.
        </p>
      </div>
    </div>
    <!-- New available calculations -->
    <div class="flex flex-col gap-4 lg:items-center lg:flex-row" v-if="canRun">
      <div class="overflow-x-scroll lg:!w-3/5">
        <table>
          <thead>
            <tr>
              <th></th>
              <th class="text-center" v-for="resource in numberOfResources">R{{ resource }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Allocation</td>
              <td class="text-center" v-for="alloc in curAllocation">{{ alloc }}</td>
            </tr>
            <tr>
              <td>Available</td>
              <td class="text-center" v-for="available in curAvailable">{{ available }}</td>
            </tr>
            <tr>
              <td>New Available</td>
              <td v-for="(alloc, index) in curAllocation" class="text-center">
                {{ alloc + curAvailable[index] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="space-y-4 lg:w-2/5">
        <p>
          Simulate the system waiting for the process to complete and then releasing its
          resources.
        </p>
        <p>
          Add the released resources to the available to calculate the new one.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Check, X } from '@vicons/tabler';
import { Icon } from '@vicons/utils';

defineProps({
  curNeed: {
    type: Array,
    default: () => []
  },
  curAvailable: {
    type: Array,
    default: () => []
  },
  curAllocation: {
    type: Array,
    default: () => []
  },
  canRun: {
    type: Boolean,
    required: true,
  },
  processId: {
    type: Number,
    required: true,
  },
  numberOfResources: {
    type: Number,
    required: true,
  }
});
</script>
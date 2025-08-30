<template>
  <div class="space-y-10">
    <div v-for="(row, indx) in log">
      <h2 class="mb-2 text-lg font-bold text-center" :class="getTextStyle(indx + 1)">
        {{ indx !== 0 ? `Splitting Subgroup ${String.fromCharCode(indx + 64)}` : ' Splitting The Main Group' }}
      </h2>
      <div class="p-4 space-y-8 border rounded-md border-zinc-700">
        <div class="flex flex-col items-center text-center lg:flex-row lg:items-end gap-x-2 gap-y-4 lg:text-left">
          <div class="flex flex-col items-center lg:w-3/5 xl:w-1/2 gap-y-2">
            <h3 class="font-medium">
              {{ row.before.id !== 1 ? `Subgroup ${String.fromCharCode(row.before.id + 63)}` : 'Main Group' }}
            </h3>
            <div class="flex overflow-hidden border rounded-md max-w-max" :class="getBorderStyle(row.before.id)">
              <div
                class="flex items-center justify-center w-8 text-sm border-r sm:text-base sm:w-12 lg:w-11 xl:w-12 aspect-square last:border-r-0"
                v-for="(item, idx) in row.before.group"
                :class="[getBorderStyle(row.before.id), { 'bg-zinc-800': idx === getMidIdx(row.before.group) }]">
                {{
                  item }}</div>
            </div>
          </div>
          <div class="max-w-lg lg:w-2/5 xl:w-1/2">
            Firstly, the middle number of the subgroup <span class="text-main">({{
              row.before.group[getMidIdx(row.before.group)] }})</span> is chosen as the <span
              class="text-main">pivot</span> for our comparisons.
          </div>
        </div>

        <div class="flex flex-col items-center text-center lg:flex-row lg:items-end gap-x-2 gap-y-4 lg:text-left">
          <div class="flex flex-col items-center lg:w-3/5 xl:w-1/2 gap-y-2">
            <div class="flex items-center gap-x-1 sm:gap-x-2">
              <div class="flex overflow-hidden border rounded-md max-w-max" :class="getBorderStyle(subgroup.id)"
                v-for="subgroup in row.after">
                <div
                  class="flex items-center justify-center w-8 text-sm border-r sm:text-base sm:w-12 lg:w-11 xl:w-12 aspect-square last:border-r-0"
                  :class="getBorderStyle(subgroup.id)" v-for="item in subgroup.group">{{ item }}</div>
              </div>
            </div>
          </div>
          <div class="max-w-lg lg:w-2/5 xl:w-1/2">
            The group is then split into two smaller subgroups, one with numbers less than the pivot, one with numbers
            larger than it.
          </div>
        </div>

        <div class="flex flex-col items-center lg:mt-20 gap-y-2">
          <div class="flex flex-col items-center gap-y-2">
            <h3 class="font-medium">
              New Sorted Group
            </h3>
            <div class="flex items-center gap-x-1 sm:gap-x-2">
              <div class="flex overflow-hidden border rounded-md max-w-max" :class="getBorderStyle(subgroup.id)"
                v-for="subgroup in row.state">
                <div
                  class="flex items-center justify-center w-8 text-sm border-r sm:text-base sm:w-12 lg:w-11 xl:w-12 aspect-square last:border-r-0"
                  :class="getBorderStyle(subgroup.id)" v-for="item in subgroup.group">{{ item }}</div>
              </div>
            </div>
          </div>
          <div class="max-w-lg text-center">
            Finally, place the newly formed subgroups back into the position where it came from.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  log: {
    type: Array,
    required: true,
  },
});

const getMidIdx = (arr) => {
  return Math.ceil(arr.length / 2) - 1;
};

const borderStyles = ['border-zinc-700', 'border-emerald-600', 'border-amber-600', 'border-cyan-600', 'border-purple-600', 'border-rose-600', 'border-yellow-600', 'border-blue-600'];
const textStyles = ['text-neutral-300', 'text-emerald-600', 'text-amber-600', 'text-cyan-600', 'text-purple-600', 'text-rose-600', 'text-yellow-600', 'text-blue-600'];

const getBorderStyle = (id) => {
  return borderStyles[id - 1];
};

const getTextStyle = (id) => {
  return textStyles[id - 1];
};
</script>
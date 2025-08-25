<template>
  <div class="space-y-40">
    <!-- Split Tree -->
    <div class="overflow-x-auto">
      <h2 class="mb-4 text-lg font-bold text-center underline">Split Tree</h2>
      <div class="space-y-10">
        <!-- Initial values -->
        <div class="flex mx-auto overflow-hidden border rounded-md max-w-max border-zinc-700">
          <div v-for="(val, j) in initial" :key="j"
            class="flex items-center justify-center border-r size-14 border-zinc-700 last:border-r-0">
            {{ val }}
          </div>
        </div>

        <!-- Split Rows -->
        <div v-for="row in splitRows" :key="'s' + row.depth" class="flex w-full sm:justify-center gap-x-4">
          <div v-for="(slot, i) in row.slots" :key="i" :style="`width: ${100 / (2 ** row.depth)}%`">
            <div v-if="slot" class="flex mx-auto overflow-hidden border rounded-md max-w-max border-zinc-700">
              <div v-for="(val, j) in slot" :key="j"
                class="flex items-center justify-center border-r size-14 border-zinc-700 last:border-r-0"
                :class="{ 'bg-zinc-800 text-white': isLeaf(slot) }">
                {{ val }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Merge Tree -->
    <div class="overflow-x-auto">
      <h2 class="mb-4 text-lg font-bold text-center underline">Merge Tree</h2>
      <div class="space-y-10">
        <!-- Merge Rows -->
        <div v-for="row in mergeRows" :key="'m' + row.depth" class="flex w-full sm:justify-center gap-x-4">
          <div v-for="(slot, i) in row.slots" :key="i" :style="`width: ${100 / (2 ** row.depth)}%`">
            <div v-if="slot" class="flex mx-auto overflow-hidden border rounded-md max-w-max border-zinc-700">
              <div v-for="(val, j) in slot" :key="j"
                class="flex items-center justify-center border-r size-14 border-zinc-700 last:border-r-0">
                {{ val }}
              </div>
            </div>
          </div>
        </div>

        <!-- Final Sorted Row -->
        <div class="flex w-full sm:justify-center gap-x-4">
          <div class="flex mx-auto overflow-hidden border rounded-md max-w-max border-zinc-700">
            <div v-for="(val, j) in final" :key="j"
              class="flex items-center justify-center text-white border-r size-14 border-zinc-700 last:border-r-0 bg-zinc-800">
              {{ val }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  log: {
    type: Array,
    required: true,
  },
  isAscending: {
    type: Boolean,
    required: true,
  },
  initial: {
    type: Array,
    required: true,
  }
});

const final = computed(() => {
  const sortFn = (a, b) => props.isAscending ? a - b : b - a;
  return props.initial.slice().sort(sortFn);
});

const buildRows = (depthKey, leftKey, rightKey, isMerge = false) => {
  const maxDepth = Math.max(...props.log.map(d => d[depthKey]))
  const slotMap = {}

  const placeNode = (values, depth, index) => {
    if (!slotMap[depth]) slotMap[depth] = {}
    slotMap[depth][index] = values
  }

  const isSubset = (child, parent) => child.every(val => parent.includes(val))

  const placeChildren = (parentValues, parentDepth, parentIndex) => {
    const childDepth = isMerge ? parentDepth - 1 : parentDepth + 1

    if (childDepth < 1 || childDepth > maxDepth) return

    // always reserve slots (so empty boxes show)
    if (!slotMap[childDepth]) slotMap[childDepth] = {}
    slotMap[childDepth][parentIndex * 2] ??= null
    slotMap[childDepth][parentIndex * 2 + 1] ??= null

    // find children
    const child = props.log.find(
      d => d[depthKey] === childDepth &&
        (isSubset(d[leftKey], parentValues) || isSubset(d[rightKey], parentValues))
    )
    if (!child) return

    placeNode(child[leftKey], childDepth, parentIndex * 2)
    placeNode(child[rightKey], childDepth, parentIndex * 2 + 1)

    placeChildren(child[leftKey], childDepth, parentIndex * 2)
    placeChildren(child[rightKey], childDepth, parentIndex * 2 + 1)
  }

  // Pick root
  const root = isMerge
    ? props.log.find(d => d[depthKey] === maxDepth)
    : props.log.find(d => d[depthKey] === 1)

  if (root) {
    const rootDepth = isMerge ? maxDepth : 1
    placeNode(root[leftKey], rootDepth, 0)
    placeNode(root[rightKey], rootDepth, 1)
    placeChildren(root[leftKey], rootDepth, 0)
    placeChildren(root[rightKey], rootDepth, 1)
  }

  // Build rows with visual depth mapping
  const rows = Array.from({ length: maxDepth }, (_, d) => {
    const depth = d + 1
    const visualDepth = isMerge ? maxDepth - depth + 1 : depth
    const slots = Array(2 ** visualDepth).fill(null)

    if (slotMap[depth]) {
      for (const [i, values] of Object.entries(slotMap[depth])) {
        slots[i] = values
      }
    }

    return { depth: visualDepth, slots }
  })

  return rows
};

const splitRows = computed(() => buildRows("splitDepth", "left", "right"));
const mergeRows = computed(() => buildRows("mergeDepth", "mergedLeft", "mergedRight", true));

// check to see if this is a slot with only one element
const isLeaf = (slot) => {
  return Array.isArray(slot) && slot.length === 1
}

</script>
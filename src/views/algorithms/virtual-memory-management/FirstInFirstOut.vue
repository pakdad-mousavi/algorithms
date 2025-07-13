<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">First In First Out (FIFO)</span> is a <span class="text-main">page replacement
            algorithm</span> used in virtual memory management. Its purpose is to choose a suitable <span
            class="text-main">victim page</span> to swap with the requested page.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Virtual Memory
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          <span class="text-main">Virtual memory</span> is an abstraction of the physical memory (RAM), and is managed
          separately by the OS and the MMU (memory management unit). Processes only see the virtual memory, and think
          they have access to a large contiguous memory space.
        </p>
        <p>
          Virtual memory provides the illusion that there is more RAM than physically available on the computer,
          allowing the OS to run more processes than if only the RAM was available, by temporarily storing unused data
          on the hard disk.
        </p>
        <Figure src="/algorithms/virtual-memory-management/virtual-memory.svg" class="max-w-xl"
          caption="Space Being Allocated to RAM From Secondary Memory"></Figure>
        <p>
          Virtual memory is split into <span class="text-main">pages</span>, each page typically worth around 4 KB of
          memory, and the RAM is split into <span class="text-main">frames</span>, each frame being the same size as a
          page. Behind the curtains, the OS and MMU use a <span class="text-main">page table</span> for each process, to
          map each of their pages to a frame.
        </p>
        <Figure src="/algorithms/virtual-memory-management/page-to-frame-mapping.svg" class="max-w-xl"
          caption="How Pages Are Mapped to Frames"></Figure>
        <p>
          Only the pages necessary for the process to run at the time are stored in the RAM, the rest are stored in the
          <span class="text-main">swap space</span> of the disk. This also occurs if there are more pages than there are
          free frames on the RAM.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How Pages Are Accessed
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          When a process tries to access data in a certain page, it triggers the MMU to try and translate the
          <span class="text-main">virtual address</span> to a <span class="text-main">physical address</span> using the
          page table. If the page the process tried to access is currently mapped to a frame, then the translation
          occurs and access is granted immediately:
        </p>
        <Figure src="/algorithms/virtual-memory-management/successful-page-access.svg" class="max-w-xl"
          caption="An Example of How a Process Can Access Data in a Page"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          Page Faults
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          A <span class="text-main">page fault</span> is when the MMU attempts to translate a virtual address into a
          physical address using a page table, however the respective page is not found in the page table.
        </p>
        <p>
          This means that the page is on the secondary storage and not in the RAM, so the MMU triggers a page fault,
          which is caught by the OS. The OS then proceeds to load the page into the RAM and update the page table, after
          which the process is repeated, but now with the page in memory.
        </p>
        <Figure src="/algorithms/virtual-memory-management/page-fault.svg" class="max-w-xl"
          caption="An Example of a Page Fault and How It's Resolved"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          How the FIFO Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Given that a page fault has occured, and there are no free frames available to load the requested page into,
          the OS runs a page replacement algorithm. In this case, the OS would run the first in first out algorithm.
        </p>
        <p>
          The algorithm chooses a victim page and writes it to the disk, thus freeing up a frame in the RAM. The
          requested page is then loaded into the frame.
        </p>
        <p>
          The FIFO algorithm keeps track of which pages entered a frame first using a queue, and then chooses the
          first item in the queue as the victim page. Here is an example with 4 pages and 3 frames:
        </p>
        <Figure src="/algorithms/virtual-memory-management/fifo-algorithm.svg" class="max-w-lg"
          caption="How The FIFO Algorithm Works"></Figure>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <!-- Visualizer goes here -->
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <p>so thats how the algorithm works!</p>
      </div>
    </template>
  </TabSwitcher>
</template>

<script setup>
import Figure from '@/components/general/Figure.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import { tabs } from '@/state/tabState';
</script>
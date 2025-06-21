<template>
  <main class="p-4 space-y-4 text-neutral-300">
    <section class="p-4 rounded-xl bg-zinc-900">
      <div class="mx-auto sm:w-11/12">
        <h1 class="mb-4 text-2xl font-semibold">
          First Come First Serve Algorithm
        </h1>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            The <span class="text-main">first come first serve</span> is one of the simplest CPU scheduling algorithms,
            providing a straightforward way for the CPU to handle incoming processes.
          </p>
          <p>
            As the name suggests, processes that arrive and enter the ready queue first, will be processed first.
            However, unlike the <span class="text-main">round robin algorithm</span>, the CPU will be allocated entirely
            to that process until it is fully executed and completed. Only then will the CPU move on to the next process
            in the ready queue. FCFS is generally suitable for systems where the processes are short and arrive at
            regular intervals.
          </p>
          <p>
            However, although this is a much simpler algorithm to implement and also to understand, it may lead to
            longer wait times for shorter processes if a longer one arrives first. This is commonly known as the
            <span class="text-main">Convoy Effect</span>, and it may lead to poor processing times in terms of average
            <span class="text-main">waiting times</span>.
          </p>
          <p>
            Here's a simple analogy: the queue in front of the cashier. Customers with a basket containing a few items
            will be forced to wait a long time, until the customer with a trolley worth of groceries in front of them
            finishes scanning all their items at the cashier.
          </p>
          <p>
            Regardless of the shortcomings of the FCFS algorithm, it is still one of the most well known methods and can
            provide a base for comparision against other algorithms.
          </p>
          <Figure src="/algorithms/cpu-scheduling/fcfs/customer-analogy.svg" caption="FCFS Customer Queue Analogy">
          </Figure>
          <h1 class="mb-4 text-xl font-semibold">
            Understanding the Process
          </h1>
          <hr class="mb-4 border-neutral-800">
          <ol class="grid grid-cols-1 space-y-4 gap-x-4">
            <li class="p-4 border rounded-md border-zinc-700">
              <span class="font-medium text-main">
                Step 1: Gather process info
              </span>
              <p>
                Each process is given an arrival time (when it enters the queue) and a burst time (how long it needs the
                CPU). The algorithm will be charged with running these processes one by one.
              </p>
            </li>
            <li class="p-4 border rounded-md border-zinc-700">
              <span class="font-medium text-main">
                Step 2: Sort by arrival time
              </span>
              <p>
                The processes are sorted in the order they arrive. FCFS is all about who comes first, no jumping the
                line and no interruptions. By sorting the processes, it is clear in which order to run the processes.
              </p>
            </li>
            <li class="p-4 border rounded-md border-zinc-700">
              <span class="font-medium text-main">
                Step 3: Execute each process one by one
              </span>
              <p>
                The CPU starts at time 0. The first process in the sorted list gets the CPU right away, and the rest of
                the processes must wait until the process in the CPU is entirely executed. Once the process is
                completed, the next process leaves the queue and enters the process.
              </p>
            </li>
            <li class="p-4 border rounded-md border-zinc-700">
              <span class="font-medium text-main">
                Step 4: Calculate start and finish times
              </span>
              <p>
                For each process, record when it started and when it finished based on the burst times and the current
                time. These are important for later calculating the waiting time and turnaround times of the processes.
              </p>
            </li>
            <li class="p-4 border rounded-md border-zinc-700">
              <span class="font-medium text-main">
                Step 5: Compute turnaround and waiting times
              </span>
              <p>
                Turnaround time = Finish time - Arrival time.
              </p>
              <p>
                Waiting time = Turnaround time - Burst time.
              </p>
              <p>
                These help evaluate how efficient the scheduling was.
              </p>
            </li>
          </ol>
          <Figure src="/algorithms/cpu-scheduling/fcfs/fcfs-scheduling-algorithm.svg"
            caption="FCFS Scheduling Algorithm">
          </Figure>
          <h1 class="mb-4 text-xl font-semibold">
            Step by Step Illustration
          </h1>
          <hr class="mb-4 border-neutral-800">
          
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import Figure from '@/components/general/Figure.vue';
</script>
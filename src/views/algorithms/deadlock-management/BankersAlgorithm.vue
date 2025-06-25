<template>
  <main class="p-4 space-y-4 text-neutral-300">
    <section class="p-4 rounded-xl bg-zinc-900">
      <div class="mx-auto sm:w-11/12">
        <h1 class="mb-4 text-2xl font-semibold">
          Banker's Algorithm
        </h1>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            <span class="text-main">Banker's Algorithm</span> is a non-preemptive method of avoiding <span
              class="text-main">deadlocks</span> inside of a system with limited resources. Created by Edsger Dijkstra,
            the Banker's Algorithm works by avoiding the potential for any deadlocks which may occur altogether, in
            contrast to deadlock recovery methods.
          </p>
          <Alert alert-style="note">
            <p>
              The name "Banker's Algorithm" comes from how a bank lends money to its customers. Banks will only loan
              out money if they are certain they can fulfill all customer withdrawals, even in the worst case scenario.
              This
              ensures that there is always enough money in the bank to avoid bankruptcy.
            </p>
          </Alert>
        </div>
        <h2 class="mb-4 text-xl font-semibold">
          The Deadlock Problem
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            In operating systems, a deadlock occurs when multiple processes are waiting for resources that are held by
            each other. The processes are both holding the resources the other needs, and waiting for the other process
            to release their resources (which never happens since both sides are waiting).
          </p>
          <p>
            To put this into perspective, imagine a four-way intersection, with four cars (process A, B, C, and D) each
            coming from different directions. All four cars want to turn left, so they move slightly into the
            intersection and then wait for the car that's in front of them to move first.
          </p>
          <ul class="list-disc list-inside">
            <li><span class="text-rose-400">A</span> waits for <span class="text-amber-400">B</span></li>
            <li><span class="text-amber-400">B</span> waits for <span class="text-main">C</span></li>
            <li><span class="text-main">C</span> waits for <span class="text-cyan-400">D</span></li>
            <li><span class="text-cyan-400">D</span> waits for <span class="text-rose-400">A</span></li>
          </ul>
          <p>
            All four cars are waiting in the center for their counterpart to move, so the traffic stops moving
            completely; the cars are in a deadlock. Bankers algorithm is a way to avoid such deadlocks from happening in
            the first place.
          </p>
        </div>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/deadlocks.svg" caption="How a Deadlock Works">
        </Figure>
        <h2 class="mb-4 text-xl font-semibold">
          How it works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            The Banker's Algorithm is run everytime a process requests for more resources than it already has. It checks
            to see if all processes can be finished if the resources needed by that process are allocated to it. This is
            done by simulating the system to see if there is at least one order (known as the <span
              class="text-main">safe sequence</span>) in which all processes can finish.
          </p>
          <Alert alert-style="warning">
            <div class="space-y-4">
              <p>
                In real-world systems, the Banker's Algorithm is used to see if the resources requested by a process can
                be allocated to it without risking a potential deadlock in the system, as described earlier.
              </p>
              <p>
                However, for the sake of simplicity, this implementation of the algorithm will focus solely on
                determining whether the system is currently in a safe state or not, rather than handling actual resource
                allocation or process execution.
              </p>
            </div>
          </Alert>
          <h3 class="mb-4 font-semibold">
            Resource Instances
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p class="mb-10">
            This is the total number of resources of each type given inside of the system. It is used, along with
            allocated, to calculate the available values for each process. These values are needed in advanced (if
            available values are not given).
          </p>
          <h3 class="mb-4 font-semibold">
            Allocated
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p class="mb-10">
            This is the number of resources of each type that have already been allocated to each process. It is used,
            along with resource instances, to calculate the available values for each process. These values are needed
            in advanced.
          </p>
          <h3 class="mb-4 font-semibold">
            Available
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p>
            This is the number of each resource types that are available for each process. It can be calculated as:
          </p>
          <p class="mb-10 italic text-center">Available = Resource Instance - Total Allocated Amongst Processes</p>
          <h3 class="mb-4 font-semibold">
            Max
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p class="mb-10">
            This is the maximum resources of each type that each process may ask for. These values are needed in
            advanced.
          </p>
          <h3 class="mb-4 font-semibold">
            Need
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p>
            This is what each process still may need to complete its job. For each resource type of each process, it can
            be calculated as:
          </p>
          <p class="mb-10 italic text-center">Need = Max - Allocation</p>
        </div>
        <h2 class="mb-4 text-xl font-semibold">
          Understanding the process
        </h2>
        <hr class="mb-4 border-neutral-800">
        <ol class="grid grid-cols-1 space-y-4 gap-x-4">
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 1: Gather initial system information
            </span>
            <p>
              The system needs to have each resources total instances, an allocation matrix, and a max matrix. Both the
              available vector and the need matrix can be calculated from the values above if not provided.
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 2: Calculate the available vector and the need matrix
            </span>
            <p class="mb-4">
              To calculate the available matrix, sum up all of the allocated resources of each resource type, then
              subtract each of the values from their corresponding resource types' total instance. Then, for each
              process <span class="italic">i</span> and resource <span class="italic">j</span>, use the allocation and
              max matries to calculate the need matrix with:
            </p>
            <p class="font-mono italic text-center">
              Need[i][j] = Max[i][j] - Allocation[i][j]
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 3: Find a valid process
            </span>
            <p>
              Take the first process from the list of processes which is not yet finished, and check to see if all
              resources in the need for this process are less than or equal to the available vector.
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 4: Simulate the process finishing
            </span>
            <p>
              If such a process is found, add each of the resources that were allocated to it back to the available
              vector respectively. Mark this process as finished, add it to the safe sequence, and repeat step 4.
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 5: Determine safe or unsafe state
            </span>
            <p>
              If all of the processes are marked as finished, then the system is in a safe state when the algorithm
              began. The safe sequence shows the order in which the processes can run until they're completed. However,
              if no process can be found in step 4, and, not all of the processes are marked as finished, the system is
              in an unsafe state and deadlock may occur.
            </p>
          </li>
        </ol>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/bankers-algorithm.svg"
          caption="Banker's Algorithm Overview">
        </Figure>
      </div>
    </section>
  </main>
</template>

<script setup>
import Alert from '@/components/general/Alert.vue';
import Figure from '@/components/general/Figure.vue';
</script>
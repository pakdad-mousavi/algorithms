<template>
  <footer class="w-full py-4 text-sm border-t border-neutral-800">
    <div class="flex flex-col items-center justify-center w-full h-full text-zinc-500">
      <p class="flex items-center gap-x-2">
        Built with
        <Icon>
          <Heart></Heart>
        </Icon>
        by Pakdad Mousavi.
      </p>
      <p>
        All figures made using <a href="http://app.napkin.ai" target="_blank">Napkin AI</a>.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { Heart } from "@vicons/tabler";
import { Icon } from "@vicons/utils";
</script>
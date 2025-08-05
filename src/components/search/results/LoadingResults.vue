<template>
  <div class="absolute z-50 flex flex-col items-center justify-center w-full h-full p-4 gap-y-4 backdrop-blur-md">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" class="w-24">
      <path fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0"
        class="stroke-main blur-md translate-y-[25px]"
        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
        <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1"
          repeatCount="indefinite"></animate>
      </path>
      <path fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0"
        class="stroke-main translate-y-[25px]"
        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
        <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1"
          repeatCount="indefinite"></animate>
      </path>
    </svg>
  </div>
</template>
<template>
  <div class="skeleton grid grid-cols-2 gap-4 my-5 mx-[1px]">
    <div
      v-for="(n, i) in 6"
      :key="i"
      class="animate-pulse flex flex-col"
    >
      <div class="rounded-xl bg-gray-200 h-[220px] w-full" />
      <!-- <div class="flex-1 space-y-6 py-3">
        <div class="space-y-3">
          <div class="h-2 bg-gray-200 rounded" />
          <div class="h-2 bg-gray-200 rounded" />
        </div>
      </div> -->
    </div>
  </div>
</template>
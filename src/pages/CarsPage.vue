<script setup>
import { AppState } from '@/AppState.js';
import CarForm from '@/components/CarForm.vue';
import CarListing from '@/components/CarListing.vue';
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const cars = computed(() => AppState.cars)

onMounted(() => {
  getCars()
})

async function getCars() {
  try {
    await carsService.getCars()
  } catch (error) {
    Pop.error(error)
    logger.error('[GET CARS]', error)
  }
}

</script>


<template>
  <div class="container">
    <section class="row mb-3">
      <div class="col-12">
        <h1 class="text-center">Cars</h1>
      </div>
    </section>

    <section class="row">
      <div class="col-12">
        <CarForm />
      </div>
    </section>

    <section class="row">
      <div v-for="car in cars" :key="car.id" class="col-12 mb-3">
        <CarListing :carProp="car" />
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped></style>
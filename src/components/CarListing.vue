<script setup>
import { AppState } from '@/AppState.js';
import { Car } from '@/models/Car.js';
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({
  carProp: { type: Car, required: true }
})

const account = computed(() => AppState.account)

async function deleteCar() {
  try {
    const message = `Are you sure you want to delete your ${props.carProp.make} ${props.carProp.model}?`
    const confirmed = await Pop.confirm(message)
    if (!confirmed) { return }
    const carId = props.carProp.id
    await carsService.deleteCar(carId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[DELETING CAR]', error)
  }
}
</script>


<template>
  <div class="row bg-light shadow" :style="{ borderColor: carProp.color }">
    <div class="col-md-4 px-0">
      <img :src="carProp.imgUrl" :alt="`${carProp.make} ${carProp.model}`" class="img-fluid car-img">
    </div>
    <div class="col-md-8">
      <div class="p-2 d-flex flex-column justify-content-between h-100">
        <div>
          <h2>{{ carProp.year }} {{ carProp.make }} {{ carProp.model }}</h2>
          <p class="fs-3">${{ carProp.price }}</p>
          <p>{{ carProp.description }}</p>
          <p>Listed on {{ carProp.createdAt.toLocaleDateString() }}</p>
        </div>
        <div class="d-flex justify-content-end gap-3 align-items-center">
          <!-- NOTE elvis operator ? will check to see if the left hand side of the object is null or undefined before accessing properties -->
          <button v-if="account?.id == carProp.creatorId" @click="deleteCar()" class="btn btn-outline-danger"
            type="button" title="Delete Car">
            <i class="mdi mdi-delete-forever"></i>
          </button>
          <span>{{ carProp.creator.name }}</span>
          <img :src="carProp.creator.picture" :alt="carProp.creator.name" class="creator-img">
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.car-img {
  height: 45dvh;
  width: 100%;
  object-fit: cover;
}

.row {
  border: 3px solid;
}

.creator-img {
  height: 10dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>
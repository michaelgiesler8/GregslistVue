<script setup>
import { AppState } from '@/AppState.js'
import { House } from '@/models/House.js';
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({
  houseProp: { type: House, required: true }
})

const account = computed(() => AppState.account)

async function deleteHouse() {
  try {
    const message = `Are you sure you want to delete this ${props.houseProp.bedrooms} bedroom house🏠?`
    const confirmed = await Pop.confirm(message)
    if (!confirmed) { return }
    const houseId = props.houseProp.id
    await housesService.deleteHouse(houseId)
  } catch (error) {
    Pop.error(error)
    logger.error('[DELETING HOUSE]', error)
  }
}
</script>

<template>
  <div class="card h-100">
    <img :src="houseProp.imgUrl" :alt="`${houseProp.bedrooms} bedroom house`" class="house-img">
    <div class="card-body">
      <h3 class="card-title">${{ houseProp.price.toLocaleString() }}</h3>
      <p class = "card-text">
        {{ houseProp.bedrooms }} Bedrooms | {{ houseProp.levels }} levels
      </p>
      <p class="card-text">Built in {{ houseProp.year }}</p>
      <p class="card-text">{{ houseProp.description }}</p>
      <p class="card-text">Listed on {{ houseProp.createdAt.toLocaleDate() }}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <span>{{ houseProp.creator.name }}</span>
      <button v-if="account?.id == houseProp.creatorId" @click="deleteHouse()" class="btn btn-outline-danger"
        title="Delete House">
      </button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.house-img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>
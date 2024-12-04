<script setup>
import { AppState } from '@/AppState.js';
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';
import { computed } from 'vue';

const account = computed(() => AppState.account)

const editable = ref({
  bedrooms: 1,
  bathrooms: 1,
  levels: 1,
  imgUrl: '',
  year: new Date().getFullYear(),
  price: 100000,
  description: ''
})

async function createHouse() {
  try {
    await housesService.createHouse(editable.value)
    editable.value = {
      bedrooms: 1,
      bathrooms: 1,
      levels: 1,
      imgUrl: '',
      year: new Date().getFullYear(),
      price: 100000,
      description: ''
    }
    Pop.success('House successfully listed! 🏚️')
  } catch (error) {
    logger.error('[CREATING HOUSE]', error)
    Pop.error(error)
  }
}
</script>

<template>
  <div v-if="account != null">
    <form @submit.prevent="createHouse()">
      <div class="form-floating mb-3">
        <input v-model="editable.bedrooms" type="number" class="form-control" id="bedrooms" min="1" required>
        <label for="bedrooms">Bedrooms🛌</label>
      </div> 
      <div class="form-floating mb-3">
        <input v-model="editable.bathrooms" type="number" class="form-control" id="bathrooms" min="1" step="0.5" required>
        <label for="bathrooms">Bathrooms🛀🏽</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="editable.levels" type="number" class="form-control" id="levels" min="1" required>
        <label for="levels">Levels🛗</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="editable.levels" type="number" class="form-control" id="imgUrl" placeholder="House Image URL..."
          required maxlength="500">
        <label for="imgUrl">Image URL🌄</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="editable.year" type="number" class="form-control" id="year" required :max="new Date().getFullYear()"
          min="1600">
        <label for="year">Year Built🛠️</label>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price: 💸{{  editable.price.toLocaleString() }}💸</label>
        <input v-model="editable.price" type="range" class="form-range" id="price" min="1000" max="100000000" step="50">
      </div>
      <div class="form-floating mb-3">
        <textarea v-model="editable.description" class="form-control" placeholder="House Description" id="description"
          maxlength="500"></textarea>
        <label for="description">Description✍🏻</label>
      </div>
      <div class="text-end">
        <button class="btn btn-success" type="submit">List House🏡</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { housesService } from '../services/HousesService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import HouseForm from '../components/HouseForm.vue';
import HouseCard from '../components/HouseCard.vue';

const houses = computed(() => AppState.houses)
const account = computed(() => AppState.account)
const showForm = ref(false)

onMounted(async () => {
  try {
    await housesService.getHouses()
  } catch (error) {
    Pop.error(error)
  }
})
</script>

<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h1>Houses🏘️</h1>
          <button v-if="account" @click="showForm = !showForm" class="btn btn-success">
            {{  showForm ? 'Close Form' : 'List A House' }}
          </button>
        </div>
      </div>
    </section>

    <section v-if="showForm" class="row justify-content-center mb-4">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <HouseForm />
          </div>
        </div>
      </div>
    </section>

    <section class="row g-4">
      <div v-for="house in houses" :key="house.id" class="col-md-4 mb-3">
        <HouseCard :houseProp="house" />
      </div>
    </section>
  </div>
</template>
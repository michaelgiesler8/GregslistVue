import { AppState } from '../AppState.js'
import { House } from '../models/House.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js';

class HousesService {
  async getHouses() {
    const res = await api.get('api/houses')
    logger.log('GOT HOUSES🏠', res.data)
    AppState.houses = res.data.map(h => new House(h))    
  }

  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    logger.log('CREATED HOUSE🏠', res.data)
    const house = new House(res.data)
    AppState.houses.push(house)
    return house
  }

  async deleteHouse(houseId) {
    const res = await api.delete(`api/houses/${houseId}`)
    logger.log('DELETED HOUSE🏠', res.data)
    AppState.houses = AppState.houses.filter(h => h.id != houseId)
  }
}

export const housesService = new HousesService()
<template>
  <div class ="dropdown-menu">
    <span class="status-text">Rocket Status</span>
    <select v-model="filter" class="btn filter">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>
  <div class="rockets-list">
    <RocketDetail :rocketId="this.displayedRocketId" v-if="isDisplayed" @close="toggleDisplay" />
    <div @click="toggleDisplay(rocket._id)" class="rocket-banner" v-for="rocket in filteredRockets" :key="rocket._id">
      <img :src="rocket.pictureBannerUrl" alt="rocket image">
      <div class="rocket-name">
        <div class="value">
          <span v-if="rocket.active" class="green dot"></span>
          <span v-else class="red dot"></span>
        </div>
        {{ rocket.name }}
        <span class="chevron-right">&#x3009;</span>
      </div>
    </div>
  </div>
  <div class="footer">Argolight Company © Mini-project by Roman Beldent</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import RocketDetail from './RocketDetail.vue'

const filter = ref('all');
const filteredRockets = ref([]);

export default {
  components: {
    RocketDetail
  },
  data() {
    return {
      isDisplayed: false,
      displayedRocketId: null,
    }
  },
  methods: {
    toggleDisplay(rocketId) {
      this.isDisplayed = !this.isDisplayed;
      this.displayedRocketId = rocketId;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
  },
  setup() {
    const rockets = ref([]);

    onMounted(async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/rockets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const dataResponse = await response.json();
        rockets.value = dataResponse.data

        if (filter.value === 'all') {
          filteredRockets.value = rockets.value;
        } else {
          // Filtrage initial des fusées en fonction du filtre actif/inactif sinon
          filteredRockets.value = rockets.value.filter(rocket => {
            return filter.value === 'active' ? rocket.active : !rocket.active;
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des fusées', error);
      }
    });

    watch(filter, (newValue) => {
      if (newValue === 'all') {
        filteredRockets.value = rockets.value;
      } else {
        filteredRockets.value = rockets.value.filter(rocket => {
          return newValue === 'active' ? rocket.active : !rocket.active;
        });
      }
    });

    return {
      rockets,
      filter,
      filteredRockets
    };
  }
};
</script>

<style scoped>
.rockets-list {
  width: 70vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 1; /* S'assurer que c'est en dessous de RocketDetail */
}

.rocket-banner {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  margin: 25px;
  border-radius: 10px;
  z-index: 2;
}

.rocket-name {
  display: flex;
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer {
  margin: 20px 0 30px 0;
}

.green.dot {
  width: 25px;
  height: 25px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}

.red.dot {
  width: 25px;
  height: 25px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
}

.dot {
  margin-left: 30px;
}

.chevron-right {
  font-size: 50px;
  padding-right: 30px;
  transition: transform 0.5s;
}

.rocket-banner:hover .chevron-right {
  transform: scale(1.6);
}

.filter {
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 7%;
} 

.dropdown-menu {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.status-text {
  padding-right: 20px;
}

</style>
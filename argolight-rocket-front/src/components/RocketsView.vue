<template>
  <div class="rockets-list">
    <RocketDetail :rocketId="this.displayedRocketId" v-if="isDisplayed" @close="toggleDisplay" />
    <div @click="toggleDisplay(rocket._id)" class="rocket-banner" v-for="rocket in rockets" :key="rocket._id">
      <img  :src="rocket.pictureUrl" alt="rocket image">
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
import { ref, onMounted } from 'vue';
import RocketDetail from './RocketDetail.vue'

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
        console.log(dataResponse)
        rockets.value = dataResponse.data
      } catch (error) {
        console.error('Erreur lors de la récupération des fusées', error);
      }
    });

    return {
      rockets
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
}

.rocket-banner {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  margin: 25px;
  border-radius: 10px;
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

</style>
<template>
  <section v-if="rocket" class="overlay" @click.self="toggleDisplay">
    <div class="component-size">
      <div class="flex">
        <div class="btn-title">
          <button @click="toggleDisplay" class="close-button" type="button">
            <span class="close-button">&times;</span>
          </button>
          <h3>{{ rocket.name }}</h3>
        </div>
        <div class="description-container">
          <p class="description">{{ rocket.description }}</p>
          <div class="rocket-data">
            <div class="rocket-data-info">
              <div class="label">Height</div>
              <div class="value">{{ rocket.height }}m</div>
            </div>
            <div class="rocket-data-info">
              <div class="label">Country</div>
              <div class="value">{{ rocket.country }}</div>
            </div>
            <div class="rocket-data-info">
              <div class="label">First Flight</div>
              <div class="value">{{ rocket.firstLaunch }}</div>
            </div>
            <div class="rocket-data-info">
              <div class="label">Status</div>
              <div class="value">
                <span v-if="rocket.active" class="green-dot"></span>
                <span v-else class="red-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img :src="rocket.pictureDetailUrl" alt="rocket image larger">
    </div>
  </section>
</template>

<script>

export default {
  name: "RocketView",
  props: {
    rocketId: String
  },
  data() {
    return {
      rocket: null
    };
  },
  methods: {
    toggleDisplay() {
      this.$emit('close')
    }
  },
  async mounted() {
    try {
      document.body.style.overflow = 'hidden';
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/rockets/${this.rocketId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const dataResponse = await response.json();
      this.rocket = dataResponse.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la fusée', error);
    }
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  },
};
</script>

<style scoped>
.component-size {
  display: flex;
  border-radius: 15px;
  margin: 25px 0 50px 0;
  height: 65vh;
  width: 70vw;
  background-color: #504743;
  box-shadow: 10px 10px 10px rgb(0, 0, 0, 0.6);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.rocket-data {
  width: 45%;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
}

.rocket-data-info {
  display: flex;
  flex: 1;
  margin-bottom: 20px;
  padding-bottom: 15px;
  justify-content: space-between;
  border-bottom: 1px solid white;
}

.description {
  width: 50%;
  text-align: center;
  line-height: 1.6;
}

.description-container {
  display: flex;
  align-items: center;
  height: 75%;
  gap: 5%;
  padding: 0 5% 5% 5%;
}

img {
  max-width: 32vw;
  width: auto;
  border-radius: 0 15px 15px 0px;
  object-fit: cover;
}

h3 {
  font-size: 50px;
  display: flex;
  justify-content: center;
  font-weight: 600;
}

.close-button {
  background-color: transparent;
  font-size: 3rem;
  outline: none;
}


</style>
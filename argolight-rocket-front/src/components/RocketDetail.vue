<template>
  <section v-if="rocket">
    <div class="rocket-extended">
      <div class="btn-title">
        <button @click="toggleDisplay" class="close-button" type="button">
          <span>&times;</span>
        </button>
        <h3>{{ rocket.name }}</h3>
      </div>
      <div class="description-container">
        <p class="description">{{ rocket.description }}</p>
        <div class="rocket-data">
          <div class="rocket-data-info">
            <div class="label">Height</div>
            <div class="value">{{ rocket.height }}</div>
          </div>
          <div class="rocket-data-info">
            <div class="label">Country</div>
            <div class="value">{{ rocket.country }}</div>
          </div>
          <div class="rocket-data-info">
            <div class="label">Active</div>
            <div class="value">{{ rocket.active }}</div>
          </div>
        </div>
      </div>
    </div>
    <img :src="rocket.pictureUrl" alt="rocket image larger">
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
  }
};
</script>

<style scoped>
section {
  border-radius: 15px;
  display: flex;
  margin: 25px 0 50px 0;
  height: 650px;
}

.rocket-extended {
  background-color: #504743;
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  padding-bottom: 10px;
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
  object-fit: none;
}

h3 {
  font-size: 50px;
  display: flex;
  justify-content: center;
  font-weight: 600;
}

button {  
  background-color: transparent;
  font-size: 3rem;
}

</style>
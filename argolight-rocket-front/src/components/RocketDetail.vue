<template>
  <section v-if="rocket">
    <div class="rocket-detail">
      <h3>{{ rocket.name }}</h3>
      <p class="description">{{ rocket.description }}</p>
      <table>
        <thead>
          <tr>
            <th>Height</th>
            <th>Country</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ rocket.height }}</td>
            <td>{{ rocket.country }}</td>
            <td>{{ rocket.active }}</td>
          </tr>
        </tbody>
      </table>
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
  height: 500px;
}

.rocket-detail {
  background-color: #504743;
  border-radius: 15px 0 0 15px;
  display: flex;
}

img {
  max-width: 35vw;
  width: auto;
  border-radius: 0 15px 15px 0px;
}

h3 {
  font-size: 40px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>
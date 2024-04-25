<template>
    <div>
      <h3>{{ rocket.name }}</h3>
      <p>{{ rocket.description }}</p>
      <p>{{ rocket.country }}</p>
      <p>{{ rocket.height }}</p>
      <p>{{ rocket.active }}</p>
      <img :src="rocket.pictureUrl" alt="rocket image">
    </div>
  </template>
<template>
  <div class="space-page">
    <header class="space-header">
      <h1>🌌 Welcome to Your Space</h1>
      <p>
        This is your personal space — customize it, expand it, make it yours.
      </p>
    </header>

    <section class="space-content">
      <div class="card" v-for="item in items" :key="item.id">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </section>

    <footer class="space-footer">
      <p>
        Powered by Nuxt 3 · Last updated {{ new Date().toLocaleDateString() }}
      </p>
    </footer>
  </div>
</template>

<script setup>
const items = [
  {
    id: 1,
    title: 'Your Projects',
    description: 'Manage and showcase your work here.'
  },
  {
    id: 2,
    title: 'Saved Articles',
    description: 'Curate your favorite reads and resources.'
  },
  {
    id: 3,
    title: 'Settings',
    description: 'Adjust preferences and personalize your space.'
  }
]
</script>

<style scoped>
.space-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.space-header {
  text-align: center;
  margin-bottom: 2rem;
}

.space-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.space-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.space-footer {
  text-align: center;
  margin-top: 3rem;
  color: #888;
  font-size: 0.9rem;
}
</style>

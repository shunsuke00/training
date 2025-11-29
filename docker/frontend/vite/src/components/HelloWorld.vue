<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

// API利用
const table = ref<{id: number, name: string, email: string}[]>([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/users')
  table.value = await res.json()
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <!-- DBの表示 -->
  <div>
    <table v-if="table.length > 0">
      <caption>users table</caption>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in table" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ record.name }}</td>
          <td>{{ record.email }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Can't get data.</p>
  </div>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

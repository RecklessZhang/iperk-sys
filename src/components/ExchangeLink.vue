<template>
  <div class="w-full">
    <a :href="url" class="w-full">
      <vs-card type="3" class="w-full item-align-center">
        <template #title>
          <h3>
            <i v-if="icon" :class="icon"></i>&nbsp;
            {{ title }}&nbsp;&nbsp;
            <span v-html="detail"></span>
          </h3>
        </template>
        <template #text>
          <p>{{ description }}</p>
        </template>
      </vs-card>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ExchangeLink',
  props: ['title', 'icon', 'detail', 'description', 'url']
}
</script>

<style>
a {
  color: #1A5CFF;
  text-decoration: none;
  transition: 0.5s ease-in-out;
}

.vs-card {
  display: flex;
  justify-content: center !important;
}
</style>

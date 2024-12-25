<template>
  <div class="admin">
    <HeaderAdmin></HeaderAdmin>
    <div class="admin-container">
      <div class="table-title">
        <h3>Quotes</h3>
      </div>
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row" role="columnheader">Name</div>
          <div class="flex-row" role="columnheader">Email</div>
          <div class="flex-row" role="columnheader">Phone</div>
          <div class="flex-row" role="columnheader">Date</div>
        </div>
        <div class="flex-table row" role="rowgroup" v-for="(item, index) in items" :key="index">
          <div class="flex-row first" role="cell">
            {{ item.name }}
          </div>
          <div class="flex-row first" role="cell">
            {{ item.email }}
          </div>
          <div class="flex-row" role="cell">
            {{ item.phone }}
          </div>
          <div class="flex-row" role="cell">
            {{ item.date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup> 
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

const { data } = await useFetch('/api/getquotes')
console.log("data ", data);
const items = data._rawValue.quotes

//store.autoGalleryStart()

</script>



<style lang="scss">
@import "assets/scss/admin.scss";


</style>

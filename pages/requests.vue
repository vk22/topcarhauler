<template>
  <div class="admin">
    <HeaderAdmin></HeaderAdmin>
    <div class="admin-container">
      <h3>Job requests</h3>
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row" role="columnheader">Name</div>
          <div class="flex-row" role="columnheader">Email</div>
          <div class="flex-row" role="columnheader">Phone</div>
          <div class="flex-row" role="columnheader">File</div>
          <div class="flex-row" role="columnheader">Delete</div>
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
            {{ item.filename }}
          </div>
          <div class="flex-row" role="cell">
              <v-icon icon="mdi-delete" @click="deleteUser(item)"></v-icon>
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

const items = ref([]);

const getUsers = async () => {
  const { data } = await useFetch('/api/users')
  console.log("data ", data);
  items.value = data._rawValue.users
}

const deleteUser = async (user) => {
  const { data } = await useFetch(`/api/users`, {
    method: 'delete',
    body: user
  });
  if (data) {
    alert('Job request has been deleted!')
    getUsers()
  }
};

getUsers()

</script>



<style lang="scss">
@import "assets/scss/admin.scss";
</style>

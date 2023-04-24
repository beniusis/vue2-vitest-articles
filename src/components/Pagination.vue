  <template>
  <nav
    class="pagination is-centered m-4"
    role="navigation"
    aria-label="pagination"
  >
    <ul class="pagination-list">
      <li v-for="page in totalPages" :key="page">
        <a
          class="pagination-link"
          aria-label="Goto page whatever"
          @click="$emit('onPageChange', page)"
          :id="`page-${page}`"
          >{{ page }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalPages: {
      required: true,
      type: Number,
      default: 1
    }
  }
};
</script>

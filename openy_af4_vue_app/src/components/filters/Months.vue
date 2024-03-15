<template>
  <Foldable
    :label="'Month(s)' | t"
    :collapse-id="id + '-toggle'"
    :counter="filtersCount"
    :counter-max="0"
    class="month-filter-component"
  >
    <div class="row">
      <div v-for="month in months" :key="id + '-month-' + month.value" class="month-option col-4 col-xs-4">
        <input
          :id="id + '-month-' + month.value"
          v-model="selectedMonths"
          type="checkbox"
          :value="month.value"
        />
        <label :id="id + '-label-' + month.value" :for="id + '-month-' + month.value">
          {{ month.label }}
        </label>
      </div>
    </div>
  </Foldable>
</template>

<script>
import Foldable from '@/components/Foldable'

export default {
  name: 'MonthsFilter',
  components: {
    Foldable
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    months: {
      type: Array,
      required: true
    },
    facets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedMonths: this.value
    }
  },
  computed: {
    filtersCount() {
      return this.selectedMonths.length
    }
  },
  watch: {
    value() {
      this.selectedMonths = this.value
    },
    selectedMonths() {
      this.$emit('input', this.selectedMonths)
    }
  },
  methods: {
    facetCount(value) {
      let facet = this.facets.find(x => x.value === value)
      return facet ? facet.count : 0
    },
  }
}
</script>

<style lang="scss">
.month-filter-component {
  .foldable-content {
    padding: 10px 10px 5px;

    .row {
      margin-left: -3px !important;
      margin-right: -3px !important;
    }

    .month-option {
      padding-left: 3px;
      padding-right: 3px;

      input[type='checkbox'] {
        display: none;

        + label {
          cursor: pointer;
          display: block;
          height: 50px;
          line-height: 46px;
          text-align: center;
          color: $af-blue;
          background: $white;
          border: 2px solid $af-blue;
          border-radius: 5px;
        }

        &:checked + label {
          color: white;
          background: $af-blue;
        }

        &:disabled + label {
          background-color: $af-light-gray;
          border-color: $af-light-gray;
          cursor: default;
          color: $af-dark-gray;
        }
      }
    }
  }
}
</style>

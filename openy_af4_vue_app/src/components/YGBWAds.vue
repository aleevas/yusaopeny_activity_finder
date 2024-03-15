<template>
  <div v-if="data" class="ygbw-ads" :style="{ backgroundColor: data.bg_color }">
    <!--eslint-disable-next-line-->
    <div class="ygbw-ads__image" v-html="data.image"></div>
    <div class="ygbw-ads__content">
      <a :href="data.link" class="ygbw-ads__content__title" target="_blank" :style="{ color: data.text_color }">{{ data.title }}</a>
      <p class="ygbw-ads__content__subtitle" :style="{ color: data.text_color }">{{ data.subtitle }}</p>
    </div>
  </div>
</template>

<script>
import client from '@/client/index.js'

export default {
  name: 'YGBWAds',
  props: {
    selectedActivities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: null
    }
  },
  mounted() {
    let itemIds = this.selectedActivities.map(i => i.id)
    client('ygbw_ads')
      .request({ params: { subcategories: itemIds.join(',') } })
      .then(response => {
        if (response.data.length) {
          this.data = response.data.shift()
        }
      })
      .catch(error => {
        error
      })
  }
}
</script>

<style lang="scss">
.ygbw-ads {
  margin: 20px 0;
  background: #0089d0;
  position: relative;

  @include media-breakpoint-up(lg) {
    min-height: 187px;
    display: flex;
    align-items: center;
    padding: 20px 0;
  }

  &__image {
    overflow: hidden;
    height: 207px;

    @include media-breakpoint-up(lg) {
      position: absolute;
      inset: 0 0 0 47%;
      z-index: 2;
      min-height: 0;
      height: auto;
      clip-path: polygon(11% 0, 100% 0, 100% 100%, 0% 100%);
    }

    img {
      height: 100%;
      object-fit: cover;

      @include media-breakpoint-up(md) {
        max-width: 100%;
      }

      @include media-breakpoint-up(lg) {
        width: 100%;
      }
    }
  }

  &__content {
    width: 100%;
    padding: 20px;

    @include media-breakpoint-up(md) {
      padding: 28px 40px;
    }

    @include media-breakpoint-up(lg) {
      padding: 0 calc(50% + 75px) 0 40px;
    }

    &__title,
    &__subtitle {
      color: $white;
    }

    &__title {
      font-family: 'Cachet Book', sans-serif;
      font-size: 32px;
      display: block;

      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
        color: $white;
        box-shadow: none;
      }

      &:focus:before {
        box-shadow: inset 0 0 0 2px #69ff00;
      }

      &:before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 3;
      }
    }

    &__subtitle {
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 0;
    }
  }
}
</style>

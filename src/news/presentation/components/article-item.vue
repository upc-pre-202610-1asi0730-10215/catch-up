<script setup>
import {useI18n} from "vue-i18n";
import {Article} from "../../domain/model/article.entity.js";
import {toRef} from "vue";
import {Button as PvButton} from "primevue";

const { t } = useI18n();

const props = defineProps({article: {type: Article, required: true}});
const { article } = toRef(props);
const emit = defineEmits(['tooltip-showed']);

async function shareArticle() {
  const shareData = { title: article['title'], url: article['url']};
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log('Article shared successfully');
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  } else {
    try {
      await navigator.clipboard.writeText(article['url']);
      emit('tooltip-showed');
      console.log('Article URL copied to clipboard');
    } catch (error) {
      console.error('Error copying article URL to clipboard:', error);
    }
  }
}
</script>

<template>
  <pv-card class="m-2">
    <template #header>
      <img :alt="article.title" :src="article.urlToImage" class="image-fit"/>
    </template>
    <template #title>
      <p class="flex align-content-start flex-wrap">{{ article.title }}</p>
    </template>
    <template #subtitle>
      <p class="flex align-content-start flex-wrap">
        <span class="flex align-items-center justify-content-center mr-2">
          <pv-avatar :aria-label="article.source.name"
                     :image="article.source.urlToLogo"
                     shape="circle"/>
        </span>
        <span class="flex align-items-center justify-content-center">
          {{ article.source.name }}
        </span>
      </p>
      <p class="flex align-content-start flex-wrap">
        <span class="text-sm">{{ article.getFormattedPublishedAt() }}</span>
      </p>
    </template>
    <template #content>
      <p class="flex align-content-start flex-wrap mt-4">
        {{ article.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex justify-content -webkit-box-sizing: border-box; justify-content: space-between;">
        <a :href="article.url" target="_blank">{{ t('read-more')}}</a>
        <span class="p-spacer"></span>
        <pv-button
          tooltip="t('article.copy-to-clipboard')"
          :label="t('article.share')"
          aria-label="Share Article"
          class="p-button-text p-button-sm"
          icon="pi pi-share-alt"
          @click="shareArticle"/>
      </div>

    </template>
  </pv-card>
</template>

<style scoped>
.p-button-sm {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}

.p-spacer {
  flex: 1 1 auto;
}

.image-fit {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
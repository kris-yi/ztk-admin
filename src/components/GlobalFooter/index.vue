<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.github.com/vueComponent/pro-layout" target="_blank">Pro Layout</a>
      <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">Github</a>
      <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">vueComponent</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  },
  beforeCreate () {
    const token = storage.get(ACCESS_TOKEN)
    if (!token) {
      window.location.href = '/user/login'
    }
  }
}
</script>

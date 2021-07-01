<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <!--      <a href="javascript:void(0);">Pro Layout</a>-->
      <!--      <a href="javascript:void(0);">Github</a>-->
      <!--      <a href="javascript:void(0);">@Sendya</a>-->
    </template>
    <template v-slot:copyright>
      <a href="javascript:void(0);">简阳市壮溪镇中坝岛</a>
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

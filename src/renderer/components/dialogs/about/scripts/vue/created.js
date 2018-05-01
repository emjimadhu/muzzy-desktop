import { EventBus } from '@/utils/eventBus'

export default function () {
  const self = this
  EventBus.$on('ABOUT_DIALOG_TRIGGERED', () => {
    self.dialog = true
  })
}

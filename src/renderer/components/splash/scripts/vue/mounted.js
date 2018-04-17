import lottie from 'lottie-web'
import splashAnimation from '@/assets/animations/loading.json'

export default function () {
  lottie.loadAnimation({
    container: this.$refs.splashLoading,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: splashAnimation
  })
}

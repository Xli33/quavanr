export default {
  type: 'QaCarousel',
  label: '轮 播',
  icon: 'view_carousel',
  defaultProps: {
    height: '200px',
    autoplay: true,
    interval: 3000,
    arrows: false,
    navigation: true,
    animated: 'slide',
    items: [
      {
        src: 'https://cdn.quasar.dev/img/slide1.jpg',
        label: 'Slide 1'
      },
      {
        src: 'https://cdn.quasar.dev/img/slide2.jpg',
        label: 'Slide 2'
      },
      {
        src: 'https://cdn.quasar.dev/img/slide3.jpg',
        label: 'Slide 3'
      }
    ]
  }
};

export default {
  type: 'VaCarousel',
  label: '轮 播',
  icon: 'view_carousel',
  defaultProps: {
    height: 200,
    autoplay: true,
    interval: 3000,
    duration: 500,
    indicator: true,
    'indicator-color': 'white',
    vertical: false,
    touchable: true,
    items: [
      {
        src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'
      },
      {
        src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
      },
      {
        src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
      }
    ]
  }
};

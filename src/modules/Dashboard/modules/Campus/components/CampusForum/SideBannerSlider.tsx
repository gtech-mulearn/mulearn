import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './CampusForum.module.css';

const SidebarBannerSlider = () => {
  const images = [
    {image: '/assets/interestgroup_assets/Top 100 Designers.png', title: 'Top 100 Designers', date: '29-02-2025'},
    {image: '/assets/interestgroup_assets/Top100Desigers2.png', title: 'Top 100 Designers', date: '29-02-2025'},
    {image: '/assets/interestgroup_assets/Top100Desigers3.png', title: 'Top 100 Designers', date: '29-02-2025'},
  ];

  return (
    <div className={styles.sidebarBannerSlider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img src={src.image} alt={`Slide ${index + 1}`} className={styles.sliderImage} />
            <h4>{src.title}</h4>
            <p>{src.date}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SidebarBannerSlider;

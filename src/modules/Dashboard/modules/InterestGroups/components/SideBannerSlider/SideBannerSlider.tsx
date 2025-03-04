import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './CommunityForum.module.css';

interface Event {
  id: string;
  title: string;
  link: string;
  venue: string;
  eventType: "Online" | "Offline";
  date: string;
  time: string;
  image: string;
}

interface SidebarBannerSliderProps {
  events?: Event[];
}

const SidebarBannerSlider: React.FC<SidebarBannerSliderProps> = ({ events }) => {
  return (
    <div className={styles.sidebarBannerSlider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {events?.map((event) => (
          <SwiperSlide key={event.id} className={styles.swiperSlide}>
            <img src={event.image} alt={event.title} className={styles.sliderImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SidebarBannerSlider;
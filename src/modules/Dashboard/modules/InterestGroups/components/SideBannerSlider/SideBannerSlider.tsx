import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './CommunityForum.module.css';

export interface Event {
  id: string;
  title: string;
  description:string;
  link: string;
  venue: string;
  eventType: string;
  date: string;
  time: string;
  poster: string;
  igBased?: boolean;
  ig?: string;
  status: string;

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
            <div className={styles.imageWrapper}>
              <img src={event.poster} alt={event.title} className={styles.sliderImage} loading='lazy'/>
              {event.link&&(
              <a href={event.link} className={styles.knowMoreButton}>
                Know More
              </a>)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SidebarBannerSlider;

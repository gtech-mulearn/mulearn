// Global module declarations for non-TS imports used in the project
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

// Swiper side-effect CSS imports
declare module 'swiper/css';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';
// fallback for any other swiper style imports
declare module 'swiper/**';

// Static asset types
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.pdf';

// allow importing raw text files if needed
declare module '*.txt';

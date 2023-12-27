import Swiper from 'swiper';
import type { SwiperProps, SwiperSlideProps } from 'swiper/react';

/**
 * When you import Swiper custom elements from node modules, we need to manually register them.
 * It should be done only once and it registers Swiper custom elements globally.
 */
type Kebab<
  T extends string,
  A extends string = '',
> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A;

type KebabObjectKeys<T> = {
  [key in keyof T as Kebab<key & string>]: T[key] extends object
    ? KebabObjectKeys<T[key]>
    : T[key];
};

export type SwiperRef = HTMLElement & {
  swiper: Swiper;
  initialize: () => void;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperContainerAttributes,
        HTMLElement
      >;
      'swiper-slide': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperSlideAttributes,
        HTMLElement
      >;
    }

    interface SwiperContainerAttributes extends KebabObjectKeys<SwiperProps> {
      ref?: RefObject<SwiperRef>;
      children?: React.ReactNode;
    }
    type SwiperSlideAttributes = KebabObjectKeys<SwiperSlideProps>;
  }
}

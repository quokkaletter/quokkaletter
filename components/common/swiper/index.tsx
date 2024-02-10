import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { Children, useEffect, useRef } from 'react';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';

type SwiperWrapperProps = {
  children: React.ReactNode;
  className?: string;
  initialSlide?: number;
};

export const SwiperWrapper: React.FC<SwiperWrapperProps> = ({
  children,
  initialSlide = 0,
}) => {
  return (
    <>
      <SwiperContainerComp initialSlide={initialSlide}>
        {children}
      </SwiperContainerComp>
    </>
  );
};

type SwiperContainerProps = {
  children: React.ReactNode;
  initialSlide?: number;
};

export const SwiperContainerComp: React.FC<SwiperContainerProps> = ({
  children,
  initialSlide = 0,
}) => {
  const swiperRef = useRef<SwiperContainer>(null);

  useEffect(() => {
    register();

    if (!swiperRef.current) return;
    const swiperEl = swiperRef.current;

    const swiperParams = {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    };

    swiperEl.swiper?.slideTo(initialSlide, 0);
    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }, [swiperRef, initialSlide]);

  return (
    <section className="h-full">
      <swiper-container
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={swiperRef}
        init={false}
      >
        {Children.map(children, (child) => (
          <swiper-slide
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {child}
          </swiper-slide>
        ))}
      </swiper-container>
      <ArrowLeftCircle
        className="swiper-button swiper-button-prev"
        onClick={() => swiperRef?.current?.swiper.slidePrev()}
      />
      <ArrowRightCircle
        className="swiper-button swiper-button-next"
        onClick={() => {
          swiperRef?.current?.swiper.slideNext();
        }}
      />
    </section>
  );
};

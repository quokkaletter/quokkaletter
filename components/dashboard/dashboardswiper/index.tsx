import { Children, useEffect, useRef } from 'react';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';
import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';

type DashboardSwiperWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const DashboardSwiperWrapper: React.FC<DashboardSwiperWrapperProps> = ({
  children,
}) => {
  return (
    <>
      <SwiperContainerComp>{children}</SwiperContainerComp>
    </>
  );
};

type SwiperContainerProps = {
  children: React.ReactNode;
};

export const SwiperContainerComp: React.FC<SwiperContainerProps> = ({
  children,
}) => {
  const swiperRef = useRef<SwiperContainer>(null);

  useEffect(() => {
    register();

    if (!swiperRef?.current) return null;

    const swiperEl = swiperRef.current;

    const swiperParams = {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    };

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }, [swiperRef]);

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
        className="swiper-button left-[-40px] z-1"
        onClick={() => swiperRef?.current?.swiper.slidePrev()}
      />
      <ArrowRightCircle
        className="swiper-button right-[-40px] z-1"
        onClick={() => {
          console.log('hi');
          swiperRef?.current?.swiper.slideNext();
        }}
      />
    </section>
  );
};

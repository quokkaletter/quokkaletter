import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useEffect, useRef } from 'react';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';

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
  const showArrowIcon = (children as any)?.length > 1;

  useEffect(() => {
    register();

    if (!swiperRef?.current) return null;

    const swiperEl = swiperRef.current;

    const swiperParams = {
      pagination: {
        el: '.swiper-pagination',
        type: 'scrollbar',
      },
    };

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }, [children, swiperRef]);

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
      {showArrowIcon && (
        <>
          <ChevronLeft
            className="swiper-button left-[-40px] z-1"
            onClick={() => swiperRef?.current?.swiper.slidePrev()}
          />
          <ChevronRight
            className="swiper-button right-[-40px] z-1"
            onClick={() => swiperRef?.current?.swiper.slideNext()}
          />
        </>
      )}
    </section>
  );
};

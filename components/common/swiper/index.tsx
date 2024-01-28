import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { Children, useEffect, useRef } from 'react';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';

type SwiperWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const SwiperWrapper: React.FC<SwiperWrapperProps> = ({ children }) => {
  return (
    <>
      <SwiperContainerComp>{children}</SwiperContainerComp>
    </>
  );
};

type SwiperContainerProps = {
  children: React.ReactNode;
  //   swiperOptions: any;
};

export const SwiperContainerComp: React.FC<SwiperContainerProps> = ({
  children,
  //   ...swiperOptions
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

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }, []);

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

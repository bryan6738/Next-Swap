import { RadioGroup } from '@headlessui/react';
import { LoopIcon } from '@/components/icons/loop-icon';
import { SandClock } from '@/components/icons/sand-clock';
import { TagIcon } from '@/components/icons/tag-icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper';
import { useState } from 'react';

const PriceOptions = [
  {
    id: 1,
    title: 'Create Project',
    description: 'NFT+Username+KYC',
    name: 'Fixed price',
    value: 'fixed',
    icon: <TagIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    id: 2,
    title: 'General F1.',
    description: 'Project, RFP, Escrow',
    name: 'Open for bids',
    value: 'bids',
    icon: <LoopIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    id: 3,
    title: 'General F1.+DAO',
    description: 'Project, RFP, Escrow, Utility, Voting',
    name: 'Timed auction',
    value: 'auction',
    icon: <SandClock className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  // {
  //   id: 4,
  //   title: 'General F1.+DAO',
  //   description: 'Project, RFP, Escrow, Utility, Voting',
  //   name: 'Timed auction',
  //   value: 'auction',
  //   icon: <SandClock className="h-5 w-5 sm:h-auto sm:w-auto" />,
  // },
];

type PriceTypeProps = {
  value: number;
  onChange: (value: string) => void;
};

export default function PriceType({ value, onChange }: PriceTypeProps) {
  const [checkedId, setCheckedId] = useState(value);

  function handleClick(item: any) {
    onChange(item.value);
    setCheckedId(item?.id);
  }

  const sliderBreakPoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1536: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    2200: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  return (
    <Swiper
      modules={[Scrollbar, A11y]}
      spaceBetween={24}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      breakpoints={sliderBreakPoints}
      observer={true}
      dir="ltr"
      className="dark:[&_.swiper-scrollbar_>_.swiper-scrollbar-drag]:bg-body/50"
    >
      {PriceOptions.map((item) => (
        <SwiperSlide key={item.id} onClick={() => handleClick(item)}>
          <span
            className={`relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-solid bg-white text-center text-sm font-medium tracking-wider shadow-card transition-all hover:shadow-large dark:bg-light-dark 
              ${checkedId === item.id ? 'border-brand' : 'border-white dark:border-light-dark'}`}
          >
            <span className="relative flex h-28 flex-col items-center justify-center gap-3 px-2 text-center text-xs uppercase sm:h-36 sm:gap-4 sm:text-sm">
              <div style={{ fontSize: '20px' }}> {item.title} </div>
              {item.description}
            </span>
          </span>
        </SwiperSlide>
      ))
      }
    </Swiper >
  );
}

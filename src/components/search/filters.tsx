'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'rc-slider';
import { RadioGroup } from '@/components/ui/radio-group';
import Collapse from '@/components/ui/collapse';
import CollectionSelect from '@/components/ui/collection-select-list';
import { useDrawer } from '@/components/drawer-views/context';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { NormalGridIcon } from '@/components/icons/normal-grid';
import { CompactGridIcon } from '@/components/icons/compact-grid';
import { Close } from '@/components/icons/close';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@headlessui/react';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { useTheme } from 'next-themes';
import { string } from 'yup';
import { stat } from 'fs';
import { Select } from 'antd';
import InputLabel from '@/components/ui/input-label';

export function GridSwitcher() {
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();
  return (
    <div className="flex overflow-hidden rounded-lg">
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${!isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
          }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {!isGridCompact && (
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-full w-full bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <NormalGridIcon className="relative" />
      </button>
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
          }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {isGridCompact && (
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-full w-full  bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <CompactGridIcon className="relative" />
      </button>
    </div>
  );
}

export const sort = [
  { id: 1, name: 'Date Listed: Newest' },
  { id: 2, name: 'Date Listed: Oldest' },
  { id: 3, name: 'Ending: Soonest' },
  { id: 4, name: 'Ending: Latest' },
];

export function SortList() {
  const [selectedItem, setSelectedItem] = useState(sort[0]);
  return (
    <div className="relative">
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button className="flex h-10 w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:w-56 sm:text-sm lg:h-11">
          {selectedItem.name}
          <ChevronDown className="ltr:ml-2 rtl:mr-2" />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark sm:w-full">
            {sort.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white sm:text-sm  ${selected
                      ? 'my-1 bg-gray-100 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    {item.name}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

export function PriceRange() {
  let [range, setRange] = useState({ min: 0, max: 1000 });
  function handleRangeChange(value: any) {
    setRange({
      min: value[0],
      max: value[1],
    });
  }
  function handleMaxChange(max: number) {
    setRange({
      ...range,
      max: max || range.min,
    });
  }
  function handleMinChange(min: number) {
    setRange({
      ...range,
      min: min || 0,
    });
  }
  return (
    <div className="p-5">
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.min}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          min="0"
          max={range.max}
        />
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.max}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          min={range.min}
        />
      </div>
      <Slider
        range
        min={0}
        max={1000}
        value={[range.min, range.max]}
        allowCross={false}
        onChange={(value) => handleRangeChange(value)}
      />
    </div>
  );
}

type StatusTypeProps = {
  plan: string;
  handleChange: (value: string) => void;
};

export function Status({ plan, handleChange }: StatusTypeProps) {

  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={plan}
      onChange={handleChange}
      className="grid grid-cols-1 gap-2 p-5"
    >
      <RadioGroup.Option value="regalo">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
              ? theme == 'dark'
                ? 'border-brand bg-brand text-black shadow-button'
                : 'border-brand bg-brand text-white shadow-button'
              : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
              }`}
          >
            Regalo
          </span>
        )}
      </RadioGroup.Option>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <RadioGroup.Option value="equity">
          {({ checked }) => (
            <span
              className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
                ? theme == 'dark'
                  ? 'border-brand bg-brand text-black shadow-button'
                  : 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                }`}
            >
              Equity
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="utility">
          {({ checked }) => (
            <span
              className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
                ? theme == 'dark'
                  ? 'border-brand bg-brand text-black shadow-button'
                  : 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                }`}
            >
              Utility
            </span>
          )}
        </RadioGroup.Option>
      </div>
      {/* <RadioGroup.Option value="has-offers">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
                ? theme == 'dark'
                  ? 'border-brand bg-brand text-black shadow-button'
                  : 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
              }`}
          >
            Has offers
          </span>
        )}
      </RadioGroup.Option> */}
    </RadioGroup>
  );
}

export function Regalo() {
  let [regaloStatus, setRegaloStatus] = useState("on-ramp")
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={regaloStatus}
      onChange={setRegaloStatus}
      className="grid grid-cols-1 gap-2 p-5"
    >
      <div className="mb-4 grid grid-cols-2 gap-2">
        <RadioGroup.Option value="on-ramp">
          {({ checked }) => (
            <span
              className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
                ? theme == 'dark'
                  ? 'border-brand bg-brand text-black shadow-button'
                  : 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                }`}
            >
              On Ramp
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="off-ramp">
          {({ checked }) => (
            <span
              className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
                ? theme == 'dark'
                  ? 'border-brand bg-brand text-black shadow-button'
                  : 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                }`}
            >
              Off Ramp
            </span>
          )}
        </RadioGroup.Option>
      </div>
      <RadioGroup.Option value="rfp">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
              ? theme == 'dark'
                ? 'border-brand bg-brand text-black shadow-button'
                : 'border-brand bg-brand text-white shadow-button'
              : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
              }`}
          >
            RFP
          </span>
        )}
      </RadioGroup.Option>
      {/* <RadioGroup.Option value="has-offers">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${checked
                ? theme == 'dark'
                  ? 'border-brand bg-brand text-black shadow-button'
                  : 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
              }`}
          >
            Has offers
          </span>
        )}
      </RadioGroup.Option> */}
    </RadioGroup>
  );
}

export function Region() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const countries = [
    {
      value: 'us',
      label: 'United States',
      cities: [
        {
          value: 'ny',
          label: 'New York',
        },
        {
          value: 'wt',
          label: 'Washington',
        },
      ],
    },
    {
      value: 'uk',
      label: 'United Kingdom',
      cities: [
        {
          value: 'ld',
          label: 'London',
        },
        {
          value: 'sl',
          label: 'Sale',
        },
      ],
    },
    {
      value: 'nz',
      label: 'New Zealand',
      cities: [
        {
          value: 'ak',
          label: 'Auckland',
        },
      ],
    },
  ];

  const onChangeCountry = (value: any) => {
    console.log(`selected ${value}`);
    setCountry(countries.find((country) => country.value === value));
  };

  const onSearchCountry = (value: any) => {
    console.log('search:', value);
    setCountry(value);
  };

  const onChangeCity = (value: any) => {
    console.log(`selected ${value}`);
    setCity(value);
  };

  const onSearchCity = (value: any) => {
    console.log('search:', value);
    setCity(value);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 p-5 selector-container">
        <Select
          showSearch
          placeholder="Select a Country"
          optionFilterProp="children"
          onChange={onChangeCountry}
          onSearch={onSearchCountry}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={countries}
          className="region-selector h-9"
        />
        {/* {country && ( */}
          <Select
            showSearch
            placeholder="Select a City"
            optionFilterProp="children"
            onChange={onChangeCity}
            onSearch={onSearchCity}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={country.cities}
            className="region-selector h-9"
          />
        {/* )} */}
      </div>
    </>
  );
}


// export function Region() {

//   const country_options = [
//     {
//       value: 'us',
//       label: 'United States',
//     },
//     {
//       value: 'uk',
//       label: 'United Kingdom',
//     },
//     {
//       value: 'nz',
//       label: 'New zealand',
//     },
//   ]

//   const city_options = [
//     {
//       value: 'us',
//       label: 'New York',
//     },
//     {
//       value: 'us',
//       label: 'Woshington',
//     },
//     {
//       value: 'uk',
//       label: 'London',
//     },
//     {
//       value: 'uk',
//       label: 'Sale',
//     },
//     {
//       value: 'nz',
//       label: 'AAA',
//     },
//   ]

//   const BlockchainOptions = [
//     {
//       id: 1,
//       name: 'Ethereum',
//       value: 'ethereum',
//       // icon: <Ethereum />,
//     },
//     {
//       id: 2,
//       name: 'Flow',
//       value: 'flow',
//       // icon: <Flow />,
//     },
//   ];

//   const [blockchain, setBlockChain] = useState(BlockchainOptions[0]);

//   return (<div className="mb-8">
//     <InputLabel title="Blockchain" />
//     <div className="relative">
//       <Listbox value={blockchain} onChange={setBlockChain}>
//         <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
//           <div className="flex items-center">
//             {/* <span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span> */}
//             {blockchain.name}
//           </div>
//           <ChevronDown />
//         </Listbox.Button>
//         <Transition
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
//             {BlockchainOptions.map((option) => (
//               <Listbox.Option key={option.id} value={option}>
//                 {({ selected }) => (
//                   <div
//                     className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${selected
//                       ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
//                       : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
//                       }`}
//                   >
//                     <span className="ltr:mr-2 rtl:ml-2">
//                       {/* {option.icon} */}
//                     </span>
//                     {option.name}
//                   </div>
//                 )}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Transition>
//       </Listbox>
//     </div>
//   </div>)
// }

export function Filters() {
  const [status, setStatus] = useState("regalo");
  return (
    <>
      <Collapse label="Search Type" initialOpen>
        <Status plan={status} handleChange={setStatus} />
      </Collapse>
      {status === "regalo" ? (
        <>
          <Collapse label="Regalo" initialOpen>
            <Regalo />
          </Collapse>
          <Collapse label="Price Range" initialOpen>
            <PriceRange />
          </Collapse>
        </>
      ) : (
        <Collapse label="Price Range" initialOpen>
          <PriceRange />
        </Collapse>
      )}
      <Collapse label="Region" initialOpen>
        <Region />
      </Collapse>
      <Collapse label="Projects" initialOpen>
        <CollectionSelect onSelect={(value) => console.log(value)} />
      </Collapse>
    </>
  );
}

export default function DrawerFilters() {
  const { closeDrawer } = useDrawer();
  return (
    <div className="relative w-full max-w-full bg-white dark:bg-dark xs:w-80">
      <div className="flex h-20 items-center justify-between overflow-hidden px-6 py-4">
        <h2 className="text-xl font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Filters
        </h2>
        <Button
          shape="circle"
          color="white"
          onClick={closeDrawer}
          className="dark:bg-light-dark"
        >
          <Close className="h-auto w-3" />
        </Button>
      </div>
      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-20 pt-1">
          <Filters />
        </div>
      </Scrollbar>
      <div className="absolute bottom-4 left-0 z-10 w-full px-6">
        <Button fullWidth onClick={closeDrawer}>
          DONE
        </Button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Transition } from '@/components/ui/transition';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Uploader from '@/components/ui/forms/uploader';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Flow } from '@/components/icons/flow';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
import Preview from '@/components/create-nft/nft-preview';

//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import PriceType from '@/components/create-nft/price-types-props';

const BlockchainOptions = [
  {
    id: 1,
    name: 'Ethereum',
    value: 'ethereum',
    icon: <Ethereum />,
  },
  {
    id: 2,
    name: 'Flow',
    value: 'flow',
    icon: <Flow />,
  },
];

const EntityOptions = [
  {
    id: 1,
    name: 'Personal',
    value: 'personal',
    // icon: <Ethereum />,
  },
  {
    id: 2,
    name: 'Company or NPOs/NGOs',
    value: 'company',
    // icon: <Flow />,
  },
];

const projects = [
  {
    id: 1,
    name: 'project 1',
    value: 'project1'
  },
  {
    id: 2,
    name: 'project 2',
    value: 'project2'
  }
]

export default function CreateNFT() {
  let [publish, setPublish] = useState(true);
  let [explicit, setExplicit] = useState(false);
  let [unlocked, setUnlocked] = useState(false);
  let [priceType, setPriceType] = useState('fixed');
  let [blockchain, setBlockChain] = useState(BlockchainOptions[0]);
  let [entityType, setEntityType] = useState(EntityOptions[0]);
  let [vote, setVote] = useState(true);
  let [rfp, setRfp] = useState(true);
  let [project, setProject] = useState(projects[0]);

  return (
    <>
      <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
          <div className="col-span-3 flex items-center justify-between lg:col-span-2">
            <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
              Create New Project
            </h2>
            <Preview />
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* File uploader */}
            <div className="mb-8">
              <InputLabel title="Upload file" important />
              <Uploader />
            </div>

            {/* NFT price type */}
            <div className="flex items-center justify-between gap-4">
              {/* <InputLabel
                title="Put on marketplace"
                subTitle="Enter price to allow users instantly purchase your NFT"
              /> */}
              {/* <div className="shrink-0">
                <Switch checked={publish} onChange={() => setPublish(!publish)}>
                  <div
                    className={cn(
                      publish
                        ? 'bg-brand dark:!bg-white'
                        : 'bg-gray-200 dark:bg-gray-700',
                      'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                    )}
                  >
                    <span
                      className={cn(
                        publish
                          ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                          : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                        'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                      )}
                    />
                  </div>
                </Switch>
              </div> */}
            </div>
            {publish && <PriceType value={priceType} onChange={setPriceType} />}
          </div>

          <div className="hidden flex-col lg:flex">
            {/* NFT preview */}
            <InputLabel title="Preview" />
            <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
              <div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
                <Avatar
                  size="sm"
                  image={AuthorImage}
                  alt="Cameronwilliamson"
                  className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
                />
                @Cameronwilliamson
              </div>
              <div className="relative block w-full">
                <Image
                  src={NFT1}
                  placeholder="blur"
                  width={700}
                  height={700}
                  alt="Pulses of Imagination #214"
                />
              </div>
              <div className="p-5">
                <div className="text-sm font-medium text-black dark:text-white">
                  Pulses Of Imagination #214
                </div>
                <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  0.40 ETH
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          priceType == "fixed"
            ?
            <>
              {/* Explicit content */}
              <div className="mb-8">
                <ToggleBar
                  title="Mint ERC20"
                  subTitle="Be identified by country search. (recommended for potential partners)"
                  icon={<Warning />}
                  checked={explicit}
                  onChange={() => setExplicit(!explicit)}
                />
              </div>

              {/* Price */}
              <div className="mb-8">
                <InputLabel title="Pre Mint- ERC20" important />
                <Input
                  min={0}
                  type="number"
                  placeholder="Pre Mint- ERC20 to represent the fees to bid and to create RFP"
                  inputClassName="spin-button-hidden"
                />
              </div>

              {/* Name */}
              <div className="mb-8">
                <InputLabel title="Project Name" important />
                <Input type="text" placeholder="Project Name" />
              </div>

              {/* External link */}
              <div className="mb-8">
                <InputLabel
                  title="External link"
                  subTitle="We will include a link to this URL on this item's detail page, so that users can click to learn more about it."
                />
                <Input type="text" placeholder="https://yoursite.io/item/123" />
              </div>

              {/* Description */}
              <div className="mb-8">
                <InputLabel
                  title="Description"
                  subTitle="The description will be included on the item's detail page underneath its image."
                />
                <Textarea placeholder="Provide a detailed description of your item" />
              </div>

              {/* Unlockable content */}
              <div className="mb-3">
                <ToggleBar
                  title="Be identified by country search. (recommended for potential partners)"
                  subTitle="Include unlockable content that can only be revealed by the owner of the item."
                  icon={<Unlocked />}
                  checked={unlocked}
                  onChange={() => setUnlocked(!unlocked)}
                >
                  {unlocked && (
                    <Textarea placeholder="Enter content (access key, code to redeem, link to a file, etc.)" />
                  )}
                </ToggleBar>
              </div>

              {/* Supply */}
              <div className="mb-8">
                <InputLabel
                  title="Supply"
                  subTitle="The number of items that can be minted."
                />
                <Input type="number" placeholder="1" disabled />
              </div>

              {/* Blockchain */}
              <div className="mb-8">
                <InputLabel title="Blockchain" />
                <div className="relative">
                  <Listbox value={blockchain} onChange={setBlockChain}>
                    <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                      <div className="flex items-center">
                        <span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span>
                        {blockchain.name}
                      </div>
                      <ChevronDown />
                    </Listbox.Button>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                        {BlockchainOptions.map((option) => (
                          <Listbox.Option key={option.id} value={option}>
                            {({ selected }) => (
                              <div
                                className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${selected
                                  ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                  }`}
                              >
                                <span className="ltr:mr-2 rtl:ml-2">
                                  {option.icon}
                                </span>
                                {option.name}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </Listbox>
                </div>
              </div>
            </>
            :

            priceType == "bids"
              ?
              <>
                {/* Name */}
                <div className="mb-8">
                  <InputLabel title="Project Name" important />
                  <Input type="text" placeholder="Project Name" />
                </div>

                {/* Description */}
                <div className="mb-8">
                  <InputLabel
                    title="Description"
                    subTitle="The description will be included on the item's detail page underneath its image."
                  />
                  <Textarea placeholder="Provide a detailed description of your item" />
                </div>

                {/* Establishment location */}
                <div className="mb-8">
                  <InputLabel
                    title="Establishment location"
                  // subTitle="The description will be included on the item's detail page underneath its image."
                  />
                  <Input type="text" placeholder="Establishment location" />
                </div>

                {/* Entity Type */}
                <div className="mb-8">
                  <InputLabel title="Entity Type" />
                  <div className="relative">
                    <Listbox value={entityType} onChange={setEntityType}>
                      <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                        <div className="flex items-center">
                          {/* <span className="ltr:mr-2 rtl:ml-2">{entityType.icon}</span> */}
                          {entityType.name}
                        </div>
                        <ChevronDown />
                      </Listbox.Button>
                      <Transition
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                          {EntityOptions.map((option) => (
                            <Listbox.Option key={option.id} value={option}>
                              {({ selected }) => (
                                <div
                                  className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${selected
                                    ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                    }`}
                                >
                                  {/* <span className="ltr:mr-2 rtl:ml-2">
                                  {option.icon}
                                </span> */}
                                  {option.name}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
                </div>
                {entityType.value == "personal"
                  ?
                  <>
                    {/* Full Name */}
                    <div className="mb-8">
                      <InputLabel
                        title="Full Name"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Full Name" />
                    </div>

                    {/* Email Account */}
                    <div className="mb-8">
                      <InputLabel
                        title="Email Account"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Email Account" />
                    </div>

                    {/* DOB */}
                    <div className="mb-8">
                      <InputLabel
                        title="DOB"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="DOB" />
                    </div>

                    {/* Country Of residence */}
                    <div className="mb-8">
                      <InputLabel
                        title="Country Of residence"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Country Of residence" />
                    </div>
                  </>
                  :
                  <>
                    {/* Company Name */}
                    <div className="mb-8">
                      <InputLabel
                        title="Company Name"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Company Name" />
                    </div>

                    {/* Business Email */}
                    <div className="mb-8">
                      <InputLabel
                        title="Business Email"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Business Email" />
                    </div>

                    {/* Domain */}
                    <div className="mb-8">
                      <InputLabel
                        title="Domain"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Domain" />
                    </div>

                    {/* Country Of registration */}
                    <div className="mb-8">
                      <InputLabel
                        title="Country Of registration"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Country Of registration" />
                    </div>
                    {/* Director Full Name */}
                    <div className="mb-8">
                      <InputLabel
                        title="Director Full Name"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Director Full Name" />
                    </div>

                    {/* Director Country Of residence */}
                    <div className="mb-8">
                      <InputLabel
                        title="Director Country Of residence"
                      // subTitle="The description will be included on the item's detail page underneath its image."
                      />
                      <Input type="text" placeholder="Director Country Of residence" />
                    </div>
                  </>
                }
              </>
              :
              <>
                {/* Vote */}
                <div className="mb-8">
                  <ToggleBar
                    title="Do you Want Voting, ERC20, or NFT-1155. (ON/Off)"
                    subTitle="Choose what you want"
                    icon={<Warning />}
                    checked={vote}
                    onChange={() => setVote(!vote)}
                  />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  {/* Choose Escrow Stable Coin */}
                  <div className="mb-8">
                    <InputLabel title="Choose Escrow Stable Coin" />
                    <div className="relative">
                      <Listbox value={blockchain} onChange={setBlockChain}>
                        <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                          <div className="flex items-center">
                            <span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span>
                            {blockchain.name}
                          </div>
                          <ChevronDown />
                        </Listbox.Button>
                        <Transition
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                            {BlockchainOptions.map((option) => (
                              <Listbox.Option key={option.id} value={option}>
                                {({ selected }) => (
                                  <div
                                    className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${selected
                                      ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                      }`}
                                  >
                                    {/* <span className="ltr:mr-2 rtl:ml-2">
                                  {option.icon}
                                </span> */}
                                    {option.name}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </Listbox>
                    </div>
                  </div>

                  {/* Smart Address */}
                  <div className="mb-8">
                    <InputLabel
                      title="Smart Address"
                    // subTitle="The description will be included on the item's detail page underneath its image."
                    />
                    <Input type="text" placeholder="Smart Address" />
                  </div>
                </div>

                {/* RFP */}
                <div className="mb-8">
                  <ToggleBar
                    title="Do you Want RFP for erc20 Fees?(On/Off)"
                    subTitle="Choose RFP Utility Access Fees Token"
                    icon={<Warning />}
                    checked={rfp}
                    onChange={() => setRfp(!rfp)}
                  />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  {/* Choose Escrow Stable Coin */}
                  <div className="mb-8">
                    <InputLabel title="Choose Escrow Stable Coin" />
                    <div className="relative">
                      <Listbox value={project} onChange={setProject}>
                        <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                          <div className="flex items-center">
                            {/* <span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span> */}
                            {project.name}
                          </div>
                          <ChevronDown />
                        </Listbox.Button>
                        <Transition
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                            {projects.map((option) => (
                              <Listbox.Option key={option.id} value={option}>
                                {({ selected }) => (
                                  <div
                                    className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${selected
                                      ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                      }`}
                                  >
                                    {/* <span className="ltr:mr-2 rtl:ml-2">
                                  {option.icon}
                                </span> */}
                                    {option.name}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </Listbox>
                    </div>
                  </div>

                  {/* Smart Contract Address */}
                  <div className="mb-8">
                    <InputLabel
                      title="Smart Contract Address"
                    // subTitle="The description will be included on the item's detail page underneath its image."
                    />
                    <Input type="text" placeholder="Smart Contract Address" />
                  </div>
                </div>
              </>
        }
        <Button shape="rounded">CREATE</Button>
      </div>
    </>

  );
}

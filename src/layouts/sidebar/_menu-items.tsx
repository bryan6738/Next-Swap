import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';
import { BlogIcon } from '@/components/icons/blog';

export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Blog',
    icon: <BlogIcon />,
    href: routes.blog,
  },
  
  {
    name: 'Projects Tokenomics',
    icon: <LivePricing />,
    href: routes.livePricing,
  },
  {
    name: 'Farm',
    icon: <FarmIcon />,
    href: routes.farms,
  },
  {
    name: 'Swap',
    icon: <ExchangeIcon />,
    href: routes.swap,
  },
  {
    name: 'Buy BTRT',
    icon: <PoolIcon />,
    href: routes.liquidity,
  },
  {
    name: 'Projects',
    icon: <CompassIcon />,
    href: routes.search,
    dropdownItems: [
      {
        name: 'Explore Projects',
        icon: <CompassIcon />,
        href: routes.search,
      },
      {
        name: 'Create Project',
        icon: <PlusCircle />,
        href: routes.createNft,
      },
      {
        name: 'Project Details',
        icon: <DiskIcon />,
        href: routes.nftDetails,
      },
    ],
  },
  {
    name: 'BitRegalo Partners',
    icon: <CompassIcon />,
    // href: routes.search,
    dropdownItems: [
      {
        name: 'Explore Partners',
        icon: <CompassIcon />,
        // href: routes.search,
      },
      {
        name: 'Become a Partners',
        icon: <PlusCircle />,
        // href: routes.createNft,
      },
      {
        name: 'KYC Registry',
        icon: <DiskIcon />,
        // href: routes.nftDetails,
      },
    ],
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  {
    name: 'Vote',
    icon: <VoteIcon />,
    href: routes.vote,
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.vote,
      },
      {
        name: 'Vote with pools',
        href: routes.proposals,
      },
      {
        name: 'Create proposal',
        href: routes.createProposal,
      },
    ],
  },
];

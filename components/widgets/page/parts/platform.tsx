'use client'

import Image from 'next/image'

import { UsualType } from "@/lib/schema";
import { Laptop } from 'lucide-react';
import NintendoSwitchIcon from '@/components/widgets/icons/nintendo-switch-svgrepo-com.svg'
import PS from '@/components/widgets/icons/playstation-svgrepo-com.svg'
import Xbox360 from '@/components/widgets/icons/xbox-9-logo-svgrepo-com.svg'
import Android from '@/components/widgets/icons/android-svgrepo-com.svg'
import MacOs from '@/components/widgets/icons/macos-svgrepo-com.svg'
import Linux from '@/components/widgets/icons/linux-svgrepo-com.svg'
import DreamCast from '@/components/widgets/icons/dreamcast-control-for-games-svgrepo-com.svg'
import Wii from '@/components/widgets/icons/wii-logotype-svgrepo-com.svg'
import GameCube from '@/components/widgets/icons/nintendo-gamecube-svgrepo-com.svg'
import Nintendo64 from '@/components/widgets/icons/nintendo-games-console-svgrepo-com.svg'
import { JSX, useEffect, useState } from 'react';

export default function Platforms({ platformList }: { platformList: { platform: UsualType }[] }) {
  const [icons, setIcons] = useState<{[key: string]: JSX.Element;}>({})

  useEffect(() => {
    let iconMapping = {}
    platformList.forEach(({ platform }: { platform: UsualType }) => {
      const { name, slug } = platform
      switch (slug) {
        case 'xbox360':
        case 'xbox-series-x':
        case 'xbox-one': {
          iconMapping = {
            ...iconMapping,
            xbox: <Image title={name} className='w-[25px] h-[25px]' src={Xbox360} alt={name} />
          }
          break;
        }
        case 'playstation5':
        case 'playstation4':
        case 'playstation3':
        case 'playstation2': 
        case 'playstation1':
        case 'ps-vita': {
          iconMapping = {
            ...iconMapping,
            ps: <Image title={name} className='w-[25px] h-[25px]' src={PS} alt={name} />
          }
          break;
        }
        case 'nintendo-switch': {
          iconMapping = {
            ...iconMapping,
            switch: <Image title={name} className='w-[25px] h-[25px]' src={NintendoSwitchIcon} alt={name} />
          }
          break;
        }
        case 'pc': {
          iconMapping = {
            ...iconMapping,
            pc: <Laptop className='w-[25px] h-[25px]' />
          }
          break;
        }
        case 'android': {
          iconMapping = {
            ...iconMapping,
            android: <Image title={name} className='w-[25px] h-[25px]' src={Android} alt={name} />
          }
          break;
        }
        case 'macos': {
          iconMapping = {
            ...iconMapping,
            macos: <Image title={name} className='w-[25px] h-[25px]' src={MacOs} alt={name} />
          }
          break;
        }
        case 'linux': {
          iconMapping = {
            ...iconMapping,
            linux: <Image title={name} className='w-[25px] h-[25px]' src={Linux} alt={name} />
          }
          break;
        }
        case 'dreamcast': {
          iconMapping = {
            ...iconMapping,
            dreamcast: <Image title={name} className='w-[25px] h-[25px]' src={DreamCast} alt={name} />
          }
          break;
        }
        case 'gamecube': {
          iconMapping = {
            ...iconMapping,
            gamecube: <Image title={name} className='w-[25px] h-[25px]' src={GameCube} alt={name} /> }
          break;
        }
        case 'wii':
        case 'wii-u': {
          iconMapping = {
            ...iconMapping,
            wii: <Image title={name} className='w-[25px] h-[25px]' src={Wii} alt={name} /> }
          break;
        }
        case 'nintendo-64': {
          iconMapping = {
            ...iconMapping,
            n64: <Image title={name} className='w-[25px] h-[25px]' src={Nintendo64} alt={name} />
          }
          break;
        }
      }
    })
    setIcons(iconMapping)
  }, [platformList])
  
  return (
    <div className="flex flex-wrap gap-1">
      {Object.entries(icons).map(([key, IconComponent]) => (
        <div key={key} className="icon-wrapper">
          {IconComponent}
        </div>
      ))}
    </div>
  )
}
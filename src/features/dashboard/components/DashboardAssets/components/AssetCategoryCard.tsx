import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Grid3X3, User, UserCircle, ImageIcon, Volume2 } from 'lucide-react'
export interface AssetCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

const iconMap = {
  Grid3X3: Grid3X3,
  User: User,
  UserCircle: UserCircle,
  Image: ImageIcon,
  Volume2: Volume2
}

interface AssetCategoryCardProps {
  category: AssetCategory
  isSelected: boolean
  onClick: () => void
}

export function AssetCategoryCard({
  category,
  isSelected,
  onClick
}: AssetCategoryCardProps) {
  const IconComponent =
    iconMap[category.icon as keyof typeof iconMap] || Grid3X3

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <IconComponent className='h-5 w-5 text-muted-foreground' />
            <CardTitle className='text-lg'>{category.name}</CardTitle>
          </div>
          <Badge variant='secondary'>{category.count}</Badge>
        </div>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

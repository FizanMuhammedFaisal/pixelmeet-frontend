import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TagMatchModeProps {
  tagMatchMode: 'all' | 'any'
  onValueChange: (value: 'all' | 'any') => void
}

export function TagMatchMode({
  tagMatchMode,
  onValueChange
}: TagMatchModeProps) {
  return (
    <Card className='bg-card border-border text-card-foreground h-full'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium'>Tag Match Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={tagMatchMode}
          onValueChange={onValueChange}
          className='flex flex-col space-y-2'
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='any'
              id='match-any'
              className='border-input text-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary'
            />
            <Label htmlFor='match-any' className='text-foreground'>
              Match Any
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='all'
              id='match-all'
              className='border-input text-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary'
            />
            <Label htmlFor='match-all' className='text-foreground'>
              Match All
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

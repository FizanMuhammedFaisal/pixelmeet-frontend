import { motion } from 'motion/react'

interface TagMatchModeProps {
   tagMatchMode: 'all' | 'any'
   onValueChange: (value: 'all' | 'any') => void
}

export function TagMatchMode({ tagMatchMode, onValueChange }: TagMatchModeProps) {
   return (
      <div className="space-y-2">
         <label className="text-sm font-medium leading-none text-foreground">Tag Match Mode</label>
         <div className="flex gap-1 bg-card p-1 rounded-md">
            <RadioOption
               value="any"
               label="Any"
               isSelected={tagMatchMode === 'any'}
               onSelect={() => onValueChange('any')}
            />
            <RadioOption
               value="all"
               label="All"
               isSelected={tagMatchMode === 'all'}
               onSelect={() => onValueChange('all')}
            />
         </div>
      </div>
   )
}

interface RadioOptionProps {
   value: string
   label: string
   isSelected: boolean
   onSelect: () => void
}

function RadioOption({ value, label, isSelected, onSelect }: RadioOptionProps) {
   return (
      <motion.button
         onClick={onSelect}
         className={`
        flex-1 flex items-center justify-center rounded-md px-3 py-1.5 
        text-sm font-medium transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${
           isSelected
              ? 'bg-background border-2 border-primary text-foreground shadow-sm'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
        }
      `}
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
         layout
      >
         {label}
      </motion.button>
   )
}

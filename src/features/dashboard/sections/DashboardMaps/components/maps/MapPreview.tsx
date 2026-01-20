import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Map } from '@/shared/types'
import {
   Edit3,
   MoreHorizontal,
   Copy,
   Share2,
   Trash2,
   Eye,
   EyeOff,
   Download,
   Star,
} from 'lucide-react'

type Props = {
   map: Map
   handleMapEdit: (id: string) => void
}

function MapPreview({ map, handleMapEdit }: Props) {
   return (
      <Card className="group flex flex-col hover:shadow-lg overflow-hidden rounded-base shadow-sm transition-all duration-300 border border-border bg-card h-full">
         <CardHeader className="relative p-5 pb-4">
            <div className="flex items-start justify-between gap-3">
               <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl font-semibold leading-tight truncate mb-3">
                     {map.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                     <Badge variant="secondary" className="text-xs font-medium">
                        {map.category}
                     </Badge>
                     {map.isPublic ? (
                        <Badge
                           variant="outline"
                           className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        >
                           <Eye className="w-3 h-3 mr-1" />
                           Public
                        </Badge>
                     ) : (
                        <Badge
                           variant="outline"
                           className="border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        >
                           <EyeOff className="w-3 h-3 mr-1" />
                           Private
                        </Badge>
                     )}
                     {map.isTemplate && (
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200 text-xs font-medium dark:bg-violet-950 dark:text-violet-300">
                                    <Star className="w-3 h-3 mr-1" />
                                    Template
                                 </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p>This map is available as a template for new projects</p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     )}
                  </div>
               </div>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted/80 transition-colors duration-200"
                     >
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 z-50">
                     <DropdownMenuItem onClick={() => handleMapEdit(map.id)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Map
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </CardHeader>

         <CardContent className="flex flex-col flex-grow p-5 pt-0 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-base bg-muted/50 shadow-sm border border-border">
               <img
                  src={map.previewImageUrl}
                  alt={`Preview of ${map.name}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
               />
            </div>

            <div className="flex-grow">
               <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {map.description}
               </p>
            </div>

            <div className="space-y-2 mt-auto pt-2 border-t border-border/50">
               <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium truncate max-w-[60%]">By {map.createdBy}</span>
                  <span className="text-xs">{new Date(map.updatedAt).toLocaleDateString()}</span>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}

export default MapPreview

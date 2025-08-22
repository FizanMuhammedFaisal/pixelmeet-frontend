import { CreateMapForm } from '../CreateMapForm'

export default function CreateMapCompoent() {
   return (
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0 md:p-6 md:pt-0">
         <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Create New Map</h1>
         <div className="flex justify-center">
            <CreateMapForm />
         </div>
      </div>
   )
}

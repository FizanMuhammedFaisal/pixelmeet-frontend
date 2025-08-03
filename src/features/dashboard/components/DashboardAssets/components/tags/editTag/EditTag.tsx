import { EditTagForm } from './EditTagForm'

export default function EditTagPage() {
  const params = { id: 'df' }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-gray-950'>
      <EditTagForm tagId={params.id} />
    </main>
  )
}

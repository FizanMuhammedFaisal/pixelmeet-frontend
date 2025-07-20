import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

function AdminLogin() {
  const navigate = useNavigate()
  const handleclick = () => {
    navigate('/admin/dashboard')
  }
  return (
    <div>
      login
      <Button onClick={handleclick}>Dahsboard buton</Button>
    </div>
  )
}

export default AdminLogin

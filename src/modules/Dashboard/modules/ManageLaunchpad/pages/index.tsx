import { Card } from '@chakra-ui/react'
import { Briefcase, Building } from 'lucide-react'

const ManageLaunchpad = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        <Card className='!p-6 shadow-sm border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200' onClick={() => window.location.href = 'manage-launchpad/jobs'}>
            <div className='flex flex-col items-center text-center space-y-4'>
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
                    <Briefcase size={32} className='text-blue-600' />
                </div>
                <div>
                    <h2 className='text-lg font-semibold text-gray-800 mb-2'>Manage Jobs</h2>
                    <p className='text-gray-600 text-sm leading-relaxed'>Create, edit, and manage job postings and opportunities.</p>
                </div>
            </div>
        </Card>
        
        <Card className='!p-6 shadow-sm border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200' onClick={() => window.location.href = 'manage-launchpad/companies'}>
            <div className='flex flex-col items-center text-center space-y-4'>
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                    <Building size={32} className='text-green-600' />
                </div>
                <div>
                    <h2 className='text-lg font-semibold text-gray-800 mb-2'>Manage Companies</h2>
                    <p className='text-gray-600 text-sm leading-relaxed'>Oversee company profiles, information, and settings.</p>
                </div>
            </div>
        </Card> 
    </div>
  )
}

export default ManageLaunchpad
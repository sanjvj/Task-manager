import React from 'react'
import Sidebar from '../components/Sidebar'
import Pending from '../components/Pending'

const PendingTasks = () => {
  return (
    <div className='flex gap-5'>
      <Sidebar></Sidebar>
      <div className='flex flex-col p-5 w-full'>
      <Pending></Pending>
      </div>
    </div>
  )
}

export default PendingTasks

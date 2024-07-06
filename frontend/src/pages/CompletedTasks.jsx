import React from 'react'
import Sidebar from '../components/Sidebar'
import Completed from '../components/Completed'

const CompletedTasks = () => {
  return (
    <div className='flex gap-5'>
      <Sidebar></Sidebar>
      <div className='flex flex-col p-5 w-full'>
      <Completed></Completed>
      </div>
    </div>
  )
}

export default CompletedTasks;

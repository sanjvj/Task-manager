import React from 'react'
import AllTask from '../components/AllTask'
import Sidebar from '../components/Sidebar'
const Tasks = () => {
  return (
    <div className='flex gap-5'>
      <Sidebar />
      <div className='flex flex-col gap-5 p-5 w-full'>
        <AllTask />
        
      </div>
    </div>
  )
}

export default Tasks

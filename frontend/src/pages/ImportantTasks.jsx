import React from 'react'
import Sidebar from '../components/Sidebar'
import Important from '../components/Important'

const ImportantTasks = () => {
  return (
    <div>
      <div className='flex gap-5'>
      <Sidebar></Sidebar>
      <div className='flex flex-col p-5 w-full'>
      <Important></Important>
      </div>
    </div>
    </div>
  )
}

export default ImportantTasks

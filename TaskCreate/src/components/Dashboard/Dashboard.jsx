import React from 'react'
import Navbar from '../Navbar/Navbar'
import NoteCard from '../NoteCard/NoteCard'

const Dashboard = () => {
  return (
    <div className='h-full w-full bg-gray-600'>
      <Navbar/>
      <div className='w-full h-[90vh] overflow-scroll grid grid-cols-4 gap-5 px-15 py-2 '>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
             <NoteCard/>
      </div>
    </div>
  )
}

export default Dashboard

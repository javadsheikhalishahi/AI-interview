'use client';

import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useState } from 'react';

function LatestInterviewsList() {

    const [InterviewList, setInterviewList] = useState([]);
  return (
    <div className='my-5 p-1'>
       <h2 className='text-2xl font-bold'>Interview History</h2>
       {InterviewList?.length == 0 && <div className='p-5'>
         <Camera className='h-10 w-10 text-primary' />
         <h2 className='animate-pulse'>You haven’t created any interviews yet! 🤔</h2>
         <Button>+ Create New Interview</Button>
        </div>}
    </div>
  )
}

export default LatestInterviewsList

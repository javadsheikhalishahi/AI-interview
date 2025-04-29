'use client';

import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CandidatesList from './_components/CandidatesList';
import InterviewDetailsContainer from './_components/InterviewDetailsContainer';

function InterviewDetailsPage() {
    const {interview_id} = useParams();
    const { user } = useUser();
    const [interviewDetails,setInterviewDetails] = useState();

    useEffect(() => {
      user && GetInterviewDetails();
    },[user])
    
    const GetInterviewDetails = async () => {
        const { data, error } = await supabase
          .from('interviews')
          .select(`JobPosition,JobDescription, type, InterviewDuration, questionList, interview_id, created_at, interview-feedback(userEmail,userName,feedback,created_at)`)
          .eq('userEmail', user?.email)
          .eq('interview_id', interview_id)
          .single();
      
        if (error) {
          console.error('Error fetching interview details:', error);
        } else {
          setInterviewDetails(data);
        }
      };
      

  return (
    <div>
      <h2 className='sticky items-center text-center z-50 top-0 p-5 glassmorphism font-extrabold rounded-lg text-3xl'><p className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 animate-fadeIn'>InterviewDetails</p></h2>
      <InterviewDetailsContainer interviewDetails={interviewDetails} />
      <CandidatesList candidateList={interviewDetails?.['interview-feedback']} />
    </div>
  )
}

export default InterviewDetailsPage;

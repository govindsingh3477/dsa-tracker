import React from 'react'
import ResourcesCard from './ResourcesCard'
import ProblemCard from './ProblemCard'

export default function ProblemsWithResources({title}:{title:string}) {
  return (
    <div className='flex '>
        <ProblemCard title={title}></ProblemCard>
        <ResourcesCard></ResourcesCard>
    </div>
  )
}

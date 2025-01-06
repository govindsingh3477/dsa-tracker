import React from 'react'
import { OuterBox } from './OuterBox'

function ResourceItem({ resource }:{resource:string}) {
  return (
    <li className="text-blue-600 hover:underline cursor-pointer">
      {resource}
    </li>
  )
}

export default function ResourcesCard() {
  const resources = ['LeetCode', 'HackerRank',]; // Define resources directly in the component

  return (
    <OuterBox bgColor="bg-white-100" className="flex-1 max-w-sm" title="Useful Resources">
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <ResourceItem key={index} resource={resource} />
        ))}
      </ul>
    </OuterBox>
  )
}

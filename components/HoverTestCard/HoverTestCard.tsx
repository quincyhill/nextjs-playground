import React from 'react'
import { FolderPlus as BiFolderPlus } from 'react-bootstrap-icons'

const HoverTestCard = () => {
  return (
    <a
      href="#main-footer"
      className="group block max-w-xs mx-auto rounded-lg p-6 bg-whitering-1 ring-gray-900/5 shadow-lg space-y-3 bg-white hover:bg-sky-500 hover:ring-sky-500"
    >
      <div className="flex items-center space-x-3">
        <BiFolderPlus className="h-6 w-6 text-sky-500 group-hover:text-white" />
        <h3 className="text-gray-900 group-hover:text-white text-sm font-semibold">
          New project
        </h3>
      </div>
      <p className="text-gray-500 group-hover:text-white text-sm">
        Create a new project from a variety of starting templates.
      </p>
    </a>
  )
}

export default HoverTestCard

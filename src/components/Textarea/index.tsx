import * as React from 'react'

interface iProps {
  className: string,
  placeholder: string
}

function autoGrow (element: any): void {
  element.target.style.height = '5px'
  element.target.style.height = (element.target.scrollHeight) + 'px'
}

const textarea: React.SFC<iProps> = (props: iProps) => {
  return (
    <textarea {...props} onKeyUp={(element) => autoGrow(element)}/>
  )
}

export default textarea

import * as React from 'react'

function autoGrow(element: any): void {
  element.target.style.height = '5px'
  element.target.style.height = element.target.scrollHeight + 'px'
}

const textarea: React.SFC<React.AllHTMLAttributes<any>> = (
  props: React.AllHTMLAttributes<any>
) => {
  return <textarea {...props} onKeyUp={element => autoGrow(element)} />
}

export default textarea

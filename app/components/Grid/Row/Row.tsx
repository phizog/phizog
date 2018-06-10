import * as React from 'react'
import * as classnames from 'classnames'

interface IRow {
  style?: React.CSSProperties
  className?: string
  children?: any
  [index: string]: any // For supporting any other custom props
}

export const Row = ({ children, style, className, ...props }: IRow) => {
  return (
    <div className={classnames('row', className)} style={style} {...props}>
      {children}
    </div>
  )
}

import * as React from 'react'
import * as classnames from 'classnames'

interface ICol {
  xs?: number | string
  sm?: number | string
  md?: number | string
  lg?: number | string
  className?: string
  style?: React.CSSProperties
  children?: any
  [index: string]: any // For supporting any other custom props
}

// TODO: Support offset
// TODO: Support alignments (H/V)
export const Col = ({
  children,
  className,
  style,
  xs,
  sm,
  md,
  lg,
  ...props
}: ICol) => {
  return (
    <div
      className={classnames(
        `col-xs-${xs}`,
        `col-sm-${sm}`,
        `col-md-${md}`,
        `col-lg-${lg}`,
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

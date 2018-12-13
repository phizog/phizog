import styled from 'styled-components'
import variables from '../css/variables'

export const Button = styled.button`
  padding: 0px 8px 1px 5px
  border: 1px solid transparent;
  border-color: #c2c0c2 #c2c0c2 #a19fa1;
  color: ${variables.buttonColor}
  border-radius: ${variables.borderRadius}
  background: linear-gradient(to top, #f1f1f1, #fcfcfc);
  box-shadow: 0 1px 1px rgba(0,0,0,.06);
  outline: 0
  svg {
    vertical-align: middle
  }
  span {
    vertical-align: middle
    font-size: .75em
    margin-left: 3px
    font-weight: 500
  }
  &:hover {
    background: #ddd
  }
  &:active {
    background: #6d6c6d
    border-color: #6d6c6d
    color: #fff
    box-shadow: 0
    svg {
      fill: #fff
    }
  }
  &.transparent {
    background: none
    border: 0
    box-shadow: none;
    &:hover {
      color: #fff
      svg {
        fill: #fff
      }
    }
  }
  &.close_tab {
    svg {
      fill: ${variables.buttonColor}
    }
  }
`

export const GroupButton = styled.div`
  button {
    border-radius: 0
    &:first-child {
      border-radius: ${variables.borderRadius} 0 0 ${variables.borderRadius};
    }
    &:last-child {
      border-radius: 0 ${variables.borderRadius} ${variables.borderRadius} 0;
    }
  }
`

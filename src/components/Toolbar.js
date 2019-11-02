import React from 'react'
import styled from '@emotion/styled'
import { Play as PlayIcon, Forwards as ForwardsIcon } from '@chrisjpatty/tang-ui-icons'

export default ({ onRun, onNextRequested, passed, isTesting }) => {

  return (
    <Wrapper>
      <PullRight>
        <Button onClick={passed ? onNextRequested : onRun} passed={passed}>
          {
            !passed ?
            <FlexRow>
              {isTesting ? <StopIcon /> : <PlayIcon />} {isTesting ? 'Testing' : 'Run & Test'}
            </FlexRow>
            :
            <FlexRow>
              Next Challenge <ForwardsIcon />
            </FlexRow>
          }
        </Button>
      </PullRight>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  background: ${props => props.theme.primary.color};
  border-top: 2px solid #161714;
  padding: 4px 12px;
  align-items: center;
  z-index: 9;
`

const PullRight = styled('div')`
  margin-left: auto;
`

const Button = styled('button')`
  background: ${props => {
    switch (props.passed) {
      case true: return props.theme.success.color;
      // case false: return props.theme.danger.dark;
      default: return props.theme.primary.medium
    }
  }};
  color: rgba(255,255,255,.8);
  border: none;
  padding: 8px 12px ${({passed}) => passed ? 8 : 10}px 12px;
  text-transform: uppercase;
  font-weight: 500;
  svg{
    width: ${props => props.passed ? 20 : 12}px;
    margin-right: ${props => props.passed ? 0 : 10}px;
    margin-left: ${props => props.passed ? 10 : 0}px;
    margin-top: -1px;
  }
  &:hover{
    background: ${props => {
      switch (props.passed) {
        case true: return props.theme.success.light;
        // case false: return props.theme.danger.medium;
        default: return props.theme.primary.light
      }
    }};;
  }
  &:focus{
    outline: 2px rgba(255,255,255,.2);
  }
`

const FlexRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StopIcon = styled('div')`
  width: 12px;
  height: 12px;
  background: currentcolor;
  border-radius: 2px;
  margin-right: 10px;
`

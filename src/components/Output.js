import React from 'react'
import styled from '@emotion/styled'
import prettyFormat from 'pretty-format'

export default ({ output = [], result }) => {

  return (
    <Wrapper>
      <Title>Console Output:</Title>
      <Logs>
        {
          output.map(log => (
            <Log type={log.type}>
              {typeof log.message !== "string" ? prettyFormat(log.message) : log.message}
            </Log>
          ))
        }
        {
          result ?
          <React.Fragment>
            <Log>Result:</Log>
            <Log></Log>
            <Log>{prettyFormat(result)}</Log>
          </React.Fragment>
          : null
        }
      </Logs>
    </Wrapper>
  )
}

const Wrapper = styled('section')`
  display: flex;
  flex-direction: column;
  width: 30%;
  flex: 1 1 auto;
  height: 100%;
  background: ${props => props.theme.primary.color};
  color: #eef1e1;
  padding: 15px;
  border-left: 2px solid #161714;
`

const Title = styled('h1')`
  font-size: 11px;
  color: rgba(255,255,255,.4);
`

const Logs = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
`

const Log = styled('div')`
  color: ${props => {
    switch (props.type) {
      case 'error': return 'rgb(252, 101, 76)';
      case 'warn': return 'rgb(245, 204, 102)';
      case 'log':
      default:
        return 'rgb(229, 238, 245)';
  }}};
  white-space: pre-wrap;
`

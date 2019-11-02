import React from 'react'
import styled from '@emotion/styled'
import prettyFormat from 'pretty-format'

export default ({ output = [], result, passed }) => {
  const wrapper = React.useRef();

  React.useEffect(() => {
    wrapper.current.scrollTop = wrapper.current.scrollHeight;
  }, [output, result])

  return (
    <Wrapper ref={wrapper}>
      <Title>Console Output:</Title>
      <Logs>
        {
          output.map((log, i) => (
            <Log type={log.type} key={i}>
              {typeof log.message !== "string" ? prettyFormat(log.message) : log.message}
            </Log>
          ))
        }
        {
          result || passed !== null ?
          <React.Fragment>
            {output.length ? <Log>{' '}</Log> : null}
            <Log>Result: {prettyFormat(result)}</Log>
          </React.Fragment>
          : null
        }
        {
          passed === true &&
          <SuccessMessage>
            Nice! You've passed this one. Click "Next Challenge" to move on.
          </SuccessMessage>
        }
        {
          passed === false &&
          <FailedMessage>
            Looks like your answer wasn't quite right. Why not give it another shot!
          </FailedMessage>
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
  overflow: auto;
`

const SuccessMessage = styled('p')`
  color: ${({theme}) => theme.success.light};
`

const FailedMessage = styled('p')`
  color: rgb(252, 101, 76);
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

import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'

export default ({ instructions, title }) => {

  return (
    <Wrapper>
      {/* <SectionIndicator>Instructions:</SectionIndicator> */}
      <Title>{title}</Title>
      <ReactMarkdown source={instructions} />
    </Wrapper>
  )
}

const Wrapper = styled('aside')`
  display: flex;
  width: 20%;
  max-width: 300px;
  min-width: 200px;
  flex: 0 0 auto;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.primary.color};
  color: #eef1e1;
  padding: 15px;
  border-right: 2px solid #161714;
  font-weight: 300;
  font-size: 14px;
  overflow-y: auto;
  p{
    margin: 5px 0px;
    line-height: 1.4;
  }
  pre, code{
    background: ${({theme}) => theme.primary.medium};
    padding: 3px 4px 5px 4px;
    border-radius: 2px;
    font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    color: ${({theme}) => theme.markdownCode.color}
  }
  pre code {
    background: none;
    padding: 0px;
  }
  ul, ol{
    padding-left: 25px;
  }
  ul li, ol li{
    margin-bottom: 6px;
    &:last-child{
      margin-bottom: 0px;
    }
  }
`

// const SectionIndicator = styled('h3')`
//   font-size: 11px;
//   color: rgba(255,255,255,.4);
//   margin: 0px;
// `

const Title = styled('h1')`
  font-size: 18px;
  margin: 0px;
  margin-bottom: 10px;
  ${'' /* margin-top: 10px; */}
  border-bottom: 1px solid rgba(255,255,255,.2);
  padding-bottom: 10px;
  font-weight: 500;
`

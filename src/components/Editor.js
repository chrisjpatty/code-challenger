import React from 'react'
import styled from '@emotion/styled'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export default ({code, onCodeChanged, innerRef}) => {

  return (
    <Wrapper>
      <AceEditor
        mode="javascript"
        theme="monokai"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        onChange={onCodeChanged}
        value={code}
        width="100%"
        height="100%"
        tabSize={2}
        ref={innerRef}
      />
    </Wrapper>
  )
}

const Wrapper = styled('section')`
  display: flex;
  flex: 1 1 auto;
  width: 50%;
`

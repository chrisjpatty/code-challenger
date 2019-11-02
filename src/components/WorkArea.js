import React from "react";
import styled from "@emotion/styled";
import InstructionsSidebar from "./InstructionsSidebar";
import Editor from "./Editor";
import Output from "./Output";
import Toolbar from "./Toolbar";
import { executeCode, testResult } from "../runtime";
import CHALLENGES from "../challenges";
import { useHistory, useLocation } from 'react-router-dom'

export default () => {
  const [code, setCode] = React.useState();
  const [output, setOutput] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const [passed, setPassed] = React.useState(null);
  const [challengeIndex, setChallengeIndex] = React.useState(0);
  const history = useHistory();
  const location = useLocation();

  const currentChallenge = CHALLENGES[challengeIndex];

  const startCodeTest = () => {
    const { logs, result, crashed } = executeCode(code);
    setOutput(logs);
    if(!crashed){
      const passed = testResult(result, currentChallenge, code)
      setResult(result);
      setPassed(passed);
    }else{
      setPassed(false);
    }
  };

  React.useEffect(() => {
    setCode(currentChallenge.startCode)
    setResult(null);
    setOutput([]);
    setPassed(null);
    history.replace(`${location.pathname}?challenge=${challengeIndex}`)
  }, [currentChallenge, challengeIndex]) //eslint-disable-line react-hooks/exhaustive-deps

  const setNextChallengeIndex = () => {
    if(challengeIndex + 1 >= CHALLENGES.length){
      alert("Thanks for playing! You've finished all of the available challenges. Check back later for more!")
      setChallengeIndex(0)
    }else{
      setChallengeIndex(i => i+1)
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const startIndex = parseInt(params.get("challenge"), 10);
    if(startIndex !== undefined && !isNaN(startIndex) && startIndex < CHALLENGES.length){
      setChallengeIndex(startIndex)
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <PageWrapper>
        <InstructionsSidebar
          instructions={currentChallenge.instructions}
          title={currentChallenge.title}
          number={challengeIndex + 1}
        />
        <Editor code={code} onCodeChanged={setCode} />
        <Output output={output} result={result} passed={passed} />
      </PageWrapper>
      <Toolbar onRun={startCodeTest} onNextRequested={setNextChallengeIndex} passed={passed} />
    </React.Fragment>
  );
};

const PageWrapper = styled("main")`
  display: flex;
  width: 100vw;
  height: calc(100vh - 60px);
`;

import React from "react";
import styled from "@emotion/styled";
import InstructionsSidebar from "./InstructionsSidebar";
import Editor from "./Editor";
import Output from "./Output";
import Toolbar from "./Toolbar";
import { executeCode, testResult } from "../runtime";
import CHALLENGES from "../challenges";

export default () => {
  const [code, setCode] = React.useState();
  const [output, setOutput] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const [passed, setPassed] = React.useState(null);
  const [challengeIndex, setChallengeIndex] = React.useState(1);

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
  }, [currentChallenge])

  const setNextChallengeIndex = () => {
    if(challengeIndex + 1 >= CHALLENGES.length){
      // TODO: Handle end of challenges
    }else{
      setChallengeIndex(i => i+1)
    }
  }

  return (
    <React.Fragment>
      <PageWrapper>
        <InstructionsSidebar
          instructions={currentChallenge.instructions}
          title={currentChallenge.title}
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
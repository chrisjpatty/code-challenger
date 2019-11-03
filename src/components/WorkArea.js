import React from "react";
import styled from "@emotion/styled";
import InstructionsSidebar from "./InstructionsSidebar";
import Editor from "./Editor";
import Output from "./Output";
import Toolbar from "./Toolbar";
import { executeCode, testResult } from "../runtime";
import CHALLENGES from "../challenges";
import { useHistory, useLocation } from 'react-router-dom'
import { setCodeCache } from '../utilities'
import ls from 'local-storage'

export default () => {
  const [code, setCode] = React.useState();
  const [output, setOutput] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const [passed, setPassed] = React.useState(null);
  const [challengeIndex, setChallengeIndex] = React.useState(0);
  const [isTesting, setIsTesting] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  const currentChallenge = CHALLENGES[challengeIndex];

  const resetOutput = () => {
    setResult(null);
    setOutput([]);
    setPassed(null);
  }

  const startCodeTest = () => {
    setIsTesting(true);
    resetOutput();
    executeCode(code).then(({ logs, result, crashed }) => {
      setOutput(logs);
      if (!crashed) {
        const passed = testResult(result, currentChallenge, code);
        setResult(() => result);
        setPassed(passed);
      } else {
        setPassed(false);
      }
      setIsTesting(false);
    });
  };

  const cacheAndSetCode = code => {
    setCode(code)
    setCodeCache(code, currentChallenge.id)
  }

  const resetChallenge = () => {
    resetOutput();
    cacheAndSetCode(currentChallenge.startCode);
  }

  React.useEffect(() => {
    const cachedCode = ls.get(`CODE_CACHE_${currentChallenge.id}`)
    setCode(cachedCode ? cachedCode : currentChallenge.startCode)
    resetOutput();
    history.replace(`${location.pathname}?challenge=${challengeIndex + 1}`)
  }, [currentChallenge, challengeIndex]) //eslint-disable-line react-hooks/exhaustive-deps

  const setNextChallengeIndex = () => {
    if(challengeIndex + 1 >= CHALLENGES.length){
      alert("Thanks for playing! You've finished all of the available challenges. Check back later for more!")
      setChallengeIndex(0)
    }else{
      setChallengeIndex(i => i+1)
    }
  }

  const setPreviousChallengeIndex = () => {
    setChallengeIndex(i => i - 1)
  }

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const startIndex = parseInt(params.get("challenge"), 10);
    if (
      startIndex !== undefined &&
      !isNaN(startIndex) &&
      startIndex <= CHALLENGES.length &&
      startIndex !== 0
    ) {
      setChallengeIndex(startIndex - 1);
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
        <Editor code={code} onCodeChanged={cacheAndSetCode} />
        <Output output={output} result={result} passed={passed} isTesting={isTesting} />
      </PageWrapper>
      <Toolbar
        onRun={startCodeTest}
        onPrevRequested={setPreviousChallengeIndex}
        onNextRequested={setNextChallengeIndex}
        onResetRequested={resetChallenge}
        passed={passed}
        isTesting={isTesting}
        canGoBack={challengeIndex !== 0}
      />
    </React.Fragment>
  );
};

const PageWrapper = styled("main")`
  display: flex;
  width: 100vw;
  height: calc(100vh - 60px);
`;

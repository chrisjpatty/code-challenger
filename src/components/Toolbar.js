import React from "react";
import styled from "@emotion/styled";
import {
  Play as PlayIcon,
  Forwards as ForwardsIcon,
  Back as BackIcon,
  Revert as RevertIcon
} from "@chrisjpatty/tang-ui-icons";

export default ({
  onRun,
  onPrevRequested,
  onNextRequested,
  onResetRequested,
  passed,
  isTesting,
  canGoBack,
  canGoForward
}) => {
  return (
    <Wrapper>
      {
        canGoBack &&
        <Button onClick={onPrevRequested} style={{paddingBottom: 8}}>
          <FlexRow>
            <BackIcon style={{ width: 20 }} />{" "}
            <span>Previous</span>
          </FlexRow>
        </Button>
      }
      {
        canGoForward &&
        <Button onClick={onNextRequested} style={{paddingBottom: 8, marginLeft: canGoBack ? 10 : 0}}>
          <FlexRow>
            <span>Next</span>{" "}
            <ForwardsIcon style={{ width: 20, marginLeft: 10, marginRight: 0 }} />
          </FlexRow>
        </Button>
      }
      <PullRight>
        <Button onClick={onResetRequested} style={{marginRight: 10}}>
          <FlexRow>
            <RevertIcon style={{transform: 'rotate(-30deg)', width: 15}}/>
            <span>Reset</span>
          </FlexRow>
        </Button>
        <Button onClick={passed ? onNextRequested : onRun} passed={passed}>
          {!passed ? (
            <FlexRow>
              {isTesting ? <StopIcon /> : <PlayIcon />}{" "}
              <span>{isTesting ? "Testing" : "Run & Test"}</span>
            </FlexRow>
          ) : (
            <FlexRow>
              Next Challenge <ForwardsIcon />
            </FlexRow>
          )}
        </Button>
      </PullRight>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  background: ${props => props.theme.primary.color};
  border-top: 2px solid #161714;
  padding: 4px 12px;
  align-items: center;
  z-index: 9;
`;

const PullRight = styled("div")`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Button = styled("button")`
  background: ${props => {
    switch (props.passed) {
      case true:
        return props.theme.success.color;
      // case false: return props.theme.danger.dark;
      default:
        return props.theme.primary.medium;
    }
  }};
  color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 8px 12px ${({ passed }) => (passed ? 8 : 10)}px 12px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  svg {
    width: ${props => (props.passed ? 20 : 12)}px;
    margin-right: ${props => (props.passed ? 0 : 10)}px;
    margin-left: ${props => (props.passed ? 10 : 0)}px;
    margin-top: -1px;
  }
  &:hover {
    background: ${props => {
      switch (props.passed) {
        case true:
          return props.theme.success.light;
        // case false: return props.theme.danger.medium;
        default:
          return props.theme.primary.light;
      }
    }};
  }
  &:focus {
    outline: 2px rgba(255, 255, 255, 0.2);
  }
`;

const FlexRow = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StopIcon = styled("div")`
  width: 12px;
  height: 12px;
  background: currentcolor;
  border-radius: 2px;
  margin-right: 10px;
`;

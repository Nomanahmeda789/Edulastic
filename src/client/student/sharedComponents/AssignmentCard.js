import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from '@edulastic/localization';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { last } from 'lodash';
import { Row, Col } from 'antd';

//  components
import AssessmentDetails from './AssessmentDetail';
import StartButton from '../Assignments/components/StartButton';
import ReviewButton from '../Reports/components/ReviewButton';
import Attempt from './Attempt';

// actions
import {
  startAssignmentAction,
  resumeAssignmentAction
} from '../Assignments/ducks';

const AssignmentCard = ({
  startAssignment,
  resumeAssignment,
  data,
  theme,
  t,
  type
}) => {
  const [showAttempts, setShowAttempts] = useState(false);

  const toggleAttemptsView = () => setShowAttempts(prev => !prev);

  const {
    test = {},
    reports = [],
    endDate,
    testId,
    startDate,
    _id: assignmentId
  } = data;

  const lastAttempt = last(reports) || {};
  // if last test attempt was not *submitted*, user should be able to resume it.
  const resume = lastAttempt.status == 0;
  let newReports = resume
    ? reports.slice(0, reports.length - 1)
    : reports.slice(0);
  newReports = newReports || [];
  const { correct = 0, wrong = 0 } = last(newReports) || {};
  const attempted = !!(newReports && newReports.length);
  const attemptCount = newReports && newReports.length;

  const totalQuestions = correct + wrong || 0;
  const scorePercentage = (correct / totalQuestions) * 100 || 0;

  const arrow = showAttempts ? '\u2193' : '\u2191';

  const startTest = () => {
    if (resume) {
      resumeAssignment({
        testId,
        assignmentId,
        testActivityId: lastAttempt._id
      });
    } else if (attemptCount < test.maxAttempts) {
      startAssignment({ testId, assignmentId });
    }
  };

  return (
    <CardWrapper>
      <AssessmentDetails
        test={test}
        theme={theme}
        t={t}
        type={type}
        started={attempted}
        resume={resume}
        dueDate={endDate}
        startDate={startDate}
      />
      <ButtonAndDetail>
        <DetailContainer>
          {attempted && (
            <AttemptDetails>
              <Attempts onClick={toggleAttemptsView}>
                <span data-cy="attemptsCount">
                  {attemptCount}/{test.maxAttempts || attemptCount}
                </span>
                <AttemptsTitle data-cy="attemptClick">
                  {arrow} &nbsp;&nbsp;{t('common.attemps')}
                </AttemptsTitle>
              </Attempts>
              <React.Fragment>
                <AnswerAndScore>
                  <span data-cy="score">
                    {correct}/{totalQuestions}
                  </span>
                  <Title>{t('common.correctAnswer')}</Title>
                </AnswerAndScore>

                <AnswerAndScore>
                  <span data-cy="percent">{Math.floor(scorePercentage * 100) / 100}%</span>
                  <Title>{t('common.score')}</Title>
                </AnswerAndScore>
              </React.Fragment>
            </AttemptDetails>
          )}
          {type === 'assignment' ? (
            <StartButton
              data-cy="start"
              startDate={startDate}
              t={t}
              startTest={startTest}
              attempted={attempted}
              resume={resume}
            />
          ) : (
            <ReviewButton
              data-cy="review"
              testActivityId={lastAttempt._id}
              title={test.title}
              t={t}
              attempted={attempted}
            />
          )}
        </DetailContainer>
        {showAttempts &&
          newReports.map(attempt => (
            <Attempt key={attempt._id} data={attempt} type={type}/>
          ))}
      </ButtonAndDetail>
    </CardWrapper>
  );
};

const enhance = compose(
  withTheme,
  withRouter,
  withNamespaces('assignmentCard'),
  connect(
    null,
    {
      startAssignment: startAssignmentAction,
      resumeAssignment: resumeAssignmentAction
    },
    undefined, // (a, b, c) => ({ ...a, ...b, ...c }), // mergeProps
    { pure: false }
  )
);

export default enhance(AssignmentCard);

AssignmentCard.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  startAssignment: PropTypes.func.isRequired,
  resumeAssignment: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const CardWrapper = styled(Row)`
  display: flex;
  padding: 28px 0;
  border-bottom: 1px solid #f2f2f2;
  &:last-child {
    border-bottom: 0px;
  }
  img {
    max-width: 168.5px;
    border-radius: 10px;
    width: 100%;
    height: 80px;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

const ButtonAndDetail = styled(Col)`
  display: flex;
  flex-direction: column;
  width: 62%;
  @media screen and (min-width: 1025px) {
    margin-left: auto;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`;

const AttemptDetails = styled(Col)`
  display: flex;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AnswerAndScore = styled.div`
  width: 135px;
  display: flex;
  align-items: center;
  flex-direction: column;
  span {
    font-size: ${props => props.theme.assignment.cardAnswerAndScoreTextSize};
    font-weight: bold;
    color: ${props => props.theme.assignment.cardAnswerAndScoreTextColor};
  }
  @media screen and (max-width: 767px) {
    width: 33%;
  }
`;

const Attempts = AnswerAndScore;

const DetailContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const AttemptsTitle = styled.div`
  font-size: ${props => props.theme.assignment.cardAttemptLinkFontSize};
  font-weight: 600;
  color: ${props => props.theme.assignment.cardAttemptLinkTextColor};
  cursor: pointer;
`;

const Title = styled.div`
  font-size: ${props => props.theme.assignment.cardResponseBoxLabelsFontSize};
  font-weight: 600;
  color: ${props => props.theme.assignment.cardResponseBoxLabelsColor};
`;

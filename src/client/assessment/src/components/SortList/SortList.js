import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setQuestionDataAction } from '../../../../author/src/actions/question';
import SortListPreview from './SortListPreview';
import EditSortList from './EditSortList';
import { CLEAR, EDIT, PREVIEW } from '../../constants/constantsForQuestions';

class SortList extends PureComponent {
  static propTypes = {
    view: PropTypes.string.isRequired,
    previewTab: PropTypes.string,
    smallSize: PropTypes.bool,
    item: PropTypes.object,
    setQuestionData: PropTypes.func.isRequired,
    saveAnswer: PropTypes.func.isRequired,
    userAnswer: PropTypes.any,
    testItem: PropTypes.bool,
    evaluation: PropTypes.any
  };

  static defaultProps = {
    previewTab: CLEAR,
    smallSize: false,
    item: {},
    userAnswer: [],
    testItem: false,
    evaluation: ''
  };

  render() {
    const { view } = this.props;

    return (
      <Fragment>
        {view === EDIT && <EditSortList {...this.props} />}
        {view === PREVIEW && <SortListPreview {...this.props} />}
      </Fragment>
    );
  }
}

export default connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(SortList);

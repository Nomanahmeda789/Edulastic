import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { IconEye, IconCheck, IconSource, IconSettings, IconEraseText } from '@edulastic/icons';
import { blue, darkBlue, white } from '@edulastic/colors';
import { withNamespaces } from '@edulastic/localization';
import { withWindowSizes } from '@edulastic/common';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { clearAnswersAction } from '../../../actions/answers';
import { Container, PreviewBar } from './styled_components';
import { ButtonLink } from '..';
import Breadcrumb from '../../Breadcrumb';

class SecondHeadBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: false,
      breadcrumbData: [
        {
          title: 'ITEM LIST',
          to: '/author/items'
        },
        // eslint-disable-next-line react/destructuring-assignment
        ...this.props.breadcrumb
      ]
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    const top = window.pageYOffset || window.document.documentElement.scrollTop;
    if (top >= 65) {
      this.setState({ option: true });
    } else {
      this.setState({ option: false });
    }
  };

  render() {
    const { option, breadcrumbData } = this.state;
    const {
      t,
      view,
      previewTab,
      onShowSource,
      onShowSettings,
      changePreviewTab,
      clearAnswers
    } = this.props;

    return (
      <Container zIndex={option ? 10 : 1} position={option ? 'fixed' : 'unset'}>
        {!option && (
          <Breadcrumb data={breadcrumbData} style={{ position: 'unset', width: '100%' }} />
        )}

        {view === 'edit' && (
          <PreviewBar
            style={{
              width: '100%',
              justifyContent: 'flex-end'
            }}
          >
            <Button onClick={onShowSource} data-cy="source">
              <ButtonLink
                color="primary"
                icon={<IconSource color={option ? white : blue} />}
                style={{ color: option ? white : blue }}
              >
                {t('component.questioneditor.buttonbar.source')}
              </ButtonLink>
            </Button>
            <Button onClick={onShowSettings}>
              <ButtonLink
                color="primary"
                icon={<IconSettings color={option ? white : blue} />}
                style={{ color: option ? white : blue }}
              >
                {t('component.questioneditor.buttonbar.layout')}
              </ButtonLink>
            </Button>
          </PreviewBar>
        )}
        {view === 'preview' && (
          <PreviewBar
            style={{
              width: '100%',
              justifyContent: 'flex-end'
            }}
          >
            <Button onClick={() => changePreviewTab('check')}>
              <ButtonLink
                color="primary"
                icon={<IconCheck color={option ? white : blue} />}
                style={{ color: option ? white : blue }}
              >
                {t('component.questioneditor.buttonbar.checkanswer')}
              </ButtonLink>
            </Button>
            <Button onClick={() => changePreviewTab('show')}>
              <ButtonLink
                color="primary"
                style={{ color: option ? white : blue }}
                icon={<IconEye color={option ? white : blue} hoverColor={darkBlue} />}
              >
                {t('component.questioneditor.buttonbar.showanswers')}
              </ButtonLink>
            </Button>
            <Button
              onClick={() => {
                clearAnswers();
                changePreviewTab('clear');
              }}
            >
              <ButtonLink
                color="primary"
                active={previewTab === 'clear'}
                style={{ color: option ? white : blue }}
                icon={<IconEraseText color={option ? white : blue} />}
              >
                {t('component.questioneditor.buttonbar.clear')}
              </ButtonLink>
            </Button>
          </PreviewBar>
        )}
      </Container>
    );
  }
}

SecondHeadBar.propTypes = {
  changePreviewTab: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string.isRequired,
  onShowSource: PropTypes.func.isRequired,
  onShowSettings: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  breadcrumb: PropTypes.array,
  clearAnswers: PropTypes.func.isRequired
};

SecondHeadBar.defaultProps = {
  breadcrumb: [
    {
      title: 'ITEM DETAIL',
      to: `/author/items/${window.location.pathname.split('/')[3]}/item-detail`
    }
  ]
};

const enhance = compose(
  withWindowSizes,
  withNamespaces('author'),
  connect(
    null,
    { clearAnswers: clearAnswersAction }
  )
);

export default enhance(SecondHeadBar);

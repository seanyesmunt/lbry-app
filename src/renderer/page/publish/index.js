import React from 'react';
import { connect } from 'react-redux';
import { doNavigate } from 'redux/actions/navigation';
import { doClaimRewardType } from 'redux/actions/rewards';
import { selectMyClaims, selectClaimsByUri } from 'redux/selectors/claims';
import { selectResolvingUris } from 'redux/selectors/content';
import { selectPublishFormValues } from 'redux/selectors/publish';
import { doResolveUri } from 'redux/actions/content';
import { selectBalance } from 'redux/selectors/wallet';
import { doClearPublish, doUpdatePublishForm, doPublish } from 'redux/actions/publish';
import { makeSelectCostInfoForUri } from 'redux/selectors/cost_info';
import { doPrepareEdit } from 'redux/actions/publish';
import PublishPage from './view';

const select = (state, props) => {
  const publishState = selectPublishFormValues(state);
  const { name, channel } = publishState;

  const resolvingUris = selectResolvingUris(state);
  let isResolvingUri = false;
  if (uri) {
    isResolvingUri = resolvingUris.includes(uri);
  }

  const claimsByUri = selectClaimsByUri(state);
  const myClaims = selectMyClaims(state);

  // If they are editing, the uri will be the long form
  if (props.editingURI) {
  }

  const claimForUri = claimsByUri[uri];
  let winningBidForClaimUri;
  let myClaimForUri;
  if (claimForUri) {
    winningBidForClaimUri = claimForUri.effective_amount;
    myClaimForUri = myClaims.find(claim => claim.name === name);
  }

  return {
    ...publishState,
    isResolvingUri,
    claimForUri,
    winningBidForClaimUri,
    myClaimForUri,
    costInfo: makeSelectCostInfoForUri(props.uri)(state),
    balance: selectBalance(state),
  };
};

const perform = dispatch => ({
  updatePublishForm: value => dispatch(doUpdatePublishForm(value)),
  clearPublish: () => dispatch(doClearPublish()),
  resolveUri: uri => dispatch(doResolveUri(uri)),
  publish: params => dispatch(doPublish(params)),
  navigate: path => dispatch(doNavigate(path)),
  prepareEdit: (claim, uri) => dispatch(doPrepareEdit(claim, uri)),
});

export default connect(select, perform)(PublishPage);

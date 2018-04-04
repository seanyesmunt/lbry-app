import { createSelector } from 'reselect';
import { parseURI } from 'lbryURI';

const selectState = state => state.publish || {};

export const selectPendingPublishes = createSelector(selectState, state => {
  return state.pendingPublishes.map(pendingClaim => ({ ...pendingClaim, pending: true })) || [];
});

export const selectPublishFormValues = createSelector(selectState, state => {
  const { pendingPublish, ...formValues } = state;
  return formValues;
});

export const selectPendingPublish = uri =>
  createSelector(selectPendingPublishes, pendingPublishes => {
    if (!pendingPublishes.length) {
      return null;
    }
    const { claimName, channelName, isChannel } = parseURI(uri);
    console.log('\n\n\npending');
    console.log(uri, parseURI(uri));

    // debugger;
    return pendingPublishes.filter(publish => {
      console.log('publish', publish);
      if (!isChannel) {
        return publish.name === claimName;
      } else {
        return publish.name === claimName && publish.channel === channelName;
      }
      // return publish.name === claimName
    })[0];
  });

import * as functions from 'firebase-functions';

import algoliasearch from 'algoliasearch'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'grivances';
const client = algoliasearch("YWT0AXGUS5", "0f8a3e6e7c9358728d3c98440fed5371");

exports.onGrivancesCreated = functions.firestore.document('notes/{noteId}').onCreate((snap, context) => {
    // Get the note document
    const note = snap.data();
  
    // Add an 'objectID' field which Algolia requires
    note.objectID = context.params.noteId;
  
    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(note);
  });
  
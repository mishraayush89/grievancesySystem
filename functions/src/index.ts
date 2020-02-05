import  * as functions  from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

const env = functions.config()

const algoliasearch =  require('algoliasearch');

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('grivances');

exports.indexGrivances = functions.firestore
  .document('grievance/{grievanceId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;

    // Add the data to the algolia index
    return index.saveObject({
      objectID,
      ...data
    });
});

exports.unindexGrievance = functions.firestore
  .document('grivances/{grievanceId}')
  .onDelete((snap, context) => {
    const objectId = snap.id;

    // Delete an ID from the index
    return index.deleteObject(objectId);
});
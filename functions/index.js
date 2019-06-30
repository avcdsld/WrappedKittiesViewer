const admin = require('firebase-admin');
const functions = require('firebase-functions');
const ethers = require('ethers');
const util = require('util');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const wckCollection = 'WKViewer';
const docName = 'kitties';
const region = 'asia-northeast1';

exports.kitties = functions.region(region).https.onRequest((request, response) => {
  switch (request.method) {
    case 'GET':
      db.collection(wckCollection).doc(docName)
        .get()
        .then((doc) => {
          const data = doc.data();
          console.log('doc => ', data);
          return response.status(200).send(JSON.stringify(data));
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
          return response.status(400).send(error.message)
        });
      break;

    default:
      var errorJson = { 'error': { 'message': 'GETのみ対応しています。' }};
      response.status(400).send(JSON.stringify(errorJson));
      break;
  }
});

exports.fetch = functions.region(region).https.onRequest(async (request, response) => {
  try {
    const events = await fetchEvents();
    const batch = db.batch();
    for (let i = 0; i < events.length; i++) {
      console.log(i);
      let docRef = db.collection(wckCollection).doc(anEvent.tokenId + '-' + anEvent.txHash);
      batch.set(docRef, {
        block: anEvent.block,
        event: anEvent.event,
        index: anEvent.index,
        tokenId: anEvent.tokenId,
        txHash: anEvent.txHash
      });
      if (index >= (50  - 1)) {
        // eslint-disable-next-line no-await-in-loop
        await batch.commit();
      }
    }
    await batch.commit();
    
    console.log('Document successfully added! count: ');
    response.status(200).send('ok');
  } catch(error) {
    console.log('Error adding documents: ', error);
    response.status(500).send('ng');
  }
});

fetchEvents = async () => {
  const wckContractAddress  = '0x09fe5f0236f0ea5d930197dce254d77b04128075';
  const iface = new ethers.utils.Interface([
    'event DepositKittyAndMintToken(uint256 kittyId)',
    'event BurnTokenAndWithdrawKitty(uint256 kittyId)'
  ]);
  // const iface = new ethers.utils.Interface([ 'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)' ]);
  const defaultFromBlock = 7864426; // WCKコントラクトがデプロイされたブロック
  const offsetDefalt = 57600; // 約10日分
  const infuraApiAccessToken = 'f46c4bc8c43c4580855251cbef549bc6';
  const provider = new ethers.providers.InfuraProvider('homestead', infuraApiAccessToken);
  const latestBlock = await provider.getBlockNumber();

  let results = []
  let logs;
  let offset = offsetDefalt
  let filter = {
    address: wckContractAddress,
    fromBlock: (await getLastUpdatedBlock(defaultFromBlock)) + 1,
    toBlock: fromBlock + offset,
    topics: iface.events.topics
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      logs = await provider.getLogs(filter);
    } catch (err) {
      console.log(err.responseText);
      offset = offset / 10;
      filter.toBlock = filter.fromBlock + offset;
      continue;
    }
    let parsedLogs = logs.map((log) => { return iface.parseLog(log); });
    let prevBlock = 0;
    let index = 0;
    for (let i = 0; i < parsedLogs.length; i++) {
      if (!parsedLogs[i]) {
        continue;
      }
      let block = logs[i].blockNumber;
      index = (block !== prevBlock) ? 0 : index + 1;
      prevBlock = block;
      const anEvent = {
          block,
          event: parsedLogs[i].name,
          index,
          tokenId: parsedLogs[i].values.kittyId.toString(),
          txHash: logs[i].transactionHash,
      };
      console.log(util.inspect(anEvent, false, null));
      results.push(anEvent);
    }
    offset = offsetDefalt;
    filter.fromBlock = filter.toBlock + 1;
    filter.toBlock = filter.fromBlock + offset;
    if (filter.fromBlock >= latestBlock) {
        break;
    }
    // eslint-disable-next-line
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  return results;
}

getLastUpdatedBlock = async (defaultFromBlock) => {
  let lastUpdateBlock = defaultFromBlock;
  const snapShot = await db.collection(wckCollection).orderBy('block', 'asc').limit(1).get();
  const data = snapShot.docs.map(doc => {
    return doc.data();
  });
  if (data[0] && data[0].block) {
    lastUpdateBlock = data[0].block;
  }
  console.log('lastUpdateBlock: ', lastUpdateBlock);
  return lastUpdateBlock;
}

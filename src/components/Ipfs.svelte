 <script>

    import { onMount } from 'svelte';
	import { nodeId, nodeAgentVersion, nodeProtocolVersion, ifpsNode, start, keys } from './stores.js'
	import { signMessage, verifySignature } from '../components/pkiHelper.js';
	const IPFS = require('ipfs');
	
	/* Alternatives for auto-pinning
	const IPFS = require('ipfs-mini'); // https://github.com/SilentCicero/ipfs-mini
	const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
	// or
	const ipfsClient = require('ipfs-http-client')
	const ipfs = new ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
	*/

	let addedFileHash, addedFileContents, cid = "Pending...";
	const stringToUse = 'hello world from webpacked IPFS. Love, Douglas.'
	let node
	let res
	let password = "mysupersecretpasswordhere" 
	let topic //pubsub topic = $keys.publicKey
	const pingText = "Ping!"
	let rootHash

	/*
	keys in IPFS
	~/.ipfs/config only contains the identity key of the local IPFS node.
	{
	"Identity": {
		"PeerID": "Qmbjna...",
		"PrivKey": "RHwz3...",
		"pubKey": "CAASogEw..."
	},
	"Datastore": { ... 
	*/

	onMount(async() => {
		// from ipfs browser-webpack
		// console.log('Component has Mounted')
		// name the repository, repository saved in the browser's IndexedDB
		// https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs#ipfs-constructor
		const options = { 
			repo: "Douglas", // default is "ipfs", string or ipfs.Repo instance, file path at which to store the IPFS node’s data, String(Math.random() + Date.now())
			pass: password, //, // https://github.com/ipfs/js-ipfs/issues/1138
			libp2p: {
				config: {
					pubsub: {
						enabled: true
					}
				}
			}
		//	init: {				// only runs initially
		//		privateKey: "", // (base64 PrivKey) string or full PeerId, A pre-generated private key to use. Can be either a base64 string or a PeerId instance.
		//	}
		// EXPERIMENTAL: { ipnsPubsub: true }
		} 
		node = await IPFS.create( options )  

		$ifpsNode = node
		$start = new Date()
		console.log('IPFS node is ready')

		const { id, agentVersion, protocolVersion } = await node.id()

		//copy to svelte stores
		$nodeId = id;
		$nodeAgentVersion = agentVersion;
		$nodeProtocolVersion = protocolVersion;

		//save as a file to IPFS 
		for await (const { cid } of node.add(stringToUse)) {
			addedFileHash = cid.toString()

			//publish to ipns --> Slow AF, unuseable
			//res = await node.name.publish( `/ipfs/${addedFileHash}`)
			//console.log(`IPNS publish ${res.value} to nodeId: https://gateway.ipfs.io/ipns/${res.name}`)

			let bufs = []

			for await (const buf of node.cat(cid)) {
				bufs.push(buf)
			}

			const data = Buffer.concat(bufs)
			addedFileContents =  data.toString('utf8')
		}

		//save as data to DAG
		cid = await getCID(stringToUse)

		const config = await node.config.get()
		console.log(`options.config`, config)
		//console.log(`config.Identity.PrivKey: \n`, config.Identity.PrivKey)  //PeerId PrivKey?

		// https://github.com/ipfs/js-ipfs/blob/447b44d1b64714f5ed0cafba166ad0a4dbbb587c/packages/ipfs/src/core/components/init.js
		/* 	config.Identity = {
				PeerID: peerId.toB58String(),
				PrivKey: peerId.privKey.bytes.toString('base64')
		*/
		// test if signature with this private key matches the Public key from the peerid

		const stats = await node.repo.stat()
		//console.log(`Repo stats: `,stats)

		//list all ipns keys
		//const keys = await node.key.list()
		//console.log(`List all keys: \n `, keys)

		//const pem = await node.key.export('self', password)   // key is for ipns
		//console.log(`pem is: \n `,pem)

	})

	$: {
		if(node && $keys && addedFileHash){
			//console.log(`node and keys ready, let's start listening`)
			subscribe().then(console.log(`Successfull subscribed!`)).then(ping())
			
		}
	}
	
	//Subscribe to PublicKey Topic on pubsub once node is ready and keys are ready
	$: topic = $keys.publicKey

	async function ping(){
		console.log("Ping!")
		node.pubsub.publish(topic, pingText)
	}

	async function subscribe(){
		console.log(`subscribing to ${topic}`)
		return await node.pubsub.subscribe(topic, receiveMsg)  // return a promise
	}

	const receiveMsg = (msg) => {
		console.log(`Pubsub Msg rx'd: \n ${msg.data.toString()} `)
		
		if(msg.data.toString() == pingText){
			// respond by broadcasting the r00t hash
			console.log(`respond by broadcasting the r00t hash \n ${addedFileHash} \nto topic \n ${topic} `)
			// sign the msg, so they know it's legit
			const msgSignature = signMessage(addedFileHash, $keys.privateKey) 
			const msgObj = {data: addedFileHash, sig: msgSignature}
			const msgString = JSON.stringify(msgObj)
			node.pubsub.publish(topic, msgString)
		}else{
			console.log(`got acutal data: \n ${JSON.parse(msg.data.toString())} `)
			
			const msgObj = JSON.parse(msg.data)
			console.log(`check the signature: \n Does ${JSON.parse(msg.data.toString()).data} \n Signature: ${JSON.parse(msg.data.toString()).sig}\nmatch ${$keys.publicKey}`)

			const legit = verifySignature(msgObj.data, msgObj.sig, $keys.publicKey)
			console.log(`legit? ${legit} `)
		}

	}

	// returns content id (CID)
	async function getCID(data) {
		try{ 
	//console.log(`CID based on ${JSON.stringify(data)} ${JSON.stringify(data.toString())}`)
	const cidVal = await node.dag.put(data) //use DAG for object storage
	//console.log(`${JSON.stringify(data)} CID= ${JSON.stringify(cidVal.toString())}`)
	return cidVal
		}catch(e){
			return e
		}
	}

 </script>
<style>
    div.outer {
		outline: 1px solid lightgray;
		padding: 15px;
	}
</style>
 <div class='outer'>
{#if $nodeId}
    <h2>IPFS node is running!</h2>
{/if}
    <p>Your ID is <strong>{$nodeId}</strong></p>
    <p>Your IPFS version is <strong>{$nodeAgentVersion}</strong></p>
    <p>Your IPFS protocol version is <strong>{$nodeProtocolVersion}</strong></p>
    <hr />
    <div>
        Added a file! <br />
        <a target='_blank' rel="noopener noreferrer" href='https://ipfs.io/ipfs/{addedFileHash}'>{addedFileHash}</a><br />
        <br />Added dag data! <br />
        <a target='_blank' rel="noopener noreferrer" href='https://explore.ipld.io/#/explore/{cid}'>{cid}</a><br />
		{#if res}
		<br />
		Published to IPNS<br />
		IPNS publish {res.value} to nodeId: <a target='_blank' rel="noopener noreferrer" href='https://gateway.ipfs.io/ipns/{res.name}'>{res.name}</a>
		{/if}
    </div>
    <p>
        Contents of this file: <br />
        {addedFileContents}
    </p>
	<p>
	Root of Public key is: {rootHash}
	</p>
	<p>
	Did it really come from you-know-who? Check the signature:

	</p>
</div>
 <script>
    import { onMount } from 'svelte';
	import { nodeId, nodeAgentVersion, nodeProtocolVersion, ifpsNode, start } from './stores.js'
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
	
	onMount(async() => {
		// from ipfs browser-webpack
		console.log('Component has Mounted')

		node = await IPFS.create( { repo: String(Math.random() + Date.now()) })
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

			let bufs = []

			for await (const buf of node.cat(cid)) {
				bufs.push(buf)
			}

			const data = Buffer.concat(bufs)
			addedFileContents =  data.toString('utf8')
		}

		//save as data to DAG
		cid = await getCID(stringToUse)

		//publish to pubsub
		const topic = id
		node.pubsub.publish(topic, "Hello I am Doug's Publisher")

		//publish to ipns --> Slow AF, unuseable
		// res = await node.name.publish(cid, { allowOffline: true })
		// console.log(`IPNS publish ${res.value} to nodeId: https://gateway.ipfs.io/ipns/${res.name}`)

	})

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

    </div>
    <br />
    <br />
    <p>
        Contents of this file: <br />
        {addedFileContents}
    </p>
</div>
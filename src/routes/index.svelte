<script>
   	import { onMount } from 'svelte';
	import IpfsComp from '../components/Ipfs.svelte'
	import { dataStore, elapsed, ifpsNode, keys } from '../components/stores.js';

//	import { PkiHelper } from '../components/pkiHelper.js';
	import { createKeyPair } from '../components/pkiHelper.js';

	let kp = false;

	onMount(async() => {
		const password = "my super secret pass phrase that nobody will ever guess"
		kp = await createKeyPair(password)
		$keys = kp  // copy to stores
	})

</script>
<style>

</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<IpfsComp/>

{#if $keys}  <!-- only show when stores has copied key pair -->
	<p>
	Public Key: {$keys.publicKey} <br />
	</p>
	
{/if}


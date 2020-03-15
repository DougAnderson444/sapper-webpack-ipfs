<script>
   	import { onMount } from 'svelte';
	import IpfsComp from '../components/Ipfs.svelte'
	import UserInterface from '../components/UserInterface.svelte';
	import { dataStore, elapsed, ifpsNode, keys } from '../components/stores.js';

//	import { PkiHelper } from '../components/pkiHelper.js';
	import { createKeyPair } from '../components/pkiHelper.js';

	import Fa from 'svelte-fa'
	import { faFlag, faCopy, faQrcode, faLink } from '@fortawesome/free-solid-svg-icons'

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
<br />
<br />
<UserInterface />
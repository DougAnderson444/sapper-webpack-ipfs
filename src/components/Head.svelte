<script>
    // https://cweili.github.io/svelte-fa/
	import Fa from "svelte-fa";
    import { faFlag, faPlus, faCertificate, faUserCheck, faEllipsisH, faAngleUp, faQrcode, faCopy, faLink } from "@fortawesome/free-solid-svg-icons";
    import { keys } from '../components/stores.js';
    import Clipboard from './Clipboard.svelte';

</script>

<span><a  target='_blank' rel="noopener noreferrer" href="https://explore.ipld.io/#/explore/{$keys.publicKey}"><Fa icon={faLink} /></a> <Clipboard value={$keys.publicKey}/> <Fa icon={faQrcode} size="lg"  /></span>
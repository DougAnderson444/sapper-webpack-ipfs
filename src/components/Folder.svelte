<script>
	import InfoCard from "./InfoCard.svelte";
	import EditableText from "./EditableText.svelte";
    import { slide } from 'svelte/transition';
    
	import Fa from "svelte-fa";
	import { faFlag, faPlus, faCertificate, faUserCheck, faEllipsisH, faAngleUp } from "@fortawesome/free-solid-svg-icons";

	export let expanded = false;
	export let name;
	export let files;

	let fill;

	function toggle() {
	  expanded = !expanded;
	}

	function filled() {
	  fill = true;
	}

	function empty() {
	  fill = false;
	}
</script>

<style>
	div, span {
	  padding: 0 0 0 1.5em;
	  background: url(tutorial/icons/folder.svg) 0 0.1em no-repeat;
	  background-size: 1em 1em;
	  font-weight: bold;
	  cursor: pointer;
      color: gray
	}

	.expanded {
	  background-image: url(tutorial/icons/folder-open.svg);
      color: black
	}

	ul {
	  padding: 0.2em 0 0 0.5em;
	  margin: 0 0 0 0.5em;
	  list-style: none;
	  border-left: 1px solid #ddd;
	}

	li {
	  padding: 0.2em 0;
	}
</style>

<span class:expanded on:click={toggle}><EditableText placeholder={name}/></span> 

{#if expanded}
	<ul transition:slide|local>
		{#each files as file}
			<li>
				{#if file.type === 'folder'}
					<svelte:self {...file}/>
				{:else}
					<div><InfoCard {...file} /></div>
				{/if}
			</li>
		{/each}
			<li>
                <span class:expanded><Fa icon={faPlus} /></span> 
            </li>
	</ul>    
<br/>
<span class:expanded on:click={toggle} ><Fa icon={faAngleUp} /></span>
{:else}
<br/>
<span class:expanded on:click={toggle}><Fa icon={faEllipsisH} /></span>
{/if}
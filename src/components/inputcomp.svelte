<script>
    import { onMount } from 'svelte';
    import EditableText from './editabletext.svelte'
	import { dataStore, start, elapsed, ifpsNode } from './stores.js';

    //default
    // arrays for lists of objects. Make a IPFS.DAG node for each element in the list
    // objects for each IPFS node
	export let rows = ( ((typeof window !== 'undefined') && JSON.parse(localStorage.getItem("userState"))) 
                        || (
                            
    [
		{ meta: 'Resume', components: [{description:'Naval Officer', details:'From 1997-2017'}] },
		{ meta: 'Contact', components: [{description:'E-mail', details:'doug@peerpiper.io'}] }
    ]));

    // returns object located at content id (CID)
	async function getDAG(cid) {
		try{ 
            //console.log(`CID based on ${JSON.stringify(data)} ${JSON.stringify(data.toString())}`)
            const val = await ifpsNode.dag.get(cid) //use DAG for object storage
            //console.log(`${JSON.stringify(data)} CID= ${JSON.stringify(cidVal.toString())}`)
            return val
		}catch(e){
			return e
		}
    }
/*
    [
        { meta: 'Resume', components: [{key:'Job 1', value:'From 1997-2017'}, {key:'Job 2', value:'From 2017-2019'}] },
        { meta: 'Contact', components: [{key:'E-mail', value:'doug@email.com'}, {key:'phone', value:'555-555-1234'}] }
    ]
*/
    // save rows to localStorage whenever it changes
    $: (typeof window !== 'undefined') ? localStorage.setItem("userState", JSON.stringify(rows, undefined, "\t") ) : false;
    // save the rows to the dataStore stores whenever it changes
    // as long as 3 seconds has elapsed sinc elast keystroke
    //$: ($elapsed==3) ? (($dataStore = rows) && console.log(`dataStore updated`)): false;
    let trigger = false
    $: ($elapsed==3 && $ifpsNode!=0) ? (trigger =true) : (trigger =false);
    $: {
            if(trigger){
                $dataStore = rows
                console.log(`dataStore updated, ${$ifpsNode}`)
                trigger=false;
            }
        }
    
    //cleanse
	//$:rows = JSON.parse(JSON.stringify(rows))

	let index
	function handleClick() {
		
		rows[index.i].components.splice(
			index.j+1, 
			0, 
			{description:'', 
			 details:`Added after {i,j} {${index.i.toString()}, ${index.j.toString()}}`
			})
		rows = rows 
		//rows = [...rows, {key:'Enter text', value:`Clicked #${index.toString()}`}]
	}
	function addSection(){
		// add one row to the end of rows
		rows = [...rows, { meta: 'Click to Title New Section', components: [{description:'', details:'Enter details'}] }]
    }

	function delSection(){
        // del this row 
        console.log(`del row ${index.i}`)
        console.log(`del row ${rows[index.i]}`)
        rows.splice(
            index.i, 
            1)
		rows = rows 		    
    }

    function handleDelete(){
        rows[index.i].components.splice(
        index.j, 
        1)
		rows = rows 		    
    }
</script>

<style>
    button {
        outline: none;
        background-color: #f4f4f4; 
		color: #333;
        -webkit-appearance: button;
        -webkit-writing-mode: horizontal-tb !important;
        text-rendering: auto;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: center;
        align-items: flex-start;
        cursor: default;
        font: 400 13.3333px Arial;
	}
    button, textarea {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        margin: 0 0 0.1em 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
        display: inline-block;
    }
    button {
        vertical-align: top;
    }
    textarea {
        width:28em;
        height:3em;
    }
    div {
        padding: 0 0 0.5em 1.5em;
        width: 500px;
        align-content: left;
        text-align: left;
        display: inline-block;
        position: relative;
    }        

</style>
<div>
{#each rows as row, i}
	<hr>
    <EditableText bind:value={row.meta} /> <button on:click="{()=> index = {i}}" on:click={delSection}> - Delete Section</button>
	{#each row.components as val, j}
		<div><EditableText bind:value={val.description} /></div>
        <div><textarea on:keydown={()=> {$start = new Date()}} bind:value={val.details} ></textarea> <button on:click="{()=> index = {i, j}}" on:click={handleDelete}>-</button></div>
	{/each}
    <div><button on:click="{()=> index = {i, j: row.components.length}}" on:click={handleClick}>+</button></div>
{/each}
</div>
<br>
<button on:click={addSection}>+ Add Section</button>
<script>
	import Folder from "./Folder.svelte";
	
	let root = [
	  {
	    type: "folder",
	    name: "Work",
	    files: [
	      { type: "file", name: "quarterly-results.xlsx", value: "The value", certified:"true"  }
	    ]
	  },
	  {
	    type: "folder",
	    name: "Play",
	    files: [
	      {
	        type: "folder",
	        name: "Dogs",
	        files: [
	          { type: "file", name: "treadmill", value: "The value" },
	          { type: "file", name: "rope-jumping", value: "The value" }
	        ]
	      },
	      {
	        type: "folder",
	        name: "Goats",
	        files: [
	          { type: "file", name: "parkour", value: "The value" },
	          { type: "file", name: "rampage", value: "The value" }
	        ]
	      },
	      { type: "file", name: "cat-roomba", value: "The value" },
	      { type: "file", name: "duck-shuffle", value: "The value" },
	      { type: "file", name: "monkey-on-a-pig", value: "The value"}
	    ]
	  }
	];
</script>

<Folder name="Portfolio" files={root} expanded head={true} />
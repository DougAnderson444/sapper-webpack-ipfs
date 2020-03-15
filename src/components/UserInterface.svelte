<script>
	import Folder from "./Folder.svelte";
	
	let root = [
	  {
	    type: "folder",
	    name: "Work",
	    files: [
            {
                type: "folder",
                name: "Resume",
                files: [
                    { type: "file", name: "Skills", value: "The value" },
                    { type: "file", name: "Experience", value: "The value" }
                ]
            },
                        {
                type: "folder",
                name: "Job Finder",
                files: [
                    { type: "file", name: "Skills", value: "The value" },
                    { type: "file", name: "Experience", value: "The value" }
                ]
	        }
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
      },	  
      {
	    type: "folder",
	    name: "Contacts",
	    files: [
	      { type: "file", name: "Adrian", value: "902-555-5555", certified:"true"  }
	    ]
      },      {
	    type: "folder",
	    name: "Subscriptions",
	    files: [
	      { type: "file", name: "Adrian", value: "902-555-5555", certified:"true"  }
	    ]
      },
      {
	    type: "folder",
	    name: "Reviews",
	    files: [
	      { type: "file", name: "TV Mount", value: "5 Stars", certified:"true"  }
	    ]
	  },
      {
	    type: "folder",
	    name: "Search Criteria",
	    files: [
	      { type: "file", name: "TV Mount", value: "5 Stars", certified:"true"  }
	    ]
	  },
      {
	    type: "folder",
	    name: "Calendar",
	    files: [
	      { type: "file", name: "TV Mount", value: "5 Stars", certified:"true"  }
	    ]
	  },
      {
	    type: "folder",
	    name: "Settings",
	    files: [
	      { type: "file", name: "TV Mount", value: "5 Stars", certified:"true"  }
	    ]
	  }
      
	];
</script>
<style>
    div.outer {
		outline: 1px solid lightseagreen;
		padding: 15px;
	}
</style>

<div class='outer'>
 
 <Folder name="Portfolio" files={root} expanded head={true} />
 This user's schema is:
 <!--Schema /-->
</div>

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'Forget Big Data. Micro Data is a gold mine.',
		slug: 'what-is-sapper',
		html: `
			<p>Forget Big Data. Micro Data is a gold mine.</p>

		`
	},

	{
		title: 'Building a more reactive internet',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new internet, using IPFS and Svelte:</p>

		`
	},

	{
		title: 'Peer-to-Peer should be free.',
		slug: 'why-the-name',
		html: `
			<p>Peer-to-Peer should be free.</p>

		`
	},

	{
		title: 'The end of spam: Pull messaging (instead of pushed email)',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p>The end of spam: Pull messaging (instead of pushed email)</p>

		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;

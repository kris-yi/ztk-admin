const ghPages = require('gh-pages')

ghPages.publish('dist', {
	branch: 'gh-pages-test',
	repo: 'git@github.com:kris-yi/ztk-admin.git'
}, function (err) {
	if (err) {
		console.error(err)
	} else {
		console.log('发布成功！')
	}
})

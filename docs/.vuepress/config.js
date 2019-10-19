module.exports = {
  title: 'dailin‘s note', // 设置网站标题
  description: 'day day up', //描述
  //dest: './dist',   // 设置输出目录
  //port: 2333, //端口
  themeConfig: { //主题配置
   lastUpdated: '上传时间', 
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: 'java', link: '/java/java' },
	  { text: '笔记',        // 这里是下拉列表展现形式。
        items: [
          { text: '设计模式', link: '/note/sjms/UML时序图' },
		  { text: 'docker', link: '/note/docker/docker' }
        ]
      },
      { text: '链接',        // 这里是下拉列表展现形式。
        items: [
          { text: '在线流程图', link: 'https://www.processon.com' }
        ]
      }
    ],
    // 为以下添加侧边栏
    sidebar: {
		'/java/': [
			['java','java']
		],
		
		'/note/sjms/':[
			'UML时序图',
			'命令模式与策略模式'
		],
        
		'/note/docker/':[
			['docker','docker']
		],
    },
    sidebarDepth: 2,
	// Git 仓库和编辑链接
    repo: 'username/repo', // 你的仓库
    repoLabel: 'GitHub', // 导航栏上的文本

    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '编辑此页面'
    },
	markdown: {
		toc: { includeLevel: [2, 3] }
	}
}
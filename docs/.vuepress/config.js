module.exports = {
  title: 'dailin‘s note', // 设置网站标题
  description: 'day day up', //描述
  head: [
     ['link', { rel: 'icon', href: '/head.ico' }],
  ],
  //dest: './dist',   // 设置输出目录
  //port: 2333, //端口
  themeConfig: { //主题配置
   lastUpdated: '上传时间', 
   // 定制文章标题颜色
    accentColor: '#ac3e40',
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: 'java', link: '/java/java' },
	  { text: '笔记',        // 这里是下拉列表展现形式。
        items: [
          { text: '设计模式', link: '/note/sjms/UML时序图' },
		  { text: 'docker', link: '/note/docker/docker' },
		  { text: 'rocketMQ', link: '/note/rocketMQ/rocketMQ' }
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
		//Java
		'/java/': [
			['java','java']
		],
		
		//设计模式
		'/note/sjms/':[
			'UML时序图',
			'命令模式与策略模式'
		],
        
		//docker
		'/note/docker/':[
			['docker','docker']
		],
		
		//rocketMQ
		'/note/rocketMQ/':[
			['rocketMQ','核心概念'],
			['rocketMQ安装','rocketMQ安装']
		],
    },
    sidebarDepth: 2,
	// Git 仓库和编辑链接
    repo: 'https://github.com/huangdailin/docs', // 你的仓库
    repoLabel: 'GitHub', // 导航栏上的文本

    //editLinks: true,
    // 默认为 "Edit this page"
    //editLinkText: '编辑此页面'
    },
	markdown: {
		toc: { includeLevel: [2, 3] }
	},
	
	plugins: [
	[
      'vuepress-plugin-gotop-plus', {
        // 是否在移动设备上显示(default: true)
        mobileShow: false,
        // 回到页首元素显示触发的高度阈值(default: 50)
        threshold: 50
      }
    ],
    [
      'vuepress-plugin-helper-live2d', {
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'z16',
          display: {
            position: "right", // 显示位置：left/right(default: 'right')
            width: 135, // 模型的长度(default: 135)
            height: 300, // 模型的高度(default: 300)
            hOffset: 65, //  水平偏移(default: 65)
            vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
            show: false // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 0.8 // 模型透明度(default: 0.8)
          }
        }
      }
    ],
  ],
}
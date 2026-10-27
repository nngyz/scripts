// Sub-Store：presntp.uk 入口替换脚本
// 按花云.js 风格编写：匹配 server，复制节点并更换入口 IP。
// $arguments.lang=en 时使用英文标签，否则使用中文标签。
function operator(proxies) {
  const args = $arguments ?? {}
  const lang = args.lang === 'en' ? 'en' : 'zh'

  const ipMap = {
    // 仅使用国内入口
    'p-s2.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT'],
      ['183.61.173.36', '广电', 'GDCT']
    ],
    'p-gtm.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT'],
      ['183.61.173.36', '广电', 'GDCT']
    ],
    'p-gtm-l.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT'],
      ['183.61.173.36', '广电', 'GDCT']
    ],

    // 仅使用国内入口
    'p-s3.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT'],
      ['183.61.173.36', '广电', 'GDCT']
    ],
    'p-s4.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT'],
      ['183.61.173.36', '广电', 'GDCT']
    ]
  }

  return (proxies || []).flatMap(template => {
    const entries = ipMap[template?.server]

    // 未匹配域名的节点原样保留
    if (!entries) return [template]

    return entries.map(([ip, zh, code]) => ({
      ...template,
      server: ip,
      name: `${template.name} [${lang === 'zh' ? zh : code}]`
    }))
  })
}

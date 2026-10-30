function operator(proxies) {
  const args = $arguments ?? {}
  const lang = args.lang === 'en' ? 'en' : 'zh'

  const ipMap = {
    'p-s2.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT']
    ],
    'p-s3.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT']
    ],
    'p-s4.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT']
    ],
    'p-gtm.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT']
    ],
    'p-gtm5.presntp.uk': [
      ['103.109.23.144', '深电', 'SZCT']
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

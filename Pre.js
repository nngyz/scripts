// Sub-Store 节点 IP 替换脚本
// 更换入口 IP 时，只修改 ipMap 中的 ip 和 tag，其他逻辑保持不变。
function operator(proxies = []) {
  const ipMap = {
    // 国内入口
    "p-s2.presntp.uk": [
      { ip: "103.109.23.144", tag: "深电" },
      { ip: "183.61.173.36", tag: "广电" }
    ],

    "p-gtm.presntp.uk": [
      { ip: "103.109.23.144", tag: "深电" },
      { ip: "183.61.173.36", tag: "广电" }
    ],

    "p-gtm-l.presntp.uk": [
      { ip: "103.109.23.144", tag: "深电" },
      { ip: "183.61.173.36", tag: "广电" }
    ],

    // 海外 S1 入口：日本、新加坡
    "p-s1-hk.presntp.uk": [
      { ip: "35.79.224.152", tag: "日" },
      { ip: "35.77.222.39", tag: "日" },
      { ip: "54.238.166.23", tag: "日" },
      { ip: "52.68.9.20", tag: "日" },
      { ip: "56.10.137.25", tag: "新" },
      { ip: "47.129.209.169", tag: "新" },
      { ip: "13.212.30.91", tag: "新" }
    ],

    "p-s1-sg.presntp.uk": [
      { ip: "35.79.224.152", tag: "日" },
      { ip: "35.77.222.39", tag: "日" },
      { ip: "54.238.166.23", tag: "日" },
      { ip: "52.68.9.20", tag: "日" },
      { ip: "56.10.137.25", tag: "新" },
      { ip: "47.129.209.169", tag: "新" },
      { ip: "13.212.30.91", tag: "新" }
    ],

    "p-s1-jp.presntp.uk": [
      { ip: "35.79.224.152", tag: "日" },
      { ip: "35.77.222.39", tag: "日" },
      { ip: "54.238.166.23", tag: "日" },
      { ip: "52.68.9.20", tag: "日" },
      { ip: "56.10.137.25", tag: "新" },
      { ip: "47.129.209.169", tag: "新" },
      { ip: "13.212.30.91", tag: "新" }
    ],

    "p-s1-us.presntp.uk": [
      { ip: "35.79.224.152", tag: "日" },
      { ip: "35.77.222.39", tag: "日" },
      { ip: "54.238.166.23", tag: "日" },
      { ip: "52.68.9.20", tag: "日" },
      { ip: "56.10.137.25", tag: "新" },
      { ip: "47.129.209.169", tag: "新" },
      { ip: "13.212.30.91", tag: "新" }
    ],

    // 海外 S3 / S4 入口：香港
    "p-s3.presntp.uk": [
      { ip: "35.220.141.198", tag: "港" },
      { ip: "35.220.224.14", tag: "港" },
      { ip: "34.92.194.56", tag: "港" },
      { ip: "34.96.165.72", tag: "港" },
      { ip: "34.96.199.38", tag: "港" }
    ],

    "p-s4.presntp.uk": [
      { ip: "35.220.141.198", tag: "港" },
      { ip: "35.220.224.14", tag: "港" },
      { ip: "34.92.194.56", tag: "港" },
      { ip: "34.96.165.72", tag: "港" },
      { ip: "34.96.199.38", tag: "港" }
    ]
  };

  const result = [];

  for (const proxy of proxies) {
    const entries = ipMap[proxy.server];

    if (!entries) {
      result.push(proxy);
      continue;
    }

    for (const entry of entries) {
      const cloned = { ...proxy };
      cloned.name = `${proxy.name} [${entry.tag}]`;
      cloned.server = entry.ip;
      result.push(cloned);
    }
  }

  return result;
}

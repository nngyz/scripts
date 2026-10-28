/**
 * Sub-Store 脚本
 * 只输出有国内入口的节点；忽略名称带 0.2 / 0.20x 的节点。
 * 国内入口：103.109.23.144、183.61.173.36
 * 原节点域名：n-24-p.nodecon.uk
 *
 * 用法：Sub-Store → 脚本操作 → 本地内容
 */
function operator(proxies, targetPlatform, context) {
  const domesticEntrances = [
    { server: "103.109.23.144", label: "广电" },
    { server: "183.61.173.36", label: "莞电" },
  ];

  return proxies.flatMap((proxy) => {
    const name = String(proxy.name || proxy._name || "");
    const server = String(proxy.server || proxy.host || proxy.address || "");

    // 0.2 / 0.20x 节点不处理
    if (/0\.2(?:0x)?/i.test(name)) return [];

    // 只处理截图确认有国内入口的 n-24-p 节点
    if (!/(^|\.)n-24-p\.nodecon\.uk$/i.test(server)) return [];

    // 每个节点复制两个国内入口版本；其余参数全部保留
    return domesticEntrances.map((entrance) => {
      const item = { ...proxy };
      item.server = entrance.server;
      item.name = `${name} ${entrance.label}`;
      return item;
    });
  });
}

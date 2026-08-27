import type { EditorialSource } from './editorial';

export const historyReferences: Record<string, EditorialSource[]> = {
  '1776': [
    { title: 'An Inquiry into the Nature and Causes of the Wealth of Nations', publisher: 'Adam Smith · Library of Economics and Liberty', url: 'https://www.econlib.org/library/Smith/smWN.html', note: '《国富论》英文全文，可核对分工、交换、市场与政府职能的原始论述。' },
    { title: 'Adam Smith’s Moral and Political Philosophy', publisher: 'Stanford Encyclopedia of Philosophy', url: 'https://plato.stanford.edu/entries/smith-moral-political/', note: '将斯密的市场分析放回道德哲学、法学和制度背景。' },
  ],
  '1848': [
    { title: 'Principles of Political Economy', publisher: 'John Stuart Mill · Project Gutenberg', url: 'https://www.gutenberg.org/ebooks/30107', note: '《政治经济学原理》英文全文，包含生产、分配和制度讨论。' },
    { title: 'John Stuart Mill', publisher: 'Stanford Encyclopedia of Philosophy', url: 'https://plato.stanford.edu/entries/mill/', note: '密尔思想、方法和社会制度观点的学术概览。' },
  ],
  '1871': [
    { title: 'Principles of Economics', publisher: 'Carl Menger · Ludwig von Mises Institute edition', url: 'https://mises.org/library/book/principles-economics', note: '门格尔《国民经济学原理》英文版本，用于追溯边际分析和价值理论。' },
    { title: 'Marginalism', publisher: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/money/marginalism', note: '边际革命及其对价值、成本和选择分析的概览。' },
  ],
  '1913': [
    { title: 'Federal Reserve Act Signed into Law', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/federal-reserve-act-signed', note: '联邦储备法通过的银行恐慌背景、制度设计与早期目标。' },
    { title: 'The Federal Reserve Act', publisher: 'Board of Governors of the Federal Reserve System', url: 'https://www.federalreserve.gov/aboutthefed/fract.htm', note: '联邦储备法现行文本和修订入口。' },
  ],
  '1929': [
    { title: 'The Great Depression', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/great-depression', note: '银行危机、货币收缩、通缩和政策反应的历史梳理。' },
    { title: 'The Great Depression', publisher: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/event/Great-Depression', note: '危机的国际背景、主要阶段和社会经济影响。' },
  ],
  '1936': [
    { title: 'What Is Keynesian Economics?', publisher: 'International Monetary Fund · Finance & Development', url: 'https://www.imf.org/external/pubs/ft/fandd/2014/09/basics.htm', note: '总需求、价格调整、失业和逆周期政策的基本框架。' },
    { title: 'John Maynard Keynes', publisher: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/money/John-Maynard-Keynes', note: '凯恩斯生平、《通论》背景及其对宏观经济学的影响。' },
  ],
  '1944': [
    { title: 'Creation of the Bretton Woods System', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/bretton-woods-created', note: '战后国际货币安排、美元黄金联系及制度目标。' },
    { title: 'Bretton Woods–GATT, 1941–1947', publisher: 'Office of the Historian, U.S. Department of State', url: 'https://history.state.gov/milestones/1937-1945/bretton-woods', note: '布雷顿森林会议、IMF 与世界银行制度安排的历史背景。' },
  ],
  '1971': [
    { title: 'Nixon Ends Convertibility of U.S. Dollars to Gold', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/gold-convertibility-ends', note: '美元停止按固定价格兑换黄金的背景、措施和后果。' },
    { title: 'Nixon and the End of the Bretton Woods System, 1971–1973', publisher: 'Office of the Historian, U.S. Department of State', url: 'https://history.state.gov/milestones/1969-1976/nixon-shock', note: '美元停止兑换黄金、汇率调整与固定汇率体系结束的官方历史梳理。' },
  ],
  '1973': [
    { title: 'Oil Shock of 1973–74', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/oil-shock-of-1973-74', note: '石油供应、价格冲击、通胀与宏观政策反应。' },
    { title: 'Oil Embargo, 1973–1974', publisher: 'Office of the Historian, U.S. Department of State', url: 'https://history.state.gov/milestones/1969-1976/oil-embargo', note: '石油禁运的外交背景、供给冲击与宏观经济后果。' },
  ],
  '1987': [
    { title: 'Stock Market Crash of 1987', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/stock-market-crash-of-1987', note: '黑色星期一、市场流动性、程序化交易和政策应对。' },
    { title: 'Report of the Presidential Task Force on Market Mechanisms', publisher: 'U.S. Presidential Task Force', url: 'https://fraser.stlouisfed.org/title/report-presidential-task-force-market-mechanisms-5832', note: '对 1987 年市场崩盘及市场机制的同期调查。' },
  ],
  '1997': [
    { title: 'Asian Financial Crisis', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/asian-financial-crisis', note: '汇率压力、资本流动、外币债务和区域传导。' },
    { title: 'The Asian Crisis: Causes and Cures', publisher: 'International Monetary Fund · Finance & Development', url: 'https://www.imf.org/external/pubs/ft/fandd/1998/06/imfstaff.htm', note: '危机脆弱性、政策应对及相关争论。' },
  ],
  '2000': [
    { title: 'The Dot-Com Bubble', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/dot-com-bubble', note: '互联网股票繁荣、估值扩张与市场逆转。' },
    { title: 'The Challenge of Central Banking in a Democratic Society', publisher: 'Board of Governors of the Federal Reserve System', url: 'https://www.federalreserve.gov/boarddocs/speeches/1996/19961205.htm', note: '格林斯潘提出“非理性繁荣”疑问的原始演讲，可用于理解泡沫前的资产估值争论。' },
  ],
  '2008': [
    { title: 'The Great Recession and Its Aftermath', publisher: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/essays/great-recession-and-its-aftermath', note: '住房、金融体系、实体经济和政策反应的历史梳理。' },
    { title: 'The Financial Crisis Inquiry Report', publisher: 'U.S. Financial Crisis Inquiry Commission', url: 'https://www.govinfo.gov/content/pkg/GPO-FCIC/pdf/GPO-FCIC.pdf', note: '对美国金融危机成因、机构行为和监管失误的官方调查。' },
  ],
  '2009': [
    { title: 'Bitcoin: A Peer-to-Peer Electronic Cash System', publisher: 'Satoshi Nakamoto', url: 'https://bitcoin.org/bitcoin.pdf', note: '比特币网络的原始技术与激励设计说明。' },
    { title: 'The future monetary system', publisher: 'Bank for International Settlements', url: 'https://www.bis.org/publ/arpdf/ar2022e3.htm', note: '从货币功能、稳定性、效率和治理比较数字资产与货币体系。' },
  ],
  '2010': [
    { title: 'The European Stability Mechanism: History', publisher: 'European Stability Mechanism', url: 'https://www.esm.europa.eu/about-us/history', note: '欧元区主权债务危机期间稳定机制建立与救助安排。' },
    { title: 'The euro area sovereign debt crisis', publisher: 'European Central Bank', url: 'https://www.ecb.europa.eu/pub/pdf/scpwps/ecbwp1577.pdf', note: '主权风险、银行体系和货币联盟传导的研究。' },
  ],
  '2020': [
    { title: 'World Economic Outlook, April 2020: The Great Lockdown', publisher: 'International Monetary Fund', url: 'https://www.imf.org/en/Publications/WEO/Issues/2020/04/14/weo-april-2020', note: '疫情初期全球产出、政策与风险评估。' },
    { title: 'Global Economic Prospects, June 2020', publisher: 'World Bank', url: 'https://www.worldbank.org/en/publication/global-economic-prospects', note: '疫情冲击、全球衰退和发展中经济体影响。' },
  ],
  '2022': [
    { title: 'Annual Economic Report 2022', publisher: 'Bank for International Settlements', url: 'https://www.bis.org/publ/arpdf/ar2022e.htm', note: '全球通胀、货币政策正常化和金融稳定风险。' },
    { title: 'World Economic Outlook, October 2022', publisher: 'International Monetary Fund', url: 'https://www.imf.org/en/Publications/WEO/Issues/2022/10/11/world-economic-outlook-october-2022', note: '通胀、增长放缓、能源冲击和政策收紧的全球背景。' },
  ],
  '2023': [
    { title: 'Review of the Federal Reserve’s Supervision and Regulation of Silicon Valley Bank', publisher: 'Board of Governors of the Federal Reserve System', url: 'https://www.federalreserve.gov/publications/review-of-the-federal-reserves-supervision-and-regulation-of-silicon-valley-bank.htm', note: '利率风险、存款集中、治理与监管问题的官方复盘。' },
    { title: 'Bank Failures in Brief – 2023', publisher: 'Federal Deposit Insurance Corporation', url: 'https://www.fdic.gov/resources/resolutions/bank-failures/in-brief/bfb2023.html', note: '2023 年美国银行失败、处置和存款保护资料。' },
  ],
};

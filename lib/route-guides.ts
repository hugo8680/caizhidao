import type { EditorialLink, EditorialSource } from './editorial';

export type RouteGuide = {
  conclusion: string;
  evidence: string[];
  caveats: string[];
  related: EditorialLink[];
  sources: EditorialSource[];
};

export const routeGuides: Record<string, RouteGuide> = {
  'money-is-born': {
    conclusion: '现代货币不是孤立存在的纸张或数字，而是支付制度、银行资产负债表、国家信用和真实生产能力共同支撑的债权债务网络。商业银行能够在放贷时创造存款，但它受资本、流动性、信用需求、监管和借款人偿付能力约束；央行影响这套体系，却不会机械决定每一笔贷款和每一种物价。',
    evidence: [
      '观察央行与商业银行资产负债表：存款、贷款、准备金、现金和资本分别位于哪一方，变化是否彼此对应。',
      '区分基础货币、广义货币和银行信用；它们的发行主体、使用范围和变化原因并不相同。',
      '沿政策利率、货币市场利率、存贷款利率、信贷数量、资产价格和总需求追踪政策传导，而不是只看一次利率公告。',
      '判断通胀时同时检查货币需求、信用扩张、财政支出、供给能力和价格预期，避免把所有价格变化都归因于货币数量。',
    ],
    caveats: [
      '“银行创造存款”不等于银行可以不受约束地创造财富；贷款同时创造银行资产和借款人的偿付义务。',
      '货币供应量增加并不必然按固定比例转化为通胀，传导取决于资金是否被使用、供给能否响应以及公众是否愿意持有货币。',
      '法定货币没有固定黄金兑换承诺，不等于它没有价值基础；税收、法律、支付网络、政策可信度和生产能力都参与维持货币需求。',
    ],
    related: [
      { title: '利率', href: '/knowledge/interest-rate/', note: '区分政策利率、市场利率、贷款利率与实际利率。' },
      { title: '货币政策', href: '/knowledge/monetary-policy/', note: '理解政策工具怎样通过金融条件影响经济。' },
      { title: '通货膨胀', href: '/knowledge/inflation/', note: '把货币、需求、供给与预期放进同一分析框架。' },
      { title: '货币与信用', href: '/atlas/money-banking/topic/01/', note: '查看货币职能、信用创造与流动性的概念关系。' },
    ],
    sources: [
      { title: 'Money creation in the modern economy', publisher: 'Bank of England', url: 'https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy', note: '用银行资产负债表解释商业银行放贷与存款创造。' },
      { title: 'The transmission mechanism of monetary policy', publisher: 'European Central Bank', url: 'https://www.ecb.europa.eu/mopo/intro/transmission/html/index.en.html', note: '政策利率经由金融条件、需求和价格传导的框架。' },
      { title: 'The role of central bank money in payment systems', publisher: 'Bank for International Settlements', url: 'https://www.bis.org/cpmi/publ/d55.htm', note: '中央银行货币、商业银行货币与支付体系的制度关系。' },
    ],
  },
  'price-mystery': {
    conclusion: '价格既是稀缺条件下协调买卖行动的信号，也是市场力量、制度规则和信息分布共同作用的结果。价格上涨可能来自需求增加、供给收缩、成本变化、竞争不足或外部成本重新计入；仅凭“涨价”本身无法判断原因，更不能直接判断公平与否。',
    evidence: [
      '先画出需求和供给分别发生了什么变化，并区分曲线移动与沿曲线移动。',
      '寻找可比市场、替代品、库存、产能、成本和进入壁垒，判断买卖双方是否有现实选择。',
      '估计数量对价格的反应，区分短期与长期弹性；短期无法调整并不意味着长期同样缺乏替代。',
      '检查价格是否遗漏污染、拥堵、信息不对称或公共品等社会成本与收益。',
    ],
    caveats: [
      '均衡是分析工具，不表示市场永远处于静止状态，也不表示任何市场结果都符合社会目标。',
      '成本上升可以解释价格压力，但不能自动证明企业没有市场力量；利润率、进入壁垒和替代品仍需检查。',
      '价格管制可能缓解部分人的短期负担，也可能改变供给、排队、质量和非价格配给，评价时必须同时比较。',
    ],
    related: [
      { title: '供需与价格', href: '/atlas/microeconomics/topic/02/', note: '从需求、供给、均衡和弹性理解价格形成。' },
      { title: '企业与竞争', href: '/atlas/microeconomics/topic/03/', note: '比较完全竞争、垄断和寡头市场。' },
      { title: '福利与市场失灵', href: '/atlas/microeconomics/topic/04/', note: '分析外部性、公共品和信息不对称。' },
    ],
    sources: [
      { title: 'Principles of Economics 3e', publisher: 'OpenStax', url: 'https://openstax.org/details/books/principles-economics-3e', note: '供需、弹性、市场结构和市场失灵的开放教材。' },
      { title: 'Competition', publisher: 'OECD', url: 'https://www.oecd.org/competition/', note: '竞争政策、市场力量和消费者福利资料。' },
      { title: 'Markets and competition policy', publisher: 'UK Competition and Markets Authority', url: 'https://www.gov.uk/government/organisations/competition-and-markets-authority', note: '现实市场调查、竞争执法与消费者保护资料。' },
    ],
  },
  'economic-cycle': {
    conclusion: '经济周期不是一条固定日历，而是产出、就业、通胀、信用、库存和预期之间不断反馈的过程。长期增长取决于生产能力，短期波动则常由需求、供给和金融条件共同推动；货币与财政政策能够缓冲部分波动，但都存在时滞、分配影响和约束。',
    evidence: [
      '同时观察实际 GDP、就业、失业率、工时和收入，避免用单一季度增长率判断整个经济状态。',
      '把总体与核心通胀、环比与同比、商品与服务价格分开，识别需求、供给和基数效应。',
      '查看信贷增速、违约、收益率曲线、融资利差和银行调查，判断金融条件是否在放大实体波动。',
      '区分同步、滞后和领先指标，并保留数据修订的可能；初值不一定是最终事实。',
    ],
    caveats: [
      '收益率曲线、PMI 或任何单一指标都不是精确的衰退计时器。',
      '通胀与失业之间不存在跨时期恒定不变的机械交换关系，供给冲击和预期会改变二者关系。',
      'GDP 衡量生产活动，不直接衡量财富存量、收入分配、健康、闲暇和环境质量。',
    ],
    related: [
      { title: '国内生产总值', href: '/knowledge/gdp/', note: '理解 GDP 核算范围、名义与实际之分。' },
      { title: '失业率', href: '/knowledge/unemployment/', note: '与劳动参与率、就业人数和工时联读。' },
      { title: '通货膨胀', href: '/knowledge/inflation/', note: '区分价格水平、通胀率及其来源。' },
      { title: '收益率曲线', href: '/knowledge/yield-curve/', note: '理解期限利率、预期与期限溢价。' },
    ],
    sources: [
      { title: 'System of National Accounts 2008', publisher: 'United Nations Statistics Division', url: 'https://unstats.un.org/unsd/nationalaccount/sna2008.asp', note: '国民经济核算的国际统计标准。' },
      { title: 'World Economic Outlook', publisher: 'International Monetary Fund', url: 'https://www.imf.org/en/Publications/WEO', note: '全球增长、通胀、政策与风险的定期分析。' },
      { title: 'Understanding unemployment', publisher: 'International Labour Organization', url: 'https://ilostat.ilo.org/resources/concepts-and-definitions/description-unemployment-rate/', note: '失业率、劳动力和统计口径的定义。' },
    ],
  },
  'read-a-company': {
    conclusion: '分析公司必须把商业模式、会计记录、现金流和估值假设连起来。利润表解释一段时期的经营结果，资产负债表显示某一时点的资源与义务，现金流量表说明现金怎样变化；企业价值最终取决于未来可分配现金流，而不是某一个孤立比率。',
    evidence: [
      '至少阅读连续三年的经审计报表、会计政策、附注和管理层讨论，检查口径是否发生变化。',
      '把收入增长拆成数量、价格、并购和汇率，把利润变化拆成毛利、费用、一次性项目和融资成本。',
      '核对利润与经营现金流、应收账款、存货、资本开支和债务到期，寻找无法相互解释的变化。',
      '估值时公开增长、利润率、再投资、折现率和终值假设，并做情景与敏感性分析。',
    ],
    caveats: [
      '审计意见提高报表可信度，但不保证企业没有经营风险，也不替代对估计和商业模式的判断。',
      '好公司不必然是好投资；支付价格已经包含的预期会影响未来回报。',
      '市盈率、ROE 等比率容易受周期、杠杆、回购和会计处理影响，必须与现金流和同行口径一起使用。',
    ],
    related: [
      { title: '资产负债表', href: '/knowledge/balance-sheet/', note: '从资产质量、负债期限和权益理解企业家底。' },
      { title: '利润表', href: '/knowledge/income-statement/', note: '区分收入、费用、经营利润和净利润。' },
      { title: '现金流量表', href: '/knowledge/cash-flow-statement/', note: '追踪经营、投资和融资现金流。' },
      { title: '现金流折现', href: '/knowledge/dcf/', note: '理解价值、增长、再投资与风险的关系。' },
    ],
    sources: [
      { title: 'Beginners’ Guide to Financial Statements', publisher: 'U.S. Securities and Exchange Commission', url: 'https://www.sec.gov/about/reports-publications/investorpubsbegfinstmtguide', note: '三张财务报表及其相互关系的公众说明。' },
      { title: 'Issued IFRS Standards', publisher: 'IFRS Foundation', url: 'https://www.ifrs.org/issued-standards/list-of-standards/', note: '国际财务报告准则与配套资料入口。' },
      { title: 'Valuation resources', publisher: 'NYU Stern · Aswath Damodaran', url: 'https://pages.stern.nyu.edu/~adamodar/', note: '公司金融、估值课程、数据和案例。' },
    ],
  },
  'invest-without-noise': {
    conclusion: '投资首先是把真实目标与资金期限转换成可执行的风险预算，其次才是选择产品。长期结果来自资产风险暴露、估值、费用、税收和行为纪律的共同作用；产品数量多、近期收益高或故事动听，都不能代替对底层现金流和风险来源的理解。',
    evidence: [
      '为每个目标写明金额、最早用钱日期、可承受损失和最低流动性，再决定允许持有哪些资产。',
      '穿透基金和账户到底层持仓、币种、期限、信用和集中度，识别表面不同但实际重复的风险。',
      '使用净收益比较：扣除管理费、交易成本、买卖价差、税收和跟踪差异。',
      '同时查看波动、最大回撤、恢复时间、压力期相关性和被迫卖出的可能，不把风险缩成一个数字。',
    ],
    caveats: [
      '分散投资降低的是特定风险，不会消除市场整体下跌、通胀、流动性或行为风险。',
      '历史平均收益不是承诺；样本起止日期、幸存者偏差和估值水平都会改变结果。',
      '再平衡是恢复预定风险，不是高抛低吸的市场预测；税费和交易成本可能改变合理频率。',
    ],
    related: [
      { title: '风险收益权衡', href: '/knowledge/risk-return/', note: '识别回报对应的风险来源。' },
      { title: '资产配置', href: '/knowledge/asset-allocation/', note: '让不同资产服务于目标和期限。' },
      { title: '分散投资', href: '/knowledge/diversification/', note: '从风险驱动而不是产品数量理解分散。' },
      { title: '再平衡', href: '/knowledge/rebalancing/', note: '用预先约定的规则恢复风险水平。' },
    ],
    sources: [
      { title: 'Asset Allocation and Diversification', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/getting-started/asset-allocation', note: '资产配置、分散投资与再平衡的投资者教育资料。' },
      { title: 'How Fees and Expenses Affect Your Investment Portfolio', publisher: 'U.S. Securities and Exchange Commission', url: 'https://www.sec.gov/investor/alerts/ib_fees_expenses.pdf', note: '费用如何降低投资净回报。' },
      { title: 'Investment Foundations', publisher: 'CFA Institute', url: 'https://www.cfainstitute.org/programs/investment-foundations', note: '投资工具、组合、客户目标和行业实践框架。' },
    ],
  },
  'family-finance': {
    conclusion: '家庭财务的首要任务是避免一次冲击破坏长期计划，而不是追求某个看起来最优的收益率。现金流决定日常承受力，应急金提供处理突发事件的时间，保险转移无法独自承担的损失，债务管理控制固定承诺，长期投资才负责更远的目标。评估方案时要同时比较收益、流动性、下行损失和家庭责任，而不是只看预期回报。',
    evidence: [
      '用至少六至十二个月真实流水区分必要支出、可调整支出和不规则大额支出。',
      '建立家庭资产负债表，记录每项资产的流动性、每笔债务的实际利率、期限、担保和提前偿还条件。',
      '按收入中断时间、家庭责任、保险免赔额和资产变现时间决定应急金，而不是照抄统一月数。',
      '退休和教育目标使用实际购买力、保守回报和多种情景，并定期根据收入、家庭和制度变化更新。',
    ],
    caveats: [
      '储蓄率、应急金月数和提取率都不是适合所有家庭的固定标准。',
      '高息债务通常应优先处理，但还清债务前耗尽全部流动资金可能制造新的借款风险。',
      '保险用于转移重大不确定损失，不是储蓄收益的替代品；条款、除外责任和赔付条件比宣传收益更重要。',
    ],
    related: [
      { title: '应急金', href: '/knowledge/emergency-fund/', note: '根据家庭风险和资金可用性建立安全垫。' },
      { title: '债务收入比', href: '/knowledge/debt-to-income/', note: '观察每月固定还款对收入的压力。' },
      { title: '保险', href: '/knowledge/insurance/', note: '理解风险转移、保费、免赔和保障边界。' },
      { title: '退休资金缺口', href: '/tools/retirement/', note: '用多情景估算长期购买力与积累缺口。' },
    ],
    sources: [
      { title: 'Consumer Tools', publisher: 'U.S. Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/consumer-tools/', note: '信用、债务、住房和家庭财务工具。' },
      { title: 'Saving and Investing', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/save-and-invest', note: '目标、储蓄、投资计划与风险基础。' },
      { title: 'Financial Consumer Protection', publisher: 'OECD', url: 'https://www.oecd.org/finance/financial-education/financial-consumer-protection.htm', note: '金融消费者保护与金融素养政策资料。' },
    ],
  },
  'global-money': {
    conclusion: '贸易、收入支付、汇率和跨境资本流动是同一套国际收支关系的不同侧面。汇率既受商品与服务交易影响，也像资产价格一样反映利差、风险和预期；外币债务、短期融资和固定汇率承诺会把普通波动放大为流动性或偿付危机。',
    evidence: [
      '从国际收支表同时查看经常账户、资本账户、金融账户和储备变化，避免只解释贸易差额。',
      '任何汇率数字都写清基准货币、计价货币、名义或实际以及双边或有效汇率。',
      '检查外债的币种、期限、利率和持有人，并将短期外债与可用外汇储备和出口收入比较。',
      '追踪全球利率、美元融资、银行跨境债权、风险溢价和资本流量，识别共同融资来源。',
    ],
    caveats: [
      '经常账户顺差不自动代表经济更强，逆差也不自动代表危机；国内储蓄投资、发展阶段和融资用途都很重要。',
      '购买力平价更适合长期参照，运输成本、不可贸易品、资本流动和风险变化会造成长期偏离。',
      '资本管制、汇率干预和储备可以改变调整路径，但不能永久取消真实资源和资产负债表约束。',
    ],
    related: [
      { title: '汇率', href: '/knowledge/exchange-rate/', note: '先明确报价方向，再讨论升值、贬值和购买力。' },
      { title: '利率', href: '/knowledge/interest-rate/', note: '跨境资本会比较币种、期限、风险和对冲成本。' },
      { title: '系统性风险', href: '/knowledge/systemic-risk/', note: '理解共同持仓、融资和信心如何传播冲击。' },
      { title: '国际收支', href: '/atlas/international-economics/topic/03/', note: '连接贸易、收入、资产与负债变化。' },
    ],
    sources: [
      { title: 'Balance of Payments and International Investment Position Manual, Sixth Edition', publisher: 'International Monetary Fund', url: 'https://www.imf.org/external/pubs/ft/bop/2007/bopman6.htm', note: '国际收支与跨境头寸的统计框架。' },
      { title: 'Trade Statistics', publisher: 'World Trade Organization', url: 'https://www.wto.org/english/res_e/statis_e/statis_e.htm', note: '商品、服务、关税和贸易结构数据。' },
      { title: 'Global liquidity indicators', publisher: 'Bank for International Settlements', url: 'https://www.bis.org/statistics/gli.htm', note: '跨境银行信贷和全球外币融资资料。' },
    ],
  },
  'mind-and-money': {
    conclusion: '行为偏差不是“人不聪明”的标签，而是注意力、参照点、情绪、社会信息和制度环境在特定条件下形成的系统性选择模式。专业分析既要识别偏差，也要排除真实信息、激励和约束造成的合理反应，并用预先规则降低错误的重复发生。',
    evidence: [
      '先写下标准模型在相同条件下的预测，再比较实验或真实选择与预测偏离在哪里。',
      '检查样本、随机分组、效应大小、置信区间、重复研究和现实外推条件，不只记住一个偏差名称。',
      '记录决策当时可见的信息、参照点、时间压力和利益关系，避免事后用结果反推当时“显然应该知道”。',
      '把防护机制写成可执行规则，例如冷静期、自动储蓄、仓位上限、反方清单和独立复核。',
    ],
    caveats: [
      '一次错误不能证明存在稳定偏差，统计规律也不能断言每个人每次都会如此。',
      '给行为贴上“损失厌恶”或“从众”标签不等于解释了因果机制。',
      '助推和默认选项会影响选择，设计者同样可能有利益冲突，因此需要透明、可退出和效果评估。',
    ],
    related: [
      { title: '判断捷径', href: '/atlas/behavioral-economics/topic/01/', note: '理解锚定、可得性和过度自信。' },
      { title: '风险决策', href: '/atlas/behavioral-economics/topic/02/', note: '理解损失厌恶、参照点与概率加权。' },
      { title: '时间与自控', href: '/atlas/behavioral-economics/topic/03/', note: '用承诺机制和默认选项改善长期选择。' },
      { title: '群体与市场', href: '/atlas/behavioral-economics/topic/04/', note: '观察从众、叙事和情绪如何相互强化。' },
    ],
    sources: [
      { title: 'Daniel Kahneman · Facts', publisher: 'The Nobel Prize', url: 'https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/facts/', note: '判断、不确定性和行为经济学研究背景。' },
      { title: 'World Development Report 2015: Mind, Society, and Behavior', publisher: 'World Bank', url: 'https://www.worldbank.org/en/publication/wdr2015', note: '行为研究在发展与公共政策中的证据和应用。' },
      { title: 'Misbehaving: The Making of Behavioral Economics', publisher: 'Richard H. Thaler · Nobel Prize lecture materials', url: 'https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/lecture/', note: '行为经济学的发展、理论比较与现实证据。' },
    ],
  },
};

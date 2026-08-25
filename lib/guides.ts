import { getKnowledgeTerm, type KnowledgeTerm } from './content';

export type KnowledgeCategoryPage = {
  slug: string;
  name: string;
  en: string;
  overview: string;
  learningGoal: string;
};

export const knowledgeCategoryPages: KnowledgeCategoryPage[] = [
  { slug: 'personal-money', name: '金钱与个人财务', en: 'Money & Personal Finance', overview: '从现金流、债务、保障和时间价值出发，理解家庭财务为什么首先是期限与安全问题。', learningGoal: '能把收入、支出、负债和长期目标放到同一张家庭资产负债表中。' },
  { slug: 'investing-basics', name: '投资基础', en: 'Investing Basics', overview: '建立风险、收益、流动性和价格之间的基本关系，避免只用“涨不涨”理解投资。', learningGoal: '能说清一项回报来自承担什么风险，以及这项风险是否与自己的期限匹配。' },
  { slug: 'markets-products', name: '市场与产品', en: 'Markets & Instruments', overview: '认识股票、债券、基金与交易机制，先看底层现金流和权利义务，再看产品名称。', learningGoal: '能从底层资产、交易结构、费用和流动性四个角度拆解金融产品。' },
  { slug: 'financial-statements', name: '财务报表', en: 'Financial Statements', overview: '把利润、资产与现金放在一起阅读，用三张报表还原企业真实经营过程。', learningGoal: '能解释利润为什么不等于现金，并用趋势与勾稽关系发现值得追问的变化。' },
  { slug: 'corporate-finance', name: '公司金融与估值', en: 'Corporate Finance & Valuation', overview: '理解企业如何投资、融资和分配资本，以及未来现金流如何被折算成今天的价值。', learningGoal: '能区分价值、价格和估值假设，并知道哪些变量最容易让结论失真。' },
  { slug: 'macroeconomics', name: '宏观经济', en: 'Macroeconomics', overview: '用增长、就业、通胀和政策观察整个经济体，同时区分数据事实与因果解释。', learningGoal: '能把一条宏观新闻拆成指标变化、政策反应、传导路径和市场预期。' },
  { slug: 'portfolio-risk', name: '组合与风险', en: 'Portfolio & Risk', overview: '从目标和风险预算出发组合资产，用相关性、回撤与再平衡管理不确定性。', learningGoal: '能判断组合是否真正分散，并用规则而非临场情绪调整风险。' },
  { slug: 'global-derivatives', name: '全球与衍生品', en: 'Global Markets & Derivatives', overview: '理解汇率、跨境资本、期货、期权和杠杆如何转移风险，也如何放大损失。', learningGoal: '能画出基本权利义务和现金流方向，并识别杠杆与流动性反馈。' },
];

export function getKnowledgeCategoryPage(slug: string) {
  return knowledgeCategoryPages.find((category) => category.slug === slug);
}

export function getKnowledgeCategoryByName(name: string) {
  return knowledgeCategoryPages.find((category) => category.name === name);
}

type TermNote = { caution: string; check: string };

type KnowledgeSource = {
  title: string;
  publisher: string;
  url: string;
  note: string;
};

type CategoryDepth = {
  boundary: string;
  misconceptions: string[];
  checklist: string[];
  sources: KnowledgeSource[];
};

const categoryDepth: Record<string, CategoryDepth> = {
  '金钱与个人财务': {
    boundary: '家庭财务没有脱离生活目标的“最优数字”。同一个比例或方案，对收入稳定、短期要用钱和承担家庭责任的人，意义可能完全不同。',
    misconceptions: ['把{term}当成越高越好的单一指标，忽略资金期限、家庭责任和现金流稳定性。', '只计算正常情景，没有检查失业、疾病或大额支出发生时方案能否继续。'],
    checklist: ['这笔钱最早什么时候必须使用？', '如果收入中断六个月，方案是否仍能维持？', '计算的是名义金额，还是扣除通胀后的购买力？'],
    sources: [
      { title: 'Consumer Tools', publisher: 'U.S. Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/consumer-tools/', note: '贷款、信用、住房与日常财务的消费者资料。' },
      { title: 'Investor education', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing', note: '投资基础、风险与产品核验入口。' },
    ],
  },
  '投资基础': {
    boundary: '投资指标通常只描述风险的一部分。平均收益、波动、回撤、流动性和永久损失不是同一件事，任何单一数字都不能独立证明一项资产值得买。',
    misconceptions: ['把{term}当作预测涨跌的信号，而不是描述风险、收益或执行条件的工具。', '只看历史平均值，忽略样本区间、费用、税收、失败路径与幸存者偏差。'],
    checklist: ['收益最终来自什么现金流或风险补偿？', '最大回撤发生时，自己是否会被迫卖出？', '产品费用、税收和买卖价差会留下多少净回报？'],
    sources: [
      { title: 'Investing basics', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics', note: '资产类别、风险、费用与分散投资的基础资料。' },
      { title: 'Investment Foundations', publisher: 'CFA Institute', url: 'https://www.cfainstitute.org/programs/investment-foundations', note: '市场、工具、行业结构与职业伦理的系统框架。' },
    ],
  },
  '市场与产品': {
    boundary: '金融产品是权利、现金流和风险的法律载体。名称相似不代表底层资产、偿付顺序、费用、托管或流动性相同。',
    misconceptions: ['只根据产品名称理解{term}，没有继续查看底层资产和合同权利。', '把“能够交易”理解为“任何时候都能按屏幕价格成交”。'],
    checklist: ['最终拥有的是所有权、债权，还是一项合约权利？', '现金流由谁支付，违约时偿付顺序是什么？', '在哪里买卖、由谁托管、退出成本是多少？'],
    sources: [
      { title: 'Investment products', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/investment-products', note: '股票、债券、基金等产品的基础说明。' },
      { title: 'How Stock Markets Work', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work', note: '发行、交易和市场运作的入门资料。' },
    ],
  },
  '财务报表': {
    boundary: '报表是按会计规则形成的经营记录，不是企业现实的完整复制。确认时点、估计方法、一次性项目和管理层判断都会影响数字。',
    misconceptions: ['孤立阅读{term}，没有与另外两张报表和附注相互核对。', '看到同比增长就下结论，没有区分价格、数量、并购和会计口径变化。'],
    checklist: ['这个数字对应一段期间，还是一个时点？', '它能否与另一张报表和附注勾稽？', '变化来自主营经营，还是一次性项目与会计估计？'],
    sources: [
      { title: 'Issued IFRS Standards', publisher: 'IFRS Foundation', url: 'https://www.ifrs.org/issued-standards/list-of-standards/', note: '国际财务报告准则与配套资料入口。' },
      { title: 'How to Read a 10-K', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/how-read-10-k', note: '阅读年报、主表与风险披露的实用说明。' },
    ],
  },
  '公司金融与估值': {
    boundary: '估值是对未来现金流、再投资和风险的条件性判断，不是精确报价。增长率、利润率或折现率的小变化，可能带来很大的价值变化。',
    misconceptions: ['把{term}的计算结果当作唯一答案，没有展示输入假设和估值区间。', '使用增长假设，却没有说明增长需要多少再投资、竞争是否允许它持续。'],
    checklist: ['价值来自哪些可以持续的现金流？', '增长需要多少资本，回报率是否高于资本成本？', '悲观、基准和乐观情景下，结论相差多大？'],
    sources: [
      { title: 'Valuation resources', publisher: 'NYU Stern · Aswath Damodaran', url: 'https://pages.stern.nyu.edu/~adamodar/', note: '公司估值、资本成本、数据和课程资料。' },
      { title: 'Corporate Finance', publisher: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/search/?q=corporate+finance', note: '公司金融课程、讲义与练习入口。' },
    ],
  },
  '宏观经济': {
    boundary: '宏观指标是对大量经济活动的汇总，发布有滞后并可能修订；同时变化不自动代表因果关系，市场价格还会提前反映预期。',
    misconceptions: ['用一次{term}数据判断长期趋势，没有检查基数、季节性和后续修订。', '把经济数据好坏直接等同于资产涨跌，忽略市场此前已经计入的预期。'],
    checklist: ['这是总量、增速还是价格指数？', '名义与实际、同比与环比的口径是否一致？', '数据相对前值、预期值和历史修订偏离多少？'],
    sources: [
      { title: '财经数据', publisher: '中华人民共和国国家统计局', url: 'https://data.stats.gov.cn/', note: '中国国民经济与社会统计数据查询入口。' },
      { title: 'Back to Basics', publisher: 'International Monetary Fund', url: 'https://www.imf.org/external/pubs/ft/fandd/basics/', note: 'GDP、通胀、财政和国际收支等概念说明。' },
    ],
  },
  '组合与风险': {
    boundary: '风险指标只总结特定样本和假设下的一部分不确定性。压力时期的相关性、流动性、波动结构和融资条件都可能与平时不同。',
    misconceptions: ['把{term}当作风险的完整定义，遗漏永久损失、流动性和目标落空。', '持有很多产品就认为已经分散，没有检查共同持仓和共同风险因子。'],
    checklist: ['组合最大的共同风险来源是什么？', '各资产在压力时期是否仍能提供分散？', '何时再平衡，由什么事先写好的规则触发？'],
    sources: [
      { title: 'Asset Allocation and Diversification', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/asset-allocation-diversification', note: '资产配置、分散和再平衡的基础资料。' },
      { title: 'Global Investment Performance Standards', publisher: 'CFA Institute', url: 'https://www.gipsstandards.org/', note: '投资业绩计算、展示与可比性的专业标准。' },
    ],
  },
  '全球与衍生品': {
    boundary: '跨境交易和衍生品会把标的价格、汇率、保证金、流动性与法律义务叠加在一起；最初投入通常不等于名义敞口或最大损失。',
    misconceptions: ['只看{term}的方向判断，没有画出权利、义务和全部现金流。', '把保证金当作最大损失，忽略杠杆、追加保证金、跳空和交易对手风险。'],
    checklist: ['标的、名义本金、到期日和结算方式是什么？', '最坏情况下需要追加多少现金？', '汇率、基差和交易对手变化会怎样影响结果？'],
    sources: [
      { title: 'Balance of Payments Manual', publisher: 'International Monetary Fund', url: 'https://www.imf.org/external/pubs/ft/bop/2007/bopman6.htm', note: '国际收支、跨境头寸与统计口径。' },
      { title: 'Derivatives information', publisher: 'U.S. Commodity Futures Trading Commission', url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/index.htm', note: '期货、期权、杠杆和交易风险资料。' },
    ],
  },
};

const categorySources: Record<string, string> = {
  '金钱与个人财务': '银行流水、家庭预算、贷款合同、保单条款和年度净资产记录。',
  '投资基础': '产品说明书、指数编制方法、历史净值、回撤记录和持仓明细。',
  '市场与产品': '招募说明书、交易所规则、持仓披露、成交量和买卖报价。',
  '财务报表': '公司年报、会计政策、报表附注、审计意见和管理层讨论。',
  '公司金融与估值': '资本开支、自由现金流、融资结构、资本成本和管理层的资本配置记录。',
  '宏观经济': '统计部门、央行与财政部门的原始发布、方法说明和历史修订。',
  '组合与风险': '穿透持仓、相关性、压力测试、历史回撤和再平衡记录。',
  '全球与衍生品': '合约规格、保证金规则、风险揭示书、汇率报价和清算安排。',
};

const termNotes: Record<string, TermNote> = {
  'compound-interest': { caution: '复利公式假定收益不断留在账户里。中途取走收益、费率变化或发生亏损，结果都会偏离那条平滑曲线。', check: '把本金、追加投入、收益率、计息频率和年数分别写清，再用较低的收益率重算一次。' },
  'time-value': { caution: '折现率不是随手填的数字。它既包含等待的机会成本，也可能包含通胀、信用和不确定性。', check: '先把所有现金流标在时间轴上，再确认比较的是同一币种、同一风险和同一计息口径。' },
  'emergency-fund': { caution: '旅行、装修和年度保费是可以预见的支出，不宜反复从应急金里支付；它们更适合单独储备。', check: '用“不能暂停的支出”计算基数，并结合收入稳定性、家庭责任和保险到账时间决定覆盖月数。' },
  'debt-to-income': { caution: '不同机构可能使用税前收入或税后收入，也可能对信用卡、房贷采用不同月供口径，比例不能直接横比。', check: '注明收入口径，把所有固定还款放进分子，并另外检查收入中断时现金能撑多久。' },
  amortization: { caution: '月供固定不代表每月偿还的本金相同。等额本息早期支付的利息更多，剩余本金下降得较慢。', check: '查看完整还款表，并把提前还款费、利率重定价和缩期或降月供的选择一并比较。' },
  insurance: { caution: '保险首先解决难以自行承担的损失，不应只按返还金额或演示收益判断好坏。', check: '从家庭责任反推保额，逐条核对保障范围、等待期、免责、续保条件和受益人。' },
  'risk-return': { caution: '“预期收益更高”不等于结果一定更好，只表示承担风险后可能要求更高补偿。', check: '说清收益由什么现金流或风险溢价提供，并估算最坏损失是否会破坏既定目标。' },
  diversification: { caution: '产品数量多不等于分散。多只基金可能持有同一批股票，或同时暴露在同一个利率、行业和地区风险下。', check: '穿透到底层持仓，再按股票、利率、信用、商品和汇率等风险来源重新归类。' },
  liquidity: { caution: '屏幕上有报价，不代表能以该价格成交。市场紧张时，成交量会减少，价差也会迅速扩大。', check: '同时查看成交量、买卖价差、赎回到账时间、锁定期，以及大额卖出对价格的影响。' },
  volatility: { caution: '波动率只描述价格变化的离散程度，无法单独反映违约、欺诈、无法赎回或永久损失。', check: '注明样本区间和计算频率，并与最大回撤、流动性、信用质量一起看。' },
  'dollar-cost-averaging': { caution: '定投不会把差资产变成好资产，也不保证比一次投入更便宜；它主要解决持续收入和择时压力。', check: '先区分资金是未来逐月到达，还是已有一笔现金，再写清投入期限、暂停条件和未投入资金的去向。' },
  'margin-of-safety': { caution: '价格低于某个估值数字，不代表已经安全；如果盈利假设本身错误，所谓折价也可能消失。', check: '使用估值区间而非单点，列出最敏感的假设，以及哪些事实出现时应放弃原判断。' },
  stock: { caution: '股票代码背后是剩余所有权。企业先支付员工、供应商、税款和债权人，剩余价值才属于股东。', check: '从商业模式、利润、自由现金流、负债和估值五方面解释回报来源，不只看股价走势。' },
  bond: { caution: '“固定收益”说的是合同现金流较明确，不是价格固定，也不表示发行人一定不会违约。', check: '核对发行人、偿付顺序、到期日、票息、到期收益率、久期和成交活跃度。' },
  fund: { caution: '“稳健”“成长”等名称没有统一风险含义，过去排名也不能说明未来会继续领先。', check: '先看投资范围、基准和前十大持仓，再核对费用、换手率、赎回规则及基金经理是否变化。' },
  etf: { caution: 'ETF 能在交易所买卖，但价格仍可能偏离基金净值；冷门产品的价差和成交深度尤其值得注意。', check: '核对追踪指数、复制方式、规模、折溢价、跟踪误差、费率和做市成交情况。' },
  'yield-curve': { caution: '收益率曲线倒挂不是衰退倒计时。曲线同时受到政策预期、通胀和期限溢价影响。', check: '比较同一信用等级、同一时点的整条曲线，并分别观察水平、斜率和曲率如何变化。' },
  duration: { caution: '久期不是简单的剩余年数。它由每笔现金流的时间和权重决定，对大幅利率变化也只是近似。', check: '确认使用的是麦考利久期还是修正久期，并在较大利率变动时一并考虑凸性。' },
  'balance-sheet': { caution: '资产负债表是一张时点照片，账面金额也不等于随时可以按同样价格变现。', check: '至少对比三期数据，并阅读应收、存货、商誉、受限现金和债务到期结构的附注。' },
  'income-statement': { caution: '收入和利润可以在现金尚未收到时确认，一次性收益也可能让当期数字显得异常漂亮。', check: '拆分销量、价格、成本和一次性项目，再用经营现金流与应收账款变化验证利润质量。' },
  'cash-flow-statement': { caution: '现金增加未必来自经营改善；借款、增发或出售资产同样会带来现金流入。', check: '分开看经营、投资和融资三部分，并追踪应收、存货、资本开支和债务怎样改变现金。' },
  'gross-margin': { caution: '毛利率受行业、产品组合和成本分类影响，软件公司与零售商的数字不能脱离业务直接比较。', check: '对比同业与公司自身趋势，并查清价格、原材料、渠道和会计重分类各贡献多少变化。' },
  roe: { caution: 'ROE 上升不一定代表经营更好。加债、回购或权益减值都可能缩小分母并推高比例。', check: '把 ROE 拆成利润率、资产周转率和杠杆，并使用平均股东权益而非单一期末数字。' },
  'current-ratio': { caution: '流动资产并非都同样可靠。滞销库存和逾期应收即使记在账上，也未必能及时偿债。', check: '查看现金、应收账龄、库存周转和短债到期日，再与经营现金流和授信额度对照。' },
  'free-cash-flow': { caution: '某一年自由现金流很高，可能只是推迟了付款或削减必要投资；低现金流也可能来自有价值的扩张。', check: '拉长到三至五年，区分维持性与增长性资本开支，并解释营运资本的异常变化。' },
  'present-value': { caution: '同一笔未来现金流采用不同折现率会得到不同现值，折现率必须与风险、币种和期限相匹配。', check: '列明每笔现金流的日期，再说明折现率来自无风险利率、风险溢价还是合同成本。' },
  dcf: { caution: 'DCF 输出到小数点并不代表准确。终值常占估值的大部分，遥远假设的小变化会被明显放大。', check: '至少做悲观、基准和乐观三种情景，并展示增长率、利润率、再投资和折现率的敏感性。' },
  npv: { caution: 'NPV 为正只说明在给定现金流与折现率下项目创造价值；输入过于乐观时，正数本身没有说服力。', check: '核对初始投入、后续追加、营运资本、残值和税，再对关键变量做压力测试。' },
  wacc: { caution: 'WACC 不是公司永远不变的一条利率，也不能把一套集团折现率用于风险完全不同的新业务。', check: '使用市场价值权重，并确保无风险利率、风险溢价、税率、币种和项目风险彼此一致。' },
  'pe-ratio': { caution: '低市盈率不一定便宜：盈利可能处在周期高点、质量较差，亏损企业的市盈率则没有可比意义。', check: '确认使用静态还是预测盈利，再比较增长、利润质量、杠杆、周期位置和同业会计口径。' },
  inflation: { caution: '某一种商品涨价不等于通胀；通胀回落通常表示价格上涨变慢，也不等于价格已经下降。', check: '同时看总体与核心指标、环比与同比，并拆分食品、能源、住房、商品和服务。' },
  gdp: { caution: 'GDP 衡量生产，不直接衡量幸福、分配或环境质量；名义增长还可能主要来自价格上涨。', check: '区分名义与实际、总量与人均，再查看消费、投资、政府支出和净出口分别贡献多少。' },
  cpi: { caution: 'CPI 是代表性消费篮子的平均变化，不会与每个家庭的生活成本完全一致，权重也会随方法调整。', check: '查看篮子权重、基期、季调方法和分项贡献，并用自己的主要支出对照官方平均值。' },
  unemployment: { caution: '失业率下降未必代表就业改善；停止找工作的人退出劳动力后，也可能让比例下降。', check: '把失业率与劳动参与率、就业人数、工时、职位空缺和工资增速放在一起看。' },
  'monetary-policy': { caution: '央行调整的是金融条件的起点，不能直接决定每一笔贷款利率，效果也不会在公告当天全部出现。', check: '依次观察政策利率、市场利率、信用、汇率、资产价格和需求，并注明每一环可能出现的时滞。' },
  'fiscal-policy': { caution: '赤字并非天然好或坏。政策效果取决于经济所处阶段、支出对象、执行速度和融资成本。', check: '区分临时与长期措施，估算谁先收到资金、谁承担税负，以及债务利息会怎样变化。' },
  'asset-allocation': { caution: '先挑过去表现最好的产品再凑比例，不是资产配置；那会把目标变成对历史收益的追逐。', check: '按用钱日期拆分目标，为每个目标设最低金额、可承受损失和允许的资产范围。' },
  rebalancing: { caution: '再平衡不是判断市场高低，而是把已经偏移的风险恢复到预先约定的范围。', check: '提前写明检查频率、偏离阈值、资金流优先顺序，并把税费与交易成本算进去。' },
  correlation: { caution: '相关系数取决于样本区间，只描述线性共同变化；危机时原本较低的相关性也可能突然升高。', check: '使用多个时间窗口，并在正常与压力时期分别检查底层风险因子和共同持仓。' },
  beta: { caution: 'Beta 只相对于选定基准解释历史共同波动，不是总风险，也不会说明企业会不会永久亏损。', check: '注明基准、数据频率和观察期，再与公司基本面、杠杆、流动性及模型拟合程度一起看。' },
  'sharpe-ratio': { caution: '夏普比率把波动当作主要风险，可能高估那些平时平稳、偶尔遭受大损失的策略。', check: '统一收益周期和无风险利率，并同时查看最大回撤、偏度、尾部损失和样本长度。' },
  drawdown: { caution: '历史最大回撤不是未来损失上限；样本没经历过的危机，不会出现在历史数字里。', check: '除跌幅外还要看下跌用了多久、多久恢复，以及期间是否会遇到提款或保证金要求。' },
  'interest-rate': { caution: '央行政策利率、房贷利率和债券收益率不是同一个数字；名义利率与实际利率也不能混用。', check: '注明币种、期限、信用、固定或浮动、单利或复利，并与同期限通胀预期对照。' },
  'exchange-rate': { caution: '说“汇率上涨”前必须先看报价方向。同一次变化，可以被表述为一种货币升值或另一种货币贬值。', check: '写清基准货币和计价货币，再把资产本身回报与换回本币后的汇兑变化分别计算。' },
  futures: { caution: '保证金只是履约担保，不是资产总价，更不是最大损失；每日结算还会产生即时补资压力。', check: '核对合约乘数、到期日、交割或现金结算、保证金比例、涨跌停和换月规则。' },
  options: { caution: '买方拥有权利，卖方承担义务，两边风险并不对称；收到权利金也不等于获得稳定利息。', check: '先画到期损益，再标出权利金、盈亏平衡、最大损失、时间衰减和波动率变化。' },
  hedging: { caution: '对冲的目标是减少某项不确定性，不是让所有情景都赚钱；对冲本身也有成本和基差风险。', check: '让对冲工具的标的、金额、币种和期限尽量贴近实际敞口，并规定何时调整或结束。' },
  leverage: { caution: '杠杆不仅放大方向判断，还把融资期限和保证金要求带进决策；看对长期方向也可能先被迫卖出。', check: '计算名义敞口、利息、维持保证金和 10%—30% 跳空损失，并预留独立可用现金。' },
  'bid-ask-spread': { caution: '零佣金不等于零成本。市价单跨过买卖价差，冷门或剧烈波动的资产还可能出现明显滑点。', check: '把价差除以中间价换成百分比，并查看盘口深度、成交量和不同交易时段的变化。' },
  'expense-ratio': { caution: '费用率不包含所有成本，低费用也不能弥补错误的指数、较大跟踪误差或不合适的风险暴露。', check: '把管理费、申赎费、交易成本、价差、跟踪差异和税务放到同一持有期比较。' },
  'systemic-risk': { caution: '系统性风险不是某只股票随市场波动的“系统风险”；它强调机构之间的连接如何让局部故障扩散。', check: '画出资产、融资、抵押品和交易对手网络，寻找高杠杆、短期融资与集中挤兑可能形成的反馈。' },
};

export function buildKnowledgeGuide(term: KnowledgeTerm) {
  const note = termNotes[term.slug];
  const depth = categoryDepth[term.category];
  const related = term.related.map((slug) => getKnowledgeTerm(slug)).filter((item): item is KnowledgeTerm => Boolean(item));
  const relatedLine = related.length > 0
    ? `${related.map((item) => `“${item.zh}”关注${item.summary.replace(/[。！？；]+$/u, '')}`).join('；')}。`
    : '把它与同主题概念并排比较，确认各自描述的对象和口径。';
  const caution = note?.caution ?? term.fact;
  const check = note?.check ?? `先确认“${term.zh}”描述的对象、期间和计量口径，再结合具体资料判断。`;
  return {
    mechanism: [
      { title: '定义与口径', text: `${term.summary}${term.why}阅读时先确认它描述的主体、时间范围和计量单位。` },
      { title: '关系如何发生', text: `${term.example}这个例子不是为了记住一个答案，而是看清变量、现金流或风险从哪里开始变化。` },
      { title: '与相近概念区分', text: relatedLine },
      { title: '适用条件与边界', text: `${depth?.boundary ?? '任何概念都依赖具体对象、时间范围和前提条件。'}${caution}` },
    ],
    misconceptions: [caution, ...(depth?.misconceptions ?? []).map((item) => item.replaceAll('{term}', `“${term.zh}”`))],
    checklist: [check, ...(depth?.checklist ?? [])],
    sources: depth?.sources ?? [],
    caution,
    check,
    observation: categorySources[term.category] ?? '相关合同、公开披露和原始数据。',
  };
}

export type ToolGuide = {
  question: string;
  explanation: string;
  inputs: Array<{ name: string; meaning: string }>;
  reading: string;
  limits: string[];
  example: string;
};

export const toolGuides: Record<string, ToolGuide> = {
  compound: { question: '一笔本金和持续投入，在给定收益率与时间下可能积累到多少？', explanation: '计算器把每一期收益重新加入本金，并假设后续收益继续作用于新的余额。时间越长，后期“收益产生的收益”占比越高。', inputs: [{ name: '初始本金', meaning: '开始计算时已经投入的金额。' }, { name: '每月投入', meaning: '假设每个月末追加的固定金额。' }, { name: '年收益率', meaning: '用于演示的长期平均假设，不是收益承诺。' }, { name: '投资年数', meaning: '资金保持投入并持续复利的时间。' }], reading: '结果应拆成累计投入和估算增长两部分。若大部分终值来自高收益率假设，而不是稳定投入，需要降低假设重新计算。', limits: ['收益率在现实中不会每年恒定。', '未计税费、产品费用和现金流中断。', '高收益假设通常伴随更高风险。'], example: '先用 4%、6%、8% 三组收益率比较，不要只保留最乐观的一组。' },
  'real-return': { question: '账面收益扣除物价上涨后，购买力真正增长了多少？', explanation: '实际收益率用 Fisher 关系同时考虑名义回报与通胀。简单相减在数值较小时接近，但精确计算能避免长期误差。', inputs: [{ name: '名义收益率', meaning: '账户或资产在货币金额上的增长率。' }, { name: '通胀率', meaning: '同一时期一般价格水平的上涨率。' }], reading: '正的实际收益表示购买力增加，负值表示金额虽然可能上涨，但能买到的商品和服务反而减少。', limits: ['个人消费篮子可能与官方通胀不同。', '未计税费和交易成本。', '名义收益与通胀应使用相同期间。'], example: '名义收益 6%、通胀 3% 时，实际收益略低于 3%，并不是恰好 3%。' },
  cagr: { question: '起点与终点之间，相当于每年以多快的速度复合增长？', explanation: 'CAGR 把一段不平滑的增长路径折算成一个等效的固定年增长率，便于比较不同期限的结果。', inputs: [{ name: '期初金额', meaning: '观察期开始时的数值。' }, { name: '期末金额', meaning: '观察期结束时的数值。' }, { name: '经过年数', meaning: '从期初到期末的完整年数。' }], reading: 'CAGR 只描述起点和终点，不展示中间经历的上涨、下跌或追加投入。', limits: ['有中途现金流时不能直接使用。', '不能代表每年的真实收益。', '不反映波动与最大回撤。'], example: '比较两个基金前，先确认计算期一致且期间没有把分红遗漏。' },
  loan: { question: '等额本息贷款每月要还多少，总利息是多少？', explanation: '等额本息把本金和利息摊进固定月供。早期余额高，月供中利息占比更大；后期本金占比逐渐提高。', inputs: [{ name: '贷款本金', meaning: '实际借入并需要偿还的本金。' }, { name: '年利率', meaning: '按年表示的合同利率。' }, { name: '贷款期限', meaning: '计划分多少期还清。' }], reading: '不要只看月供能否承担，还要看整个期限的总利息，以及月供占稳定收入的比例。', limits: ['未含手续费、保险和利率重定价。', '实际合同可能采用不同计息方式。', '提前还款规则以合同为准。'], example: '分别比较 20 年与 30 年：期限更长会降低月供，但通常显著增加总利息。' },
  'early-repay': { question: '有一笔闲钱时，提前还贷还是保留资金投资？', explanation: '提前还贷相当于获得接近贷款利率的确定性节省；投资回报不确定，还要承担波动、税费和流动性风险。', inputs: [{ name: '可还金额', meaning: '不影响应急金后可用于比较的资金。' }, { name: '贷款利率', meaning: '提前偿还所节省的融资成本。' }, { name: '替代收益率', meaning: '保留资金投资的假设回报。' }, { name: '比较年数', meaning: '两种方案共同的观察期。' }], reading: '差额只是数学比较，决策还取决于应急金、违约金、税务、风险承受能力和对负债的心理感受。', limits: ['投资收益并不确定。', '未计算提前还款违约金。', '没有建模贷款余额的完整摊还表。'], example: '先把替代收益率设为较保守的税后回报，再检查提前还款后是否仍有足够现金。' },
  'saving-goal': { question: '为了在规定时间达到目标，每月需要投入多少？', explanation: '计算器先让已有资金按假设收益率增长，再反推剩余缺口需要多少固定月度投入。', inputs: [{ name: '目标金额', meaning: '目标日期需要准备的总金额。' }, { name: '已有资金', meaning: '已经为该目标单独准备的金额。' }, { name: '年收益率', meaning: '积累期的保守回报假设。' }, { name: '目标年数', meaning: '距离用钱日期的时间。' }], reading: '如果每月投入超过可支配现金流，可延长时间、降低目标、增加一次性投入，而不是盲目提高收益率假设。', limits: ['未自动把目标金额按通胀上调。', '收益率不会恒定。', '投入中断会造成缺口。'], example: '教育金等刚性目标宜使用更保守的收益率，并额外预留 10%—20% 缓冲。' },
  emergency: { question: '家庭应急金需要覆盖多少个月、准备多少金额？', explanation: '安全垫取决于必要支出、收入波动和家庭责任。收入越不稳定、需要照顾的人越多，覆盖月数通常越长。', inputs: [{ name: '每月必要支出', meaning: '不能轻易削减的住房、食品、医疗和基本还款。' }, { name: '收入波动等级', meaning: '从稳定工资到高度波动收入的简化等级。' }, { name: '家庭责任人数', meaning: '收入中断时仍需要承担基本开支的人数。' }], reading: '结果是规划起点，不是统一标准。应急金要放在安全、可快速取用的位置，并与日常消费账户分开。', limits: ['没有考虑保险赔付时间。', '没有区分双收入与单收入家庭。', '大额已知支出不应由应急金承担。'], example: '先按必要支出而非全部消费计算，再单独为一年内已知支出建立账户。' },
  retirement: { question: '退休时需要多少资金，现在每月要积累多少？', explanation: '先用通胀把当前生活成本推算到退休时，再用计划提取率估算资金目标，并扣除已有资金的未来价值。', inputs: [{ name: '年龄与退休年龄', meaning: '决定积累期长度。' }, { name: '当前月支出', meaning: '用今天购买力表示的生活标准。' }, { name: '通胀与收益率', meaning: '分别影响未来支出和资产增长。' }, { name: '计划提取率', meaning: '退休后第一年从组合提取的比例假设。' }], reading: '重点看缺口对通胀、收益率和提取率的敏感度。提取率越高，目标金额越低，但资金耗尽风险越高。', limits: ['未计养老金、税收和医疗支出变化。', '退休期收益顺序会显著影响结果。', '提取率不是安全保证。'], example: '至少计算基准、低收益和高通胀三个情景，并每年更新一次。' },
  dcf: { question: '一组未来自由现金流，折算到今天大约值多少？', explanation: 'DCF 逐年预测现金流并按风险要求回报率折现，预测期之后用终值代表更远期现金流，再加现金、减有息债务得到简化股权价值。', inputs: [{ name: '自由现金流', meaning: '企业经营后可供资本提供者分配的现金基础。' }, { name: '增长率', meaning: '预测期现金流增长假设。' }, { name: '折现率', meaning: '反映时间价值与风险的要求回报。' }, { name: '永续增长率', meaning: '成熟阶段的长期增长假设。' }], reading: '不要只读单一结果。增长率、折现率和终值占比是最重要的敏感变量，应形成估值区间。', limits: ['简化模型未处理股份变化和复杂资本结构。', '折现率必须高于永续增长率。', '终值过高通常意味着结论依赖遥远假设。'], example: '固定其他变量，分别把折现率上下调整 1%，观察估值区间是否仍可接受。' },
  bond: { question: '给定票息、期限和市场收益率，债券理论价格是多少？', explanation: '债券价格等于未来每期票息和到期本金的现值之和。市场要求收益率上升时，旧债现金流需要以更低价格才能提供相同回报。', inputs: [{ name: '面值', meaning: '到期偿还的合同本金。' }, { name: '票息率', meaning: '决定每年票息金额的合同利率。' }, { name: '到期收益率', meaning: '市场对相同风险与期限要求的回报。' }, { name: '剩余期限', meaning: '距离本金偿还还有多久。' }], reading: '价格高于面值称溢价，低于面值称折价；这并不自动代表贵或便宜，而是票息与市场收益率的关系。', limits: ['假设票息一年支付一次。', '未计违约、税收和流动性。', '到期收益率隐含票息按同一利率再投资。'], example: '将收益率提高 1% 再计算，可直观看到长期债券对利率更敏感。' },
  position: { question: '在预设最大损失和止损距离下，单笔仓位最多多大？', explanation: '先用组合资产乘以单笔风险比例得到可承受损失，再除以止损距离，反推理论仓位。', inputs: [{ name: '组合总资产', meaning: '所有可投资资产的当前总值。' }, { name: '单笔可承受损失', meaning: '一次判断错误最多允许损失的比例。' }, { name: '止损距离', meaning: '入场价到退出价的预计跌幅。' }, { name: '单位价格', meaning: '换算可购买数量的当前价格。' }], reading: '仓位控制不能提高判断胜率，它只限制一次错误对整体组合的伤害。结果应向下取整并留出滑点空间。', limits: ['跳空可能让实际退出价差于止损价。', '流动性不足会放大损失。', '相关持仓可能同时触发止损。'], example: '若多个仓位受同一行业驱动，应把它们视为一个风险簇共同限额。' },
  'fee-impact': { question: '看似很小的年费率差异，长期会少留下多少钱？', explanation: '费用不仅每年直接扣除资产，还减少了未来能继续复利的本金，因此时间越长，差额通常越明显。', inputs: [{ name: '本金与每年新增', meaning: '开始资产和后续投入。' }, { name: '费用前收益率', meaning: '尚未扣除产品费用的假设回报。' }, { name: '两档费用率', meaning: '需要比较的低费与高费方案。' }, { name: '投资年数', meaning: '费用持续影响复利的时间。' }], reading: '费用低不等于产品一定更好，但在策略和风险暴露相近时，费用是少数可以事前确定的差异。', limits: ['未计税收、申赎费和交易成本。', '两个产品的跟踪误差可能不同。', '收益率假设不会恒定。'], example: '用 10、20、30 年分别计算，会看到费用差距并非线性增加。' },
};

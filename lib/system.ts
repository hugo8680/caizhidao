export type KnowledgeTopic = {
  title: string;
  en: string;
  summary: string;
  concepts: string[];
};

export type Discipline = {
  slug: string;
  no: string;
  name: string;
  en: string;
  question: string;
  summary: string;
  tone: string;
  topics: KnowledgeTopic[];
};

export const disciplines: Discipline[] = [
  {
    slug: 'microeconomics', no: '01', name: '微观经济学', en: 'Microeconomics', tone: 'copper', question: '有限资源，应该如何选择？',
    summary: '从个人与企业的选择出发，理解价格、竞争、效率以及市场为什么有时会失灵。',
    topics: [
      { title: '稀缺与选择', en: 'Choice', summary: '所有经济问题都始于资源有限，而人的目标很多。', concepts: ['稀缺', '机会成本', '边际分析', '沉没成本', '激励'] },
      { title: '供需与价格', en: 'Price', summary: '价格是买卖双方分散信息与行动共同形成的信号。', concepts: ['需求', '供给', '市场均衡', '价格弹性', '消费者剩余'] },
      { title: '企业与竞争', en: 'Competition', summary: '企业用技术、组织与成本结构参与不同形态的竞争。', concepts: ['生产函数', '规模经济', '完全竞争', '垄断', '寡头博弈'] },
      { title: '福利与失灵', en: 'Welfare', summary: '市场很强大，但外部性、公共品和信息差会让结果偏离社会最优。', concepts: ['外部性', '公共品', '信息不对称', '逆向选择', '道德风险'] },
    ],
  },
  {
    slug: 'macroeconomics', no: '02', name: '宏观经济学', en: 'Macroeconomics', tone: 'green', question: '一个经济体为什么增长、繁荣或衰退？',
    summary: '观察整个经济体的产出、就业、通胀、增长与周期，以及政策如何影响总需求。',
    topics: [
      { title: '国民经济核算', en: 'National Accounts', summary: '用统一账户记录一个经济体在一段时间里生产与支出的全貌。', concepts: ['国内生产总值', '名义与实际 GDP', '国民收入', '消费', '投资'] },
      { title: '长期增长', en: 'Growth', summary: '人口、资本、人力与技术共同决定长期生活水平。', concepts: ['生产率', '资本积累', '人力资本', '技术进步', '潜在产出'] },
      { title: '经济周期', en: 'Business Cycle', summary: '需求、库存、信贷与预期让经济围绕长期趋势上下波动。', concepts: ['扩张', '过热', '衰退', '复苏', '产出缺口'] },
      { title: '通胀与就业', en: 'Inflation & Jobs', summary: '价格与劳动力市场是判断经济冷热的两组核心信号。', concepts: ['通货膨胀', '居民消费价格指数', '失业率', '劳动参与率', '菲利普斯曲线'] },
    ],
  },
  {
    slug: 'money-banking', no: '03', name: '货币与银行', en: 'Money & Banking', tone: 'gold', question: '钱从哪里来，信用如何扩张？',
    summary: '理解货币、银行资产负债表、央行政策与利率体系如何支撑现代经济。',
    topics: [
      { title: '货币与信用', en: 'Money & Credit', summary: '货币既是支付工具，也是由制度和信用维系的社会关系。', concepts: ['货币职能', '货币供应量', '信用创造', '流动性', '货币乘数'] },
      { title: '商业银行', en: 'Banking', summary: '银行通过期限转换与风险筛选连接储蓄者和借款人。', concepts: ['存款', '贷款', '资本充足率', '净息差', '银行挤兑'] },
      { title: '中央银行', en: 'Central Banking', summary: '央行用政策利率、资产负债表与预期管理影响金融条件。', concepts: ['政策利率', '公开市场操作', '存款准备金', '量化宽松', '最后贷款人'] },
      { title: '利率体系', en: 'Interest Rates', summary: '不同期限与风险的资金价格共同构成利率网络。', concepts: ['实际利率', '基准利率', '信用利差', '收益率曲线', '期限溢价'] },
    ],
  },
  {
    slug: 'financial-markets', no: '04', name: '金融市场', en: 'Financial Markets', tone: 'blue', question: '资产价格是怎样被发现的？',
    summary: '从交易制度到股票、债券、基金和衍生品，理解资本如何流向不同资产。',
    topics: [
      { title: '市场机制', en: 'Market Structure', summary: '订单、做市、清算与信息共同决定交易是否顺畅。', concepts: ['一级市场', '二级市场', '订单簿', '买卖价差', '价格发现'] },
      { title: '股票市场', en: 'Equities', summary: '股票把企业剩余收益与风险分配给股东。', concepts: ['普通股', '优先股', '首次公开发行', '股息', '市值'] },
      { title: '债券市场', en: 'Fixed Income', summary: '债券把未来现金流、信用风险与利率风险写进合同。', concepts: ['国债', '公司债', '票息', '到期收益率', '久期'] },
      { title: '基金与另类资产', en: 'Funds & Alternatives', summary: '不同载体把一篮子资产或特殊风险敞口组合起来。', concepts: ['共同基金', '交易型基金', '房地产投资信托', '商品', '私募股权'] },
    ],
  },
  {
    slug: 'investment', no: '05', name: '投资与组合', en: 'Investment & Portfolio', tone: 'sage', question: '如何在不确定中配置未来？',
    summary: '把目标、期限、风险、相关性、费用和行为约束放进一个可以长期执行的组合。',
    topics: [
      { title: '风险与回报', en: 'Risk & Return', summary: '回报是承担不确定性的补偿，风险则有很多不同面孔。', concepts: ['预期收益', '波动率', '风险溢价', '最大回撤', '尾部风险'] },
      { title: '资产配置', en: 'Allocation', summary: '用不同风险来源的资产服务于不同时间和目标。', concepts: ['战略配置', '战术配置', '相关性', '分散投资', '再平衡'] },
      { title: '绩效评价', en: 'Performance', summary: '把结果拆成市场、策略、成本与运气，避免只看收益率。', concepts: ['基准', '阿尔法', '贝塔', '夏普比率', '业绩归因'] },
      { title: '投资流程', en: 'Process', summary: '好流程让研究、执行与复盘不被一时情绪接管。', concepts: ['投资政策书', '定期定额', '安全边际', '仓位管理', '尽职调查'] },
    ],
  },
  {
    slug: 'corporate-finance', no: '06', name: '公司金融', en: 'Corporate Finance', tone: 'violet', question: '企业怎样创造、融资与分配价值？',
    summary: '研究企业如何选择项目、筹集资本、管理现金并在股东与债权人之间分配风险。',
    topics: [
      { title: '投资决策', en: 'Investment', summary: '把项目未来现金流折回今天，判断投入是否创造价值。', concepts: ['货币时间价值', '净现值', '内部收益率', '资本预算', '实物期权'] },
      { title: '融资与资本结构', en: 'Financing', summary: '债务和权益的组合会改变资本成本、控制权与困境风险。', concepts: ['权益融资', '债务融资', '财务杠杆', '资本结构', '加权资本成本'] },
      { title: '企业估值', en: 'Valuation', summary: '价值来自未来现金流、增长质量与风险，而不是一个孤立倍数。', concepts: ['自由现金流', '现金流折现', '终值', '市盈率', '企业价值'] },
      { title: '治理与交易', en: 'Governance', summary: '治理、分红、回购与并购决定价值如何被保护和重新配置。', concepts: ['代理问题', '公司治理', '股利政策', '股份回购', '并购'] },
    ],
  },
  {
    slug: 'accounting', no: '07', name: '会计与报表', en: 'Accounting & Statements', tone: 'coral', question: '一家公司真实发生了什么？',
    summary: '按照确认、计量和列报规则记录商业活动，并用三张报表反映盈利、资产与现金流。',
    topics: [
      { title: '会计语言', en: 'Accounting Language', summary: '权责发生、确认和计量把经营事实转为统一记录。', concepts: ['会计等式', '权责发生制', '收入确认', '折旧', '会计估计'] },
      { title: '三张报表', en: 'Three Statements', summary: '利润、家底与现金必须联读，任何一张表都不完整。', concepts: ['资产负债表', '利润表', '现金流量表', '所有者权益', '报表勾稽'] },
      { title: '盈利质量', en: 'Earnings Quality', summary: '检查利润是否可持续、能否变成现金以及是否依赖会计判断。', concepts: ['毛利率', '经营利润', '应收账款', '存货周转', '现金转换率'] },
      { title: '财务分析', en: 'Analysis', summary: '比率是发现问题的线索，需要趋势、同行和业务共同解释。', concepts: ['流动比率', '资产负债率', '利息保障倍数', '净资产收益率', '投入资本回报率'] },
    ],
  },
  {
    slug: 'personal-finance', no: '08', name: '个人财务', en: 'Personal Finance', tone: 'rose', question: '如何让钱服务于真实生活？',
    summary: '从现金流与安全垫出发，协调债务、保障、住房、教育与退休等长期目标。',
    topics: [
      { title: '现金流与目标', en: 'Cash Flow', summary: '先知道钱去了哪里，再让每一笔资金承担明确任务。', concepts: ['预算', '储蓄率', '净资产', '应急金', '财务目标'] },
      { title: '信用与债务', en: 'Debt', summary: '债务把未来收入搬到今天，成本与期限决定它是工具还是负担。', concepts: ['信用记录', '实际年化利率', '债务收入比', '等额本息', '提前还款'] },
      { title: '保险与保障', en: 'Protection', summary: '用可承受保费转移家庭无法独自承担的重大风险。', concepts: ['风险转移', '保障缺口', '免赔额', '等待期', '责任保险'] },
      { title: '长期规划', en: 'Planning', summary: '住房、教育和退休都要同时考虑通胀、税费、回报与不确定性。', concepts: ['租买决策', '教育金', '退休缺口', '提取率', '遗产规划'] },
    ],
  },
  {
    slug: 'public-finance', no: '09', name: '公共财政', en: 'Public Finance', tone: 'amber', question: '政府为什么征税、支出和借债？',
    summary: '理解公共服务、税收设计、财政预算、社会保障以及政策如何改变激励与分配。',
    topics: [
      { title: '税收原理', en: 'Taxation', summary: '税收既筹集收入，也会改变价格、行为和收入分配。', concepts: ['税基', '边际税率', '累进税', '税收归宿', '超额负担'] },
      { title: '政府预算', en: 'Budget', summary: '财政收入与支出在周期中形成赤字、盈余和公共债务。', concepts: ['财政赤字', '政府债务', '债务利息', '自动稳定器', '财政乘数'] },
      { title: '公共服务', en: 'Public Services', summary: '公共品、教育、医疗与基础设施常需要集体融资和治理。', concepts: ['公共品', '社会保险', '转移支付', '基础设施', '成本收益分析'] },
      { title: '政策评价', en: 'Policy Evaluation', summary: '政策不能只看意图，还要比较效果、成本、替代方案和分配影响。', concepts: ['反事实', '随机试验', '成本效果', '监管影响', '代际公平'] },
    ],
  },
  {
    slug: 'international-economics', no: '10', name: '国际经济', en: 'International Economics', tone: 'teal', question: '商品、资本与货币如何跨越边界？',
    summary: '把贸易、汇率、国际收支、资本流动和全球政策冲击放在同一张地图中。',
    topics: [
      { title: '国际贸易', en: 'Trade', summary: '比较优势解释交换收益，现实贸易还受规模、产业与制度影响。', concepts: ['比较优势', '贸易收益', '关税', '配额', '全球价值链'] },
      { title: '汇率', en: 'Exchange Rates', summary: '汇率同时是一种相对价格、资产价格和政策传导渠道。', concepts: ['即期汇率', '实际有效汇率', '购买力平价', '利率平价', '汇率制度'] },
      { title: '国际收支', en: 'Balance of Payments', summary: '经常账户与金融账户记录一国与世界的真实和金融往来。', concepts: ['经常账户', '资本账户', '外汇储备', '资本流动', '外债'] },
      { title: '全球冲击', en: 'Global Shocks', summary: '美元周期、商品价格与金融传染会让一国风险跨境扩散。', concepts: ['美元周期', '主权债务', '货币危机', '资本突然停止', '金融传染'] },
    ],
  },
  {
    slug: 'behavioral-economics', no: '11', name: '行为经济学', en: 'Behavioral Economics', tone: 'plum', question: '人为什么经常不按“理性”行动？',
    summary: '研究注意力、情绪、社会规范和认知捷径如何系统性地影响经济与金融选择。',
    topics: [
      { title: '判断捷径', en: 'Heuristics', summary: '有限时间和注意力让人依赖快速但可能偏误的判断规则。', concepts: ['锚定效应', '可得性偏差', '代表性偏差', '确认偏误', '过度自信'] },
      { title: '风险决策', en: 'Risk Decisions', summary: '人对损失、概率和参照点的感受并不线性。', concepts: ['损失厌恶', '前景理论', '框架效应', '概率加权', '禀赋效应'] },
      { title: '时间与自控', en: 'Time & Self-control', summary: '当下诱惑与未来目标之间的冲突会改变储蓄、消费和投资。', concepts: ['双曲贴现', '现时偏好', '承诺机制', '心理账户', '默认选项'] },
      { title: '群体与市场', en: 'Social Behavior', summary: '从众、叙事与社会比较会把个体偏差放大为市场现象。', concepts: ['羊群效应', '信息瀑布', '社会规范', '叙事经济学', '市场情绪'] },
    ],
  },
  {
    slug: 'fintech-risk', no: '12', name: '金融科技与风险', en: 'FinTech & Risk', tone: 'slate', question: '技术改变了什么，又没有改变什么？',
    summary: '理解数字支付、平台金融、模型风控、数字资产以及技术系统带来的新型脆弱性。',
    topics: [
      { title: '支付与平台', en: 'Payments', summary: '数字支付降低交易摩擦，也带来网络效应、数据与集中度问题。', concepts: ['支付清算', '电子钱包', '双边平台', '开放银行', '嵌入式金融'] },
      { title: '数据与模型', en: 'Data & Models', summary: '数据能改善定价和风控，也可能带来偏差、黑箱和顺周期风险。', concepts: ['信用评分', '机器学习', '模型风险', '算法偏见', '压力测试'] },
      { title: '数字资产', en: 'Digital Assets', summary: '分布式账本重构记录方式，却不能取消价值、治理与托管约束。', concepts: ['区块链', '稳定币', '智能合约', '代币化', '数字托管'] },
      { title: '系统与安全', en: 'System & Security', summary: '网络攻击、操作失败与高连接性可能把局部故障扩散成系统事件。', concepts: ['操作风险', '网络安全', '流动性螺旋', '系统性风险', '监管科技'] },
    ],
  },
];

export const popularQuestions = [
  { domain: '宏观经济', question: '为什么工资涨了，我却没有觉得更富？', answer: '真正影响生活的是实际购买力：名义工资要扣除物价变化，还要看住房、教育等个人消费篮子。', href: '/knowledge/inflation/' },
  { domain: '货币银行', question: '央行加息，为什么房价和股价也会受影响？', answer: '利率既改变借钱成本，也改变未来现金流的折现率和投资者愿意承担风险的程度。', href: '/knowledge/interest-rate/' },
  { domain: '微观经济', question: '演唱会门票为什么越抢越贵？', answer: '短期供给几乎固定，需求突然增加时，价格会承担稀缺资源的分配功能。', href: '/atlas/microeconomics/' },
  { domain: '金融市场', question: '股票为什么每天都在涨跌？', answer: '价格不断吸收盈利预期、利率、风险偏好和新信息，交易的是未来而不只是今天。', href: '/knowledge/stock/' },
  { domain: '公司金融', question: '好公司为什么不一定是好投资？', answer: '公司质量只是价值的一部分；如果买入价格已经包含过高预期，未来回报仍可能很低。', href: '/knowledge/pe-ratio/' },
  { domain: '会计报表', question: '公司有利润，为什么还会缺现金？', answer: '赊销、囤货和资本支出都可能让利润暂时不能转化为可用现金。', href: '/knowledge/cash-flow-statement/' },
  { domain: '投资组合', question: '买了很多基金，为什么还是没有分散？', answer: '名称不同不等于风险不同；多只基金可能重复持有同一批股票或受同一市场驱动。', href: '/knowledge/diversification/' },
  { domain: '个人财务', question: '提前还贷还是继续投资？', answer: '需要比较确定性利息节省、税费、替代投资的风险后回报、流动性与心理压力。', href: '/tools/early-repay/' },
  { domain: '公共财政', question: '政府为什么不能无限印钱？', answer: '货币能改变名义购买力的分配，却不能凭空创造真实商品、服务和生产能力。', href: '/atlas/public-finance/' },
  { domain: '国际经济', question: '汇率上涨，到底是谁升值了？', answer: '汇率的含义取决于报价方向；一种货币的升值必然是相对另一种货币而言。', href: '/knowledge/exchange-rate/' },
  { domain: '行为经济', question: '亏损后为什么更容易做出冒险决定？', answer: '损失厌恶与参照点会让人试图“翻本”，从而接受原本不会承担的风险。', href: '/atlas/behavioral-economics/' },
  { domain: '金融科技', question: '技术更先进，金融产品就更安全吗？', answer: '技术能提高效率，也会新增模型、托管、网络与平台集中风险；经济约束不会因界面更漂亮而消失。', href: '/knowledge/systemic-risk/' },
];

export type LearningStep = {
  title: string;
  note: string;
  explanation: string;
  example: string;
};

export type LearningRoute = {
  slug: string;
  no: string;
  title: string;
  en: string;
  question: string;
  description: string;
  minutes: number;
  steps: LearningStep[];
};

export const learningRoutes: LearningRoute[] = [
  { slug: 'money-is-born', no: '01', title: '钱是怎样诞生的', en: 'How Money Works', question: '从一张纸币走进现代信用体系', description: '理解货币职能、银行放贷、央行与利率如何共同塑造我们使用的钱。', minutes: 42, steps: [
    { title: '货币为什么被接受', note: '交换、记账与储值', explanation: '货币不一定有很高的自身用途，关键是大家相信它能继续被别人接受。它同时提供交易媒介、计价单位和储值工具，让陌生人之间不必以物易物。', example: '一张纸币能买到早餐，不是因为纸张值这个价，而是商家相信下一位交易者也会接受它。' },
    { title: '银行怎样创造信用', note: '资产负债表与贷款', explanation: '商业银行发放贷款时，会同时形成一项贷款资产和借款人账户中的存款负债。信用因此扩张，但并非没有约束：资本、流动性、借款人质量与监管都会限制放贷。', example: '银行批准 100 万元住房贷款后，购房者账户出现可支付存款，银行则持有未来收回本息的债权。' },
    { title: '利率为何是钱的价格', note: '时间、风险与通胀', explanation: '利率补偿出借者放弃当前使用资金的机会，也反映通胀、违约和期限风险。不同借款人、不同期限的资金不会只有一个统一价格。', example: '同样借 10 万元，信用更弱或期限更长的借款人通常要支付更高利率。' },
    { title: '央行如何影响经济', note: '政策传导与预期', explanation: '央行通过政策利率、公开市场操作和预期沟通改变金融机构的资金成本。影响会沿着存贷款利率、资产价格、汇率与信心逐步传到消费和投资。', example: '加息不会直接命令房价下跌，但会提高按揭成本并提高估值折现率，从而改变需求。' },
    { title: '通胀如何改变购买力', note: '名义与实际世界', explanation: '货币数量增长并不自动创造更多真实商品。当名义需求增长快于供给能力时，价格可能上升，同样金额能购买的东西变少。', example: '工资上涨 5% 而个人生活成本上涨 7% 时，名义收入增加，实际购买力仍下降。' },
  ] },
  { slug: 'price-mystery', no: '02', title: '价格背后的秘密', en: 'Why Prices Move', question: '从咖啡、房租到演唱会门票', description: '用供需、弹性、竞争与市场失灵解释日常价格，而不是只把涨跌归结为“资本”。', minutes: 38, steps: [
    { title: '稀缺迫使人选择', note: '机会成本', explanation: '资源、时间和预算都有限，选择一项用途就意味着放弃另一项用途。经济成本因此不只包括付出去的钱，也包括被放弃的最好机会。', example: '用周末加班赚 800 元的机会成本，可能是休息、陪伴家人或学习新技能。' },
    { title: '需求与供给相遇', note: '均衡价格', explanation: '买方愿意购买的数量和卖方愿意提供的数量会随价格变化。价格并非由单方随意决定，而是在约束与议价能力下协调双方行动。', example: '演唱会座位短期固定，而想入场的人突然增加，有限门票会承受更强的涨价压力。' },
    { title: '谁对价格更敏感', note: '弹性', explanation: '弹性描述数量对价格变化的反应程度。替代品多、可以推迟购买的商品，需求通常更敏感；急需品在短期内往往不敏感。', example: '咖啡涨价后可以换店，需求可能下降；急救药即使涨价，短期需求也难大幅减少。' },
    { title: '竞争如何改变价格', note: '市场结构', explanation: '卖家数量、进入壁垒、产品差异和信息透明度决定企业有多大定价能力。竞争越充分，企业通常越难长期维持超额利润。', example: '同质化餐饮街价格接近，而拥有独家专利的药品在保护期内可能拥有更强定价权。' },
    { title: '市场何时会失灵', note: '外部性与信息差', explanation: '如果交易影响到没有参与的人，或买卖双方掌握的信息严重不对称，市场价格就可能没有包含全部社会成本和风险。', example: '污染成本由周边居民承担时，企业产品价格可能低于真实社会成本，需要规则进行校正。' },
  ] },
  { slug: 'economic-cycle', no: '03', title: '一轮经济周期', en: 'The Economic Cycle', question: '经济为什么会繁荣、过热、衰退再复苏', description: '把 GDP、就业、通胀、政策与收益率曲线放在同一条时间线上。', minutes: 55, steps: [
    { title: 'GDP 记录了什么', note: '产出与支出', explanation: 'GDP 统计一定时期内最终商品与服务的市场价值，可从生产、收入或支出角度核算。它衡量经济活动规模，但不等于居民幸福、财富存量或分配公平。', example: '灾后重建会增加当期 GDP，却不代表灾害让社会更富。' },
    { title: '增长来自哪里', note: '资本与生产率', explanation: '长期增长依靠劳动、资本、人力资本和技术进步。仅靠增加投入会遇到边际回报下降，持续提高生活水平更依赖生产率。', example: '同样人数和工时，用更好的设备、流程与知识生产更多产品，体现生产率提高。' },
    { title: '通胀和就业怎样变化', note: '冷热信号', explanation: '扩张阶段需求增强、就业改善，产能紧张后价格压力可能上升；衰退时需求回落、失业增加，但供给冲击可能让通胀与疲弱增长同时出现。', example: '能源价格冲击可能一边推高物价，一边压缩企业和家庭的实际支出能力。' },
    { title: '政策如何逆周期', note: '货币与财政', explanation: '货币政策主要改变金融条件，财政政策直接影响政府支出、税收和转移支付。两者都有时滞，并会受到债务、通胀和政策可信度约束。', example: '降息可能刺激贷款和投资，但若企业对未来极度悲观，低利率也未必立刻带来扩张。' },
    { title: '市场提前交易什么', note: '收益率曲线', explanation: '市场价格反映参与者对未来政策、增长和风险的预期，因此常在经济数据确认转折前变化。但信号会出错，不能把曲线形态当作精确时钟。', example: '收益率曲线倒挂可能反映未来降息预期，却无法单独确定衰退何时开始。' },
  ] },
  { slug: 'read-a-company', no: '04', title: '看懂一家公司', en: 'Read a Business', question: '从商业模式一路走到企业价值', description: '用三张报表验证经营，用现金流和资本成本理解公司为什么值钱。', minutes: 68, steps: [
    { title: '企业如何赚钱', note: '客户、成本与竞争', explanation: '先回答客户为什么付钱、企业靠什么持续交付、成本随规模怎样变化。报表数字只有放回商业模式，才能判断利润是可持续能力还是短期偶然。', example: '订阅业务收入更稳定，但要检查获客成本、续费率和服务成本是否支持增长。' },
    { title: '利润表看经营过程', note: '收入与利润', explanation: '利润表从收入依次扣除成本、费用、利息和税，展示一段期间的经营结果。需要区分主营改善、成本波动、一次性收益和会计估计。', example: '净利润增长可能来自出售资产，而不是主营产品卖得更好。' },
    { title: '资产负债表看家底', note: '资产、负债与权益', explanation: '资产负债表是某个时点的资源与资金来源快照。资产质量、负债期限和表外承诺，比总资产数字本身更重要。', example: '大量应收账款看似是资产，但如果客户迟迟不付款，质量就值得怀疑。' },
    { title: '现金流验证利润', note: '现金含金量', explanation: '现金流量表解释现金从经营、投资和融资三类活动如何变化。长期利润无法转成经营现金，常意味着回款、存货或确认方式需要追问。', example: '企业赊销确认收入与利润，但客户尚未付款，现金可能没有同步增加。' },
    { title: '未来现金流决定价值', note: 'DCF 与安全边际', explanation: '企业价值来自未来可分配现金流的现值。增长率、资本投入和风险共同决定价值，支付价格还要为预测错误保留缓冲。', example: '好公司若买入价格已经包含极高增长预期，也可能成为回报很差的投资。' },
  ] },
  { slug: 'invest-without-noise', no: '05', title: '投资不被噪声带走', en: 'Investing with Clarity', question: '从目标出发，而不是从热门产品出发', description: '建立风险、配置、费用、行为与再平衡组成的长期投资框架。', minutes: 61, steps: [
    { title: '目标与期限', note: '投资政策书', explanation: '目标决定资金何时使用、允许多大损失和需要多少流动性。明确这些约束，可以避免根据热门产品反向修改财务目标。', example: '两年后要用的首付款，与二十年后的退休金不应采用同一风险配置。' },
    { title: '理解风险收益交换', note: '不存在免费回报', explanation: '高预期回报通常来自承担价格波动、违约、流动性或不确定现金流。分析收益时要能明确说出“我因承担什么风险获得补偿”。', example: '高收益债券的额外利息，是对更高违约风险和较差流动性的补偿。' },
    { title: '用相关性实现分散', note: '风险来源', explanation: '有效分散来自不同风险驱动，而不是产品数量。还要观察压力时期相关性是否上升，以及底层持仓是否重复。', example: '五只都重仓同一批科技股的基金，名称不同也不能提供真正分散。' },
    { title: '让费用少吃掉复利', note: '长期成本', explanation: '管理费、交易成本和税收会直接减少当期资产，也减少未来可复利的本金。费用是少数可以在投资前较确定比较的变量。', example: '相同市场暴露下，年费率差 1% 经过二十年会形成显著终值差异。' },
    { title: '按规则做再平衡', note: '恢复风险水平', explanation: '资产涨跌会让组合偏离原定风险。按时间或偏离阈值再平衡，是把风险恢复到目标水平，而不是预测下一类资产谁会涨。', example: '股票上涨后占比从 60% 变成 72%，按规则卖出部分股票并补充低风险资产。' },
  ] },
  { slug: 'family-finance', no: '06', title: '建立家庭财务系统', en: 'Household Finance', question: '安全感不是一个余额，而是一套系统', description: '让现金流、安全垫、债务、保险和退休目标互相配合。', minutes: 47, steps: [
    { title: '看清净资产与现金流', note: '财务起点', explanation: '净资产说明家庭积累了多少，现金流说明每月资金怎样流动。二者要一起看：资产不少但现金流紧张，仍可能在突发事件中被迫借款。', example: '房产价值很高但几乎没有现金储备的家庭，短期支付能力可能并不强。' },
    { title: '建立应急安全垫', note: '现金选择权', explanation: '应急金用来承接失业、疾病和紧急维修等未知事件。它追求安全和随时可用，而不是最高收益。', example: '收入稳定的双职工可从 3—6 个月必要支出起步，收入波动大的家庭需要更长覆盖。' },
    { title: '给债务排优先级', note: '成本与期限', explanation: '债务要比较实际利率、剩余期限、违约后果和是否可提前偿还。高息消费债通常优先处理，但不能因此耗尽应急金。', example: '信用卡循环利息往往高于住房贷款，应先停止新增并制定高息债清偿顺序。' },
    { title: '只转移承受不起的风险', note: '保险边界', explanation: '保险适合转移低概率但会破坏家庭资产负债表的大额损失。小额、频繁且可自行承担的支出，未必值得通过高成本保险覆盖。', example: '家庭收入支柱的身故风险通常比手机屏幕损坏更需要优先保障。' },
    { title: '用实际购买力规划退休', note: '长期缺口', explanation: '退休规划要把今天的生活费用按通胀推到未来，再考虑养老金、已有资产、投资回报和提取风险。越早开始，越多依靠时间而非高收益假设。', example: '今天每月 1 万元的生活标准，二十多年后需要的名义金额通常远高于 1 万元。' },
  ] },
  { slug: 'global-money', no: '07', title: '全球的钱如何流动', en: 'Money Across Borders', question: '贸易、汇率与资本流动如何互相牵动', description: '从比较优势走到美元周期、主权债务和跨境金融传染。', minutes: 58, steps: [
    { title: '贸易为何能创造收益', note: '比较优势', explanation: '即使一方在所有产品上都更高效，双方仍可能通过专注相对机会成本更低的领域获得总产出收益。收益如何分配则取决于价格、制度与谈判能力。', example: '贸易的总收益可以为正，但某些行业和劳动者仍可能承担转型成本。' },
    { title: '汇率是一种相对价格', note: '货币的两面', explanation: '汇率表示一种货币用另一种货币计价的价格。报价方向决定升值与贬值的含义；方向相反时，同一次变化会得到相反表述。', example: '美元兑人民币从 7.0 到 7.2，表示一美元换更多人民币，即美元相对人民币升值。' },
    { title: '国际收支记录跨境往来', note: '经常与金融账户', explanation: '经常账户记录商品、服务和收入往来，金融账户记录资产与负债变化。一个国家的贸易与跨境融资并非两套互不相关的故事。', example: '经常账户逆差需要由资本流入、储备变化或其他金融项目对应。' },
    { title: '资本为什么突然撤离', note: '风险与流动性', explanation: '当利差、汇率预期、信用风险或全球风险偏好改变时，跨境资金可能迅速重新配置。短期外币债务会放大这种压力。', example: '本币贬值会抬高外币债务的本币负担，进一步削弱偿付信心并推动资本外流。' },
    { title: '局部冲击怎样扩散', note: '系统性风险', explanation: '金融机构通过共同持仓、融资市场、支付清算和信心相互连接。局部损失若触发保证金、挤兑和被迫卖出，就可能变成系统事件。', example: '某类资产下跌导致抵押品缩水，机构卖出其他资产补充保证金，压力因此跨市场传播。' },
  ] },
  { slug: 'mind-and-money', no: '08', title: '大脑与金钱的博弈', en: 'Mind & Money', question: '为什么知道道理，仍然做错决定', description: '识别损失厌恶、锚定、从众和心理账户，并为自己设计决策护栏。', minutes: 44, steps: [
    { title: '大脑依赖快速判断', note: '启发式', explanation: '面对复杂和不完整信息时，人会用经验捷径快速判断。这些捷径节省精力，却可能让近期事件、显眼数字和生动故事获得过高权重。', example: '看到某资产连续上涨后，人容易认为上涨会继续，而忽略更长历史和基本条件。' },
    { title: '损失比收益更刺痛', note: '参照点', explanation: '人们常以买入价或近期高点作为参照，并对同等金额的损失感受更强。参照点会改变风险偏好，让亏损状态下更愿意冒险“翻本”。', example: '投资从 100 元跌到 80 元后，拒绝重新评估，只等价格回到买入价。' },
    { title: '过去投入不应绑架未来', note: '沉没成本', explanation: '已经发生且无法收回的成本，不应影响下一步是否继续。正确问题是：从现在开始，新增投入与未来收益是否仍值得。', example: '一门不适合的课程已经付费，不代表必须继续投入更多时间才能“回本”。' },
    { title: '群体会放大叙事', note: '从众与泡沫', explanation: '当价格上涨与他人赚钱的故事相互强化时，从众会让叙事看似得到价格验证。参与者越多，逆向判断的心理和职业成本越高。', example: '投资者因为“大家都在买”而入场，却说不清资产现金流或退出条件。' },
    { title: '用规则保护未来的自己', note: '承诺机制', explanation: '决策护栏是在情绪平静时预先写下投入上限、再平衡条件和冷静期，让未来的自己不必在压力中重新发明规则。', example: '规定任何单一高风险资产不超过组合 5%，加仓前等待 48 小时并写下反方理由。' },
  ] },
];

export const timelineEvents = [
  { year: '1776', title: '《国富论》出版', kind: '思想', description: '亚当·斯密系统讨论分工、交换与市场秩序。', impact: '经济学开始形成独立的分析传统。' },
  { year: '1848', title: '《政治经济学原理》出版', kind: '思想', description: '约翰·斯图亚特·密尔整理古典经济学并讨论分配与制度。', impact: '生产规律与分配制度被更清晰地区分。' },
  { year: '1871', title: '边际革命', kind: '思想', description: '杰文斯、门格尔等用边际效用重新解释价值和价格。', impact: '现代微观经济学的核心工具逐渐成形。' },
  { year: '1913', title: '美国联邦储备体系成立', kind: '制度', description: '美国建立更系统的中央银行与最后贷款人安排。', impact: '现代央行体系的重要制度节点。' },
  { year: '1929', title: '大萧条开始', kind: '危机', description: '股市崩盘、银行倒闭、通缩与失业相互强化。', impact: '改变了宏观政策、金融监管与经济思想。' },
  { year: '1936', title: '《就业、利息和货币通论》', kind: '思想', description: '凯恩斯强调总需求不足可能让经济长期停留在高失业状态。', impact: '现代宏观经济学与逆周期政策兴起。' },
  { year: '1944', title: '布雷顿森林体系', kind: '制度', description: '战后建立以美元与黄金联系为核心的国际货币秩序。', impact: 'IMF 与世界银行等机构由此诞生。' },
  { year: '1971', title: '美元停止兑换黄金', kind: '制度', description: '固定汇率体系的核心承诺终止，主要货币逐步浮动。', impact: '汇率与跨境资本流动进入新阶段。' },
  { year: '1973', title: '第一次石油危机', kind: '冲击', description: '能源价格飙升与经济停滞并存，形成“滞胀”。', impact: '政策权衡与通胀理论受到严峻挑战。' },
  { year: '1987', title: '黑色星期一', kind: '市场', description: '全球股市在短时间内剧烈下跌，程序化交易受到关注。', impact: '市场微观结构与熔断机制开始重审。' },
  { year: '1997', title: '亚洲金融危机', kind: '危机', description: '资本外流、汇率压力和外币债务形成反馈循环。', impact: '凸显外汇储备、期限错配与资本流动风险。' },
  { year: '2000', title: '互联网泡沫破裂', kind: '市场', description: '高增长叙事与极端估值在盈利无法兑现后迅速逆转。', impact: '再次展示好技术与好投资并非同义词。' },
  { year: '2008', title: '全球金融危机', kind: '危机', description: '住房信贷、证券化、杠杆与影子银行把局部风险扩散到全球。', impact: '重塑银行监管、央行工具与系统风险研究。' },
  { year: '2009', title: '比特币网络启动', kind: '技术', description: '去中心化数字账本首次实现公开运行的稀缺数字资产。', impact: '引发对货币、支付、治理与监管的新讨论。' },
  { year: '2010', title: '欧洲主权债务危机', kind: '危机', description: '银行、政府债务与共同货币制度之间的张力集中暴露。', impact: '财政联盟、货币联盟与风险共担成为焦点。' },
  { year: '2020', title: '全球疫情冲击', kind: '冲击', description: '供给停摆与需求骤降同时发生，财政和货币政策快速扩张。', impact: '重新认识供应链、公共健康与宏观稳定的联系。' },
  { year: '2022', title: '全球通胀与快速加息', kind: '政策', description: '供给冲击、需求恢复与政策退出推动主要央行迅速收紧。', impact: '久期、杠杆和资产估值风险重新定价。' },
  { year: '2023', title: '区域性银行压力', kind: '危机', description: '快速加息暴露部分银行的利率风险、存款集中与未实现损失。', impact: '提醒市场：流动性与偿付能力会相互传染。' },
];

export const knowledgeNodeCount = disciplines.reduce((sum, item) => sum + item.topics.reduce((topicSum, topic) => topicSum + topic.concepts.length, 0), 0);

export function getLearningRoute(slug: string) {
  return learningRoutes.find((route) => route.slug === slug);
}

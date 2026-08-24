export type CourseLesson = {
  id: number;
  title: string;
  minutes: number;
  summary: string;
  key: string;
  practice: string;
};

export type Course = {
  slug: string;
  title: string;
  en: string;
  level: '入门' | '进阶' | '专业';
  duration: string;
  category: string;
  description: string;
  accent: string;
  outcomes: string[];
  lessons: CourseLesson[];
};

export const courses: Course[] = [
  {
    slug: 'finance-foundations', title: '金融通识入门', en: 'Finance Foundations', level: '入门', duration: '2.2 小时', category: '基础框架', accent: 'amber',
    description: '从货币、利率和风险开始，建立理解所有金融问题都能复用的底层框架。',
    outcomes: ['理解货币随时间变化的原因', '区分名义收益与实际购买力', '用风险、收益和流动性比较金融产品'],
    lessons: [
      { id: 1, title: '货币为什么有价值', minutes: 14, summary: '从交换媒介、记账单位和价值储藏理解货币。', key: '货币价值来自可接受性、稀缺性与制度信用', practice: '列出现金同时具有的三种用途。' },
      { id: 2, title: '货币时间价值', minutes: 16, summary: '把不同时间点的金额放到同一把尺子上比较。', key: '未来价值 = 本金 ×（1 + 利率）ⁿ', practice: '计算 1 万元按 4% 增长 3 年后的金额。' },
      { id: 3, title: '复利与 72 法则', minutes: 15, summary: '理解收益再次产生收益以及时间的放大作用。', key: '翻倍年数约 = 72 ÷ 年收益率', practice: '用 72 法则估算 6% 收益率的翻倍时间。' },
      { id: 4, title: '通胀与真实购买力', minutes: 17, summary: '账户余额增长不等于生活购买力增长。', key: '实际收益率 ≈ 名义收益率 − 通胀率', practice: '比较 5% 存款收益与 3% 通胀后的真实变化。' },
      { id: 5, title: '利率是资金的价格', minutes: 18, summary: '利率连接储蓄者、借款人和资产价格。', key: '实际利率 ≈ 名义利率 − 预期通胀', practice: '解释加息为什么通常压低旧债券价格。' },
      { id: 6, title: '风险不只是波动', minutes: 17, summary: '认识永久损失、流动性与目标落空等多维风险。', key: '风险 = 不利结果 × 发生概率 × 承受后果', practice: '为一笔两年后要用的钱列出三种风险。' },
      { id: 7, title: '收益从哪里来', minutes: 16, summary: '把投资收益拆成现金流、增长与价格变化。', key: '总回报 = 收入回报 + 资本利得', practice: '区分债券票息与债券价格变化。' },
      { id: 8, title: '金融地图总复盘', minutes: 18, summary: '用时间、风险、流动性和成本比较任意金融决策。', key: '目标 → 期限 → 风险 → 工具 → 成本', practice: '用五步框架分析一个真实储蓄目标。' },
    ],
  },
  {
    slug: 'personal-finance', title: '个人财务规划', en: 'Personal Financial Planning', level: '入门', duration: '2.6 小时', category: '个人理财', accent: 'green',
    description: '建立现金流、应急金、保障、负债与长期目标协同运转的个人财务系统。',
    outcomes: ['制作个人资产负债表', '规划应急金和债务优先级', '把住房、保险与养老放进统一计划'],
    lessons: [
      { id: 1, title: '目标与净资产', minutes: 18, summary: '把模糊愿望改写为金额、日期和行动。', key: '净资产 = 总资产 − 总负债', practice: '制作一张自己的简版净资产表。' },
      { id: 2, title: '分账户预算', minutes: 18, summary: '提前为必要支出、目标和自由消费划定边界。', key: '收入 = 必要支出 + 目标储蓄 + 自由支出', practice: '为下月收入设置三个账户比例。' },
      { id: 3, title: '应急金规模', minutes: 17, summary: '根据收入稳定性和家庭责任确定安全垫。', key: '应急金 = 月必要支出 × 覆盖月数', practice: '计算 3、6、9 个月三档目标。' },
      { id: 4, title: '债务清偿顺序', minutes: 19, summary: '比较高利率优先法与小余额优先法。', key: '数学最优：先偿还实际利率最高的债务', practice: '为三笔债务排出还款顺序。' },
      { id: 5, title: '信用与实际年化成本', minutes: 20, summary: '识别分期费率背后的真实融资成本。', key: '借款成本 = 利息 + 手续费 + 其他强制费用', practice: '把一笔月费率分期换算为总成本。' },
      { id: 6, title: '保险与保障缺口', minutes: 19, summary: '从无法自行承担的家庭损失反推保额。', key: '保障缺口 = 未来责任 + 债务 − 可用资产', practice: '列出家庭最需要转移的三项风险。' },
      { id: 7, title: '租房、买房与房贷', minutes: 22, summary: '比较交易成本、利息、维护和迁移自由。', key: '持有成本 = 利息 + 税费 + 维护 + 机会成本', practice: '为自己的城市制作租买比较表。' },
      { id: 8, title: '养老目标与年度复盘', minutes: 22, summary: '用实际购买力测算长期缺口并定期调整。', key: '退休缺口 = 预计支出现值 − 其他收入现值', practice: '写下一页年度财务复盘清单。' },
    ],
  },
  {
    slug: 'investment-products', title: '投资产品全景', en: 'Investment Products', level: '入门', duration: '2.8 小时', category: '投资工具', accent: 'blue',
    description: '逐一理解现金、债券、股票、基金、保险与实物资产的收益来源和风险边界。',
    outcomes: ['读懂常见投资产品说明', '识别收益来源与主要风险', '避免把不同风险的产品只按收益率排序'],
    lessons: [
      { id: 1, title: '现金与货币基金', minutes: 16, summary: '理解流动性、安全性和通胀成本。', key: '现金价值 = 支付能力 + 选择权 + 缓冲', practice: '为应急金选择合适的存放方式。' },
      { id: 2, title: '存款与结构性产品', minutes: 20, summary: '区分存款保障、期限和嵌入式衍生条件。', key: '高展示收益不等于高确定收益', practice: '找出一份产品说明中的触发条件。' },
      { id: 3, title: '债券与信用风险', minutes: 21, summary: '认识票息、到期收益率、信用与久期。', key: '债券回报 = 票息 + 价格变化', practice: '比较短久期和长久期债券的利率风险。' },
      { id: 4, title: '股票与股东权益', minutes: 20, summary: '股票代表企业剩余现金流的所有权。', key: '股东回报 = 盈利增长 + 分红 + 估值变化', practice: '拆解一只股票近年的回报来源。' },
      { id: 5, title: '主动基金与指数基金', minutes: 21, summary: '从策略、费用和跟踪误差比较基金。', key: '净回报 = 资产回报 − 费用 − 税费', practice: '比较两只同类基金的总费用。' },
      { id: 6, title: 'ETF 的交易机制', minutes: 20, summary: '理解净值、市场价格、折溢价与流动性。', key: 'ETF 价格围绕基金净值波动', practice: '查看一只 ETF 的折溢价和成交量。' },
      { id: 7, title: '黄金、商品与房地产', minutes: 22, summary: '区分现金流资产与非现金流资产。', key: '实物资产也有持有、融资和变现成本', practice: '分析黄金与出租房的收益结构差异。' },
      { id: 8, title: '产品尽调与骗局识别', minutes: 20, summary: '核验主体、托管、费用、退出与盈利来源。', key: '高收益且低风险的承诺需要反向验证', practice: '用五项清单检查一款真实产品。' },
    ],
  },
  {
    slug: 'financial-statements', title: '财务报表阅读', en: 'Reading Financial Statements', level: '进阶', duration: '3.1 小时', category: '财务分析', accent: 'coral',
    description: '把三张报表连起来，识别盈利质量、资产风险、现金流与企业经营效率。',
    outcomes: ['理解三张报表如何勾连', '识别利润与现金的差异', '用关键比率提出而不是掩盖问题'],
    lessons: [
      { id: 1, title: '三张报表的地图', minutes: 21, summary: '利润表看过程、资产负债表看时点、现金流量表看现金。', key: '利润 ≠ 现金，三张表必须互相验证', practice: '在一份年报中找到三张主表。' },
      { id: 2, title: '收入、成本与毛利', minutes: 22, summary: '从收入确认和成本结构理解单位经济性。', key: '毛利 = 营业收入 − 营业成本', practice: '比较一家企业三年的毛利率。' },
      { id: 3, title: '费用与营业利润', minutes: 20, summary: '区分维持经营、增长投入和一次性项目。', key: '营业利润更接近主营经营结果', practice: '标记一项经常性费用和一次性收益。' },
      { id: 4, title: '资产质量', minutes: 24, summary: '检查应收、存货、商誉与固定资产的含金量。', key: '账面资产不一定能按账面价值变现', practice: '计算应收账款与存货周转天数。' },
      { id: 5, title: '负债与偿债能力', minutes: 23, summary: '关注负债期限、利息与现金覆盖。', key: '利息保障倍数 = 息税前利润 ÷ 利息费用', practice: '比较短债占比和现金储备。' },
      { id: 6, title: '经营现金流', minutes: 22, summary: '用现金验证收入与利润的质量。', key: '现金转换率 = 经营现金流 ÷ 净利润', practice: '解释利润增长但现金流下降的原因。' },
      { id: 7, title: '回报率与杜邦分析', minutes: 24, summary: '拆分利润率、周转率和杠杆对 ROE 的贡献。', key: 'ROE = 利润率 × 周转率 × 权益乘数', practice: '比较两家公司 ROE 的来源。' },
      { id: 8, title: '综合报表侦探', minutes: 25, summary: '用趋势、同业与勾稽关系寻找红旗。', key: '好分析从问题开始，不从单一比率结束', practice: '完成一份十分钟报表检查表。' },
    ],
  },
  {
    slug: 'corporate-valuation', title: '公司金融与估值', en: 'Corporate Finance & Valuation', level: '专业', duration: '3.4 小时', category: '公司金融', accent: 'violet',
    description: '理解资本成本、投资决策、现金流折现和相对估值，形成区间化价值判断。',
    outcomes: ['估算自由现金流与资本成本', '搭建基础 DCF 模型', '理解估值倍数的适用边界'],
    lessons: [
      { id: 1, title: '企业为何创造价值', minutes: 22, summary: '企业只有在资本回报高于资本成本时创造经济价值。', key: '经济利润 = 投入资本 ×（ROIC − WACC）', practice: '比较两个项目的回报率与资本成本。' },
      { id: 2, title: '资本预算与净现值', minutes: 24, summary: '把项目未来现金流折回今天做投资决策。', key: 'NPV = 现金流现值 − 初始投资', practice: '计算一个三年项目的净现值。' },
      { id: 3, title: '资本结构与杠杆', minutes: 22, summary: '债务能降低部分融资成本，也会放大困境风险。', key: '企业价值取决于经营资产与融资结构', practice: '分析加杠杆对股东回报与风险的影响。' },
      { id: 4, title: '加权平均资本成本', minutes: 26, summary: '综合权益和债务提供者要求的回报。', key: 'WACC = 权益权重×权益成本 + 债务权重×税后债务成本', practice: '用给定权重计算 WACC。' },
      { id: 5, title: '自由现金流预测', minutes: 26, summary: '从经营利润走到可供资本提供者分配的现金。', key: 'FCFF = 税后经营利润 + 折旧 − 资本支出 − 营运资本增加', practice: '从简化利润表推导 FCFF。' },
      { id: 6, title: '现金流折现模型', minutes: 28, summary: '预测阶段、终值与折现共同决定企业价值。', key: '企业价值 = 预测现金流现值 + 终值现值', practice: '搭建三情景 DCF 敏感性表。' },
      { id: 7, title: '相对估值倍数', minutes: 23, summary: '在业务、增长和风险可比时使用市盈率等倍数。', key: '倍数差异必须能由经营差异解释', practice: '选择三家真正可比的公司。' },
      { id: 8, title: '安全边际与估值复盘', minutes: 24, summary: '承认预测误差，用区间与失效条件管理判断。', key: '价格不等于价值，价值也不是精确数字', practice: '为一个估值写下三项失效条件。' },
    ],
  },
  {
    slug: 'macro-economy', title: '宏观经济与政策', en: 'Macroeconomics & Policy', level: '进阶', duration: '2.9 小时', category: '宏观经济', accent: 'sage',
    description: '用增长、通胀、就业、利率和政策构建宏观仪表盘，避免只凭一条新闻下结论。',
    outcomes: ['读懂常见宏观数据', '理解货币与财政政策传导', '区分经济周期与市场预期'],
    lessons: [
      { id: 1, title: 'GDP 与经济增长', minutes: 20, summary: '从支出法理解消费、投资、政府和净出口。', key: 'GDP = C + I + G + NX', practice: '判断四类支出分别属于哪一项。' },
      { id: 2, title: '通胀的来源', minutes: 21, summary: '区分需求、供给、工资与预期驱动。', key: '通胀要看持续性、广度和预期', practice: '拆解一份 CPI 数据的主要分项。' },
      { id: 3, title: '就业与生产率', minutes: 20, summary: '就业是周期指标，生产率决定长期收入空间。', key: '长期增长来自劳动、资本与生产率', practice: '解释就业数据为何常滞后于周期。' },
      { id: 4, title: '央行与货币政策', minutes: 23, summary: '政策利率通过金融条件影响消费和投资。', key: '政策利率 → 市场利率 → 融资与需求', practice: '画出一次加息的三条传导路径。' },
      { id: 5, title: '财政政策与政府债务', minutes: 22, summary: '税收与支出直接改变总需求和资源配置。', key: '财政余额 = 政府收入 − 政府支出', practice: '区分自动稳定器与主动刺激。' },
      { id: 6, title: '经济周期', minutes: 21, summary: '库存、信贷、投资与情绪共同制造波动。', key: '周期阶段可描述，拐点难精确预测', practice: '为扩张、过热、放缓列出典型特征。' },
      { id: 7, title: '汇率与国际收支', minutes: 22, summary: '汇率同时连接贸易、资本流动与政策。', key: '本币回报 = 海外资产回报 + 汇率影响', practice: '计算一次海外投资的本币回报。' },
      { id: 8, title: '宏观叙事的陷阱', minutes: 20, summary: '区分数据事实、因果解释与市场已定价预期。', key: '市场交易预期差，不只交易好坏', practice: '用三层框架拆解一条财经新闻。' },
    ],
  },
  {
    slug: 'portfolio-management', title: '资产配置与组合管理', en: 'Portfolio Management', level: '进阶', duration: '3.0 小时', category: '组合管理', accent: 'gold',
    description: '从目标和风险预算出发，构建、再平衡并评价一个真正能长期执行的组合。',
    outcomes: ['写出个人投资政策书', '设计战略资产配置', '执行再平衡与业绩归因'],
    lessons: [
      { id: 1, title: '投资政策书', minutes: 20, summary: '在市场平静时写下目标、边界和调整规则。', key: 'IPS = 目标 + 期限 + 风险 + 配置 + 规则', practice: '写一页自己的投资政策书。' },
      { id: 2, title: '风险能力与风险意愿', minutes: 20, summary: '财务条件和心理感受要由更保守一方约束。', key: '风险能力由期限、收入与安全垫决定', practice: '分别给自己的能力和意愿打分。' },
      { id: 3, title: '相关性与分散', minutes: 23, summary: '不同名字只有在风险驱动不同才构成有效分散。', key: '组合风险取决于单项风险与相关性', practice: '检查自己的产品是否底层重合。' },
      { id: 4, title: '战略资产配置', minutes: 23, summary: '用长期目标决定股票、债券和现金的结构。', key: '先确定风险预算，再选择具体产品', practice: '为三个期限目标分别配置资产。' },
      { id: 5, title: '定投与一次投入', minutes: 19, summary: '比较市场暴露时间、心理体验与机会成本。', key: '定投降低择时压力，但不保证更高收益', practice: '为现有现金与未来收入选择进入方式。' },
      { id: 6, title: '再平衡规则', minutes: 21, summary: '用时间和偏离阈值恢复组合风险。', key: '定期检查 + 阈值触发', practice: '设置一次可执行的再平衡阈值。' },
      { id: 7, title: '行为偏差与执行', minutes: 22, summary: '识别损失厌恶、确认偏误和业绩追逐。', key: '好流程在情绪最强时替你做决定', practice: '为自己的主要偏差设计一道护栏。' },
      { id: 8, title: '业绩归因与复盘', minutes: 22, summary: '拆分市场、配置、选择、汇率和成本贡献。', key: '结果 = 市场暴露 + 主动决策 + 成本 + 运气', practice: '完成一页季度组合复盘。' },
    ],
  },
  {
    slug: 'global-finance-risk', title: '全球金融与风险', en: 'Global Finance & Risk', level: '专业', duration: '3.2 小时', category: '全球市场', accent: 'rose',
    description: '理解收益率曲线、汇率、商品、衍生品、危机与监管，建立系统性风险视角。',
    outcomes: ['理解全球资金如何流动', '识别衍生品与杠杆风险', '分析危机中的流动性传染'],
    lessons: [
      { id: 1, title: '金融系统与中介', minutes: 21, summary: '银行与市场连接盈余资金和融资需求。', key: '核心功能：支付、融资、定价、风险转移', practice: '解释银行为什么需要流动性储备。' },
      { id: 2, title: '收益率曲线', minutes: 22, summary: '期限利率反映政策、通胀与期限溢价。', key: '长端利率 ≈ 未来短端预期 + 期限溢价', practice: '解读一张正常与倒挂曲线。' },
      { id: 3, title: '汇率风险与对冲', minutes: 22, summary: '海外资产同时承担资产本身与货币风险。', key: '是否对冲取决于资产、期限和支出货币', practice: '为留学资金设计自然对冲。' },
      { id: 4, title: '商品与实物资产', minutes: 21, summary: '现货、期货与持有成本共同决定回报。', key: '期货回报不等于现货涨幅', practice: '比较黄金与原油的定价驱动。' },
      { id: 5, title: '期货与期权', minutes: 26, summary: '衍生品既能套保，也能通过杠杆放大损失。', key: '期权买方有权利，卖方有义务', practice: '画出买入看涨期权的损益结构。' },
      { id: 6, title: '杠杆与流动性螺旋', minutes: 24, summary: '价格下跌会触发追加保证金和被迫卖出。', key: '下跌 → 抵押缩水 → 卖出 → 继续下跌', practice: '复盘一次典型流动性危机。' },
      { id: 7, title: '监管与投资者保护', minutes: 21, summary: '监管降低制度风险，但不保证投资盈利。', key: '合规、保本与低风险是三件不同的事', practice: '检查一个平台的牌照与托管安排。' },
      { id: 8, title: '金融科技与数字资产', minutes: 23, summary: '新技术重构流程，也带来托管、模型和网络风险。', key: '技术能改变流程，不能取消经济约束', practice: '用七项清单评估一个数字资产平台。' },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

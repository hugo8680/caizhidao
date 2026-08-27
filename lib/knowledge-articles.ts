import { knowledgeArticleDetails } from './knowledge-article-details';
import { knowledgeArticleEssays, type KnowledgeEssaySection } from './knowledge-article-essays';
import { knowledgeTerms } from './content';

export type KnowledgeArticleSource = {
  title: string;
  publisher: string;
  url: string;
  note: string;
};

export type KnowledgeArticle = {
  question: string;
  takeaway: string;
  introduction: string[];
  mechanism: Array<{ title: string; text: string }>;
  analysis: KnowledgeEssaySection[];
  formulas?: Array<{
    expression: string;
    explanation: string;
    variables: Array<{ symbol: string; meaning: string }>;
  }>;
  example: {
    title: string;
    setup: string;
    steps: string[];
    conclusion: string;
  };
  interpretation: string[];
  distinctions: Array<{ term: string; explanation: string }>;
  checklist: string[];
  misconceptions: string[];
  sources: KnowledgeArticleSource[];
};

const categorySources: Record<string, KnowledgeArticleSource[]> = {
  '金钱与个人财务': [
    { title: 'Consumer Tools', publisher: 'U.S. Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/consumer-tools/', note: '预算、信用、住房贷款和家庭财务的消费者教育与工具。' },
    { title: 'Saving and Investing', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/save-and-invest', note: '储蓄、投资目标和长期资金安排的基础资料。' },
  ],
  投资基础: [
    { title: 'What Is Risk?', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/what-risk', note: '风险、收益与不同资产风险来源的投资者教育资料。' },
    { title: 'Investment Foundations', publisher: 'CFA Institute', url: 'https://www.cfainstitute.org/programs/investment-foundations', note: '投资行业、工具、组合与风险的系统学习框架。' },
  ],
  市场与产品: [
    { title: 'How Stock Markets Work', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work', note: '证券发行、交易、市场参与者与订单的基础资料。' },
    { title: 'Investing', publisher: 'FINRA', url: 'https://www.finra.org/investors/investing', note: '股票、债券、基金、费用和市场风险的投资者资料。' },
  ],
  财务报表: [
    { title: 'Beginners’ Guide to Financial Statements', publisher: 'U.S. Securities and Exchange Commission', url: 'https://www.sec.gov/about/reports-publications/investorpubsbegfinstmtguide', note: '三张主要财务报表及其连接关系的入门说明。' },
    { title: 'Issued IFRS Standards', publisher: 'IFRS Foundation', url: 'https://www.ifrs.org/issued-standards/list-of-standards/', note: '财务报告确认、计量、列报与披露的准则原文入口。' },
  ],
  公司金融与估值: [
    { title: 'Valuation Resources', publisher: 'NYU Stern · Aswath Damodaran', url: 'https://pages.stern.nyu.edu/~adamodar/', note: '公司金融、资本成本、现金流折现和相对估值课程与数据。' },
    { title: 'Investment Foundations', publisher: 'CFA Institute', url: 'https://www.cfainstitute.org/programs/investment-foundations', note: '财务报表、公司融资与投资估值的基础框架。' },
  ],
  宏观经济: [
    { title: 'Back to Basics', publisher: 'International Monetary Fund', url: 'https://www.imf.org/external/pubs/ft/fandd/basics/', note: 'GDP、通胀、财政、货币和国际经济概念的机构说明。' },
    { title: '国家数据', publisher: '中华人民共和国国家统计局', url: 'https://data.stats.gov.cn/', note: '中国国民经济核算、价格、就业和社会经济数据查询入口。' },
  ],
  组合与风险: [
    { title: 'Asset Allocation', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/getting-started/asset-allocation', note: '资产配置、分散和组合风险的投资者教育资料。' },
    { title: 'Investment Foundations', publisher: 'CFA Institute', url: 'https://www.cfainstitute.org/programs/investment-foundations', note: '收益、统计风险、组合与绩效评价的学习框架。' },
  ],
  全球与衍生品: [
    { title: 'Learn & Protect', publisher: 'U.S. Commodity Futures Trading Commission', url: 'https://www.cftc.gov/LearnAndProtect/index.htm', note: '期货、期权、衍生品杠杆和交易风险的教育资料。' },
    { title: 'Research & Publications', publisher: 'Bank for International Settlements', url: 'https://www.bis.org/list/research/index.htm', note: '利率、外汇、银行、市场结构和金融稳定研究。' },
  ],
};

type FormulaNote = { explanation: string; variables: Array<{ symbol: string; meaning: string }> };

const formulaNotes: Record<string, FormulaNote> = {
  'compound-interest': { explanation: '固定利率且收益留存时的离散复利终值；若每期另有投入，需要逐笔按实际时点复利。', variables: [{ symbol: 'PV', meaning: '期初本金' }, { symbol: 'r', meaning: '每期有效收益率或利率' }, { symbol: 'n', meaning: '复利期数' }, { symbol: 'FV', meaning: '第 n 期末终值' }] },
  'time-value': { explanation: '把第 n 期的确定金额按每期机会成本折回估值日。', variables: [{ symbol: 'FV', meaning: '第 n 期收到的未来金额' }, { symbol: 'r', meaning: '与期限和风险匹配的每期折现率' }, { symbol: 'n', meaning: '估值日至收款日的期数' }, { symbol: 'PV', meaning: '估值日现值' }] },
  'emergency-fund': { explanation: '基础目标还应加上已知额外应急支出，并减去现有可立即动用的安全储备。', variables: [{ symbol: '月必要支出', meaning: '收入中断后仍必须支付的月度底线' }, { symbol: '覆盖月数', meaning: '家庭自行选择的收入中断保护期' }] },
  'debt-to-income': { explanation: '分子与分母必须使用同一月度，并明确收入按税前还是税后计算。', variables: [{ symbol: '月债务偿付额', meaning: '全部经常性债务的最低合同还款' }, { symbol: '月收入', meaning: '按照同一收入定义可持续取得的月收入' }] },
  duration: { explanation: '修正久期给出收益率小幅变化时的价格一阶近似，收益率变动应以小数计。', variables: [{ symbol: '修正久期', meaning: '债券价格对到期收益率的局部敏感度' }, { symbol: '收益率变动', meaning: '例如 0.5 个百分点写作 0.005' }] },
  'balance-sheet': { explanation: '复式记账恒等式：资源的每一项资金来源最终归为债权或所有者权益。', variables: [{ symbol: '资产', meaning: '企业控制的经济资源' }, { symbol: '负债', meaning: '企业承担的现时义务' }, { symbol: '所有者权益', meaning: '资产扣除负债后的剩余权益' }] },
  'income-statement': { explanation: '这是理解利润形成的简化关系，实际报表还会分层列示营业外项目、所得税和利润归属。', variables: [{ symbol: '收入', meaning: '报告期履约形成的经济利益流入' }, { symbol: '成本与费用', meaning: '为取得收入及维持经营确认的耗费' }, { symbol: '净利润', meaning: '报告期扣除成本、费用和税费后的会计成果；还要说明归属于母公司股东还是全部权益持有人' }] },
  'gross-margin': { explanation: '毛利率以营业收入为分母，不能与以成本为分母的加价率混用。', variables: [{ symbol: '营业收入', meaning: '对应产品或服务的收入' }, { symbol: '营业成本', meaning: '按会计政策直接归属于收入的成本' }] },
  roe: { explanation: '平均权益通常取期初与期末权益平均；重大增发、回购时需要更精细的时间加权。', variables: [{ symbol: '净利润', meaning: '通常采用归属普通股东的利润' }, { symbol: '平均股东权益', meaning: '报告期内普通股东账面权益的平均值' }] },
  'current-ratio': { explanation: '账面覆盖倍数只适合初步观察，未调整资产质量和具体到期日。', variables: [{ symbol: '流动资产', meaning: '一个经营周期或十二个月内预计变现、出售或耗用的资产' }, { symbol: '流动负债', meaning: '一个经营周期或十二个月内预计清偿的义务' }] },
  'free-cash-flow': { explanation: '经营现金流减资本支出是常用的简化算法；严谨估值要说明计算的是 FCFF 还是 FCFE，并列出其他调整。', variables: [{ symbol: '经营现金流', meaning: '经营活动产生的现金净额' }, { symbol: '资本支出', meaning: '购建长期经营资产支付的现金' }] },
  'present-value': { explanation: '未来确定金额按匹配折现率折回估值日；现金流和折现率必须同为名义值，或同为按购买力调整后的实际值。', variables: [{ symbol: 'FV', meaning: '第 n 期的未来金额' }, { symbol: 'r', meaning: '每期折现率' }, { symbol: 'n', meaning: '折现期数' }, { symbol: 'PV', meaning: '估值日现值' }] },
  dcf: { explanation: '企业价值等于预测期 FCFF 与预测期后终值的现值总和；股权价值还需调整净债务等项目。', variables: [{ symbol: 'FCFₜ', meaning: '第 t 期面向相应资本提供者的自由现金流' }, { symbol: 'WACC', meaning: '与 FCFF 风险和币种匹配的加权资本成本' }, { symbol: '终值', meaning: '预测期以后现金流在预测期末的价值' }] },
  npv: { explanation: '所有增量现金流折到今天后减去初始投入；t=0 的现金流无需折现。', variables: [{ symbol: 'CFₜ', meaning: '项目第 t 期税后增量现金流' }, { symbol: 'r', meaning: '与项目风险匹配的要求回报率' }, { symbol: '初始投资', meaning: '估值日发生的净投入' }] },
  'pe-ratio': { explanation: '可以用每股价格除以每股收益，也可以用总市值除以归属普通股东的总盈利；两边覆盖的股份范围必须一致。', variables: [{ symbol: '每股价格', meaning: '普通股当前市场价格' }, { symbol: '每股收益', meaning: '对应期间归属普通股东的稀释或基本 EPS' }] },
  inflation: { explanation: 'Fisher 关系的精确形式；通胀和名义收益都应为同一期间有效率。', variables: [{ symbol: '名义收益率', meaning: '未扣除价格水平变化的货币回报' }, { symbol: '通胀率', meaning: '匹配期间消费价格指数的变化' }, { symbol: '实际收益率', meaning: '按购买力衡量的回报' }] },
  gdp: { explanation: '支出法核算恒等式，进口从总支出中扣除是为了只保留境内生产。', variables: [{ symbol: 'C', meaning: '居民最终消费支出' }, { symbol: 'I', meaning: '资本形成与存货投资' }, { symbol: 'G', meaning: '政府最终消费与投资购买' }, { symbol: 'X−M', meaning: '商品与服务净出口' }] },
  'sharpe-ratio': { explanation: '以同频超额收益均值除以收益标准差；年化时需说明频率和假设。', variables: [{ symbol: '组合收益', meaning: '同一期间的组合回报，通常使用已扣除费用的收益' }, { symbol: '无风险收益', meaning: '同币种、同期间的低风险机会成本' }, { symbol: '收益波动率', meaning: '组合收益的标准差' }] },
  drawdown: { explanation: '每个时点相对此前历史高点的跌幅，区间中最负值为最大回撤。', variables: [{ symbol: '先前高点', meaning: '该时点之前净值达到的最高水平' }, { symbol: '低点净值', meaning: '高点之后、恢复之前的最低水平' }] },
};

const curatedArticles: Record<string, KnowledgeArticle> = {
  correlation: {
    question: '相关系数为零，是否意味着两项资产彼此无关？',
    takeaway: '相关性描述的是特定样本中两组收益率的线性共同变化，不是因果关系，也不是一项资产永远不变的属性。',
    introduction: [
      '在投资分析中，我们通常不是比较两项资产的价格高低，而是比较它们在同一时间频率下的收益率。当两组收益率经常同向偏离各自平均值时，相关系数为正；经常反向偏离时为负；没有稳定的线性共同变化时接近零。',
      '最常用的是皮尔逊相关系数。它把协方差除以两项资产的波动率，因此结果没有单位，并落在 −1 到 +1 之间。这个标准化过程方便比较，却不会告诉我们共同变化由什么原因造成，也不会捕捉所有非线性关系。',
    ],
    mechanism: [
      { title: '先把价格转换成可比收益率', text: '价格水平常带有趋势，直接计算价格相关性容易得到虚假的高相关。应使用相同币种、相同频率、相同观察区间的简单收益率或对数收益率。' },
      { title: '观察两项收益怎样偏离各自均值', text: '协方差衡量两个变量是否经常同时高于或低于自身平均值。正协方差表示共同方向较多，负协方差表示相反方向较多。' },
      { title: '用波动率把共同变化标准化', text: '协方差受计量尺度影响。除以两项资产的标准差后，相关系数才可以在不同资产组合之间比较。' },
      { title: '把相关性放回组合风险', text: '组合风险不仅取决于每项资产自身的波动，还取决于它们是否在同一时间一起波动。相关性越低，其他条件相同时，分散风险的空间通常越大。' },
    ],
    analysis: knowledgeArticleEssays.correlation,
    formulas: [
      {
        expression: 'ρ₍X,Y₎ = Cov(Rₓ, Rᵧ) ÷ (σₓ · σᵧ)',
        explanation: '相关系数是标准化后的协方差。计算时，两组收益必须使用相同的时间区间和频率。',
        variables: [
          { symbol: 'Rₓ、Rᵧ', meaning: '资产 X 与资产 Y 在同一期间的收益率序列' },
          { symbol: 'Cov(Rₓ, Rᵧ)', meaning: '两组收益率的协方差' },
          { symbol: 'σₓ、σᵧ', meaning: '两组收益率各自的标准差，也就是该样本中的波动率' },
        ],
      },
      {
        expression: 'σ²ₚ = w²ₓσ²ₓ + w²ᵧσ²ᵧ + 2wₓwᵧσₓσᵧρ₍X,Y₎',
        explanation: '两资产组合的方差包含各自风险和共同变化两部分。相关性影响的是最后一项。',
        variables: [
          { symbol: 'wₓ、wᵧ', meaning: '两项资产在组合中的权重' },
          { symbol: 'σ²ₚ', meaning: '组合收益率的方差' },
          { symbol: 'ρ₍X,Y₎', meaning: '两项资产收益率的相关系数' },
        ],
      },
    ],
    example: {
      title: '同样两项资产，相关性会怎样改变组合波动？',
      setup: '假设组合中 60% 配置资产 A、40% 配置资产 B；A 的年化波动率为 15%，B 为 8%。先保持权重和单项波动率不变，只改变两者的相关系数。',
      steps: [
        '当相关系数为 +1 时，代入组合方差公式，组合波动率约为 12.2%。两项资产完全同向变化，分散作用最弱。',
        '当相关系数为 0 时，组合波动率约为 9.6%。这表示样本中没有稳定的线性共同变化，并不表示两项资产在所有情景下互不影响。',
        '当相关系数为 −0.5 时，组合波动率约为 7.9%。反向变化抵消了部分波动，但现实中的相关性可能随市场状态改变。',
      ],
      conclusion: '降低相关性可以降低给定组合的统计波动，但不能消除信用损失、流动性枯竭、跳空或模型失效等风险。',
    },
    interpretation: [
      '相关系数必须连同样本区间一起报告。过去三年的日收益相关性，与过去十年的月收益相关性回答的不是同一个问题。短窗口更敏感，长窗口更稳定，却可能掩盖制度变化。',
      '压力时期应单独观察。危机中，融资收紧、赎回和保证金要求可能迫使不同投资者同时卖出，原本较低的相关性会迅速上升。仅用正常时期的平均值设计组合，容易高估分散效果。',
      '还要检查共同风险因子。两只基金的历史相关性暂时不高，不代表底层持仓真正独立；它们可能同时暴露于同一行业、利率、信用或汇率风险。',
    ],
    distinctions: [
      { term: '协方差 Covariance', explanation: '协方差保留原始尺度，适合进入组合方差计算；相关系数把它标准化，更便于跨资产比较。' },
      { term: '贝塔 Beta', explanation: '贝塔衡量某资产对选定市场基准变动的敏感度，受资产与基准波动率之比影响；它不等同于相关系数。' },
      { term: '因果关系 Causality', explanation: '高相关只能说明共同变化，不能证明 X 导致 Y。共同冲击、反向因果或数据处理方式都可能制造相关。' },
      { term: '分散投资 Diversification', explanation: '相关性是判断分散效果的重要输入，但还需要检查集中度、尾部风险、流动性和持有期限。' },
    ],
    checklist: [
      '使用收益率而不是价格水平，并注明简单收益率还是对数收益率。',
      '统一币种、时间频率、交易日和观察区间，处理缺失值时说明方法。',
      '同时报告多个窗口，并把正常时期与压力时期分开。',
      '穿透到底层持仓和风险因子，避免把暂时低相关误认为结构性分散。',
      '不要只看相关矩阵；同时检查最大回撤、流动性、信用质量和极端情景。',
    ],
    misconceptions: [
      '“相关系数为零，所以两项资产完全独立。”零相关只表示没有线性关系；变量仍可能存在明显的曲线关系或在极端情景中共同下跌。',
      '“历史相关性很低，未来也会保持不变。”相关性是样本统计量，会随政策、市场结构、投资者仓位和流动性变化。',
      '“加入更多低相关产品就一定更安全。”如果估计误差很大、资产难以变现或尾部风险相似，产品数量增加也可能只是表面分散。',
    ],
    sources: [
      { title: 'Measures of Location and Scale — Correlation', publisher: 'NIST/SEMATECH e-Handbook of Statistical Methods', url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda35c.htm', note: '相关系数的统计定义、解释与图形判断。' },
      { title: 'Asset Allocation', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/getting-started/asset-allocation', note: '资产配置、分散投资与风险关系的投资者教育资料。' },
      { title: 'Investment Foundations', publisher: 'CFA Institute', url: 'https://www.cfainstitute.org/programs/investment-foundations', note: '投资工具、组合、风险与行业实践的系统学习框架。' },
    ],
  },
};

const generatedArticles = Object.fromEntries(Object.entries(knowledgeArticleDetails).map(([slug, detail]) => {
  const term = knowledgeTerms.find((item) => item.slug === slug);
  if (!term) throw new Error(`Unknown knowledge article slug: ${slug}`);
  const analysis = knowledgeArticleEssays[slug];
  if (!analysis) throw new Error(`Missing knowledge essay sections: ${slug}`);
  const formula = term.formula && formulaNotes[slug]
    ? [{ expression: term.formula, ...formulaNotes[slug] }]
    : undefined;

  return [slug, {
    question: detail.question,
    takeaway: detail.takeaway,
    introduction: [`${term.why}${detail.context}`],
    mechanism: detail.mechanism.map(([title, text]) => ({ title, text })),
    analysis,
    formulas: formula,
    example: {
      title: detail.exampleTitle,
      setup: term.example,
      steps: detail.exampleSteps,
      conclusion: detail.exampleConclusion,
    },
    interpretation: detail.interpretation,
    distinctions: detail.distinctions.map(([relatedTerm, explanation]) => ({ term: relatedTerm, explanation })),
    checklist: detail.checklist,
    misconceptions: [...detail.misconceptions, term.fact],
    sources: categorySources[term.category] ?? [],
  } satisfies KnowledgeArticle];
}));

const knowledgeArticles: Record<string, KnowledgeArticle> = {
  ...generatedArticles,
  ...curatedArticles,
};

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles[slug];
}

export const knowledgeArticleSlugs = Object.keys(knowledgeArticles);

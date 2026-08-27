import type { EditorialLink, EditorialSource } from './editorial';

export type ToolMethod = {
  formula: string;
  explanation: string;
  conditions: string[];
  sources: EditorialSource[];
  related: EditorialLink[];
};

const investorCompoundSource: EditorialSource = {
  title: 'Compound Interest Calculator and Investing Basics',
  publisher: 'Investor.gov · U.S. SEC',
  url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator',
  note: '复利、定期投入、收益率和时间的公众教育资料。',
};

const openFinanceSource: EditorialSource = {
  title: 'Principles of Finance',
  publisher: 'OpenStax',
  url: 'https://openstax.org/details/books/principles-finance',
  note: '货币时间价值、年金、债券、资本预算、风险与估值开放教材。',
};

export const toolMethods: Record<string, ToolMethod> = {
  compound: {
    formula: 'FV = PV(1+i)ⁿ + PMT × [(1+i)ⁿ − 1] ÷ i',
    explanation: '先计算期初本金的终值，再加上每月末固定投入形成的普通年金终值。i 是月收益率，n 是总月数；输入的年收益率按 12 等分为月率。',
    conditions: ['每月投入发生在月末。', '收益率在整个期间保持不变并按月复利。', '未计税收、费用、亏损路径和现金流中断。'],
    sources: [investorCompoundSource, openFinanceSource],
    related: [{ title: '复利', href: '/knowledge/compound-interest/', note: '理解复利机制、公式变量和现实边界。' }],
  },
  'real-return': {
    formula: 'rᵣ = (1 + rₙ) ÷ (1 + π) − 1',
    explanation: '使用精确 Fisher 关系，把名义收益按同一期间的价格水平变化折算为购买力收益。只有在数值很小时，名义收益减通胀才是近似值。',
    conditions: ['名义收益率与通胀率必须使用同一期间。', '输入均为有效收益率而非不同复利口径的报价。', '个人消费篮子可能与官方通胀指数不同。'],
    sources: [
      { title: 'The Fisher Equation', publisher: 'Federal Reserve Bank of St. Louis', url: 'https://www.stlouisfed.org/on-the-economy/2016/august/fisher-effect-one-century-later', note: '名义利率、实际利率与通胀之间的关系。' },
      { title: 'Consumer Price Index', publisher: 'U.S. Bureau of Labor Statistics', url: 'https://www.bls.gov/cpi/questions-and-answers.htm', note: '消费价格指数的统计含义和使用限制。' },
    ],
    related: [{ title: '通货膨胀', href: '/knowledge/inflation/', note: '区分价格水平、通胀率与个人购买力。' }],
  },
  cagr: {
    formula: 'CAGR = (Vₜ ÷ V₀)^(1/T) − 1',
    explanation: '把起点和终点之间的总增长折算为一个等效的固定年复合增长率，使初值按该比率连续复合 T 年后恰好等于终值。它只使用两个端点，不重建中间的涨跌路径，因此不能用来判断波动、回撤或投资体验。',
    conditions: ['期初金额必须大于零，经过年数必须为正。', '期间不能存在未调整的追加投入、提款或分红。', 'CAGR 不反映波动、回撤和收益顺序。'],
    sources: [openFinanceSource],
    related: [{ title: '复利', href: '/knowledge/compound-interest/', note: '理解复合增长与时间的关系。' }],
  },
  loan: {
    formula: 'PMT = P × i(1+i)ⁿ ÷ [(1+i)ⁿ − 1]',
    explanation: '等额本息月供是使未来每期固定还款的折现值恰好等于贷款本金的金额。每期先按当期未偿余额计息，月供扣除利息后才减少本金；早期余额较高，所以利息占比更大，随本金下降才逐期减少。',
    conditions: ['按月还款且每月付款金额固定。', '年利率按 12 等分为月利率，期间不重新定价。', '未计手续费、保险、税费和提前还款规则。'],
    sources: [
      { title: 'What is amortization and how could it affect my auto loan?', publisher: 'U.S. Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/', note: '贷款摊还、本金和利息构成的消费者说明。' },
      openFinanceSource,
    ],
    related: [{ title: '摊还', href: '/knowledge/amortization/', note: '理解固定月供中本金和利息怎样变化。' }],
  },
  'early-repay': {
    formula: '比较值 = 保留资金的期末价值 − 提前还款后节省月供的期末价值',
    explanation: '先按剩余本金和期数重算两种月供，再分别计算：保留提前还款资金继续投资的期末价值，以及提前还款后把每月少还的钱逐月投入的期末价值。另行扣除提前还款费用和名义利息变化。',
    conditions: ['贷款剩余期限不变，提前还款按降低月供处理。', '替代投资收益按固定月收益情景演示，不是确定回报。', '税费、流动性、风险偏好和合同限制必须另外比较。'],
    sources: [
      { title: 'Your mortgage servicer must comply with federal rules', publisher: 'U.S. Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/', note: '提前还款费用和合同核对的消费者说明。' },
      openFinanceSource,
    ],
    related: [{ title: '利率', href: '/knowledge/interest-rate/', note: '比较确定的融资成本与不确定的投资回报。' }],
  },
  'saving-goal': {
    formula: 'PMT = [G − PV(1+i)ⁿ] × i ÷ [(1+i)ⁿ − 1]',
    explanation: '先让已有资金增长到目标日，再把剩余缺口转换为每月末固定投入的普通年金终值。结果为零表示已有资金在当前假设下足以达到目标。',
    conditions: ['投入发生在每月末且不中断。', '目标金额已经按需要考虑未来通胀。', '收益率保持不变；越刚性的目标越应使用保守情景。'],
    sources: [investorCompoundSource, openFinanceSource],
    related: [{ title: '现值', href: '/knowledge/present-value/', note: '把不同时间的金额放到同一时间点比较。' }],
  },
  emergency: {
    formula: '目标储备 = 月必要支出 × 自定覆盖月数 + 已知额外风险；缺口 = 目标储备 − 现有安全储备',
    explanation: '这是透明的情景加总，不声称存在适合所有家庭的统一倍数。覆盖月数应由收入恢复时间、家庭责任、保险条件和资产到账速度共同决定。',
    conditions: ['只把真正必要的支出计入月度底线。', '现有储备必须能及时、低成本且本金相对稳定地动用。', '日期已知的大额支出应单独储蓄，不混入应急风险。'],
    sources: [
      { title: 'An essential guide to building an emergency fund', publisher: 'U.S. Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/', note: '应急储蓄的用途、建立方法和现实约束。' },
      { title: 'Saving and Investing', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/save-and-invest', note: '储蓄目标与长期投资的基础区分。' },
    ],
    related: [{ title: '应急金', href: '/knowledge/emergency-fund/', note: '根据家庭现金流和风险建立安全垫。' }],
  },
  retirement: {
    formula: '退休目标 = 当前月支出(1+π)ᵀ × 12 ÷ 提取率；积累缺口再按年金终值反推月投入',
    explanation: '先把当前生活费用按通胀推到退休时，再用计划提取率形成资金目标；已有资产按积累期收益增长后从目标中扣除，剩余缺口转换为每月投入。',
    conditions: ['提取率是规划情景，不是安全保证。', '积累期收益、退休期收益和通胀都不会恒定。', '养老金、税收、医疗和寿命风险需要另外加入。'],
    sources: [
      { title: 'Retirement Toolkit', publisher: 'U.S. Department of Labor, Social Security Administration and CMS', url: 'https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/retirement-toolkit', note: '退休收入来源、时间安排和规划事项。' },
      investorCompoundSource,
    ],
    related: [
      { title: '通货膨胀', href: '/knowledge/inflation/', note: '长期目标必须以购买力而不是今天的名义金额衡量。' },
      { title: '资产配置', href: '/knowledge/asset-allocation/', note: '根据期限和提款风险安排资产。' },
    ],
  },
  dcf: {
    formula: 'Equity Value = Σ FCFₜ/(1+r)ᵗ + [FCFₙ₊₁/(r−g)]/(1+r)ⁿ + Cash − Debt',
    explanation: '预测期自由现金流逐年折现，预测期后的现金流用永续增长终值表示；经营资产价值加现金、减有息债务得到简化股权价值。',
    conditions: ['折现率必须高于永续增长率。', '增长必须与再投资和盈利能力一致。', '终值占比、净债务、股份变化和情景敏感性必须单独检查。'],
    sources: [
      { title: 'Valuation resources', publisher: 'NYU Stern · Aswath Damodaran', url: 'https://pages.stern.nyu.edu/~adamodar/', note: '现金流折现、资本成本、增长与估值案例。' },
      openFinanceSource,
    ],
    related: [
      { title: '现金流折现', href: '/knowledge/dcf/', note: '理解 DCF 逻辑、变量和常见误区。' },
      { title: '自由现金流', href: '/knowledge/free-cash-flow/', note: '确认被折现现金流的经济含义。' },
    ],
  },
  bond: {
    formula: 'Price = Σ C/(1+y)ᵗ + FV/(1+y)ⁿ',
    explanation: '债券价格等于未来每期票息与到期本金的现值。市场要求收益率上升时，同样合同现金流需要以更低价格才能提供该回报。',
    conditions: ['票息按年支付，收益率使用相同年度口径。', '假设按合同足额偿付，未计违约、税收和流动性。', '到期收益率隐含票息可按同一收益率再投资。'],
    sources: [
      { title: 'Bonds', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds', note: '债券现金流、价格、收益率和主要风险。' },
      openFinanceSource,
    ],
    related: [
      { title: '债券', href: '/knowledge/bond/', note: '理解债权合同、偿付顺序和风险。' },
      { title: '久期', href: '/knowledge/duration/', note: '衡量价格对收益率变化的敏感度。' },
    ],
  },
  position: {
    formula: '仓位金额 = 组合资产 × 单笔风险比例 ÷ 止损距离；数量 = 仓位金额 ÷ 单位价格',
    explanation: '先把一次判断错误允许损失的金额固定下来，再按计划退出价与入场价的距离反推理论仓位。它控制损失规模，不提高判断胜率。',
    conditions: ['止损距离必须基于策略或风险结构，而不是为了放大仓位任意缩小。', '跳空、滑点和流动性不足可能使实际损失超过设定值。', '受同一风险因子驱动的多个仓位需要合并限额。'],
    sources: [
      { title: 'What Is Risk?', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/what-risk', note: '投资损失、风险承受能力和产品风险基础。' },
      { title: 'Investment Foundations', publisher: 'CFA Institute', url: 'https://www.cfainstitute.org/programs/investment-foundations', note: '投资流程、风险和组合管理框架。' },
    ],
    related: [{ title: '最大回撤', href: '/knowledge/drawdown/', note: '仓位之外还要观察组合层面的损失路径和恢复时间。' }],
  },
  'fee-impact': {
    formula: '分别用净收益率 r−f₁ 与 r−f₂ 计算终值；费用影响 = FV低费 − FV高费',
    explanation: '费用既直接减少当期资产，也减少之后能够继续复利的本金。本工具把两种费用率视为每年从费用前收益率中持续扣除。',
    conditions: ['两种方案的底层风险和费用前收益假设相同。', '未计交易成本、税收、价差和跟踪误差。', '低费用是优势之一，不代表产品结构和风险一定合适。'],
    sources: [
      { title: 'How Fees and Expenses Affect Your Investment Portfolio', publisher: 'U.S. Securities and Exchange Commission', url: 'https://www.sec.gov/investor/alerts/ib_fees_expenses.pdf', note: '持续费用对长期投资净值的影响。' },
      investorCompoundSource,
    ],
    related: [
      { title: '基金费用率', href: '/knowledge/expense-ratio/', note: '区分管理费与其他交易、税务和跟踪成本。' },
      { title: '复利', href: '/knowledge/compound-interest/', note: '费用差异也会随时间复合累积。' },
    ],
  },
};

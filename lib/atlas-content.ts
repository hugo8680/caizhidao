import { knowledgeTerms } from './content';
import { disciplines } from './system';

type ConceptBrief = readonly [english: string, brief: string];

const conceptBriefs: Record<string, ConceptBrief> = {
  // 微观经济学
  '稀缺': ['Scarcity', '资源、时间和预算有限，无法同时满足所有目标，因此必须取舍。'],
  '机会成本': ['Opportunity Cost', '做出一个选择时，被放弃的最好替代方案所带来的价值。'],
  '边际分析': ['Marginal Analysis', '比较“再多做一点”的新增收益与新增成本，而不是只看总量。'],
  '沉没成本': ['Sunk Cost', '已经发生且无法收回的投入，不应继续左右下一步选择。'],
  '激励': ['Incentives', '会改变行为成本或收益的规则、价格、奖励与惩罚。'],
  '需求': ['Demand', '在不同价格下，消费者愿意并且能够购买的数量。'],
  '供给': ['Supply', '在不同价格下，生产者愿意并且能够提供的数量。'],
  '市场均衡': ['Market Equilibrium', '在给定条件下，计划购买量与计划出售量相等的价格和数量。'],
  '价格弹性': ['Price Elasticity', '价格变化 1% 时，需求量或供给量会变化多少百分比。'],
  '消费者剩余': ['Consumer Surplus', '消费者愿付的最高价格与实际支付价格之间的差额。'],
  '生产函数': ['Production Function', '描述劳动、资本和技术如何共同转化为产出的关系。'],
  '规模经济': ['Economies of Scale', '产量扩大后，平均成本因分工、设备或采购优势而下降。'],
  '完全竞争': ['Perfect Competition', '大量买卖者交易同质产品，单个参与者难以左右市场价格。'],
  '垄断': ['Monopoly', '一个主要供给者拥有显著市场力量，能够影响价格或供给条件。'],
  '寡头博弈': ['Oligopoly Games', '少数企业相互依赖，每家的定价和产量都会考虑竞争者反应。'],
  '外部性': ['Externality', '一项交易给未参与交易的人带来未计入价格的成本或收益。'],
  '公共品': ['Public Goods', '通常具有非排他性和非竞争性，难以只靠自愿付费充分供给。'],
  '信息不对称': ['Information Asymmetry', '交易双方掌握的信息质量或数量不同，可能扭曲价格和选择。'],
  '逆向选择': ['Adverse Selection', '交易前的信息差让高风险一方更愿意进入，挤出低风险一方。'],
  '道德风险': ['Moral Hazard', '交易或保障生效后，因部分后果由他人承担而改变行为。'],

  // 宏观经济学
  '国内生产总值': ['Gross Domestic Product', '一个经济体在一定时期内生产的最终商品与服务的市场价值。'],
  '名义与实际 GDP': ['Nominal vs. Real GDP', '名义 GDP 按当期价格计算，实际 GDP 剔除价格变化以观察产量。'],
  '国民收入': ['National Income', '生产活动形成并分配给劳动、资本和其他要素的收入总和。'],
  '消费': ['Consumption', '家庭为满足当前需要购买商品和服务的支出。'],
  '投资': ['Investment', '用于增加未来生产能力的设备、建筑、存货和知识投入。'],
  '生产率': ['Productivity', '每单位劳动、资本或综合投入能够创造多少产出。'],
  '资本积累': ['Capital Accumulation', '通过持续投资增加机器、厂房和基础设施等生产资本。'],
  '人力资本': ['Human Capital', '教育、技能、经验和健康所形成的生产能力。'],
  '技术进步': ['Technological Progress', '用新知识、流程或工具在相同投入下创造更多或更好产出。'],
  '潜在产出': ['Potential Output', '在资源可持续利用、不过度推高通胀时经济能够达到的产出。'],
  '扩张': ['Expansion', '产出、就业、收入和支出普遍上升的经济周期阶段。'],
  '过热': ['Overheating', '总需求超过可持续供给能力，价格和工资压力明显上升。'],
  '衰退': ['Recession', '经济活动广泛且持续下降，通常伴随就业和收入走弱。'],
  '复苏': ['Recovery', '经济从低谷回升，生产、招聘和支出开始修复。'],
  '产出缺口': ['Output Gap', '实际产出与潜在产出之间的差额，用来观察经济冷热。'],
  '通货膨胀': ['Inflation', '总体价格水平持续上涨，使同样金额能够购买的商品和服务减少。'],
  '居民消费价格指数': ['Consumer Price Index', '追踪代表性居民消费篮子价格随时间变化的指数。'],
  '失业率': ['Unemployment Rate', '劳动力中没有工作、能够工作并正在求职者所占的比例。'],
  '劳动参与率': ['Labor Force Participation Rate', '达到劳动年龄的人口中，正在工作或积极求职者的比例。'],
  '菲利普斯曲线': ['Phillips Curve', '描述通胀与劳动力市场松紧之间可能存在的短期关系。'],

  // 货币与银行
  '货币职能': ['Functions of Money', '货币承担交换媒介、记账单位和价值储藏三项基本职能。'],
  '货币供应量': ['Money Supply', '经济中可用于支付或较容易转成支付手段的货币总量。'],
  '信用创造': ['Credit Creation', '银行放贷同时形成存款，使支付能力在金融体系中扩张。'],
  '流动性': ['Liquidity', '资产能否快速、低成本并以合理价格转换为现金。'],
  '货币乘数': ['Money Multiplier', '基础货币与更广义货币之间关系的简化表达，并非固定机械倍数。'],
  '存款': ['Deposits', '客户存放在银行、可按约定支取或转账的资金，也是银行的负债。'],
  '贷款': ['Loans', '银行把资金或信用提供给借款人，并约定利息、期限与偿还条件。'],
  '资本充足率': ['Capital Adequacy Ratio', '银行资本相对风险加权资产的比例，用于吸收意外损失。'],
  '净息差': ['Net Interest Margin', '银行利息收入减利息支出后，相对生息资产的收益水平。'],
  '银行挤兑': ['Bank Run', '大量存款人同时取款，使持有长期资产的银行面临现金压力。'],
  '政策利率': ['Policy Rate', '中央银行用来影响短期市场利率和整体金融条件的关键利率。'],
  '公开市场操作': ['Open Market Operations', '中央银行买卖证券以调节银行体系流动性和短期利率。'],
  '存款准备金': ['Reserve Requirements', '银行须保留的部分存款资金或准备金，用于支付和监管要求。'],
  '量化宽松': ['Quantitative Easing', '央行大规模购买较长期资产，以压低利率并改善金融条件。'],
  '最后贷款人': ['Lender of Last Resort', '央行在市场融资失灵时向有偿付能力的机构提供紧急流动性。'],
  '实际利率': ['Real Interest Rate', '名义利率扣除通胀影响后，资金购买力层面的真实回报或成本。'],
  '基准利率': ['Benchmark Rate', '被广泛用作贷款、债券和衍生品定价起点的参考利率。'],
  '信用利差': ['Credit Spread', '风险债券收益率高于相近无风险基准的部分，用于补偿信用风险。'],
  '收益率曲线': ['Yield Curve', '同类债务在不同到期期限上的收益率排列。'],
  '期限溢价': ['Term Premium', '投资者持有长期债券相对连续持有短债所要求的额外补偿。'],

  // 金融市场
  '一级市场': ['Primary Market', '证券首次发行并把资金从投资者交给融资者的市场。'],
  '二级市场': ['Secondary Market', '已发行证券在投资者之间交易并形成市场价格的场所。'],
  '订单簿': ['Order Book', '按价格排列的买卖委托集合，显示市场当前的供需深度。'],
  '买卖价差': ['Bid–Ask Spread', '最高买价与最低卖价之间的差额，是交易成本和流动性的信号。'],
  '价格发现': ['Price Discovery', '分散信息通过报价和成交不断汇入市场价格的过程。'],
  '普通股': ['Common Stock', '代表企业剩余所有权，通常具有表决权并最后承担损失。'],
  '优先股': ['Preferred Stock', '通常在分红和清偿顺序上优先于普通股，但权利与债券不同。'],
  '首次公开发行': ['Initial Public Offering', '企业第一次向公众发行股票并进入公开市场交易。'],
  '股息': ['Dividend', '企业将部分利润或资本以现金或股票形式分配给股东。'],
  '市值': ['Market Capitalization', '公司股价乘以已发行股份数量，表示市场赋予其股权的总价值。'],
  '国债': ['Government Bond', '政府发行并承诺按期付息还本的债务证券。'],
  '公司债': ['Corporate Bond', '企业为融资发行的债务证券，回报取决于利率和信用风险。'],
  '票息': ['Coupon', '债券按面值和票面利率约定支付的周期性利息。'],
  '到期收益率': ['Yield to Maturity', '按当前价格持有债券至到期并按假设再投资时的年化回报率。'],
  '久期': ['Duration', '衡量债券现金流平均时间及价格对利率变化敏感度的指标。'],
  '共同基金': ['Mutual Fund', '集合投资者资金并按既定策略持有一篮子资产的基金。'],
  '交易型基金': ['Exchange-Traded Fund', '在交易所实时买卖、通常追踪一篮子资产的基金。'],
  '房地产投资信托': ['Real Estate Investment Trust', '通过持有或经营收益型房地产，让投资者分享租金和资产收益。'],
  '商品': ['Commodities', '能源、金属和农产品等可标准化交易的实物或其金融合约。'],
  '私募股权': ['Private Equity', '以非公开方式投资企业股权并通过治理、成长或重组获取回报。'],

  // 投资与组合
  '预期收益': ['Expected Return', '对未来各种可能回报按概率加权后的平均值，而不是承诺收益。'],
  '波动率': ['Volatility', '衡量价格或收益围绕平均水平波动幅度的统计指标。'],
  '风险溢价': ['Risk Premium', '投资者承担某类不确定性，相对低风险资产要求的额外预期回报。'],
  '最大回撤': ['Maximum Drawdown', '资产或组合从阶段高点跌到随后低点的最大跌幅。'],
  '尾部风险': ['Tail Risk', '发生概率较低但损失极大的极端事件风险。'],
  '战略配置': ['Strategic Asset Allocation', '根据长期目标和风险预算设定资产类别的基准比例。'],
  '战术配置': ['Tactical Asset Allocation', '围绕长期基准，根据中短期判断暂时调整资产比例。'],
  '相关性': ['Correlation', '衡量两个资产收益共同变化方向和程度的统计指标。'],
  '分散投资': ['Diversification', '把资金分配给不同风险来源，降低单一失败对整体的伤害。'],
  '再平衡': ['Rebalancing', '把偏离目标的资产比例恢复到预先设定的风险结构。'],
  '基准': ['Benchmark', '用于比较组合表现和风险暴露的参照指数或政策组合。'],
  '阿尔法': ['Alpha', '扣除基准和系统性风险影响后，策略试图创造的超额回报。'],
  '贝塔': ['Beta', '资产收益相对选定市场基准共同波动的敏感程度。'],
  '夏普比率': ['Sharpe Ratio', '每承担一单位总波动所获得的超额回报。'],
  '业绩归因': ['Performance Attribution', '把投资结果拆成市场、配置、选择、汇率和成本等来源。'],
  '投资政策书': ['Investment Policy Statement', '预先写明目标、期限、风险、配置和执行规则的投资文件。'],
  '定期定额': ['Dollar-Cost Averaging', '按固定时间投入固定金额，减少一次性择时压力。'],
  '安全边际': ['Margin of Safety', '估计价值与支付价格之间为预测误差保留的缓冲。'],
  '仓位管理': ['Position Sizing', '根据可承受损失、风险相关性和流动性决定持仓规模。'],
  '尽职调查': ['Due Diligence', '在投入资金前核验资产、主体、合同、费用、风险和退出条件。'],

  // 公司金融
  '货币时间价值': ['Time Value of Money', '今天的资金可立即使用或投资，因此通常比未来同额资金更有价值。'],
  '净现值': ['Net Present Value', '项目未来现金流现值减去初始投入，用于判断是否创造价值。'],
  '内部收益率': ['Internal Rate of Return', '使项目净现值等于零的折现率。'],
  '资本预算': ['Capital Budgeting', '企业评估、选择并安排长期投资项目的决策过程。'],
  '实物期权': ['Real Options', '企业在不确定条件下推迟、扩张、缩减或放弃项目的经营选择权。'],
  '权益融资': ['Equity Financing', '通过发行所有权份额筹资，不承诺固定还本付息。'],
  '债务融资': ['Debt Financing', '通过借款或发行债券筹资，并承担约定的利息和偿还义务。'],
  '财务杠杆': ['Financial Leverage', '使用债务放大股东收益变化，同时也放大损失和偿付压力。'],
  '资本结构': ['Capital Structure', '企业债务、权益及其他长期融资工具的组合。'],
  '加权资本成本': ['Weighted Average Cost of Capital', '按融资权重综合计算债权人与股东要求的回报率。'],
  '自由现金流': ['Free Cash Flow', '经营产生的现金扣除维持和扩张所需投资后的余额。'],
  '现金流折现': ['Discounted Cash Flow', '把未来现金流按风险和时间折算为今天价值的估值方法。'],
  '终值': ['Terminal Value', '估值预测期之后全部现金流在某一时点的集中估计。'],
  '市盈率': ['Price-to-Earnings Ratio', '股价或市值相对每股盈利或净利润的估值倍数。'],
  '企业价值': ['Enterprise Value', '企业经营资产对全部资本提供者的价值，通常连接股权与净债务。'],
  '代理问题': ['Agency Problem', '管理者、股东和债权人的目标不完全一致而产生的利益冲突。'],
  '公司治理': ['Corporate Governance', '通过董事会、权责、披露和监督约束企业决策的制度。'],
  '股利政策': ['Dividend Policy', '企业决定保留利润还是向股东分配现金的长期规则。'],
  '股份回购': ['Share Repurchase', '公司用资金买回自身股份，改变现金、股数和资本结构。'],
  '并购': ['Mergers and Acquisitions', '企业通过合并或收购重新配置资产、业务和控制权。'],

  // 会计与报表
  '会计等式': ['Accounting Equation', '资产等于负债加所有者权益，是复式记账保持平衡的基础。'],
  '权责发生制': ['Accrual Accounting', '在经济活动发生时确认收入和费用，而非只看现金收付时间。'],
  '收入确认': ['Revenue Recognition', '按照履约和控制权转移情况，判断何时、按多少金额记录收入。'],
  '折旧': ['Depreciation', '把固定资产成本按其使用年限系统分摊到各会计期间。'],
  '会计估计': ['Accounting Estimates', '对坏账、寿命、减值等无法精确观察项目作出的合理判断。'],
  '资产负债表': ['Balance Sheet', '展示企业在某一时点的资产、负债和所有者权益。'],
  '利润表': ['Income Statement', '展示一段时期内收入、成本、费用和利润的形成过程。'],
  '现金流量表': ['Cash Flow Statement', '把现金变化拆成经营、投资和融资三类活动。'],
  '所有者权益': ['Shareholders’ Equity', '资产扣除负债后归属于所有者的剩余权益。'],
  '报表勾稽': ['Statement Articulation', '三张报表通过利润、现金和权益变化相互连接并可交叉核验。'],
  '毛利率': ['Gross Margin', '营业收入扣除直接营业成本后所剩比例。'],
  '经营利润': ['Operating Profit', '主营经营收入扣除营业成本和经营费用后的利润。'],
  '应收账款': ['Accounts Receivable', '企业已确认收入但尚未从客户收回的款项。'],
  '存货周转': ['Inventory Turnover', '衡量存货销售和更新速度，反映运营效率与积压风险。'],
  '现金转换率': ['Cash Conversion Ratio', '用经营现金流相对利润观察盈利转化为现金的程度。'],
  '流动比率': ['Current Ratio', '流动资产相对流动负债的比例，用于初步观察短期偿债能力。'],
  '资产负债率': ['Debt-to-Assets Ratio', '总负债相对总资产的比例，反映债务融资程度。'],
  '利息保障倍数': ['Interest Coverage Ratio', '经营利润能够覆盖利息费用多少倍。'],
  '净资产收益率': ['Return on Equity', '企业用股东权益创造净利润的效率。'],
  '投入资本回报率': ['Return on Invested Capital', '税后经营利润相对经营所需债务与权益资本的回报。'],

  // 个人财务
  '预算': ['Budget', '提前为收入安排必要支出、目标储蓄和可自由使用的边界。'],
  '储蓄率': ['Savings Rate', '一定时期储蓄金额占可支配收入的比例。'],
  '净资产': ['Net Worth', '个人或家庭拥有的总资产减去全部负债后的余额。'],
  '应急金': ['Emergency Fund', '专门用于收入中断和意外开支的高流动性安全垫。'],
  '财务目标': ['Financial Goals', '用明确金额、日期和优先级表达的未来资金需求。'],
  '信用记录': ['Credit History', '个人过去借款、还款和信用账户使用情况的记录。'],
  '实际年化利率': ['Annual Percentage Rate', '把利息及部分必要费用折算为可比较的年化借款成本。'],
  '债务收入比': ['Debt-to-Income Ratio', '每月债务偿付额占月收入的比例，用来观察还款压力。'],
  '等额本息': ['Equal Installment Amortization', '每期偿还相同金额，但早期利息占比高、后期本金占比高。'],
  '提前还款': ['Early Repayment', '在合同期限前偿还部分或全部贷款本金，以减少未来利息。'],
  '风险转移': ['Risk Transfer', '通过保险或合同把特定损失的财务后果交给另一方承担。'],
  '保障缺口': ['Protection Gap', '家庭未来责任与可用资产、现有保障之间的资金差额。'],
  '免赔额': ['Deductible', '保险事故发生后，由被保险人先自行承担的损失金额。'],
  '等待期': ['Waiting Period', '保险生效后需经过一定时间，部分责任才开始承保。'],
  '责任保险': ['Liability Insurance', '赔偿被保险人依法应向第三方承担的特定损害责任。'],
  '租买决策': ['Rent-or-Buy Decision', '综合期限、交易成本、现金流和迁移需求比较租房与买房。'],
  '教育金': ['Education Fund', '为未来教育费用单独规划的目标资金。'],
  '退休缺口': ['Retirement Shortfall', '退休生活所需资金现值与养老金、已有资产之间的差额。'],
  '提取率': ['Withdrawal Rate', '退休后每年从资产组合中提取资金的比例。'],
  '遗产规划': ['Estate Planning', '安排身故后的资产传承、债务、税务和照护意愿。'],

  // 公共财政
  '税基': ['Tax Base', '税收适用的收入、消费、财产或交易金额范围。'],
  '边际税率': ['Marginal Tax Rate', '新增一单位应税收入所适用的税率。'],
  '累进税': ['Progressive Tax', '收入或税基越高，平均或边际税率通常越高的税制。'],
  '税收归宿': ['Tax Incidence', '税负最终由谁承担，取决于供需反应而不只看法定缴税人。'],
  '超额负担': ['Deadweight Loss of Taxation', '税收扭曲交易和行为后，超过政府收入之外的社会福利损失。'],
  '财政赤字': ['Fiscal Deficit', '一定时期政府支出超过收入的差额。'],
  '政府债务': ['Government Debt', '政府历年借款形成、尚未偿还的债务存量。'],
  '债务利息': ['Debt Interest', '政府为存量债务支付的融资成本。'],
  '自动稳定器': ['Automatic Stabilizers', '无需临时立法便会随经济周期自动变化的税收和支出机制。'],
  '财政乘数': ['Fiscal Multiplier', '政府支出或税收变化对总产出产生的连锁影响比例。'],
  '社会保险': ['Social Insurance', '通过普遍缴费或财政支持共同分担失业、养老和医疗等风险。'],
  '转移支付': ['Transfer Payments', '政府向个人或机构支付资金，但不直接交换当期商品和服务。'],
  '基础设施': ['Infrastructure', '支撑经济和公共生活的交通、能源、通信及公共系统。'],
  '成本收益分析': ['Cost–Benefit Analysis', '把政策或项目的社会成本与收益尽量放到同一尺度比较。'],
  '反事实': ['Counterfactual', '如果没有实施政策，原本可能发生什么的比较基准。'],
  '随机试验': ['Randomized Trial', '随机分配干预与对照，以减少选择差异并识别因果影响。'],
  '成本效果': ['Cost Effectiveness', '比较不同方案每取得一单位目标效果需要多少成本。'],
  '监管影响': ['Regulatory Impact', '评估监管规则对成本、竞争、行为和社会结果的影响。'],
  '代际公平': ['Intergenerational Equity', '比较政策成本和收益在当前与未来世代之间如何分配。'],

  // 国际经济
  '比较优势': ['Comparative Advantage', '即使一方各方面都更强，仍可专注机会成本较低的活动并交换。'],
  '贸易收益': ['Gains from Trade', '专业化与交换使参与者获得超过各自封闭生产的消费可能。'],
  '关税': ['Tariff', '对进口商品征收的税，会改变国内价格、贸易量和利益分配。'],
  '配额': ['Import Quota', '直接限制进口数量的政策工具。'],
  '全球价值链': ['Global Value Chain', '产品设计、零部件、制造和销售分布在多个国家的生产网络。'],
  '即期汇率': ['Spot Exchange Rate', '两种货币在当前市场即时交割的兑换价格。'],
  '实际有效汇率': ['Real Effective Exchange Rate', '按贸易权重并调整相对价格后的综合汇率指数。'],
  '购买力平价': ['Purchasing Power Parity', '长期看，汇率可能趋向让相同商品篮子的价格接近。'],
  '利率平价': ['Interest Rate Parity', '利率差与即期、远期汇率之间避免无风险套利的关系。'],
  '汇率制度': ['Exchange Rate Regime', '一国如何允许、管理或固定本币对其他货币价格的制度。'],
  '经常账户': ['Current Account', '记录货物、服务、初次收入和转移收支的国际账户。'],
  '资本账户': ['Capital and Financial Account', '记录资本转移以及跨境资产、负债交易的账户。'],
  '外汇储备': ['Foreign Exchange Reserves', '货币当局持有的外币资产，用于支付、干预和信心支持。'],
  '资本流动': ['Capital Flows', '资金因投资、融资和风险配置在国家之间移动。'],
  '外债': ['External Debt', '居民、企业或政府欠非居民并需以约定条件偿还的债务。'],
  '美元周期': ['U.S. Dollar Cycle', '美元融资条件和汇率变化对全球资本、贸易和债务压力的共同影响。'],
  '主权债务': ['Sovereign Debt', '国家政府以本币或外币承担的借款义务。'],
  '货币危机': ['Currency Crisis', '汇率急剧贬值、储备流失和融资压力相互强化的事件。'],
  '资本突然停止': ['Sudden Stop', '跨境资本流入短时间急剧中断甚至逆转。'],
  '金融传染': ['Financial Contagion', '风险通过共同投资者、融资和情绪从一个市场扩散到其他市场。'],

  // 行为经济学
  '锚定效应': ['Anchoring Effect', '判断会过度依赖最先看到的数字或参照点。'],
  '可得性偏差': ['Availability Bias', '越容易想起或越生动的事件，越容易被高估其发生概率。'],
  '代表性偏差': ['Representativeness Bias', '根据表面相似性快速归类，并忽视基础概率和样本大小。'],
  '确认偏误': ['Confirmation Bias', '更愿意寻找和相信支持既有观点的信息。'],
  '过度自信': ['Overconfidence', '高估自己的知识、预测准确度或控制结果的能力。'],
  '损失厌恶': ['Loss Aversion', '同等金额的损失带来的痛苦通常强于收益带来的快乐。'],
  '前景理论': ['Prospect Theory', '人们相对参照点评价得失，并以非线性方式感受概率和价值。'],
  '框架效应': ['Framing Effect', '同一信息因表述为收益、损失或不同参照点而改变选择。'],
  '概率加权': ['Probability Weighting', '人们常高估小概率、低估某些中高概率，而非线性使用客观概率。'],
  '禀赋效应': ['Endowment Effect', '仅仅因为已经拥有某物，就会提高对它的主观估值。'],
  '双曲贴现': ['Hyperbolic Discounting', '人对近期等待格外不耐心，时间偏好会随距离现在远近而变化。'],
  '现时偏好': ['Present Bias', '在当下诱惑与未来目标之间，系统性地偏重即时满足。'],
  '承诺机制': ['Commitment Device', '提前设置限制或规则，帮助未来的自己抵抗短期诱惑。'],
  '心理账户': ['Mental Accounting', '人会按资金来源或用途分账户看待钱，而忽略其可替代性。'],
  '默认选项': ['Default Option', '不主动选择时自动采用的方案，会显著影响最终行为。'],
  '羊群效应': ['Herding', '因为他人行动而跟随群体，即使缺少独立信息。'],
  '信息瀑布': ['Information Cascade', '后来的决策者忽略私人信息，依据前面人的行动连续跟随。'],
  '社会规范': ['Social Norms', '群体对何种行为合适的共同期待，会影响经济选择。'],
  '叙事经济学': ['Narrative Economics', '广泛传播的故事会改变预期、行为并推动经济波动。'],
  '市场情绪': ['Market Sentiment', '投资者整体乐观或悲观程度对交易和价格的影响。'],

  // 金融科技与风险
  '支付清算': ['Payment and Settlement', '把付款指令核对、传递并最终完成资金转移的系统过程。'],
  '电子钱包': ['Digital Wallet', '保存支付凭证并发起数字支付的应用或账户工具。'],
  '双边平台': ['Two-Sided Platform', '连接两类相互依赖用户，并通过网络效应创造价值的平台。'],
  '开放银行': ['Open Banking', '在授权和标准接口下，让客户数据与金融服务可被第三方安全调用。'],
  '嵌入式金融': ['Embedded Finance', '把支付、信贷或保险直接嵌入非金融产品和业务流程。'],
  '信用评分': ['Credit Scoring', '用数据和模型估计借款人违约概率或信用质量。'],
  '机器学习': ['Machine Learning', '让模型从数据中学习规律，用于预测、分类或决策。'],
  '模型风险': ['Model Risk', '模型假设、数据、实现或使用不当造成错误决策和损失的风险。'],
  '算法偏见': ['Algorithmic Bias', '数据和规则中的系统性偏差导致某些群体受到不公平影响。'],
  '压力测试': ['Stress Testing', '用严重但合理的情景评估机构、组合或系统能否承受冲击。'],
  '区块链': ['Blockchain', '由多方共同维护、按规则追加并难以单方面篡改的分布式账本。'],
  '稳定币': ['Stablecoin', '试图通过储备、抵押或算法机制维持相对稳定价值的数字代币。'],
  '智能合约': ['Smart Contract', '部署在区块链上、满足条件时自动执行的程序。'],
  '代币化': ['Tokenization', '把资产、权利或凭证表示为可编程数字代币。'],
  '数字托管': ['Digital Asset Custody', '安全保存私钥并执行数字资产转移、授权和记录的服务。'],
  '操作风险': ['Operational Risk', '人员、流程、系统或外部事件失败造成损失的风险。'],
  '网络安全': ['Cybersecurity', '保护系统、网络和数据免受攻击、泄露与破坏的能力。'],
  '流动性螺旋': ['Liquidity Spiral', '价格下跌、抵押品缩水和被迫卖出相互强化的反馈循环。'],
  '系统性风险': ['Systemic Risk', '局部故障通过金融连接和反馈扩散并威胁整体系统的风险。'],
  '监管科技': ['RegTech', '用数据和技术提高合规、监测、报告和风险识别效率。'],
};

const topicExamples: Record<string, string> = {
  'microeconomics:0': '周末只有 8 小时，你可以加班、学习或陪伴家人。时间不够同时完成所有目标，选择任何一项都会改变其余选项的成本与收益。',
  'microeconomics:1': '热门演唱会的座位短期固定，想入场的人突然增加。价格、排队、抽签和转售市场都在用不同方式分配有限门票。',
  'microeconomics:2': '一家咖啡连锁开到第 100 家店后，采购更便宜，但管理也更复杂；竞争者会观察它的价格和选址再作反应。',
  'microeconomics:3': '保险公司比投保人更难了解健康习惯；保单生效后，行为也可能改变。合同设计需要同时处理交易前与交易后的信息问题。',
  'macroeconomics:0': '一家车厂生产汽车、支付工资并采购零部件。同一笔经济活动会同时进入产出、收入和支出账户，但不能被重复计算。',
  'macroeconomics:1': '两家工厂人数相同，其中一家引入自动化并改善培训，因此每小时产量更高。长期收入差距主要来自生产能力，而非短期价格。',
  'macroeconomics:2': '订单增加后，企业先消化库存，再加班、招聘和扩产；若需求随后转弱，这一过程会反向运行并形成周期。',
  'macroeconomics:3': '餐饮价格上涨、招聘仍旺盛，但更多人重新开始求职。判断经济冷热需要同时看价格、就业和劳动力供给。',
  'money-banking:0': '银行批准 100 万元企业贷款并把资金记入存款账户，支付能力因此出现，但这同时产生了借款人的债务和银行的信用风险。',
  'money-banking:1': '银行用可随时支取的存款支持多年期房贷。平时这种期限转换有效，一旦大量客户同时取款，就需要额外流动性。',
  'money-banking:2': '央行提高政策利率后，银行间融资、存贷款和债券收益率逐步调整，但每条传导路径的速度和幅度并不相同。',
  'money-banking:3': '同一天的隔夜资金、十年国债和低评级公司债利率不同，因为期限、信用和流动性风险各不相同。',
  'financial-markets:0': '一家公司首次发行股票获得融资，此后股票在投资者之间交易。订单如何排队和成交，会影响价差、流动性与价格。',
  'financial-markets:1': '企业盈利增长但股价下跌，可能是此前价格已经包含更高预期。股票回报要同时看经营、分红和估值变化。',
  'financial-markets:2': '市场利率上升后，旧有低票息债券需要降价才能提供有竞争力的收益，期限越长通常越敏感。',
  'financial-markets:3': '投资者可以买一只基金间接持有股票、房地产或商品，但产品名称不能替代对底层资产、费用和流动性的检查。',
  'investment:0': '一项资产大多数月份很平稳，却可能在危机中一次下跌 40%。平均收益、日常波动和极端损失描述的是不同维度。',
  'investment:1': '股票上涨后组合从目标的 60% 升到 75%。再平衡不是猜测市场顶部，而是把整体风险恢复到原计划。',
  'investment:2': '组合一年上涨 12%，基准上涨 10%。还要拆分资产配置、证券选择、汇率和费用，才能判断多出的 2% 从哪里来。',
  'investment:3': '市场大跌时临时决定是否卖出很容易受情绪影响。提前写好目标、仓位上限和再平衡条件，能让执行更稳定。',
  'corporate-finance:0': '企业计划投入 1000 万元建设产线，未来五年获得现金流。只有把不同年份的金额折到同一时点，才能判断项目是否创造价值。',
  'corporate-finance:1': '举债能降低部分融资成本，也会增加固定利息和到期偿还压力。企业需要在控制权、税盾和困境风险之间权衡。',
  'corporate-finance:2': '同一家企业用不同增长率和折现率估值，会得到明显不同结果。可靠结论应是区间，并说明最敏感的假设。',
  'corporate-finance:3': '管理层决定用现金扩张、分红或回购，会影响股东、债权人和未来经营空间，因此治理不能只看短期股价。',
  'accounting:0': '企业先交付服务、两个月后收款。收入、应收账款和现金在不同时间变化，权责发生制把经营事实与收款时点分开。',
  'accounting:1': '赊销会增加收入和应收账款，却不会立即增加现金。三张报表必须联读，才能看清利润、家底和现金如何连接。',
  'accounting:2': '公司营收增长，但应收和存货增长更快、经营现金流下降。利润质量可能正在变弱，需要追查业务原因。',
  'accounting:3': '两家公司 ROE 都是 20%，一家靠高利润率，另一家靠高负债。单一比率相同，不代表经营质量和风险相同。',
  'personal-finance:0': '收入到账后先安排房租、生活、应急金和长期目标，再决定自由消费；预算是在有限现金流里明确优先级。',
  'personal-finance:1': '同样标注“月费率 0.5%”的分期，若手续费先收、还款本金逐月下降，真实年化成本可能远高于直觉。',
  'personal-finance:2': '小额维修可以自己承担，家庭收入支柱身故却可能造成长期缺口。保险应优先转移无法自行承受的大损失。',
  'personal-finance:3': '五年后要用的教育金和三十年后的退休金期限不同，通胀、风险承受和资产选择也不应相同。',
  'public-finance:0': '对商品征税后，标价可能上涨、销量可能下降。最终税负由消费者和生产者共同承担，比例取决于双方反应。',
  'public-finance:1': '经济下行时税收自然减少、失业支出增加，赤字扩大；即使没有新刺激法案，自动稳定器也会工作。',
  'public-finance:2': '修建地铁需要前期投资，收益却分散在通勤时间、污染、土地利用和多年运营中，不能只看票款。',
  'public-finance:3': '就业培训后参与者工资更高，不一定全由培训造成。需要找到可信的反事实并比较效果、成本和分配影响。',
  'international-economics:0': '两个国家生产粮食和机器的效率不同，即使一国两项都更高，按机会成本分工仍可能让双方可消费数量增加。',
  'international-economics:1': '海外资产上涨 8%，但投资者本币升值 6%，换回本币后的收益会被明显压缩。资产与汇率必须分开计算。',
  'international-economics:2': '一国进口多于出口，同时可能吸引海外资金购买本国资产。真实贸易与金融账户是同一国际收支体系的两面。',
  'international-economics:3': '美元融资突然收紧时，依赖外币短债的国家可能同时面临资本外流、汇率贬值和偿债成本上升。',
  'behavioral-economics:0': '看到“原价 1999 元”后再看到 999 元，人容易把前者当锚，而没有先判断商品对自己究竟值多少。',
  'behavioral-economics:1': '同一治疗方案说成“90% 存活率”或“10% 死亡率”，可能引发不同选择，尽管客观概率完全相同。',
  'behavioral-economics:2': '人计划下月开始储蓄，却每月都把开始日期推迟。自动转账和限制随意支取可以把意愿变成承诺。',
  'behavioral-economics:3': '价格上涨吸引更多“别人都赚钱”的故事，故事又推动买入。个体从众可能被放大为市场趋势。',
  'fintech-risk:0': '电商平台把支付和分期嵌入结账页，减少了摩擦，也同时掌握更多数据并连接消费者、商户和金融机构。',
  'fintech-risk:1': '信用模型在历史数据上准确，不代表经济环境变化后仍可靠；数据偏差还可能让某些群体系统性受损。',
  'fintech-risk:2': '代币能表示一项资产，但价值仍取决于底层权利、储备、托管、代码和治理能否兑现。',
  'fintech-risk:3': '系统故障导致价格下跌，抵押品缩水触发自动卖出，卖出又压低价格。技术速度会放大传统金融反馈。',
};

type AtlasReference = { title: string; publisher: string; url: string; note: string };

type DisciplineDepth = {
  process: string;
  evidence: string;
  boundary: string;
  references: AtlasReference[];
};

const disciplineDepth: Record<string, DisciplineDepth> = {
  microeconomics: {
    process: '微观分析通常先固定其他条件，再观察价格、约束或激励变化后，个人与企业怎样调整选择；众多选择汇合后才形成市场结果。',
    evidence: '可以从价格、销量、成本、替代品、合同规则与参与者行为中寻找证据。观察前要先区分相关变化和真正的因果影响。',
    boundary: '“其他条件不变”只是分析起点。现实中收入、偏好、技术、制度和竞争者反应往往会同时改变。',
    references: [{ title: 'Principles of Economics', publisher: 'OpenStax', url: 'https://openstax.org/details/books/principles-economics-3e', note: '开放教材，系统覆盖选择、供需、企业与市场失灵。' }],
  },
  macroeconomics: {
    process: '宏观分析把家庭、企业、政府和海外部门的活动汇总起来，再通过增长、就业、价格、信用和政策传导解释经济整体的变化。',
    evidence: '优先查看统计部门和央行发布的原始数据、指标定义、季节调整方法与历史修订，并同时比较总量、增速和人均指标。',
    boundary: '宏观数据发布有滞后且经常修订；单个指标只能描述经济的一面，同步变化也不能自动证明因果。',
    references: [{ title: 'Back to Basics', publisher: 'International Monetary Fund', url: 'https://www.imf.org/external/pubs/ft/fandd/basics/', note: 'GDP、通胀、财政、货币和国际收支的基础说明。' }, { title: '国家数据', publisher: '中华人民共和国国家统计局', url: 'https://data.stats.gov.cn/', note: '中国宏观与社会经济数据查询入口。' }],
  },
  'money-banking': {
    process: '货币银行分析要沿着资产负债表追踪：谁形成一项资产，谁就对应承担一项负债；利率、资本与流动性约束再决定信用能扩张到什么程度。',
    evidence: '可查央行资产负债表、货币供应量、银行资本与流动性披露、政策利率、市场利率和信用利差。',
    boundary: '银行不是简单把一笔既有存款原样借出，信用创造也不是无限的；资本、偿付能力、融资条件、借款需求和监管都会形成约束。',
    references: [{ title: '货币政策', publisher: '中国人民银行', url: 'https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/index.html', note: '中国货币政策、政策工具与执行报告入口。' }, { title: 'About central bank cooperation', publisher: 'Bank for International Settlements', url: 'https://www.bis.org/about/index.htm', note: '中央银行、银行监管与国际金融研究资料。' }],
  },
  'financial-markets': {
    process: '金融市场把融资需求、合约权利、信息和交易指令放进同一套制度。发行决定资金流向，二级交易形成价格，清算与托管完成权利交付。',
    evidence: '阅读发行文件、交易所规则和产品说明书，并结合报价、成交量、买卖价差、持仓披露及现金流条款。',
    boundary: '能够挂牌交易不代表随时都有充足流动性；市场价格也不是永远正确，而是当时信息、预期、仓位与交易规则共同作用的结果。',
    references: [{ title: 'How Stock Markets Work', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work', note: '发行、交易、订单与市场参与者的基础资料。' }],
  },
  investment: {
    process: '投资分析从目标和期限开始，把预期回报拆成现金流与价格变化，再识别承担了哪些市场、信用、流动性和行为风险。',
    evidence: '至少查看底层持仓、基准、费用、历史回撤、成交条件和压力情景；结果评价还要区分市场暴露、主动决策与运气。',
    boundary: '历史平均收益不是承诺，风险也不只等于日常波动。期限错配、被迫卖出和永久损失往往比短期涨跌更重要。',
    references: [{ title: 'Investing basics', publisher: 'Investor.gov · U.S. SEC', url: 'https://www.investor.gov/introduction-investing/investing-basics', note: '风险、收益、分散投资、费用与金融产品资料。' }],
  },
  'corporate-finance': {
    process: '公司金融沿着现金流判断价值：企业先投入资本，经营产生未来现金，再按资金的时间价值和风险折回今天，同时考虑融资与治理怎样分配结果。',
    evidence: '查看资本开支、营运资本、自由现金流、债务到期、融资成本、股本变化和管理层资本配置记录。',
    boundary: '估值结果只在输入假设下成立。增长需要再投资，杠杆会增加固定义务，终值和折现率的小变化都可能显著改变结论。',
    references: [{ title: 'Valuation resources', publisher: 'NYU Stern · Aswath Damodaran', url: 'https://pages.stern.nyu.edu/~adamodar/', note: '公司金融、估值课程、数据与案例。' }],
  },
  accounting: {
    process: '会计把交易按确认、计量和分类规则记录下来。分析时要把利润表、资产负债表和现金流量表连接起来，追踪同一业务怎样穿过三张表。',
    evidence: '以经审计年报、会计政策、报表附注和管理层讨论为主，并至少比较三期趋势以及同业采用的会计处理方法。',
    boundary: '会计数字依赖确认时点与估计，账面价值不等于可变现价格，利润也不等于已经收到的现金。',
    references: [{ title: 'Issued IFRS Standards', publisher: 'IFRS Foundation', url: 'https://www.ifrs.org/issued-standards/list-of-standards/', note: '国际财务报告准则与配套资料。' }],
  },
  'personal-finance': {
    process: '个人财务先把收入、必要支出、负债和目标放到时间轴上，再用应急金与保险保护底线，最后才讨论更长期的投资回报。',
    evidence: '使用真实银行流水、负债合同、保单条款、目标日期和年度净资产记录，而不是只凭大致印象估算。',
    boundary: '不存在适合所有家庭的统一比例。收入稳定性、责任人数、所在地区、保障条件和用钱时间都会改变合理选择。',
    references: [{ title: 'Consumer Tools', publisher: 'U.S. Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/consumer-tools/', note: '信用、贷款、住房与家庭财务工具。' }],
  },
  'public-finance': {
    process: '公共财政分析既追踪政府收了多少钱、花到哪里，也观察税收与支出怎样改变价格、激励、资源配置和不同群体的实际负担。',
    evidence: '查看预算与决算、政府债务、税收结构、项目成本和效果评估；区分名义金额、占经济比重与周期调整后的变化。',
    boundary: '政策意图不等于政策效果。归宿、执行时滞、替代行为、融资成本和代际分配都可能让结果偏离初衷。',
    references: [{ title: 'Fiscal Monitor', publisher: 'International Monetary Fund', url: 'https://www.imf.org/en/Publications/FM', note: '财政政策、债务和公共收支的国际资料。' }],
  },
  'international-economics': {
    process: '国际经济把商品与服务贸易、收入支付、跨境资产交易和汇率放进同一套账户；一项真实交易往往同时对应一项金融流动。',
    evidence: '查看海关与国际收支数据、汇率报价、利差、外汇储备、外债期限和跨境资本流动，并明确本币与计价货币。',
    boundary: '汇率和资本流动同时受贸易、利率、风险偏好与政策影响；经常账户差额也不能脱离金融账户和国内储蓄投资关系解释。',
    references: [{ title: 'Balance of Payments Manual', publisher: 'International Monetary Fund', url: 'https://www.imf.org/external/pubs/ft/bop/2007/bopman6.htm', note: '国际收支与跨境头寸的定义和统计框架。' }],
  },
  'behavioral-economics': {
    process: '行为经济学先建立传统理性选择作为比较基准，再通过实验、现场数据和制度变化观察真实的人在哪些条件下系统性偏离。',
    evidence: '关注实验设计、样本、随机分组、效应大小和可重复性，也可通过真实选择记录检验偏差是否持续存在。',
    boundary: '给行为贴上偏差名称不等于解释完成。环境、经验、激励和选择架构变化后，同一种倾向的强弱也会改变。',
    references: [{ title: 'Daniel Kahneman · Facts', publisher: 'The Nobel Prize', url: 'https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/facts/', note: '判断与不确定性研究的背景资料。' }],
  },
  'fintech-risk': {
    process: '金融科技分析要同时画出技术流程和金融关系：数据怎样进入模型、谁控制资产与密钥、收益由谁支付、失败后损失落到谁身上。',
    evidence: '查看法律主体、牌照范围、系统架构、模型验证、托管安排、代码审计、储备披露、事件记录和退出条件。',
    boundary: '更快、更自动化或链上可查并不会消除信用、流动性和治理风险，反而可能让反馈在更短时间内扩散。',
    references: [{ title: 'FinTech', publisher: 'Financial Stability Board', url: 'https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/fintech/', note: '金融创新、市场结构与金融稳定资料。' }],
  },
};

const pad = (value: number) => String(value + 1).padStart(2, '0');

export type AtlasConceptProfile = {
  id: string;
  name: string;
  en: string;
  brief: string;
  explanation: string;
  example: string;
  caution: string;
  mechanism: Array<{ title: string; text: string }>;
  boundary: string;
  misconceptions: string[];
  checklist: string[];
  englishNote: string;
  related: Array<{ name: string; en: string; brief: string; href: string }>;
  references: AtlasReference[];
  disciplineSlug: string;
  disciplineName: string;
  disciplineEn: string;
  disciplineNo: string;
  topicIndex: number;
  conceptIndex: number;
  topicTitle: string;
  topicEn: string;
  topicSummary: string;
};

export function getAtlasConceptId(topicIndex: number, conceptIndex: number) {
  return `${pad(topicIndex)}-${pad(conceptIndex)}`;
}

export function getAtlasConceptHref(disciplineSlug: string, topicIndex: number, conceptIndex: number) {
  return `/atlas/${disciplineSlug}/${getAtlasConceptId(topicIndex, conceptIndex)}/`;
}

export function getAtlasConceptProfile(disciplineSlug: string, id: string): AtlasConceptProfile | undefined {
  const discipline = disciplines.find((item) => item.slug === disciplineSlug);
  const match = /^(\d{2})-(\d{2})$/.exec(id);
  if (!discipline || !match) return undefined;
  const topicIndex = Number(match[1]) - 1;
  const conceptIndex = Number(match[2]) - 1;
  const topic = discipline.topics[topicIndex];
  const name = topic?.concepts[conceptIndex];
  if (!topic || !name) return undefined;
  const source = knowledgeTerms.find((term) => term.zh === name);
  const [english, brief] = conceptBriefs[name] ?? [name, topic.summary];
  const related = topic.concepts.flatMap((concept, relatedIndex) => {
    if (concept === name) return [];
    const [relatedEn, relatedBrief] = conceptBriefs[concept] ?? [concept, topic.summary];
    return [{ name: concept, en: knowledgeTerms.find((term) => term.zh === concept)?.en ?? relatedEn, brief: relatedBrief, href: getAtlasConceptHref(disciplineSlug, topicIndex, relatedIndex) }];
  });
  const depth = disciplineDepth[disciplineSlug];
  const resolvedBrief = source?.summary ?? brief;
  const resolvedExample = source?.example ?? topicExamples[`${disciplineSlug}:${topicIndex}`] ?? topic.summary;
  const resolvedCaution = source?.fact ?? `“${name}”的经济含义依赖既定假设、制度环境和约束条件；这些条件变化时，理论结论也可能改变。`;
  const relatedNames = related.slice(0, 3).map((item) => item.name).join('、');
  return {
    id,
    name,
    en: source?.en ?? english,
    brief: resolvedBrief,
    explanation: source?.why ?? `“${name}”是“${topic.title}”中的核心概念。${topic.summary}它与${relatedNames}共同解释这一主题中的经济关系。`,
    example: resolvedExample,
    caution: resolvedCaution,
    mechanism: [
      { title: '理论背景', text: topic.summary },
      { title: '作用机制', text: depth?.process ?? discipline.summary },
      { title: '相关概念', text: `“${name}”与${relatedNames}共同构成“${topic.title}”的理论关系。它们分别解释起点、传导过程或最终结果。` },
      { title: '经验观察', text: depth?.evidence ?? `经验分析通常使用与“${topic.title}”有关的统计数据、合同或公开披露。` },
    ],
    boundary: `${depth?.boundary ?? '结论依赖具体环境和假设。'}${resolvedCaution}`,
    misconceptions: [
      `“${name}”与“${related[0]?.name ?? topic.title}”分别描述不同的经济变量、作用阶段或计算方法，二者不能互相替代。`,
      `单一案例不能证明普遍规律；金额、期限、制度和参与者发生变化后，原有关系可能不再成立。`,
    ],
    checklist: [
      `“${name}”的定义是什么，核心变量有哪些？`,
      `它与${related.slice(0, 2).map((item) => `“${item.name}”`).join('、')}之间存在什么理论关系？`,
      '现实中可以使用哪些统计数据、合同条款或公开披露进行观察？',
      '哪些前提假设发生变化后，结论会减弱或反转？',
    ],
    englishNote: source?.definitionEn ?? `In ${discipline.en}, ${source?.en ?? english} is analyzed under ${topic.en}, together with ${related.slice(0, 2).map((item) => item.en).join(' and ')}.`,
    related,
    references: depth?.references ?? [],
    disciplineSlug,
    disciplineName: discipline.name,
    disciplineEn: discipline.en,
    disciplineNo: discipline.no,
    topicIndex,
    conceptIndex,
    topicTitle: topic.title,
    topicEn: topic.en,
    topicSummary: topic.summary,
  };
}

export function getAtlasTopicProfiles(disciplineSlug: string, topicIndex: number) {
  const discipline = disciplines.find((item) => item.slug === disciplineSlug);
  const topic = discipline?.topics[topicIndex];
  if (!discipline || !topic) return [];
  return topic.concepts
    .map((_, conceptIndex) => getAtlasConceptProfile(disciplineSlug, getAtlasConceptId(topicIndex, conceptIndex)))
    .filter((profile): profile is AtlasConceptProfile => Boolean(profile));
}

export const atlasConceptStaticParams = disciplines.flatMap((discipline) =>
  discipline.topics.flatMap((topic, topicIndex) =>
    topic.concepts.map((_, conceptIndex) => ({
      slug: discipline.slug,
      concept: getAtlasConceptId(topicIndex, conceptIndex),
    })),
  ),
);

export const missingAtlasConceptBriefs = Array.from(new Set(
  disciplines.flatMap((discipline) => discipline.topics.flatMap((topic) => topic.concepts)),
)).filter((concept) => !conceptBriefs[concept]);

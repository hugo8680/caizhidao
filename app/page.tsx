'use client';

import { useEffect, useMemo, useState } from 'react';

type Lesson = {
  id: number;
  moduleId: number;
  title: string;
  minutes: number;
  question: string;
  summary: string;
  key: string;
  points: string[];
  example: string;
  exercise: string;
  answer: string;
};

const modules = [
  { id: 1, index: '01', title: '金钱与时间', summary: '先理解钱如何随时间变化', lessons: '6 课', tone: 'amber' },
  { id: 2, index: '02', title: '风险与资产', summary: '看懂工具背后的收益来源', lessons: '8 课', tone: 'green' },
  { id: 3, index: '03', title: '公司与估值', summary: '从报表走向企业真实价值', lessons: '7 课', tone: 'blue' },
  { id: 4, index: '04', title: '市场与周期', summary: '把个人决策放进经济全景', lessons: '7 课', tone: 'coral' },
  { id: 5, index: '05', title: '个人财务规划', summary: '把目标变成可执行的资金计划', lessons: '9 课', tone: 'violet' },
  { id: 6, index: '06', title: '投资分析方法', summary: '用证据研究资产而不是追热点', lessons: '9 课', tone: 'sage' },
  { id: 7, index: '07', title: '组合管理实战', summary: '建立能长期坚持的投资系统', lessons: '9 课', tone: 'gold' },
  { id: 8, index: '08', title: '全球金融进阶', summary: '理解复杂工具与系统性风险', lessons: '9 课', tone: 'rose' },
];

const lessons: Lesson[] = [
  { id: 1, moduleId: 1, title: '货币的时间价值', minutes: 12, question: '为什么明年的 100 元不等于今天？', summary: '今天的钱可以被使用、储蓄或投资，因此比未来同样面额的钱更有价值。', key: '未来价值 = 本金 ×（1 + 利率）ⁿ', points: ['时间给了资金产生收益的机会', '利率是跨时间交换资金的价格', '比较金额时，必须先把它们放到同一时间点'], example: '把 100 元以 5% 年利率存一年，明年得到 105 元。所以明年的 105 元，才与今天的 100 元大致等价。', exercise: '若无风险年利率为 4%，两年后的 1,000 元约等于今天多少钱？', answer: '约 924.56 元。计算：1,000 ÷ 1.04²。' },
  { id: 2, moduleId: 1, title: '复利与增长', minutes: 14, question: '为什么时间往往比收益率更重要？', summary: '复利让收益继续产生收益，增长路径因此不是直线，而是一条逐渐变陡的曲线。', key: '终值 = 本金 ×（1 + 收益率）ⁿ', points: ['单利只计算原始本金的收益', '复利把每期收益加入下一期本金', '高收益率只有在可持续时才有意义'], example: '1 万元按 6% 复利 20 年约为 3.21 万元；不是 2.2 万元，因为历史收益也在继续增长。', exercise: '一笔资金按 7% 复利，大约多少年翻倍？', answer: '约 10 年。可用“72 法则”：72 ÷ 7 ≈ 10.3。' },
  { id: 3, moduleId: 1, title: '通胀与购买力', minutes: 13, question: '账户里的钱变多，就一定更富有吗？', summary: '真正重要的是钱能买到多少东西。通胀会让相同面额的货币购买力下降。', key: '实际收益率 ≈ 名义收益率 − 通胀率', points: ['名义金额没有扣除物价变化', '长期目标应按实际购买力衡量', '现金稳定，但并非没有通胀风险'], example: '存款收益 3%，当年通胀 2%，购买力大约只增加 1%。', exercise: '投资收益 6%，通胀 3%，精确实际收益率是多少？', answer: '约 2.91%。计算：(1.06 ÷ 1.03) − 1。' },
  { id: 4, moduleId: 1, title: '利率的语言', minutes: 15, question: '利率上涨时，谁受益，谁承压？', summary: '利率连接储蓄者、借款人和资产价格，是金融体系最基础的价格信号。', key: '实际利率 ≈ 名义利率 − 预期通胀率', points: ['存款人通常希望利率更高', '借款人的融资成本随利率上升', '既有债券价格通常与市场利率反向变化'], example: '你持有票息 3% 的旧债券，而新债券能提供 5%，旧债券必须降价才更有吸引力。', exercise: '固定利率房贷借款人在市场利率上升后，既有月供会立刻变化吗？', answer: '通常不会；固定利率锁定了合同利率，但新借款成本会提高。' },
  { id: 5, moduleId: 1, title: '现金流与预算', minutes: 16, question: '为什么高收入也可能没有安全感？', summary: '财富不仅取决于收入，更取决于留存现金流以及资产负债结构。', key: '可投资现金流 = 税后收入 − 必要支出 − 计划支出', points: ['先记录真实流向，再制定预算', '固定支出决定短期调整空间', '预算是价值排序，不是自我惩罚'], example: '每月收入 12,000 元、总支出 9,000 元，可投资现金流为 3,000 元，储蓄率为 25%。', exercise: '如果每月税后收入 15,000 元，储蓄目标为 30%，支出上限是多少？', answer: '10,500 元。15,000 ×（1 − 30%）。' },
  { id: 6, moduleId: 1, title: '负债与应急金', minutes: 15, question: '什么时候借钱是工具，什么时候是陷阱？', summary: '债务把未来收入搬到今天；应急金则为不确定事件购买决策时间。', key: '优先级：高息债务 → 基础应急金 → 长期投资', points: ['比较债务要看实际年化成本', '消费债与生产性负债用途不同', '应急金重视安全和流动性，不追求高收益'], example: '信用卡欠款年化 18%，提前还款相当于获得接近 18% 的确定性成本节省。', exercise: '应急金通常应该覆盖多少个月必要支出？', answer: '常见起点是 3—6 个月，并根据收入稳定性、家庭责任和保障情况调整。' },

  { id: 7, moduleId: 2, title: '风险与收益', minutes: 14, question: '高收益为什么从来不是免费的？', summary: '收益是承担不确定性的补偿。先问最坏会怎样，再问最好能赚多少。', key: '风险不只是波动，更是永久损失与目标落空', points: ['预期收益不等于承诺收益', '波动越大，持有体验越困难', '承受能力、承受意愿和承受必要性不同'], example: '一项资产可能平均收益很高，但若在你需要用钱时下跌 40%，它仍不适合短期目标。', exercise: '五年后确定要支付的首付款，适合全部投入高波动股票吗？', answer: '通常不适合。目标时间明确，应降低临近使用资金的波动风险。' },
  { id: 8, moduleId: 2, title: '流动性与安全性', minutes: 11, question: '能卖掉，是否等于随时能按合理价格卖掉？', summary: '流动性描述资产转换为现金的速度、成本和价格稳定性。', key: '流动性成本 = 时间成本 + 交易成本 + 折价风险', points: ['交易活跃不代表极端时期仍流动', '高流动性常以较低收益为代价', '短期资金应匹配高流动性资产'], example: '房产可以出售，但成交可能需要数月，并产生税费和折价，因此流动性低于货币基金。', exercise: '应急金更重视收益率还是流动性？', answer: '优先安全性和流动性；收益率是次要目标。' },
  { id: 9, moduleId: 2, title: '存款与现金管理', minutes: 12, question: '现金类资产在组合中扮演什么角色？', summary: '现金类资产提供确定性、流动性和缓冲，但长期可能被通胀侵蚀。', key: '现金的价值 = 支付能力 + 选择权 + 风险缓冲', points: ['活期、定期和货币基金风险不同', '高收益宣传要看是否保本与期限', '现金比例应服务于近期支出与心理稳定'], example: '把半年生活费放入低波动、高流动性工具，可以避免市场下跌时被迫卖出长期资产。', exercise: '两周后要交的学费，是否适合购买一年期封闭产品？', answer: '不适合，期限错配会导致无法按时支付。' },
  { id: 10, moduleId: 2, title: '债券入门', minutes: 16, question: '买债券，到底把钱借给了谁？', summary: '债券是借款凭证，收益来自利息与价格变化，核心风险是信用、利率和期限。', key: '债券总回报 = 票息收入 + 价格变化', points: ['发行人承诺按约付息还本', '久期越长，对利率越敏感', '高收益债通常伴随更高违约风险'], example: '市场利率从 3% 升至 5% 时，旧的低息债券通常价格下跌。', exercise: '同一发行人 2 年期与 20 年期债券，哪个对利率变化更敏感？', answer: '通常是 20 年期，因为更远期现金流受折现率变化影响更大。' },
  { id: 11, moduleId: 2, title: '股票入门', minutes: 17, question: '一张股票背后真正代表什么？', summary: '股票代表企业剩余权益。长期回报最终取决于企业创造现金和资本配置的能力。', key: '股东回报 = 盈利增长 + 分红 + 估值变化', points: ['股价与公司价值短期可以偏离', '好公司不等于任何价格都是好投资', '股东承担最后损失，也分享剩余收益'], example: '企业盈利增长 8%，估值不变且分红 2%，长期回报可能接近两者之和，但绝非保证。', exercise: '公司利润增长，股价是否一定同步上涨？', answer: '不一定。市场预期、估值变化和风险偏好都可能改变股价。' },
  { id: 12, moduleId: 2, title: '基金与指数', minutes: 16, question: '为什么一篮子资产常胜过一次押注？', summary: '基金集合资金投资一组资产；指数基金用规则追踪市场，降低选单一标的的风险。', key: '净回报 = 资产回报 − 费用 − 税费 − 跟踪误差', points: ['先看基金持有什么，再看历史业绩', '费用差异在长期会复利累积', '指数化降低个股风险，但不消除市场风险'], example: '年费相差 1%，20 年后会形成显著终值差异，因此成本是少数可提前控制的变量。', exercise: '持有 500 只股票的指数基金，还会亏损吗？', answer: '会。分散降低个别公司风险，但整个市场仍可能下跌。' },
  { id: 13, moduleId: 2, title: '保险与风险转移', minutes: 15, question: '保险为什么不是用来追求收益的？', summary: '保险用可承受的小额保费，转移概率较低但损失巨大的风险。', key: '先保大风险：身故、重疾、医疗、责任', points: ['保险核心是保障，不是收益比较', '保额与责任匹配比产品数量重要', '免赔额、等待期和除外责任必须阅读'], example: '小额手机损坏可以自行承担，家庭主要收入者意外身故却可能摧毁家庭现金流，后者更值得转移。', exercise: '配置保障时应先关注返还率还是保障责任？', answer: '先关注保障范围、保额、除外责任和家庭缺口。' },
  { id: 14, moduleId: 2, title: '分散与相关性', minutes: 17, question: '持有很多资产，就一定分散了吗？', summary: '有效分散依赖资产驱动因素不同，而非简单增加名称数量。', key: '组合风险取决于各资产风险与它们的相关性', points: ['十只同行业股票仍高度集中', '相关性会在危机时期上升', '分散的代价是放弃押中单一赢家的可能'], example: '同时持有银行、能源和全球债券，通常比持有十家同地区银行更分散。', exercise: '两只名称不同但都追踪同一指数的基金，能否显著分散？', answer: '不能，它们底层资产高度重合。' },

  { id: 15, moduleId: 3, title: '三张财务报表', minutes: 18, question: '如何在十分钟内看懂一家公司的骨架？', summary: '利润表看经营结果，资产负债表看家底，现金流量表看真金白银。', key: '利润 ≠ 现金；三张表必须相互验证', points: ['利润表覆盖一段时间', '资产负债表是某一时点快照', '现金流量表解释现金为何变化'], example: '公司有利润却现金减少，可能因为赊销增加、囤货或大额资本支出。', exercise: '想判断公司是否靠借款维持运营，应该重点联看哪些项目？', answer: '经营现金流、借款变化、利息费用与资产负债率。' },
  { id: 16, moduleId: 3, title: '利润表与盈利质量', minutes: 18, question: '营收增长为什么可能越增长越亏？', summary: '利润表从收入逐层扣除成本费用，展示商业模式是否能把销售转为利润。', key: '净利润 = 收入 − 成本 − 费用 − 税费', points: ['毛利率反映产品层面的经济性', '营业利润更接近主营经营表现', '一次性收益可能美化净利润'], example: '收入增长 30%，但获客成本增长 60%，营业利润可能恶化。', exercise: '出售房产带来的大额收益，能否代表主营业务改善？', answer: '通常不能，应区分经常性经营利润和一次性收益。' },
  { id: 17, moduleId: 3, title: '资产负债表', minutes: 17, question: '公司拥有的东西，都是优质资产吗？', summary: '资产负债表展示资源来源和去向，帮助识别偿债能力、资产质量与杠杆。', key: '资产 = 负债 + 所有者权益', points: ['应收账款可能收不回来', '商誉需要关注减值风险', '负债到期结构比总额同样重要'], example: '短期债务很多、现金很少，即使总资产庞大，公司也可能面临流动性压力。', exercise: '存货增长远快于收入，可能意味着什么？', answer: '可能是备货，也可能是产品滞销；需要结合周转率和行业情况判断。' },
  { id: 18, moduleId: 3, title: '现金流量表', minutes: 18, question: '利润很好看，现金为什么没有回来？', summary: '现金流量表把现金变化拆为经营、投资和融资三类活动。', key: '自由现金流 ≈ 经营现金流 − 资本性支出', points: ['经营现金流验证盈利含金量', '投资现金流反映扩张与处置', '融资现金流展示借钱、还钱、分红和回购'], example: '长期净利润增长而经营现金流停滞，需要检查应收账款和收入确认。', exercise: '企业购买新工厂通常记入哪类现金流？', answer: '投资活动现金流出。' },
  { id: 19, moduleId: 3, title: '回报率与杠杆', minutes: 17, question: '高 ROE 一定代表经营优秀吗？', summary: '回报率衡量资本效率，但债务杠杆也能放大股东回报与风险。', key: 'ROE = 净利润 ÷ 平均股东权益', points: ['高利润率、高周转或高杠杆都可推高 ROE', '应与同行及历史水平比较', '回报率必须与资本成本对照'], example: '两家公司 ROE 都是 20%，低负债公司的质量可能高于依赖巨额借款的公司。', exercise: '公司大量举债回购股票，ROE 可能如何变化？', answer: '可能上升，因为股东权益下降；但财务风险同时提高。' },
  { id: 20, moduleId: 3, title: '商业模式与护城河', minutes: 16, question: '好生意为什么能长期守住利润？', summary: '护城河是阻止竞争者侵蚀超额回报的结构性优势，而不是一句品牌口号。', key: '价值创造 = 客户愿付价格 − 完整交付成本', points: ['网络效应、转换成本、成本优势各有边界', '增长应检验单位经济模型', '管理层资本配置影响长期价值'], example: '每新增一个用户都让产品对其他用户更有价值，可能形成网络效应。', exercise: '高市场份额是否自动等于护城河？', answer: '不等于。若客户易流失、产品同质化，份额可能快速下降。' },
  { id: 21, moduleId: 3, title: '估值与安全边际', minutes: 20, question: '好公司，多少钱买才合理？', summary: '估值是对未来现金流、增长与风险的有纪律猜测；安全边际为判断错误留空间。', key: '价值 = 未来现金流按风险折现后的总和', points: ['市盈率必须结合增长与周期', '折现率越高，估值通常越低', '估值是区间，不是精确答案'], example: '同样每年赚 1 元，稳定增长企业可能比利润剧烈波动企业获得更高估值。', exercise: '其他条件不变，市场要求回报率上升，资产估值通常怎样变化？', answer: '下降，因为未来现金流使用更高折现率折算。' },

  { id: 22, moduleId: 4, title: '宏观指标地图', minutes: 17, question: 'GDP、CPI 和失业率分别在说什么？', summary: '宏观指标是经济的仪表盘，需要看趋势、结构和预期差，而非孤立数字。', key: '增长、通胀、就业是三条主线', points: ['GDP 衡量产出，不直接等于生活质量', 'CPI 描述一篮子消费价格变化', '就业往往滞后于经济转折'], example: 'GDP 增长但居民收入停滞，说明总量改善不一定均匀传导。', exercise: '单月 CPI 上升能否直接证明长期高通胀？', answer: '不能，应观察持续性、基数效应和分项结构。' },
  { id: 23, moduleId: 4, title: '央行与货币政策', minutes: 18, question: '央行调利率，如何传到你的生活？', summary: '货币政策通过资金成本、信贷、汇率和预期影响需求与资产价格。', key: '政策利率 → 市场利率 → 融资与消费投资决策', points: ['降息通常降低融资成本', '政策传导存在时滞和阻塞', '宽松不保证所有资产上涨'], example: '按揭利率下降可能提高购房需求，但收入预期疲弱时传导会变弱。', exercise: '央行加息通常是为了应对什么？', answer: '常见目标是抑制过热需求或通胀，但具体背景必须结合增长与金融稳定。' },
  { id: 24, moduleId: 4, title: '财政政策与政府债务', minutes: 16, question: '政府花钱与央行放钱有什么不同？', summary: '财政政策直接改变税收和支出，货币政策主要调节金融条件。', key: '财政余额 = 政府收入 − 政府支出', points: ['财政支出可直接进入实体需求', '赤字会累积为政府债务', '债务可持续性取决于利率、增长和财政能力'], example: '基础设施投资直接形成订单与就业；降息则需要企业和居民愿意借贷才传导。', exercise: '政府赤字是否在任何情况下都不好？', answer: '不是。关键在用途、经济周期、融资成本与长期偿付能力。' },
  { id: 25, moduleId: 4, title: '经济周期', minutes: 17, question: '为什么繁荣与衰退会交替出现？', summary: '信贷、库存、投资、情绪和政策相互作用，使经济围绕长期趋势波动。', key: '周期不是钟表：阶段可识别，时间点难预测', points: ['扩张期就业和需求改善', '过热常伴随通胀与杠杆积累', '衰退会清理过剩，也带来真实损失'], example: '企业因需求乐观大量补库存，需求转弱时同时去库存，会放大下行。', exercise: '知道经济处于扩张期，能否准确预测股市短期涨跌？', answer: '不能。市场交易的是预期，价格可能已提前反映周期。' },
  { id: 26, moduleId: 4, title: '汇率与全球市场', minutes: 17, question: '本币升贬值，为什么有人欢喜有人愁？', summary: '汇率是一种货币相对另一种货币的价格，影响贸易、通胀和跨境资产回报。', key: '本币投资者海外回报 = 资产回报 + 汇率变化影响', points: ['本币贬值提高进口成本', '出口企业也受成本与定价权影响', '海外投资同时承担资产和汇率风险'], example: '海外资产上涨 5%，但投资期间外币相对本币贬值 8%，换回本币后仍可能亏损。', exercise: '持有海外资产是否天然就是分散？', answer: '不一定，还要看底层行业、地区集中度和汇率敞口。' },
  { id: 27, moduleId: 4, title: '资产配置', minutes: 20, question: '为什么组合结构比单个产品更重要？', summary: '资产配置把目标期限、风险承受能力和不同资产特征连接起来。', key: '先定目标与风险预算，再选工具', points: ['短中长期目标应分账户管理', '配置需要定期再平衡', '最佳组合是你能长期坚持的组合'], example: '市场上涨后股票占比从 60% 升到 75%，再平衡会卖出部分股票并补充低配资产。', exercise: '再平衡的主要目的是什么？', answer: '让组合回到既定风险水平，而不是预测下一个赢家。' },
  { id: 28, moduleId: 4, title: '个人投资原则', minutes: 20, question: '如何把知识变成一套不会轻易动摇的规则？', summary: '写下目标、边界和复盘机制，能减少市场情绪对长期计划的破坏。', key: '目标 → 期限 → 风险 → 配置 → 执行 → 复盘', points: ['明确不做什么和何时调整', '自动化储蓄降低决策成本', '用过程指标评估自己，不以短期涨跌论成败'], example: '个人投资政策可以写明：应急金目标、股票上限、再平衡阈值和禁止杠杆。', exercise: '完成课程后最重要的下一步是什么？', answer: '写一页个人财务与投资原则，并用小额、低成本、可持续的方式开始执行。' },

  { id: 29, moduleId: 5, title: '目标与净资产', minutes: 17, question: '怎样把“想变富”变成可计算的目标？', summary: '财务规划从明确目标、时间和金额开始，再用净资产表观察当前位置。', key: '净资产 = 总资产 − 总负债', points: ['目标要同时写明金额与日期', '资产按可变现价值而非买入价记录', '净资产趋势比单月收入更能反映积累'], example: '家庭有现金 10 万、投资 20 万、房产净值 80 万和贷款 50 万，净资产为 60 万。', exercise: '总资产 120 万、总负债 75 万，净资产是多少？', answer: '45 万元。净资产不是现金余额，而是全部资产扣除全部负债后的结果。' },
  { id: 30, moduleId: 5, title: '分账户预算', minutes: 16, question: '预算为什么常常坚持不到三个月？', summary: '有效预算不要求记住每一笔，而是提前为必要支出、目标和自由消费分配边界。', key: '收入 = 必要支出 + 目标储蓄 + 自由支出', points: ['按用途分账户降低意志力消耗', '先储蓄再消费比月底看余额更可靠', '年度大额支出应按月预提'], example: '每年 12,000 元保险费可按月预留 1,000 元，缴费月就不会打乱日常现金流。', exercise: '月收入 18,000 元，目标储蓄 25%，应先转入目标账户多少？', answer: '4,500 元。剩余 13,500 元再分配给必要与自由支出。' },
  { id: 31, moduleId: 5, title: '信用与借款成本', minutes: 18, question: '分期月费率很低，为什么总成本仍可能很高？', summary: '比较借款不能只看月费率或每期金额，应统一换算为实际年化成本并计入全部费用。', key: '借款总成本 = 利息 + 手续费 + 保险费 + 机会成本', points: ['月费率不能直接代表年化利率', '等额分期本金逐月减少', '逾期记录会影响未来融资能力'], example: '借 12,000 元分 12 期、每月手续费 60 元，总费用 720 元，但实际年化成本高于简单的 6%。', exercise: '比较两笔贷款时，最少要统一哪些条件？', answer: '统一本金、期限、还款方式，并比较包含全部费用的实际年化成本。' },
  { id: 32, moduleId: 5, title: '债务清偿策略', minutes: 17, question: '多笔欠款应该先还哪一笔？', summary: '高利率优先法节省总利息，小余额优先法更容易获得心理反馈；关键是停止新增高息债务。', key: '数学最优：优先偿还实际利率最高的债务', points: ['保留所有债务的最低还款', '额外现金集中攻击一笔债务', '提前还款前检查违约金和流动性'], example: '信用卡年化 18%、消费贷 10%、房贷 4%，通常先清信用卡最节省利息。', exercise: '若提前还清 12% 债务会耗尽应急金，应该怎么做？', answer: '通常先保留最低安全垫，再加速还债，避免一次意外迫使你重新借高息债。' },
  { id: 33, moduleId: 5, title: '租房还是买房', minutes: 20, question: '买房一定比租房更划算吗？', summary: '住房决策同时是消费、融资和资产配置问题，不能只比较月租与月供。', key: '持有成本 = 利息 + 税费 + 维护 + 机会成本 − 预期增值', points: ['首付占用资金有机会成本', '交易成本使短期持有不利', '稳定性与迁移自由也是实际价值'], example: '月供 8,000 元中可能只有一部分归还本金，其余利息、物业和维护不能简单视为储蓄。', exercise: '预计两年后换城市，买房时最应警惕什么？', answer: '高额交易成本、价格波动和变现时间，短持有期可能无法摊薄这些成本。' },
  { id: 34, moduleId: 5, title: '房贷与提前还款', minutes: 19, question: '有闲钱时，提前还房贷还是继续投资？', summary: '提前还款相当于获得接近贷款利率的确定性节省，但会减少流动性和投资机会。', key: '比较：贷款税后成本、投资预期回报、风险与流动性', points: ['等额本金与等额本息现金流不同', '不要用高风险预期收益对比确定利息', '提前还款后资金通常难以取回'], example: '贷款成本 4% 而可获得的无风险税后收益仅 2%，提前还款在纯财务上更有吸引力。', exercise: '为什么不能因为股票长期平均收益高于房贷利率，就必然选择投资？', answer: '股票回报不确定且路径波动，房贷利息是合同成本，两者风险属性不同。' },
  { id: 35, moduleId: 5, title: '家庭保障缺口', minutes: 18, question: '保额应该由产品推荐决定吗？', summary: '保障规划应从家庭在重大事件后的资金缺口反推，而不是从可购买产品倒推。', key: '保障缺口 = 未来责任 + 债务 − 可用资产 − 既有保障', points: ['先覆盖家庭无法自行承担的损失', '收入责任变化后应重新评估保额', '保险不能替代应急金和长期储蓄'], example: '主要收入者承担 80 万房贷和子女教育责任，寿险保额应与这些缺口相关。', exercise: '孩子成年、房贷还清后，寿险需求通常如何变化？', answer: '通常下降，因为家庭未来责任和债务缺口减少，但仍要结合配偶养老等责任。' },
  { id: 36, moduleId: 5, title: '养老目标测算', minutes: 20, question: '退休需要多少钱，为什么不能只猜一个总数？', summary: '养老规划要把退休支出、年限、通胀、收益和其他收入来源放进同一模型。', key: '退休缺口 = 预计支出现值 − 养老金等收入现值', points: ['用今天购买力估计退休支出', '区分积累期与提取期收益假设', '寿命与医疗支出要留安全边际'], example: '今天每月需要 8,000 元，若长期通胀 2.5%，20 年后同等生活约需 13,100 元。', exercise: '养老测算中为什么要使用实际收益率？', answer: '因为目标是维持购买力，实际收益率能同时考虑投资增长与通胀侵蚀。' },
  { id: 37, moduleId: 5, title: '税务意识与年度复盘', minutes: 18, question: '税费为什么会悄悄改变长期回报？', summary: '税务规则因地区和账户而异，但每个决策都应比较税后结果，并至少每年复盘一次。', key: '税后回报 = 税前回报 − 税费 − 交易成本', points: ['先确认适用地区和账户规则', '频繁交易可能增加税费与成本', '年度复盘关注目标偏差而非短期排名'], example: '两项投资税前收益都为 6%，若一项税费更高，其复利终值会逐年落后。', exercise: '年度财务复盘最少应检查哪四项？', answer: '净资产、现金流、保障缺口和目标进度，并记录下一年度需要调整的行动。' },

  { id: 38, moduleId: 6, title: '回报与基准', minutes: 18, question: '赚了 10%，为什么可能仍表现不佳？', summary: '投资结果必须与时间、风险和适当基准比较，孤立收益率无法说明决策质量。', key: '超额回报 = 组合回报 − 可比基准回报', points: ['基准应匹配资产类别与风险', '年化回报用于比较不同期限', '高回报若来自高杠杆未必更优'], example: '全球股票上涨 18% 的一年，你的同类基金收益 10%，绝对赚钱但相对基准落后。', exercise: '债券基金适合用科技股指数作基准吗？', answer: '不适合，两者风险来源不同，基准必须能代表可投资范围和风险特征。' },
  { id: 39, moduleId: 6, title: '市值与股本结构', minutes: 17, question: '股价低的公司，真的更便宜吗？', summary: '单股价格没有可比性，必须结合总股本、市值、净债务和潜在稀释理解企业价格。', key: '市值 = 股价 × 总股本', points: ['拆股会改变股价但不创造价值', '期权与可转债可能稀释权益', '企业价值还需考虑净债务'], example: 'A 股每股 10 元有 10 亿股，市值 100 亿元；B 股每股 100 元有 1,000 万股，市值仅 10 亿元。', exercise: '公司一拆十后股价降为原来的十分之一，是否突然便宜了？', answer: '没有，总股本扩大十倍，市值和每位股东的持有比例原则上不变。' },
  { id: 40, moduleId: 6, title: '相对估值', minutes: 19, question: '市盈率低，就一定低估吗？', summary: '估值倍数把价格与利润、收入或账面价值比较，但只有在业务、增长和风险可比时才有意义。', key: '市盈率 = 市值 ÷ 归属股东净利润', points: ['周期高点利润会让市盈率虚低', '亏损企业市盈率可能失效', '倍数差异需要经营原因解释'], example: '高负债周期公司市盈率 6 倍，稳定消费公司 20 倍，差异可能反映盈利持续性和风险。', exercise: '两家公司市盈率不同，比较前至少还要看什么？', answer: '增长、利润质量、资本结构、周期位置和会计口径。' },
  { id: 41, moduleId: 6, title: '现金流折现', minutes: 22, question: '怎样把未来十年的经营转成今天的价值？', summary: '现金流折现法预测未来可分配现金，再按风险要求折现，是估值的基本逻辑。', key: '现值 = Σ 未来现金流 ÷（1 + 折现率）ᵗ', points: ['预测收入不等于预测自由现金流', '终值常占估值较大比例', '折现率和增长率必须做敏感性分析'], example: '同样每年 100 万元现金流，折现率从 8% 提高到 10%，今天的估值会明显下降。', exercise: 'DCF 结果为何应呈现区间而不是单点？', answer: '未来现金流、终值和折现率都不确定，小幅假设变化可能显著改变结果。' },
  { id: 42, moduleId: 6, title: '债券定价与久期', minutes: 21, question: '怎样估算利率变化对债券的冲击？', summary: '久期近似衡量债券价格对收益率变化的敏感度，期限越长、票息越低通常久期越高。', key: '价格变化约 ≈ −久期 × 收益率变化', points: ['久期是敏感度而非单纯剩余期限', '凸性使大幅变化时线性估算有误差', '信用利差变化也会影响价格'], example: '久期 6 年的债券，收益率上升 1 个百分点，价格可能约下跌 6%。', exercise: '降息预期下，高久期债券一定更安全吗？', answer: '不一定。若利率反向上升或信用恶化，高久期债券损失也更大。' },
  { id: 43, moduleId: 6, title: '基金尽调', minutes: 19, question: '基金排行榜为什么不是购买清单？', summary: '研究基金要看策略、底层持仓、费用、规模、跟踪质量与管理机制，而不只看近期收益。', key: '投资前先回答：持有什么、为何赚钱、何时失效、成本多少', points: ['同名基金的底层资产可能不同', '历史冠军常伴随风格集中', '规模过大可能改变策略执行'], example: '小盘策略规模快速膨胀后，可能因交易冲击和容量限制难以复制过去表现。', exercise: '指数基金之间比较，哪几个指标最关键？', answer: '跟踪标的、总费用、跟踪误差、流动性、税务与申赎机制。' },
  { id: 44, moduleId: 6, title: '因子投资', minutes: 20, question: '价值、质量和动量因子在赚什么钱？', summary: '因子是跨许多资产可观察的共同特征，其溢价可能来自风险补偿或行为偏差。', key: '因子收益并非稳定利息，而是可能长期失效的风险溢价', points: ['价值因子偏好价格相对基本面较低的资产', '质量因子关注盈利与财务稳健', '因子拥挤会压低未来回报'], example: '价值风格可能连续多年落后市场，投资者若中途放弃就无法获得长期潜在溢价。', exercise: '同时买多只价值基金能否自动实现多因子分散？', answer: '不能，它们可能暴露于相同因子，需要检查底层持仓和风格相关性。' },
  { id: 45, moduleId: 6, title: '图表分析的边界', minutes: 16, question: '一张价格图能告诉你未来吗？', summary: '价格和成交量能描述市场行为，但形态容易被事后解释，策略必须经过样本外与成本检验。', key: '可交易优势 = 预测能力 − 交易成本 − 过拟合损失', points: ['相关图形不等于因果关系', '规则越复杂越容易过拟合', '回测应避免未来数据和幸存者偏差'], example: '在历史数据上反复调整均线参数，总能找到漂亮结果，但新时期可能立即失效。', exercise: '判断回测可靠性至少要检查什么？', answer: '样本外表现、交易成本、数据质量、参数稳定性和不同市场阶段。' },
  { id: 46, moduleId: 6, title: '尽调与骗局识别', minutes: 18, question: '面对“高收益、低风险”应该先查什么？', summary: '可靠投资允许验证资产、托管、费用和退出规则；模糊信息与催促转账是典型风险信号。', key: '收益越确定且越高，越需要反向验证风险来源', points: ['确认主体、牌照与资金去向', '警惕保本承诺和拉人返佣', '无法解释盈利来源时不要投入'], example: '项目声称月收益 3% 且随时退出，却拒绝提供托管证明和底层资产，这是严重红旗。', exercise: '朋友熟悉项目负责人，能否替代独立尽调？', answer: '不能。人际信任无法验证资产真实性、资金隔离、法律权利与退出能力。' },

  { id: 47, moduleId: 7, title: '投资政策书', minutes: 19, question: '为什么要在市场平静时写下规则？', summary: '投资政策书把目标、限制、配置和调整条件固定下来，减少情绪最强时的临时决策。', key: '政策书 = 目标 + 期限 + 风险边界 + 配置 + 再平衡规则', points: ['不同目标需要独立资金池', '写明禁止事项比预测市场更有用', '重大生活变化才触发战略调整'], example: '政策可规定股票目标 60%、允许偏离 5%，达到边界再平衡，而不是凭新闻操作。', exercise: '市场大跌是否自动意味着要改变长期配置？', answer: '不自动。先检查目标、期限和承受能力是否发生结构性变化。' },
  { id: 48, moduleId: 7, title: '风险能力与风险意愿', minutes: 17, question: '“我能接受波动”为什么不够？', summary: '风险能力取决于财务条件，风险意愿取决于心理感受，两者应以更保守的一方约束组合。', key: '可承担风险 = 资金期限 + 收入稳定性 + 安全垫 + 心理承受', points: ['长期资金通常有更高风险能力', '高风险意愿不能弥补短期刚性支出', '真实亏损体验比问卷更能校准意愿'], example: '年轻但两年后要买房的人，年龄虽小，首付款资金的风险能力仍然很低。', exercise: '收入不稳定且没有应急金，是否适合高仓位投资？', answer: '通常不适合，应先提高流动性安全垫，再决定长期风险资产比例。' },
  { id: 49, moduleId: 7, title: '战略与战术配置', minutes: 19, question: '长期配置与短期观点应该如何共存？', summary: '战略配置决定长期风险框架，战术偏离只是有限、可检验的短期调整。', key: '核心组合遵守战略配置，卫星仓位承载有限观点', points: ['战略权重服务长期目标', '战术仓位必须设上限和退出规则', '频繁战术操作容易演变为追涨杀跌'], example: '90% 资金保持长期配置，10% 以内用于明确假设的战术调整，可控制整体偏离。', exercise: '战术配置失败后应怎样复盘？', answer: '检查原始假设、证据、执行成本和退出纪律，而不是只用盈亏判断。' },
  { id: 50, moduleId: 7, title: '相关性与压力情景', minutes: 20, question: '平时分散的资产，危机时为何一起跌？', summary: '历史相关性会变化，压力测试用极端但合理的情景检查组合是否仍能支持目标。', key: '分散需要同时检验常态相关性与压力期共同暴露', points: ['流动性冲击会推高资产相关性', '同一宏观因子可能隐藏在不同产品中', '压力测试关注金额损失与行为后果'], example: '股票、房地产和高收益债都可能同时暴露于经济增长与信贷收缩。', exercise: '组合最大可能下跌 30%，最重要的下一步是什么？', answer: '换算成真实金额，并判断是否会影响支出目标或迫使自己恐慌卖出。' },
  { id: 51, moduleId: 7, title: '再平衡规则', minutes: 18, question: '再平衡是在卖赢家、买输家吗？', summary: '再平衡的目的不是预测反转，而是把组合风险恢复到事先同意的范围。', key: '触发方式：定期检查 + 偏离阈值执行', points: ['新资金可优先补充低配资产', '税费和交易成本影响频率', '极端市场仍应遵循预设规则'], example: '目标股票 60%，阈值为 5%，当股票升至 66% 时触发再平衡。', exercise: '每周无条件恢复精确权重有什么问题？', answer: '可能产生过多交易、税费和噪声，阈值法通常更节制。' },
  { id: 52, moduleId: 7, title: '定投与一次投入', minutes: 18, question: '分批买入一定比一次买入安全吗？', summary: '定投降低择时压力和短期后悔，一次投入让资金更早暴露于长期风险溢价。', key: '选择取决于现有资金、现金流、风险体验与执行纪律', points: ['定投不保证更高收益', '下跌市场中分批买入可降低平均成本', '长期闲置现金也有机会成本'], example: '每月工资结余适合自动定投；已有大额长期资金则需权衡一次配置与分批进入。', exercise: '定投在持续上涨市场中通常有什么代价？', answer: '后投入的资金以更高价格买入，平均收益可能低于一开始全部投入。' },
  { id: 53, moduleId: 7, title: '行为金融', minutes: 20, question: '为什么聪明人也会重复追涨杀跌？', summary: '损失厌恶、锚定、确认偏误和从众会系统性影响决策，规则化流程能降低伤害。', key: '好流程的价值，是在情绪最强时替你做决定', points: ['亏损痛苦通常大于同额盈利快乐', '人们偏爱支持已有观点的信息', '近期表现容易被误认为长期规律'], example: '基金连续上涨后才大量买入、短期回撤后卖出，是典型的业绩追逐。', exercise: '怎样减少确认偏误？', answer: '投资前写下反方证据和失效条件，并主动寻找能推翻自己观点的信息。' },
  { id: 54, moduleId: 7, title: '业绩归因', minutes: 20, question: '组合赚钱，到底是配置、选品还是运气？', summary: '业绩归因把回报拆为市场、资产配置、标的选择、汇率与成本，帮助改进可重复过程。', key: '组合回报 = 市场暴露 + 主动决策 + 成本 + 偶然波动', points: ['单期结果不足以证明能力', '风险调整后才能比较不同策略', '净回报必须扣除全部成本'], example: '组合上涨 12%，其中 10% 来自整体市场，主动选股贡献可能只有 2% 甚至更少。', exercise: '高回报但波动翻倍的策略，能否直接说更优秀？', answer: '不能，需要比较风险、回撤、基准、成本和是否符合原定目标。' },
  { id: 55, moduleId: 7, title: '退休提取策略', minutes: 21, question: '积累完成后，怎样让资产支持长期生活？', summary: '提取期面对收益顺序、寿命与通胀风险，需要动态支出规则和安全资产缓冲。', key: '可持续支出取决于初始提取率、回报路径、通胀与年限', points: ['退休早期大跌伤害尤其大', '现金缓冲可减少低位卖出', '支出规则应随资产和需求调整'], example: '两个组合长期平均回报相同，若一个在退休初期连续大跌，其可持续提取能力会更弱。', exercise: '为什么不能简单把长期平均收益率当作每年可提取率？', answer: '收益每年不均匀，提取会放大早期亏损的影响，还要考虑通胀和寿命不确定性。' },

  { id: 56, moduleId: 8, title: '金融系统与中介', minutes: 18, question: '储蓄如何变成企业的机器和家庭的住房？', summary: '银行、资本市场、基金和保险把资金从盈余方传递给需求方，同时承担筛选与风险转换。', key: '金融系统的核心：支付、融资、定价、风险转移', points: ['银行通过存贷款转换期限', '市场让证券价格聚合信息', '中介失灵可能放大系统性风险'], example: '银行用大量短期存款支持较长期贷款，因此必须管理流动性与挤兑风险。', exercise: '为什么银行不能把所有存款都锁进长期贷款？', answer: '存款人可能随时取款，若没有流动资产，银行会面临支付危机。' },
  { id: 57, moduleId: 8, title: '收益率曲线', minutes: 19, question: '不同期限的利率能告诉我们什么？', summary: '收益率曲线展示同类债务在不同期限上的收益率，反映政策、通胀、增长与期限补偿预期。', key: '长端利率 ≈ 未来短端利率预期 + 期限溢价', points: ['正常曲线通常向上倾斜', '倒挂不等于衰退日期预测器', '信用债曲线还包含信用利差'], example: '短端因加息快速上升、长端反应较小，曲线可能倒挂，显示市场预期未来增长与通胀放缓。', exercise: '曲线倒挂后是否应立即清空所有风险资产？', answer: '不应机械操作。信号有时滞和误报，仍需结合目标、估值与其他数据。' },
  { id: 58, moduleId: 8, title: '汇率风险管理', minutes: 19, question: '海外资产需要把汇率风险全部对冲吗？', summary: '汇率对冲降低货币波动，却带来成本与基差；是否对冲取决于资产性质、期限和支出货币。', key: '本币回报由资产本身回报与汇率共同决定', points: ['债券低波动，汇率可能主导总风险', '股票长期汇率影响更复杂', '未来外币支出本身可形成自然对冲'], example: '计划用美元支付留学费的人持有部分美元资产，可降低本币兑美元贬值的目标风险。', exercise: '为什么海外债券通常比海外股票更常做汇率对冲？', answer: '债券预期波动较低，未对冲汇率可能淹没债券本身的收益与风险特征。' },
  { id: 59, moduleId: 8, title: '商品与实物资产', minutes: 18, question: '黄金、原油和房产在组合中分别解决什么问题？', summary: '实物资产的现金流、持有成本和周期驱动不同，不能笼统称为抗通胀资产。', key: '商品回报 = 现货变化 + 展期收益 + 抵押品收益 − 成本', points: ['黄金没有经营现金流', '商品期货回报不等于现货涨幅', '房地产高度依赖位置、融资与租金'], example: '油价上涨时，期货基金仍可能因远月价格结构和展期成本而表现不同。', exercise: '黄金价格能否用市盈率估值？', answer: '不能，黄金没有企业盈利，通常从实际利率、货币信心、供需和机会成本分析。' },
  { id: 60, moduleId: 8, title: '衍生品基础', minutes: 22, question: '期货与期权为什么既能保险，也能放大风险？', summary: '衍生品价值来自底层资产，可用于套期保值、价格发现或杠杆交易。', key: '期权买方拥有权利，卖方承担履约义务', points: ['期货双方都有履约义务', '保证金不是最大损失', '期权价值受价格、时间和波动率影响'], example: '航空公司锁定部分未来燃油价格是套期保值；裸卖期权则可能承担巨大尾部损失。', exercise: '买入看涨期权的最大损失通常是多少？', answer: '已支付的期权费；但获利仍取决于到期价格能否覆盖执行价与成本。' },
  { id: 61, moduleId: 8, title: '危机与流动性螺旋', minutes: 21, question: '为什么小问题会演变成金融危机？', summary: '高杠杆、期限错配和共同持仓会让资产下跌触发追加保证金与被迫卖出，形成自我强化。', key: '价格下跌 → 抵押品缩水 → 被迫卖出 → 价格继续下跌', points: ['偿付能力与流动性问题会相互转化', '共同模型会制造拥挤交易', '安全垫在平静时期看似低效'], example: '机构用短期融资持有长期资产，融资突然中断时只能低价出售资产，进一步压低市场价格。', exercise: '高质量资产为何也会在危机中暴跌？', answer: '持有人可能因现金需求被迫出售，短期价格由流动性而非长期价值主导。' },
  { id: 62, moduleId: 8, title: '金融监管与投资者保护', minutes: 18, question: '监管能让投资完全安全吗？', summary: '监管通过资本要求、披露、适当性与托管规则降低风险，但无法消除价格波动和判断错误。', key: '监管降低制度风险，不承诺投资收益', points: ['牌照是必要检查而非盈利保证', '信息披露仍需投资者阅读判断', '存款保障与投资产品保护不同'], example: '受监管基金可以合法运作但仍因市场下跌亏损，合规与保本是两回事。', exercise: '产品有持牌机构销售，是否可以跳过风险说明？', answer: '不可以，仍需理解底层资产、费用、流动性、适当性和损失范围。' },
  { id: 63, moduleId: 8, title: '金融科技与数字资产', minutes: 20, question: '技术创新会消除金融风险，还是改变风险形态？', summary: '数字支付、智能投顾和区块链提高效率，也引入平台、模型、托管、网络安全与监管风险。', key: '新技术可以重构流程，但不能取消经济约束', points: ['便捷界面可能掩盖底层复杂性', '私钥与托管决定资产控制权', '稳定机制需要验证真实储备和赎回能力'], example: '算法推荐降低操作门槛，却可能让用户在不了解风险时更快做出高频决策。', exercise: '评估数字资产平台最先检查哪些问题？', answer: '法律主体、资产托管、储备与审计、赎回机制、费用、网络安全和所在地区监管。' },
  { id: 64, moduleId: 8, title: '综合决策案例', minutes: 28, question: '如何把 64 课知识用于一项真实财务决策？', summary: '综合决策从目标与约束出发，比较现金流、风险、机会成本和最坏情景，最后写下可复盘的行动。', key: '定义问题 → 收集证据 → 比较方案 → 压力测试 → 执行与复盘', points: ['先排除无法承受的结果', '使用区间和情景而非单点预测', '记录选择理由和未来修改条件'], example: '面对买房、提前还贷或投资三选一，先保留应急金，再比较期限、税后成本、流动性和压力情景。', exercise: '请为自己的一个真实目标写出五项决策输入。', answer: '至少包括目标金额、截止日期、现有资源、可承受损失和替代方案；再补充税费、流动性与最坏情景。' },
];

const quiz = [
  { id: 1, question: '名义收益率 6%、通胀率 3%，实际收益率最接近：', options: ['3%', '6%', '9%'], correct: 0 },
  { id: 2, question: '市场利率上升时，既有固定利率债券价格通常：', options: ['上涨', '下跌', '完全不变'], correct: 1 },
  { id: 3, question: '下列哪项最能验证利润的含金量？', options: ['办公地点', '经营现金流', '公司名称'], correct: 1 },
  { id: 4, question: '有效分散最关键的是：', options: ['资产名称足够多', '底层风险驱动因素不同', '每天频繁交易'], correct: 1 },
  { id: 5, question: '资产配置的第一步应当是：', options: ['预测明天涨跌', '寻找最高收益产品', '明确目标、期限与风险'], correct: 2 },
  { id: 6, question: '现金流折现估值中，折现率提高通常会让估值：', options: ['提高', '降低', '完全不变'], correct: 1 },
  { id: 7, question: '组合再平衡的主要目的是什么？', options: ['恢复既定风险水平', '保证卖在最高点', '追逐近期冠军'], correct: 0 },
  { id: 8, question: '买入看涨期权的最大损失通常是：', options: ['无限', '已支付的期权费', '底层资产全部价值'], correct: 1 },
];

const glossary = [
  ['复利', '收益加入本金后继续产生收益的增长方式。'], ['通胀', '整体物价水平持续上升，货币购买力随之下降。'],
  ['实际收益率', '扣除通胀影响后，购买力真正增加的比例。'], ['流动性', '资产快速、低成本并以合理价格变现的能力。'],
  ['债券', '投资者借钱给政府或企业形成的债权凭证。'], ['股票', '持有人对企业剩余权益的一种所有权凭证。'],
  ['指数基金', '按照既定规则追踪某个市场指数的基金。'], ['净值', '基金每一份额所代表的资产净价值。'],
  ['市盈率', '股价相对于每股盈利的倍数，常用于相对估值。'], ['自由现金流', '经营产生的现金扣除维持与扩张所需资本支出后的余额。'],
  ['资产配置', '按照目标和风险预算，在不同资产类别间分配资金。'], ['再平衡', '定期让偏离目标的组合重新回到既定比例。'],
  ['净资产', '个人或家庭总资产扣除总负债后的余额。'], ['实际年化利率', '把期限、还款方式与全部费用统一后得到的真实年度借款成本。'],
  ['久期', '衡量债券价格对利率变化敏感程度的指标。'], ['企业价值', '企业股权市值加净债务后，对完整经营资产的估值。'],
  ['折现率', '把未来现金流换算成今天价值时使用的要求回报率。'], ['基准', '用于评价投资结果的可比较市场或策略标准。'],
  ['因子', '能解释一组资产共同收益与风险特征的系统性变量。'], ['风险预算', '预先分配给各类资产或策略的可承受风险额度。'],
  ['投资政策书', '记录目标、约束、配置与调整规则的长期决策文件。'], ['收益率曲线', '同类债务在不同期限上的收益率排列。'],
  ['期权', '赋予买方在约定条件下买入或卖出资产权利的合约。'], ['系统性风险', '影响整个市场、难以仅靠增加标的数量消除的风险。'],
];

const PROGRESS_KEY = 'caishi-progress-v1';

export default function Home() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState(1);
  const [activeModule, setActiveModule] = useState(1);
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(2.5);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizMessage, setQuizMessage] = useState('');
  const [glossaryQuery, setGlossaryQuery] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PROGRESS_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch { /* Local progress is optional. */ }
  }, []);

  const selected = lessons.find((lesson) => lesson.id === selectedId) ?? lessons[0];
  const moduleLessons = lessons.filter((lesson) => lesson.moduleId === activeModule);
  const firstIncomplete = lessons.find((lesson) => !completed.includes(lesson.id)) ?? lessons[lessons.length - 1];
  const progress = Math.round((completed.length / lessons.length) * 100);
  const futureValue = principal * Math.pow(1 + rate / 100, years);
  const realRate = ((1 + rate / 100) / (1 + inflation / 100) - 1) * 100;
  const filteredGlossary = useMemo(() => glossary.filter(([term, meaning]) => `${term}${meaning}`.includes(glossaryQuery.trim())), [glossaryQuery]);

  function openLesson(lesson: Lesson) {
    setSelectedId(lesson.id);
    setActiveModule(lesson.moduleId);
    window.setTimeout(() => document.getElementById('course')?.scrollIntoView({ behavior: 'smooth' }), 0);
  }

  function toggleCompleted(id: number) {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id].sort((a, b) => a - b);
      try { window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next)); } catch { /* Local progress is optional. */ }
      return next;
    });
  }

  function resetProgress() {
    if (!window.confirm('清除这台设备上的全部学习进度？课程内容不会受影响。')) return;
    setCompleted([]);
    window.localStorage.removeItem(PROGRESS_KEY);
  }

  function submitQuiz() {
    if (Object.keys(answers).length < quiz.length) {
      setQuizMessage('还有题目没有作答，请完成后再提交。');
      return;
    }
    const score = quiz.reduce((sum, item) => sum + (answers[item.id] === item.correct ? 1 : 0), 0);
    setQuizMessage(score === quiz.length ? `${quiz.length} / ${quiz.length} · 很棒，你已经抓住了完整框架。` : `${score} / ${quiz.length} · 建议回看标记为错误的概念，再试一次。`);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="财识首页"><span className="brand-mark">财</span><span><strong>财识</strong><small>FINANCE ATLAS</small></span></a>
        <nav aria-label="主导航"><a href="#path">学习路径</a><a href="#course">课程</a><a href="#tools">计算工具</a><a href="#glossary">知识词典</a></nav>
        <div className="daily-goal"><span /> 已完成 {completed.length} / {lessons.length} 课</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>从零到进阶</span> · 64 课系统建立金融思维</p>
          <h1>把金融，变成一张<br /><em>能走完的地图。</em></h1>
          <p className="hero-lead">从一块钱的时间价值，到财务规划、投资分析、组合管理与全球市场。每课一个概念、一个案例、一道练习，循序渐进，不追热点。</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => openLesson(firstIncomplete)}>继续第 {firstIncomplete.id} 课 <span>→</span></button><a className="text-button" href="#path">查看完整路径</a></div>
          <div className="trust-row" aria-label="课程特色"><span>✓ 8 大模块</span><span>✓ 约 18 小时内容</span><span>✓ 不荐股，不制造焦虑</span></div>
        </div>

        <aside className="today-card">
          <div className="card-topline"><span>YOUR PROGRESS</span><span className="difficulty">{progress}%</span></div>
          <div className="progress-orbit" style={{ background: `conic-gradient(var(--copper) ${progress * 3.6}deg, #e4ded1 0deg)` }} aria-label={`课程总进度 ${progress}%`}><div className="orbit-inner"><strong>{completed.length}</strong><span>/ {lessons.length}</span></div></div>
          <p className="today-label">下一课 · {firstIncomplete.minutes} 分钟</p>
          <h2>{firstIncomplete.question}</h2>
          <p>{firstIncomplete.summary}</p>
          <button className="lesson-link" onClick={() => openLesson(firstIncomplete)}>进入课程 <span>第 {firstIncomplete.id} 课 →</span></button>
        </aside>
      </section>

      <section className="path-section" id="path">
        <div className="section-heading"><div><p className="eyebrow">LEARNING PATH</p><h2>八站式金融知识地图</h2></div><p>基础 28 课建立框架，进阶 36 课把知识用于规划、研究与真实决策。</p></div>
        <div className="module-grid">
          {modules.map((module) => {
            const count = lessons.filter((lesson) => lesson.moduleId === module.id && completed.includes(lesson.id)).length;
            const total = lessons.filter((lesson) => lesson.moduleId === module.id).length;
            return <button className={`module-card ${module.tone}`} key={module.id} onClick={() => openLesson(lessons.find((lesson) => lesson.moduleId === module.id && !completed.includes(lesson.id)) ?? lessons.find((lesson) => lesson.moduleId === module.id)!)}>
              <div className="module-index">{module.index}</div><div className="module-icon" aria-hidden="true"><span>{module.id}</span></div>
              <h3>{module.title}</h3><p>{module.summary}</p><div className="module-footer"><span>{count} / {total} 已完成</span><span>→</span></div>
            </button>;
          })}
        </div>
      </section>

      <section className="course-section" id="course">
        <div className="section-heading light-heading"><div><p className="eyebrow">THE COURSE</p><h2>逐课学习，随时接着上次进度</h2></div><div className="overall-progress"><span><b style={{ width: `${progress}%` }} /></span><small>{progress}% 完成</small><button onClick={resetProgress}>清除进度</button></div></div>
        <div className="course-shell">
          <aside className="course-sidebar">
            <div className="module-tabs" role="tablist" aria-label="课程模块">
              {modules.map((module) => <button role="tab" aria-selected={activeModule === module.id} className={activeModule === module.id ? 'active' : ''} key={module.id} onClick={() => { setActiveModule(module.id); const first = lessons.find((lesson) => lesson.moduleId === module.id); if (first) setSelectedId(first.id); }}>{module.index}<span>{module.title}</span></button>)}
            </div>
            <div className="lesson-list">
              {moduleLessons.map((lesson) => <button key={lesson.id} className={selectedId === lesson.id ? 'active' : ''} onClick={() => setSelectedId(lesson.id)}><span className={completed.includes(lesson.id) ? 'lesson-check done' : 'lesson-check'}>{completed.includes(lesson.id) ? '✓' : lesson.id}</span><span><strong>{lesson.title}</strong><small>{lesson.minutes} 分钟</small></span></button>)}
            </div>
          </aside>

          <article className="lesson-reader">
            <div className="lesson-meta"><span>模块 {selected.moduleId} · 第 {selected.id} 课</span><span>{selected.minutes} MIN READ</span></div>
            <h2>{selected.question}</h2><p className="lesson-summary">{selected.summary}</p>
            <div className="key-formula"><small>核心关系</small><strong>{selected.key}</strong></div>
            <h3>这一课，先掌握三件事</h3>
            <ol className="learning-points">{selected.points.map((point, index) => <li key={point}><span>0{index + 1}</span><p>{point}</p></li>)}</ol>
            <div className="example-card"><span>生活中的例子</span><p>{selected.example}</p></div>
            <details className="practice-card"><summary><span>随堂练习</span>{selected.exercise}<b>查看答案</b></summary><p>{selected.answer}</p></details>
            <div className="lesson-actions">
              <button disabled={selected.id === 1} onClick={() => openLesson(lessons[selected.id - 2])}>← 上一课</button>
              <button className={completed.includes(selected.id) ? 'complete-button completed' : 'complete-button'} onClick={() => toggleCompleted(selected.id)}>{completed.includes(selected.id) ? '✓ 已学完，再次点击取消' : '标记本课已完成'}</button>
              <button disabled={selected.id === lessons.length} onClick={() => openLesson(lessons[selected.id])}>下一课 →</button>
            </div>
          </article>
        </div>
      </section>

      <section className="quiz-section" id="quiz">
        <div className="quiz-intro"><p className="eyebrow">KNOWLEDGE CHECK</p><h2>用 8 道题，检查你的金融直觉</h2><p>覆盖八个模块。答错的题，正好告诉你应该回看哪里。</p></div>
        <div className="quiz-form">
          {quiz.map((item, index) => <fieldset key={item.id}><legend><span>0{index + 1}</span>{item.question}</legend><div>{item.options.map((option, optionIndex) => <label key={option}><input type="radio" name={`q-${item.id}`} checked={answers[item.id] === optionIndex} onChange={() => { setAnswers((current) => ({ ...current, [item.id]: optionIndex })); setQuizMessage(''); }} /><span>{option}</span></label>)}</div>{quizMessage && answers[item.id] !== undefined && <small className={answers[item.id] === item.correct ? 'answer-correct' : 'answer-wrong'}>{answers[item.id] === item.correct ? '回答正确' : `正确答案：${item.options[item.correct]}`}</small>}</fieldset>)}
          <div className="quiz-submit"><button onClick={submitQuiz}>提交答案</button><strong>{quizMessage}</strong></div>
        </div>
      </section>

      <section className="tools-section" id="tools">
        <div className="section-heading light-heading"><div><p className="eyebrow">CALCULATORS</p><h2>把抽象概念变成自己的数字</h2></div><p>结果仅用于理解概念，不构成收益承诺或投资建议。</p></div>
        <div className="calculator-grid">
          <article className="calculator-card">
            <div className="calculator-title"><span>01</span><div><h3>复利计算器</h3><p>看看时间如何放大长期积累</p></div></div>
            <div className="input-grid"><label>初始本金（元）<input type="number" min="0" value={principal} onChange={(event) => setPrincipal(Number(event.target.value))} /></label><label>年收益率（%）<input type="number" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label><label>年数<input type="number" min="0" max="100" value={years} onChange={(event) => setYears(Number(event.target.value))} /></label></div>
            <div className="result-box"><span>{years} 年后的估算金额</span><strong>¥ {Number.isFinite(futureValue) ? futureValue.toLocaleString('zh-CN', { maximumFractionDigits: 0 }) : '—'}</strong><small>其中累计增长约 ¥ {Number.isFinite(futureValue) ? Math.max(0, futureValue - principal).toLocaleString('zh-CN', { maximumFractionDigits: 0 }) : '—'}</small></div>
          </article>
          <article className="calculator-card">
            <div className="calculator-title"><span>02</span><div><h3>实际收益计算器</h3><p>扣除通胀后，你的购买力增加了多少</p></div></div>
            <div className="input-grid two"><label>名义收益率（%）<input type="number" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label><label>通胀率（%）<input type="number" step="0.1" value={inflation} onChange={(event) => setInflation(Number(event.target.value))} /></label></div>
            <div className="result-box green-result"><span>精确实际收益率</span><strong>{Number.isFinite(realRate) ? realRate.toFixed(2) : '—'}%</strong><small>计算公式：（1 + 名义收益率）÷（1 + 通胀率）− 1</small></div>
          </article>
        </div>
      </section>

      <section className="glossary-section" id="glossary">
        <div className="glossary-head"><div><p className="eyebrow">GLOSSARY</p><h2>金融知识词典</h2><p>先用一句人话理解，再回到课程看它如何运作。</p></div><label><span>搜索术语</span><input type="search" value={glossaryQuery} onChange={(event) => setGlossaryQuery(event.target.value)} placeholder="例如：复利、基金、现金流" /></label></div>
        <div className="glossary-grid">{filteredGlossary.map(([term, meaning]) => <article key={term}><span>{term.slice(0, 1)}</span><div><h3>{term}</h3><p>{meaning}</p></div></article>)}</div>
        {filteredGlossary.length === 0 && <p className="empty-state">暂时没有找到这个词，试试“复利”或“现金流”。</p>}
      </section>

      <section className="closing-section"><span>学完不是终点</span><h2>真正的金融能力，是在不确定中<br />仍然知道自己为什么这样选择。</h2><button onClick={() => openLesson(firstIncomplete)}>继续你的第 {firstIncomplete.id} 课 →</button></section>
      <footer><span>财识 · FINANCE ATLAS</span><p>内容用于金融知识教育，不构成投资、税务或法律建议。</p><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}

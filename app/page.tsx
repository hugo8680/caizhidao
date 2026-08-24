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
];

const quiz = [
  { id: 1, question: '名义收益率 6%、通胀率 3%，实际收益率最接近：', options: ['3%', '6%', '9%'], correct: 0 },
  { id: 2, question: '市场利率上升时，既有固定利率债券价格通常：', options: ['上涨', '下跌', '完全不变'], correct: 1 },
  { id: 3, question: '下列哪项最能验证利润的含金量？', options: ['办公地点', '经营现金流', '公司名称'], correct: 1 },
  { id: 4, question: '有效分散最关键的是：', options: ['资产名称足够多', '底层风险驱动因素不同', '每天频繁交易'], correct: 1 },
  { id: 5, question: '资产配置的第一步应当是：', options: ['预测明天涨跌', '寻找最高收益产品', '明确目标、期限与风险'], correct: 2 },
];

const glossary = [
  ['复利', '收益加入本金后继续产生收益的增长方式。'], ['通胀', '整体物价水平持续上升，货币购买力随之下降。'],
  ['实际收益率', '扣除通胀影响后，购买力真正增加的比例。'], ['流动性', '资产快速、低成本并以合理价格变现的能力。'],
  ['债券', '投资者借钱给政府或企业形成的债权凭证。'], ['股票', '持有人对企业剩余权益的一种所有权凭证。'],
  ['指数基金', '按照既定规则追踪某个市场指数的基金。'], ['净值', '基金每一份额所代表的资产净价值。'],
  ['市盈率', '股价相对于每股盈利的倍数，常用于相对估值。'], ['自由现金流', '经营产生的现金扣除维持与扩张所需资本支出后的余额。'],
  ['资产配置', '按照目标和风险预算，在不同资产类别间分配资金。'], ['再平衡', '定期让偏离目标的组合重新回到既定比例。'],
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
  const firstIncomplete = lessons.find((lesson) => !completed.includes(lesson.id)) ?? lessons[27];
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
    setQuizMessage(score === 5 ? '5 / 5 · 很棒，你已经抓住了核心框架。' : `${score} / 5 · 建议回看标记为错误的概念，再试一次。`);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="财识首页"><span className="brand-mark">财</span><span><strong>财识</strong><small>FINANCE ATLAS</small></span></a>
        <nav aria-label="主导航"><a href="#path">学习路径</a><a href="#course">课程</a><a href="#tools">计算工具</a><a href="#glossary">知识词典</a></nav>
        <div className="daily-goal"><span /> 已完成 {completed.length} / 28 课</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>零基础课程</span> · 28 天建立金融思维</p>
          <h1>把金融，变成一张<br /><em>能走完的地图。</em></h1>
          <p className="hero-lead">从一块钱的时间价值，到读懂市场的起伏。每天一个概念、一个案例、一道练习，循序渐进，不追热点。</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => openLesson(firstIncomplete)}>继续第 {firstIncomplete.id} 课 <span>→</span></button><a className="text-button" href="#path">查看完整路径</a></div>
          <div className="trust-row" aria-label="课程特色"><span>✓ 无需金融基础</span><span>✓ 每课约 15 分钟</span><span>✓ 不荐股，不制造焦虑</span></div>
        </div>

        <aside className="today-card">
          <div className="card-topline"><span>YOUR PROGRESS</span><span className="difficulty">{progress}%</span></div>
          <div className="progress-orbit" style={{ background: `conic-gradient(var(--copper) ${progress * 3.6}deg, #e4ded1 0deg)` }} aria-label={`课程总进度 ${progress}%`}><div className="orbit-inner"><strong>{completed.length}</strong><span>/ 28</span></div></div>
          <p className="today-label">下一课 · {firstIncomplete.minutes} 分钟</p>
          <h2>{firstIncomplete.question}</h2>
          <p>{firstIncomplete.summary}</p>
          <button className="lesson-link" onClick={() => openLesson(firstIncomplete)}>进入课程 <span>第 {firstIncomplete.id} 课 →</span></button>
        </aside>
      </section>

      <section className="path-section" id="path">
        <div className="section-heading"><div><p className="eyebrow">LEARNING PATH</p><h2>四站式金融知识地图</h2></div><p>先掌握规律，再认识工具；先学会判断风险，再讨论收益。</p></div>
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
        <div className="quiz-intro"><p className="eyebrow">KNOWLEDGE CHECK</p><h2>用 5 道题，检查你的金融直觉</h2><p>不是考试。答错的题，正好告诉你应该回看哪里。</p></div>
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

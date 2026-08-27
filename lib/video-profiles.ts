export type VideoProfile = {
  overview: string;
  topics: string[];
  context: string;
};

export const videoProfiles: Record<string, VideoProfile> = {
  'mooc-finance-cn': {
    overview: '中国大学 MOOC 的金融课程来自不同高校，内容通常涵盖货币银行、金融市场、公司金融、投资学和风险管理。具体课程由开课学校独立建设，因此课程深度、数学要求和考核方式并不统一。',
    topics: ['货币、银行、证券市场与金融机构的基础关系。', '现金流折现、资本预算、融资与公司价值。', '投资组合、资产定价、衍生品与风险管理。'],
    context: '这是课程检索入口而非单一固定课程。学校、教师、章节、开放周期和考核以所选课程页面为准。',
  },
  'xuetang-finance-cn': {
    overview: '学堂在线汇集高校课程，财经内容覆盖经济学、会计、公司金融、金融科技和数据分析。部分课程接近完整学期教学，部分为专题或职业教育，课程大纲决定实际范围。',
    topics: ['经济学和金融学的高校基础课程。', '财务报表、公司决策与估值。', '金融科技、数据模型与数字经济专题。'],
    context: '课程由不同学校和教学团队提供，数学、会计先修要求以及讲义、作业和证书安排各不相同。',
  },
  'smartedu-cn': {
    overview: '国家高等教育智慧教育平台提供高校课程资源，财经板块可检索金融学、宏观经济学、会计学、统计学和财务分析等系统课程。资源以高校正式教学材料为主。',
    topics: ['课程负责人、建设学校与学科归属。', '按章节组织的课堂视频和教学资料。', '经济学、金融学、会计与统计的连续课程体系。'],
    context: '部分课程需要登录或按平台安排开放，章节版本和配套资料由课程建设单位维护。',
  },
  'bilibili-yale-cn': {
    overview: '该入口用于查找带中文字幕的耶鲁《金融市场》课程资源。课程以风险分担和金融的社会功能为主线，将证券、保险、银行、监管与行为金融放在同一制度框架。',
    topics: ['风险分担、保险与投资组合的基本思想。', '股票、债券、银行和市场制度。', '行为金融、监管以及金融与社会目标。'],
    context: '哔哩哔哩上的合集可能来自不同上传者，讲次、字幕和版权状态并不完全一致；课程原始版本来自 Open Yale Courses。',
  },
  'bilibili-accounting-cn': {
    overview: '中文财务报表课程通常从会计等式和三张报表开始，进一步讨论收入确认、营运资金、现金流质量与财务比率。高质量课程应以完整企业交易和公开报表为例。',
    topics: ['资产负债表、利润表和现金流量表的勾稽。', '收入、应收账款、存货与经营现金流。', '盈利能力、偿债能力和资本回报率。'],
    context: '平台内容既有高校课程，也有面向证券市场的短视频。会计结论需要回到企业年报、会计政策和报表附注核对。',
  },
  'coursera-markets': {
    overview: 'Robert Shiller 的 Financial Markets 课程从风险、保险和金融机构的社会功能出发，介绍证券市场、银行、行为金融与监管，强调金融工具如何服务真实经济。',
    topics: ['风险分担、保险和投资组合思想。', '股票、债券、银行与市场基础设施。', '行为偏差、监管和金融的公共目的。'],
    context: '课程由耶鲁大学在 Coursera 提供。字幕、旁听、作业、证书和费用政策由平台持续调整。',
  },
  'yale-markets': {
    overview: 'Open Yale Courses 的 Financial Markets 是一套完整大学公开课，以金融制度解决风险分担问题为主线，连接证券、银行、保险、监管和行为金融。',
    topics: ['Risk sharing, insurance and portfolio ideas.', 'Securities, banking, regulation and market institutions.', 'Behavioral finance and the social purpose of finance.'],
    context: '公开版本录制于 2011 年。基础机制仍有价值，但监管条款、市场结构和案例数据应按今天的制度更新。',
  },
  'yale-theory': {
    overview: 'Financial Theory 是偏理论的研究生层次课程，使用概率、最优化和均衡模型研究不确定条件下的消费、证券定价与市场结构。',
    topics: ['Expected utility, state prices and risk sharing.', 'Portfolio choice, CAPM and market equilibrium.', 'Options, asymmetric information and agency problems.'],
    context: '课程需要微积分、概率和微观经济学基础。模型用于隔离因果关系，现实应用还要加入交易成本、流动性和制度约束。',
  },
  'mit-finance': {
    overview: 'MIT OpenCourseWare 的金融课程把现值、固定收益、资本预算、投资组合和公司融资放入完整学期结构，并提供大纲、作业或考试等教学材料。',
    topics: ['Present value, fixed income and capital budgeting.', 'Risk, return, portfolio theory and asset pricing.', 'Corporate financing decisions and options.'],
    context: '不同课程年份和编号的材料范围不完全相同；历史案例和市场惯例需要更新，基本现金流与风险框架仍然适用。',
  },
  'khan-finance': {
    overview: 'Khan Academy 用短视频拆解利率、现值、债券、股票、银行、信用和住房金融，适合针对单个计算或机制补充基础。内容以小主题组织，而非一门连续大学课程。',
    topics: ['Interest and present-value calculations.', 'Bond and stock cash flows.', 'Banking, credit and housing finance mechanics.'],
    context: '短视频能够清晰演示单个概念，但系统掌握仍需要连续教材、计算题和综合案例。',
  },
  'damodaran-valuation': {
    overview: 'Aswath Damodaran 的估值课程从企业叙事进入收入、利润率、再投资和风险假设，再以 DCF 与相对估值连接公司经营和市场价格。课程提供讲义、数据和电子表格。',
    topics: ['Cash-flow estimation, growth and reinvestment.', 'Risk, discount rates and capital structure.', 'Terminal value, relative valuation and narrative consistency.'],
    context: '估值模型不能消除判断。会计调整、资本成本、终值和情景敏感性决定输出能否被解释。',
  },
  'cfa-foundations': {
    overview: 'CFA Institute Investment Foundations 从投资行业结构、市场和工具讲到客户需求、组合基础、绩效、伦理与监管，定位是行业全貌和共同语言。',
    topics: ['Industry structure, markets and investment instruments.', 'Client needs, portfolio basics and performance.', 'Ethics, regulation and professional conduct.'],
    context: '该项目与 CFA Program 的专业深度和资格体系不同，注册、学习材料、考核和费用以 CFA Institute 当前规定为准。',
  },
};

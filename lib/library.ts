export type Book = {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  publisher: string;
  year: string;
  isbn: string;
  pages: string;
  price: string;
  language: '中文' | '英文';
  level: '入门' | '进阶' | '专业';
  topic: string;
  intro: string;
  sourceUrl: string;
  shopUrl: string;
};

export { toolCatalog } from './tool-catalog';

export const books: Book[] = [
  { id: 'dog-money', title: '小狗钱钱', originalTitle: 'Ein Hund Namens Money', author: '博多·舍费尔', publisher: '中信出版集团', year: '2021', isbn: '9787521726473', pages: '240', price: '¥39.80', language: '中文', level: '入门', topic: '财商启蒙', intro: '用故事讲储蓄、目标、收入与长期积累，适合作为第一本财商读物。', sourceUrl: 'https://book.douban.com/subject/35295592/', shopUrl: 'https://search.jd.com/Search?keyword=9787521726473' },
  { id: 'most-important-thing', title: '投资最重要的事', originalTitle: 'The Most Important Thing', author: '霍华德·马克斯', publisher: '中信出版社', year: '2012', isbn: '9787508633800', pages: '248', price: '¥58.00', language: '中文', level: '进阶', topic: '风险管理', intro: '围绕第二层思维、周期、风险与安全边际建立投资决策框架。', sourceUrl: 'https://book.douban.com/subject/10799082/', shopUrl: 'https://search.jd.com/Search?keyword=9787508633800' },
  { id: 'intelligent-investor-cn', title: '聪明的投资者（第4版注疏点评版）', author: '本杰明·格雷厄姆', publisher: '人民邮电出版社', year: '2016', isbn: '9787115413581', pages: '504', price: '¥88.00', language: '中文', level: '进阶', topic: '价值投资', intro: '讨论投资与投机、市场先生、安全边际以及防御型投资者原则。', sourceUrl: 'https://book.douban.com/subject/26752026/', shopUrl: 'https://search.jd.com/Search?keyword=9787115413581' },
  { id: 'random-walk-cn', title: '漫步华尔街（第13版）', originalTitle: 'A Random Walk Down Wall Street', author: '伯顿·马尔基尔', publisher: '机械工业出版社', year: '2024', isbn: '9787111753506', pages: '376', price: '¥99.00', language: '中文', level: '入门', topic: '指数投资', intro: '从市场有效性、资产类别和生命周期角度解释低成本长期投资。', sourceUrl: 'https://book.douban.com/subject/37220253/', shopUrl: 'https://search.jd.com/Search?keyword=9787111753506' },
  { id: 'psychology-money-cn', title: '金钱心理学', originalTitle: 'The Psychology of Money', author: '摩根·豪泽尔', publisher: '民主与建设出版社', year: '2023', isbn: '9787513941242', pages: '328', price: '¥56.00', language: '中文', level: '入门', topic: '行为金融', intro: '用短故事解释运气、风险、复利、自由与“足够”的心理边界。', sourceUrl: 'https://book.douban.com/subject/36415996/', shopUrl: 'https://search.jd.com/Search?keyword=9787513941242' },
  { id: 'corporate-finance-cn', title: '公司理财（原书第11版）', originalTitle: 'Corporate Finance', author: '斯蒂芬·罗斯 等', publisher: '机械工业出版社', year: '2017', isbn: '9787111574156', pages: '655', price: '¥119.00', language: '中文', level: '专业', topic: '公司金融', intro: '系统覆盖净现值、资本结构、风险收益、融资与公司价值。', sourceUrl: 'https://book.douban.com/subject/27135864/', shopUrl: 'https://search.jd.com/Search?keyword=9787111574156' },
  { id: 'behavioral-finance-cn', title: '行为金融学通识', originalTitle: 'Behavioral Finance', author: '迈尔·斯塔特曼', publisher: '北京大学出版社', year: '2020', isbn: '9787301302903', pages: '信息以版本页为准', price: '¥69.00', language: '中文', level: '进阶', topic: '行为金融', intro: '把投资者行为、市场现象与生活中的金融选择连接起来。', sourceUrl: 'https://book.douban.com/subject/35246312/', shopUrl: 'https://search.jd.com/Search?keyword=9787301302903' },
  { id: 'economics-principles-cn', title: '经济学原理（上下）', originalTitle: 'Principles of Economics', author: 'N. 格里高利·曼昆', publisher: '机械工业出版社', year: '2003', isbn: '9787111126768', pages: '323 + 410', price: '¥88.00', language: '中文', level: '入门', topic: '经济学', intro: '通过供需、激励、市场与宏观政策建立经济学通识框架。', sourceUrl: 'https://book.douban.com/subject/1028842/', shopUrl: 'https://search.jd.com/Search?keyword=9787111126768' },
  { id: 'psychology-money-en', title: 'The Psychology of Money', author: 'Morgan Housel', publisher: 'Harriman House', year: '2020', isbn: '9780857197689', pages: '256', price: '约 £14.99', language: '英文', level: '入门', topic: 'Behavioral Finance', intro: 'Nineteen short stories about how behavior shapes saving, investing and happiness.', sourceUrl: 'https://openlibrary.org/isbn/9780857197689', shopUrl: 'https://www.harriman-house.com/authors/morgan-housel/the-psychology-of-money/9780857197689' },
  { id: 'random-walk-en', title: 'A Random Walk Down Wall Street', author: 'Burton G. Malkiel', publisher: 'W. W. Norton', year: '2023', isbn: '9781324051138', pages: '432', price: '约 US$32–35', language: '英文', level: '进阶', topic: 'Index Investing', intro: 'A broad guide to market efficiency, asset allocation and low-cost portfolio construction.', sourceUrl: 'https://openlibrary.org/isbn/9781324051138', shopUrl: 'https://wwnorton.com/books/9781324051138' },
  { id: 'intelligent-investor-en', title: 'The Intelligent Investor', author: 'Benjamin Graham', publisher: 'HarperBusiness', year: '2006', isbn: '9780060555665', pages: '640（常见版本）', price: '约 US$25', language: '英文', level: '进阶', topic: 'Value Investing', intro: 'The classic framework for margin of safety, investor temperament and market fluctuations.', sourceUrl: 'https://openlibrary.org/isbn/9780060555665', shopUrl: 'https://www.harpercollins.com/products/the-intelligent-investor-rev-ed-benjamin-graham' },
  { id: 'common-sense-en', title: 'The Little Book of Common Sense Investing', author: 'John C. Bogle', publisher: 'Wiley', year: '2017', isbn: '9781119404507', pages: '270', price: '约 US$25–30', language: '英文', level: '入门', topic: 'Index Investing', intro: 'A concise case for broad diversification, low fees and staying the course.', sourceUrl: 'https://openlibrary.org/isbn/9781119404507', shopUrl: 'https://www.wiley.com/en-us/The+Little+Book+of+Common+Sense+Investing-p-9781119404507' },
  { id: 'investment-valuation-en', title: 'Investment Valuation', author: 'Aswath Damodaran', publisher: 'Wiley', year: '2012', isbn: '9781118011522', pages: '992', price: '约 US$95–120', language: '英文', level: '专业', topic: 'Valuation', intro: 'A deep reference on discounted cash flow, relative valuation and real options.', sourceUrl: 'https://openlibrary.org/isbn/9781118011522', shopUrl: 'https://www.wiley.com/en-us/Investment+Valuation-p-9781118011522' },
  { id: 'derivatives-en', title: 'Options, Futures, and Other Derivatives', author: 'John C. Hull', publisher: 'Pearson', year: '2017', isbn: '9780134472089', pages: '896', price: '约 US$90–140', language: '英文', level: '专业', topic: 'Derivatives', intro: 'A standard text on derivative pricing, hedging, risk management and market mechanics.', sourceUrl: 'https://openlibrary.org/isbn/9780134472089', shopUrl: 'https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005982' },
  { id: 'financial-statements-en', title: 'Financial Statements, Third Edition', author: 'Thomas R. Ittelson', publisher: 'Career Press', year: '2020', isbn: '9781632651754', pages: '320', price: '约 US$19.99', language: '英文', level: '入门', topic: 'Accounting', intro: 'A visual, accessible introduction to the balance sheet, income statement and cash flow.', sourceUrl: 'https://openlibrary.org/isbn/9781632651754', shopUrl: 'https://www.redwheelweiser.com/book/financial-statements-9781632651754/' },
  { id: 'misbehaving-en', title: 'Misbehaving', author: 'Richard H. Thaler', publisher: 'W. W. Norton', year: '2016', isbn: '9780393352795', pages: '415', price: '约 US$18.95', language: '英文', level: '进阶', topic: 'Behavioral Economics', intro: 'The story of behavioral economics and why real people depart from textbook rationality.', sourceUrl: 'https://openlibrary.org/isbn/9780393352795', shopUrl: 'https://wwnorton.com/books/9780393352795' },
];

export type VideoCourse = {
  id: string;
  title: string;
  titleEn?: string;
  platform: string;
  language: '中文' | '英文' | '双语/中文字幕';
  level: '入门' | '进阶' | '专业';
  duration: string;
  price: string;
  topic: string;
  description: string;
  url: string;
};

export const videos: VideoCourse[] = [
  { id: 'mooc-finance-cn', title: '金融学精品课程检索', platform: '中国大学 MOOC', language: '中文', level: '入门', duration: '按课程而定', price: '多数可免费旁听', topic: '金融学', description: '汇总国内高校金融学、公司金融和投资学课程，可按学校与开课状态筛选。', url: 'https://www.icourse163.org/search.htm?search=%E9%87%91%E8%9E%8D%E5%AD%A6' },
  { id: 'xuetang-finance-cn', title: '金融与经济课程检索', platform: '学堂在线', language: '中文', level: '入门', duration: '按课程而定', price: '部分免费', topic: '金融与经济', description: '清华等高校课程聚合，适合继续查找宏观、会计和金融科技课程。', url: 'https://www.xuetangx.com/search?query=%E9%87%91%E8%9E%8D' },
  { id: 'smartedu-cn', title: '国家高等教育智慧教育平台', platform: '国家智慧教育平台', language: '中文', level: '入门', duration: '按课程而定', price: '免费', topic: '高校课程', description: '国家级课程资源入口，可搜索金融学、经济学、会计学与投资学。', url: 'https://higher.smartedu.cn/' },
  { id: 'bilibili-yale-cn', title: '耶鲁金融市场中文字幕资源', platform: '哔哩哔哩检索', language: '双语/中文字幕', level: '入门', duration: '约 25 讲', price: '免费', topic: '金融市场', description: '寻找 Robert Shiller《金融市场》课程的中文字幕学习版本。', url: 'https://search.bilibili.com/all?keyword=%E8%80%B6%E9%B2%81%20%E9%87%91%E8%9E%8D%E5%B8%82%E5%9C%BA%20%E4%B8%AD%E6%96%87%E5%AD%97%E5%B9%95' },
  { id: 'bilibili-accounting-cn', title: '财务报表分析公开课', platform: '哔哩哔哩检索', language: '中文', level: '进阶', duration: '按系列而定', price: '免费', topic: '财务分析', description: '适合配合本站财务报表课程，重点筛选高校或出版社官方账号。', url: 'https://search.bilibili.com/all?keyword=%E8%B4%A2%E5%8A%A1%E6%8A%A5%E8%A1%A8%E5%88%86%E6%9E%90%20%E5%85%AC%E5%BC%80%E8%AF%BE' },
  { id: 'coursera-markets', title: '金融市场', titleEn: 'Financial Markets', platform: 'Coursera · Yale', language: '双语/中文字幕', level: '入门', duration: '约 33 小时', price: '可旁听；证书收费', topic: '金融市场', description: 'Robert Shiller 主讲，覆盖风险、保险、证券、银行与行为金融。', url: 'https://www.coursera.org/learn/financial-markets-global' },
  { id: 'yale-markets', title: 'Financial Markets (2011)', platform: 'Open Yale Courses', language: '英文', level: '入门', duration: '23 讲', price: '免费', topic: '金融市场', description: '耶鲁官方完整课程，提供视频、音频与文字材料。', url: 'https://oyc.yale.edu/economics/econ-252' },
  { id: 'yale-theory', title: 'Financial Theory', platform: 'Open Yale Courses', language: '英文', level: '专业', duration: '26 讲', price: '免费', topic: '金融理论', description: '更数学化地学习资产定价、风险分担与市场均衡。', url: 'https://oyc.yale.edu/economics/econ-251' },
  { id: 'mit-finance', title: 'Finance Theory I', platform: 'MIT OpenCourseWare', language: '英文', level: '专业', duration: '完整学期', price: '免费', topic: '公司金融', description: 'MIT 15.401，包含讲义、作业与考试材料。', url: 'https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/' },
  { id: 'khan-finance', title: 'Finance and Capital Markets', platform: 'Khan Academy', language: '英文', level: '入门', duration: '自定进度', price: '免费', topic: '金融通识', description: '短视频拆解利率、债券、股票、银行和住房金融。', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance' },
  { id: 'damodaran-valuation', title: 'Valuation Online Class', platform: 'NYU Stern · Damodaran', language: '英文', level: '专业', duration: '约 25 讲', price: '免费', topic: '公司估值', description: 'Aswath Damodaran 公开的完整估值课程、讲义和案例。', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/webcastvalonline.htm' },
  { id: 'cfa-foundations', title: 'Investment Foundations', platform: 'CFA Institute', language: '英文', level: '入门', duration: '约 35–65 小时', price: '以官网为准', topic: '投资行业', description: '系统了解投资工具、市场结构、行业伦理和客户需求。', url: 'https://www.cfainstitute.org/programs/investment-foundations' },
];

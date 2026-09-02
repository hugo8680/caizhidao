import type { Metadata } from 'next';
import { ActionArrow } from '@/components/action-arrow';
import { ArticleFrame, type ArticleSectionLink } from '@/components/article-frame';
import { editorialReviewDate } from '@/lib/editorial';

export const metadata: Metadata = {
  title: '内容标准与资料原则 · 财知道',
  description: '财知道如何区分事实、模型、解释与案例，怎样选择资料、标注边界并处理内容更正。',
  alternates: { canonical: '/editorial-policy/' },
};

const contents: ArticleSectionLink[] = [
  { id: 'requirements', label: '内容要求' },
  { id: 'distinctions', label: '事实与判断' },
  { id: 'sources', label: '资料来源' },
  { id: 'uncertainty', label: '不确定性与争议' },
  { id: 'corrections', label: '更新与更正' },
  { id: 'limits', label: '使用边界' },
];

export default function EditorialPolicyPage() {
  return (
    <ArticleFrame
      sectionLabel="关于本站"
      sectionHref="/"
      breadcrumb={<><a href="/">财知道</a><span>／</span>内容标准</>}
      title="内容标准与资料原则"
      english="Editorial Standards"
      meta={<><span>最近修订 {editorialReviewDate}</span><span>公开编辑原则</span></>}
      contents={contents}
      aside={<>
        <section><h2>内容定位</h2><p className="reference-aside-copy">面向非专业读者的财经、金融与经济学知识库，解释概念、机制、证据和适用边界。</p></section>
        <section><h2>不提供</h2><p className="reference-aside-copy">个别证券推荐，以及替代持牌专业人士针对个人情况给出的投资、税务、会计或法律建议。</p></section>
        <section><h2>反馈入口</h2><ul className="reference-aside-links"><li><a href="https://github.com/hugo8680/caizhidao/issues" target="_blank" rel="noreferrer"><b>提交内容问题</b><small>GitHub Issues</small></a></li></ul></section>
      </>}
    >
      <section id="requirements">
        <h2>一篇合格内容要回答什么</h2>
        <p className="reference-article-lead">财经科普的目标不是把术语说得简单，而是在不牺牲准确性的前提下，把关系讲清楚。</p>
        <p>定义只是起点。概念词条需要说明它在研究什么、通过什么机制发生、怎样被观察或计算、在哪些条件下成立，以及最容易与什么混淆。课程还需要给出学习目标、前置知识、完整案例、练习答案和可追溯资料。</p>
        <ul className="knowledge-essay-checklist">
          <li>给出中文名称、英文名称和学科中的通行定义。</li>
          <li>解释参与者、约束、激励和因果传导，而不是只列结论。</li>
          <li>公式必须标明变量、时间口径、成立条件和不能包含的现实因素。</li>
          <li>案例用于展示推理过程，不把单一案例包装成普遍规律。</li>
          <li>明确反例、争议、制度差异和结论失效的边界。</li>
        </ul>
      </section>

      <section id="distinctions">
        <h2>事实、模型、解释和建议必须分开</h2>
        <dl className="knowledge-essay-distinctions">
          <div><dt>事实与统计</dt><dd>应标明指标定义、统计机构、时间范围和修订可能。数字相同但统计口径不同，不能直接比较。</dd></div>
          <div><dt>经济模型</dt><dd>模型用假设隔离某一关系。它可以帮助思考，但不是对现实的完整复制，也不是自动成立的预测。</dd></div>
          <div><dt>机制解释</dt><dd>机制需要说明从起点到结果之间的中间环节，并允许现实证据支持、削弱或推翻解释。</dd></div>
          <div><dt>教学案例</dt><dd>案例中的数字用于演示计算和判断。除非特别标明，它不代表市场报价、产品承诺或个人建议。</dd></div>
          <div><dt>规范判断</dt><dd>涉及公平、福利和政策取舍时，应说明价值标准、受益与受损群体以及可替代方案。</dd></div>
        </dl>
      </section>

      <section id="sources">
        <h2>资料来源怎样选择</h2>
        <p>优先顺序通常是原始法律与统计资料、中央银行和监管机构文件、国际组织标准、同行评议研究与大学教材。面向公众的机构解释可以帮助理解，但不能代替原始数据和正式规则。</p>
        <ol className="knowledge-essay-sequence">
          <li><h3>原始资料</h3><p>法律、监管规则、公司公告、经审计报表、统计数据库、历史原文和官方调查。</p></li>
          <li><h3>机构与学术资料</h3><p>中央银行、监管机构、IMF、BIS、世界银行、OECD、大学和专业组织发布的研究或教材。</p></li>
          <li><h3>通识解释</h3><p>用于降低阅读门槛，但必须能够追溯到定义、数据或研究，而不是循环引用无来源文章。</p></li>
        </ol>
      </section>

      <section id="uncertainty">
        <h2>怎样处理不确定性与争议</h2>
        <p>经济学经常面对无法完全控制的现实环境。本站不会把相关性写成因果关系，不会把某个历史时期的经验写成永恒规律，也不会用“专家认为”掩盖证据不足。存在重要学术争议时，应说明争议发生在哪一层：事实测量、因果识别、模型假设，还是价值取舍。</p>
      </section>

      <section id="corrections">
        <h2>更新与更正</h2>
        <p>统计口径、金融规则、课程链接、图书版本和市场制度都会变化。内容发现事实错误、失效来源或有歧义的表达时，应修正文稿并重新检查关联页面。欢迎通过公开仓库提交具体问题，说明页面、原句、建议修改和可核对来源。</p>
        <p><a href="https://github.com/hugo8680/caizhidao/issues" target="_blank" rel="noreferrer">在 GitHub 提交内容问题 <ActionArrow direction="external" /></a></p>
      </section>

      <section id="limits">
        <h2>使用边界</h2>
        <p>本站内容用于一般性教育，不构成投资、证券、信贷、保险、税务、会计或法律建议。金融决策需要结合个人目标、期限、现金流、风险承受能力、合同条款和所在地规则；涉及重大金额或法律责任时，应咨询具备相应资质的专业人士。</p>
      </section>
    </ArticleFrame>
  );
}

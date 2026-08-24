'use client';

import { createContext, useContext, useState } from 'react';
import { toolCatalog } from '@/lib/library';

const initialValues: Record<string, number> = {
  cp: 10000, cm: 1000, cr: 6, cy: 10,
  rr: 6, ri: 2.5,
  cs: 10000, ce: 20000, cyears: 5,
  lp: 1000000, lr: 4.1, ly: 30,
  ep: 200000, er: 4.1, ey: 10, eir: 5,
  sg: 500000, sc: 50000, sr: 5, sy: 8,
  em: 8000, es: 2, ed: 1,
  ra: 32, rt: 60, re: 10000, rinfl: 2.5, rexist: 200000, rret: 6, rw: 4,
  dfcf: 1000000, dg: 8, dr: 11, dy: 5, dtg: 3, dcash: 2000000, ddebt: 1000000,
  bf: 1000, bc: 3, by: 5, bret: 4,
  pp: 500000, pr: 1, ps: 8, pprice: 25,
  fi: 100000, fa: 12000, fr: 7, fy: 20, f1: 0.2, f2: 1.5,
};

function money(value: number) {
  if (!Number.isFinite(value)) return '—';
  return `¥ ${Math.round(value).toLocaleString('zh-CN')}`;
}

function percent(value: number) {
  return Number.isFinite(value) ? `${value.toFixed(2)}%` : '—';
}

function annuityFuture(principal: number, contribution: number, annualRate: number, years: number, periods = 12) {
  const count = Math.max(0, Math.round(years * periods));
  const rate = annualRate / 100 / periods;
  const base = principal * Math.pow(1 + rate, count);
  return base + (rate === 0 ? contribution * count : contribution * ((Math.pow(1 + rate, count) - 1) / rate));
}

type ToolContextValue = {
  values: Record<string, number>;
  set: (key: string, value: string) => void;
};

const ToolContext = createContext<ToolContextValue | null>(null);
const cards = toolCatalog.reduce<Record<string, (typeof toolCatalog)[number]>>((map, item) => ({ ...map, [item.id]: item }), {});

function Field({ id, label, suffix }: { id: string; label: string; suffix?: string }) {
  const context = useContext(ToolContext);
  if (!context) return null;
  return <label className="tool-field"><span>{label}</span><div><input type="number" value={context.values[id]} onChange={(event) => context.set(id, event.target.value)} /><small>{suffix}</small></div></label>;
}

function CardTitle({ id }: { id: string }) {
  return <header className="tool-card-title"><span>{String(toolCatalog.findIndex((item) => item.id === id) + 1).padStart(2, '0')}</span><div><small>{cards[id].category}</small><h2>{cards[id].title}</h2><p>{cards[id].description}</p></div></header>;
}

export function FinanceTools() {
  const [values, setValues] = useState(initialValues);
  const n = (key: string) => Number(values[key]) || 0;
  const set = (key: string, value: string) => setValues((current) => ({ ...current, [key]: Number(value) }));
  const compound = annuityFuture(n('cp'), n('cm'), n('cr'), n('cy'));
  const realReturn = ((1 + n('rr') / 100) / (1 + n('ri') / 100) - 1) * 100;
  const cagr = n('cs') > 0 && n('cyears') > 0 ? (Math.pow(n('ce') / n('cs'), 1 / n('cyears')) - 1) * 100 : NaN;
  const loanMonths = Math.max(1, Math.round(n('ly') * 12));
  const loanRate = n('lr') / 100 / 12;
  const monthlyLoan = loanRate === 0 ? n('lp') / loanMonths : n('lp') * loanRate * Math.pow(1 + loanRate, loanMonths) / (Math.pow(1 + loanRate, loanMonths) - 1);
  const totalLoanInterest = monthlyLoan * loanMonths - n('lp');
  const repaySaving = n('ep') * (Math.pow(1 + n('er') / 100, n('ey')) - 1);
  const investGain = n('ep') * (Math.pow(1 + n('eir') / 100, n('ey')) - 1);
  const goalMonths = Math.max(1, Math.round(n('sy') * 12));
  const goalRate = n('sr') / 100 / 12;
  const goalFutureCurrent = n('sc') * Math.pow(1 + goalRate, goalMonths);
  const monthlyGoal = Math.max(0, goalRate === 0 ? (n('sg') - n('sc')) / goalMonths : (n('sg') - goalFutureCurrent) * goalRate / (Math.pow(1 + goalRate, goalMonths) - 1));
  const emergencyMonths = Math.min(12, Math.max(3, Math.round(3 + n('es') * 1.5 + n('ed'))));
  const emergencyTarget = n('em') * emergencyMonths;
  const retirementYears = Math.max(0, n('rt') - n('ra'));
  const retirementExpense = n('re') * Math.pow(1 + n('rinfl') / 100, retirementYears);
  const retirementTarget = n('rw') > 0 ? retirementExpense * 12 / (n('rw') / 100) : NaN;
  const retirementExisting = n('rexist') * Math.pow(1 + n('rret') / 100, retirementYears);
  const retirementGap = Math.max(0, retirementTarget - retirementExisting);
  const retirementMonthly = annuityFuture(0, 1, n('rret'), retirementYears) > 0 ? retirementGap / annuityFuture(0, 1, n('rret'), retirementYears) : retirementGap;

  let dcfPv = 0;
  let projectedFcf = n('dfcf');
  const dcfYears = Math.max(1, Math.round(n('dy')));
  for (let year = 1; year <= dcfYears; year += 1) {
    projectedFcf *= 1 + n('dg') / 100;
    dcfPv += projectedFcf / Math.pow(1 + n('dr') / 100, year);
  }
  const terminal = n('dr') > n('dtg') ? projectedFcf * (1 + n('dtg') / 100) / ((n('dr') - n('dtg')) / 100) : NaN;
  const equityValue = dcfPv + terminal / Math.pow(1 + n('dr') / 100, dcfYears) + n('dcash') - n('ddebt');
  const coupon = n('bf') * n('bc') / 100;
  let bondPrice = 0;
  for (let year = 1; year <= Math.max(1, Math.round(n('by'))); year += 1) bondPrice += coupon / Math.pow(1 + n('bret') / 100, year);
  bondPrice += n('bf') / Math.pow(1 + n('bret') / 100, Math.max(1, Math.round(n('by'))));
  const maxLoss = n('pp') * n('pr') / 100;
  const positionValue = n('ps') > 0 ? maxLoss / (n('ps') / 100) : NaN;
  const positionShares = n('pprice') > 0 ? Math.floor(positionValue / n('pprice')) : NaN;
  const lowFee = annuityFuture(n('fi'), n('fa'), n('fr') - n('f1'), n('fy'), 1);
  const highFee = annuityFuture(n('fi'), n('fa'), n('fr') - n('f2'), n('fy'), 1);

  return (
    <ToolContext.Provider value={{ values, set }}><section className="tool-calculator-grid">
      <article className="tool-calc" id="compound"><CardTitle id="compound" /><div className="tool-fields"><Field id="cp" label="初始本金" suffix="元" /><Field id="cm" label="每月投入" suffix="元" /><Field id="cr" label="年收益率" suffix="%" /><Field id="cy" label="投资年数" suffix="年" /></div><div className="tool-result"><span>预计终值</span><strong>{money(compound)}</strong><p>累计投入 {money(n('cp') + n('cm') * n('cy') * 12)} · 估算增长 {money(compound - n('cp') - n('cm') * n('cy') * 12)}</p></div></article>

      <article className="tool-calc" id="real-return"><CardTitle id="real-return" /><div className="tool-fields"><Field id="rr" label="名义收益率" suffix="%" /><Field id="ri" label="通胀率" suffix="%" /></div><div className="tool-result green"><span>实际购买力收益率</span><strong>{percent(realReturn)}</strong><p>使用精确 Fisher 关系，而非简单相减。</p></div></article>

      <article className="tool-calc" id="cagr"><CardTitle id="cagr" /><div className="tool-fields"><Field id="cs" label="期初金额" suffix="元" /><Field id="ce" label="期末金额" suffix="元" /><Field id="cyears" label="经过年数" suffix="年" /></div><div className="tool-result"><span>复合年化增长率</span><strong>{percent(cagr)}</strong><p>它平滑了中间路径，不代表每一年都获得相同收益。</p></div></article>

      <article className="tool-calc" id="loan"><CardTitle id="loan" /><div className="tool-fields"><Field id="lp" label="贷款本金" suffix="元" /><Field id="lr" label="年利率" suffix="%" /><Field id="ly" label="贷款期限" suffix="年" /></div><div className="tool-result coral"><span>等额本息月供</span><strong>{money(monthlyLoan)}</strong><p>总利息约 {money(totalLoanInterest)} · 总还款约 {money(monthlyLoan * loanMonths)}</p></div></article>

      <article className="tool-calc" id="early-repay"><CardTitle id="early-repay" /><div className="tool-fields"><Field id="ep" label="可提前还款金额" suffix="元" /><Field id="er" label="贷款年利率" suffix="%" /><Field id="eir" label="替代投资收益率" suffix="%" /><Field id="ey" label="比较年数" suffix="年" /></div><div className="tool-result"><span>{investGain > repaySaving ? '替代投资的估算增长更高' : '提前还贷的确定性节省更高'}</span><strong>{money(Math.abs(investGain - repaySaving))}</strong><p>还贷节省约 {money(repaySaving)}；投资增长约 {money(investGain)}。需另计税费、风险、违约金与流动性。</p></div></article>

      <article className="tool-calc" id="saving-goal"><CardTitle id="saving-goal" /><div className="tool-fields"><Field id="sg" label="目标金额" suffix="元" /><Field id="sc" label="已有资金" suffix="元" /><Field id="sr" label="年收益率" suffix="%" /><Field id="sy" label="目标年数" suffix="年" /></div><div className="tool-result green"><span>每月需要投入</span><strong>{money(monthlyGoal)}</strong><p>按月末投入估算。收益率越不确定，越应预留安全余量。</p></div></article>

      <article className="tool-calc" id="emergency"><CardTitle id="emergency" /><div className="tool-fields"><Field id="em" label="每月必要支出" suffix="元" /><Field id="es" label="收入波动等级 0—4" suffix="级" /><Field id="ed" label="家庭责任人数" suffix="人" /></div><div className="tool-result"><span>建议安全垫 · {emergencyMonths} 个月</span><strong>{money(emergencyTarget)}</strong><p>这是规划起点；保险、双收入家庭与可迅速削减的支出会改变需求。</p></div></article>

      <article className="tool-calc wide" id="retirement"><CardTitle id="retirement" /><div className="tool-fields six"><Field id="ra" label="当前年龄" suffix="岁" /><Field id="rt" label="退休年龄" suffix="岁" /><Field id="re" label="当前月支出" suffix="元" /><Field id="rinfl" label="长期通胀" suffix="%" /><Field id="rexist" label="已有养老资金" suffix="元" /><Field id="rret" label="积累期收益率" suffix="%" /><Field id="rw" label="计划提取率" suffix="%" /></div><div className="tool-result coral"><span>退休目标约 {money(retirementTarget)} · 缺口 {money(retirementGap)}</span><strong>每月需积累 {money(retirementMonthly)}</strong><p>{retirementYears} 年后月支出约 {money(retirementExpense)}。提取率只是规划假设，不是安全保证。</p></div></article>

      <article className="tool-calc wide" id="dcf"><CardTitle id="dcf" /><div className="tool-fields six"><Field id="dfcf" label="当前自由现金流" suffix="元" /><Field id="dg" label="预测期增长" suffix="%" /><Field id="dr" label="折现率" suffix="%" /><Field id="dy" label="预测年数" suffix="年" /><Field id="dtg" label="永续增长率" suffix="%" /><Field id="dcash" label="现金" suffix="元" /><Field id="ddebt" label="有息负债" suffix="元" /></div><div className="tool-result green"><span>简化股权价值</span><strong>{money(equityValue)}</strong><p>折现率必须高于永续增长率。建议改变增长与折现率做情景分析。</p></div></article>

      <article className="tool-calc" id="bond"><CardTitle id="bond" /><div className="tool-fields"><Field id="bf" label="债券面值" suffix="元" /><Field id="bc" label="年票息率" suffix="%" /><Field id="bret" label="到期收益率" suffix="%" /><Field id="by" label="剩余期限" suffix="年" /></div><div className="tool-result"><span>理论价格</span><strong>{money(bondPrice)}</strong><p>{bondPrice > n('bf') ? '收益率低于票息率，债券呈溢价。' : bondPrice < n('bf') ? '收益率高于票息率，债券呈折价。' : '收益率接近票息率，价格接近面值。'}</p></div></article>

      <article className="tool-calc" id="position"><CardTitle id="position" /><div className="tool-fields"><Field id="pp" label="组合总资产" suffix="元" /><Field id="pr" label="单笔可承受损失" suffix="%" /><Field id="ps" label="止损距离" suffix="%" /><Field id="pprice" label="每单位价格" suffix="元" /></div><div className="tool-result coral"><span>最大仓位金额</span><strong>{money(positionValue)}</strong><p>约 {Number.isFinite(positionShares) ? positionShares.toLocaleString('zh-CN') : '—'} 单位 · 若跳空或流动性不足，实际损失可能超过设定值。</p></div></article>

      <article className="tool-calc" id="fee-impact"><CardTitle id="fee-impact" /><div className="tool-fields"><Field id="fi" label="初始本金" suffix="元" /><Field id="fa" label="每年新增" suffix="元" /><Field id="fr" label="费用前收益率" suffix="%" /><Field id="fy" label="投资年数" suffix="年" /><Field id="f1" label="低费用率" suffix="%" /><Field id="f2" label="高费用率" suffix="%" /></div><div className="tool-result"><span>长期费用差异</span><strong>{money(lowFee - highFee)}</strong><p>低费用终值 {money(lowFee)}；高费用终值 {money(highFee)}。未计税费与跟踪误差。</p></div></article>
    </section></ToolContext.Provider>
  );
}

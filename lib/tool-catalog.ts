export const toolCatalog = [
  { id: 'compound', title: '复利计算器', category: '积累', description: '测算本金、定投与复利终值。' },
  { id: 'real-return', title: '实际收益率', category: '回报', description: '扣除通胀后的购买力增长。' },
  { id: 'cagr', title: '年化增长率', category: '回报', description: '把起止金额换算为复合年化增长。' },
  { id: 'loan', title: '贷款月供', category: '负债', description: '等额本息月供、总利息与总还款。' },
  { id: 'early-repay', title: '提前还贷比较', category: '负债', description: '按剩余本金与期限重算摊还现金流，并比较资金替代用途。' },
  { id: 'saving-goal', title: '储蓄目标', category: '规划', description: '反推达到目标所需的每月投入。' },
  { id: 'emergency', title: '应急金测算', category: '规划', description: '用必要支出、自定覆盖期与已知额外风险计算储备缺口。' },
  { id: 'retirement', title: '退休资金缺口', category: '规划', description: '按通胀和提取率估算养老目标。' },
  { id: 'dcf', title: '简化 DCF 估值', category: '估值', description: '用现金流、增长与折现率估算价值。' },
  { id: 'bond', title: '债券价格', category: '固定收益', description: '根据票息、期限与到期收益率估算价格。' },
  { id: 'position', title: '仓位风险控制', category: '风险', description: '根据可承受损失反推最大仓位。' },
  { id: 'fee-impact', title: '费用侵蚀', category: '成本', description: '查看长期费用差异如何被复利放大。' },
] as const;

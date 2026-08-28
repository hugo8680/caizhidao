import { financialStatementsDepth } from './knowledge-depth/financial-statements';
import { globalDerivativesDepth } from './knowledge-depth/global-derivatives';
import { investmentBasicsDepth } from './knowledge-depth/investment-basics';
import { marketProductsDepth } from './knowledge-depth/market-products';
import { macroeconomicsDepth } from './knowledge-depth/macroeconomics';
import { personalFinanceDepth } from './knowledge-depth/personal-finance';
import { portfolioRiskDepth } from './knowledge-depth/portfolio-risk';
import type { KnowledgeDepthMap } from './knowledge-depth/types';
import { valuationDepth } from './knowledge-depth/valuation';

export const knowledgeArticleDepth: KnowledgeDepthMap = {
  ...financialStatementsDepth,
  ...globalDerivativesDepth,
  ...personalFinanceDepth,
  ...portfolioRiskDepth,
  ...investmentBasicsDepth,
  ...marketProductsDepth,
  ...macroeconomicsDepth,
  ...valuationDepth,
};

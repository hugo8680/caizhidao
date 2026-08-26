import { financeFoundationLessons } from './course-content/finance-foundations';
import { investmentProductLessons } from './course-content/investment-products';
import { personalFinanceLessons } from './course-content/personal-finance';
import type { Course, PlannedCourse } from './course-types';

export type { Course, CourseLesson, PlannedCourse } from './course-types';

export const courses: Course[] = [
  {
    slug: 'finance-foundations',
    title: '金融通识入门',
    en: 'Finance Foundations',
    level: '入门',
    category: '金融基础',
    description: '从货币、时间价值、通胀、利率、风险和回报开始，建立分析任何金融决策都能复用的基础框架。',
    audience: '没有系统学过金融，希望先建立准确概念与判断顺序的读者。',
    prerequisite: '无专业前置要求；具备基础百分比和四则运算即可。',
    method: '按顺序阅读。每课先理解概念与机制，再完成数值案例、误区辨析和三道带答案练习。',
    outcomes: ['把不同时间点的现金流放到同一尺度比较', '区分名义收益、实际购买力和完整总回报', '从目标、期限、风险与成本出发分析金融选择'],
    lessons: financeFoundationLessons,
  },
  {
    slug: 'personal-finance',
    title: '个人财务规划',
    en: 'Personal Financial Planning',
    level: '入门',
    category: '个人理财',
    description: '把目标、现金流、应急金、债务、保障、住房与养老放进同一套可以长期执行和复盘的家庭财务系统。',
    audience: '希望整理个人或家庭财务，而不是从单一理财产品开始的人。',
    prerequisite: '建议先完成《金融通识入门》，至少应理解时间价值、实际收益和风险能力。',
    method: '准备近三个月流水和主要账户余额，边学边完成自己的资产负债表、预算、保障缺口与年度复盘。',
    outcomes: ['建立个人资产负债表与可持续预算', '确定应急金、偿债和保险保障的先后顺序', '对住房与养老目标进行多情景规划'],
    lessons: personalFinanceLessons,
  },
  {
    slug: 'investment-products',
    title: '投资产品全景',
    en: 'Investment Products',
    level: '入门',
    category: '投资工具',
    description: '逐一拆解现金、存款、债券、股票、基金、ETF 和实物资产的法律关系、收益来源、费用与风险边界。',
    audience: '准备接触投资产品，或已经购买产品但难以解释底层机制的读者。',
    prerequisite: '建议先完成《金融通识入门》；涉及个人资金安排时，建议同时完成《个人财务规划》。',
    method: '不做产品推荐。每课用同一套“主体—资产—现金流—费用—退出—最坏结果”框架进行拆解。',
    outcomes: ['辨认常见投资产品的法律性质与收益来源', '正确阅读利率、净值、收益率与折溢价', '独立完成产品尽调并识别高风险销售与骗局'],
    lessons: investmentProductLessons,
  },
];

export const plannedCourses: PlannedCourse[] = [
  {
    slug: 'financial-statements', title: '财务报表阅读', en: 'Reading Financial Statements', level: '进阶', category: '财务分析',
    description: '计划围绕三张报表勾稽、收入确认、资产质量、偿债能力和现金流质量建立完整阅读方法。',
    statusNote: '正在进行内容研究与案例校验，尚未开放。',
  },
  {
    slug: 'corporate-valuation', title: '公司金融与估值', en: 'Corporate Finance & Valuation', level: '专业', category: '公司金融',
    description: '计划系统讲解资本预算、资本成本、自由现金流、DCF 与相对估值，并明确模型假设和失效条件。',
    statusNote: '将在基础课程完成并经过内容审核后编写。',
  },
  {
    slug: 'macro-economy', title: '宏观经济与政策', en: 'Macroeconomics & Policy', level: '进阶', category: '宏观经济',
    description: '计划从国民账户、通胀、就业和政策传导出发，训练区分数据事实、因果解释与市场预期。',
    statusNote: '正在整理数据口径与政策资料，尚未开放。',
  },
  {
    slug: 'portfolio-management', title: '资产配置与组合管理', en: 'Portfolio Management', level: '进阶', category: '组合管理',
    description: '计划覆盖投资政策书、风险预算、相关性、战略配置、再平衡、行为偏差和业绩归因。',
    statusNote: '将在投资产品课程完成验收后继续编写。',
  },
  {
    slug: 'global-finance-risk', title: '全球金融与风险', en: 'Global Finance & Risk', level: '专业', category: '全球市场',
    description: '计划讲解收益率曲线、汇率、衍生品、杠杆、流动性传染、监管与跨境风险。',
    statusNote: '属于后续专业课程，当前不提供虚假课时或时长。',
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getPlannedCourse(slug: string) {
  return plannedCourses.find((course) => course.slug === slug);
}

export function getLesson(course: Course, lessonSlug: string) {
  return course.lessons.find((lesson) => lesson.slug === lessonSlug);
}

export function getCourseMinutes(course: Course) {
  return course.lessons.reduce((total, lesson) => total + lesson.minutes, 0);
}

export function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) return `${remainder} 分钟`;
  return remainder === 0 ? `${hours} 小时` : `${hours} 小时 ${remainder} 分钟`;
}

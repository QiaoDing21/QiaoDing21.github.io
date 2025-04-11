import { useState, useEffect } from "react";

/**
 * 简单的翻译钩子函数
 * @param {Object} translations - 翻译键值对对象
 * @param {string} defaultLocale - 默认语言
 * @returns {Object} - 翻译函数和当前语言
 */
export function useTranslation(translations = {}, defaultLocale = 'zh-CN') {
  const [locale, setLocale] = useState(defaultLocale);
  
  // 从本地存储加载语言设置
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);
  
  // 保存语言设置到本地存储
  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };
  
  // 翻译函数
  const t = (key, params = {}) => {
    // 获取当前语言的翻译
    const translation = translations[locale]?.[key] || key;
    
    // 替换参数
    if (Object.keys(params).length === 0) {
      return translation;
    }
    
    return Object.entries(params).reduce(
      (acc, [paramKey, paramValue]) => 
        acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue),
      translation
    );
  };
  
  return { t, locale, changeLocale };
}

/**
 * 格式化日期的辅助函数
 * @param {Date} date - 日期对象
 * @param {string} locale - 语言设置
 * @returns {string} - 格式化后的日期字符串
 */
export function formatDate(date, locale = 'zh-CN') {
  if (!date) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(date).toLocaleDateString(locale, options);
}

/**
 * 格式化数字的辅助函数
 * @param {number} number - 要格式化的数字
 * @param {string} locale - 语言设置
 * @returns {string} - 格式化后的数字字符串
 */
export function formatNumber(number, locale = 'zh-CN') {
  return new Intl.NumberFormat(locale).format(number);
}

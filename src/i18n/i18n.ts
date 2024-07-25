// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend) // 使用 HttpBackend 加载翻译文件
    .use(LanguageDetector) // 自动检测浏览器语言
    .use(initReactI18next) // 初始化 react-i18next
    .init({
        fallbackLng: 'en', // 默认语言
        debug: false,
        backend: {
        loadPath: '/locales/{{lng}}/translation.json' // 设置加载 JSON 文件的路径
        },
        interpolation: {
        escapeValue: false, // 不转义值
        },
        react: {
        useSuspense: false, // 关闭 Suspense 功能
        },
});

export default i18n;

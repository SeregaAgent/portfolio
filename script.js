/**
 * Visitor Counter
 * Использует несколько fallback API для надёжности
 */

(function() {
    'use strict';

    const counterElement = document.getElementById('visitor-count');
    const STORAGE_KEY = 'portfolio_visit_counted';
    const NAMESPACE = 'ramzil-portfolio';
    const KEY = 'visits';
    const API_KEY= 'dev';
    /**
     * Попытка использовать CountAPI.xyz
     */
    async function tryCountAPI() {
        const response = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
        if (!response.ok) throw new Error('CountAPI failed');
        const data = await response.json();
        return data.value;
    }

    /**
     * Fallback: использование localStorage для локального счётчика
     * (работает только для одного пользователя, но лучше чем ничего)
     */
    function getLocalCount() {
        const stored = localStorage.getItem('portfolio_visitor_count');
        let count = stored ? parseInt(stored, 10) : 0;
        
        // Инкрементируем только раз за сессию
        if (!sessionStorage.getItem(STORAGE_KEY)) {
            count++;
            localStorage.setItem('portfolio_visitor_count', count.toString());
            sessionStorage.setItem(STORAGE_KEY, 'true');
        }
        
        return count;
    }

    /**
     * Fallback: API.Counterapi.dev (альтернативный счётчик)
     */
    async function tryCounterAPIDev() {
        const response = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`);
        if (!response.ok) throw new Error('CounterAPI.dev failed');
        const data = await response.json();
        return data.count;
    }

    /**
     * Основная функция обновления счётчика
     */
    async function updateVisitorCount() {
        try {
            // Пробуем CountAPI
            const count = await tryCountAPI();
            displayCount(count);
        } catch (e1) {
            try {
                // Fallback на counterapi.dev
                const count = await tryCounterAPIDev();
                displayCount(count);
            } catch (e2) {
                // Последний fallback — локальный счётчик
                console.warn('External counter APIs unavailable, using local storage');
                const count = getLocalCount();
                displayCount(count);
            }
        }
    }

    /**
     * Отображение числа с анимацией
     */
    function displayCount(count) {
        if (typeof count !== 'number' || isNaN(count)) {
            counterElement.textContent = '—';
            return;
        }

        // Анимация появления числа
        counterElement.style.opacity = '0';
        counterElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            counterElement.textContent = count.toLocaleString('ru-RU');
            counterElement.style.transition = 'all 0.3s ease';
            counterElement.style.opacity = '1';
            counterElement.style.transform = 'translateY(0)';
        }, 100);
    }

    // Запускаем при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateVisitorCount);
    } else {
        updateVisitorCount();
    }
})();

const RUB_TO_USD_RATE = 80; // 80 рублей = 1 доллар

/**
 * Конвертирует сумму в рублях в доллары
 * @param rubValue - строка с суммой в рублях (например, "114-219 million RUB" или "23.66 million RUB/month")
 * @returns строка с суммой в долларах
 */
export function convertRUBToUSD(rubValue: string): string {
    // Если строка не содержит RUB или руб, возвращаем как есть
    if (!rubValue.includes('RUB') && !rubValue.includes('руб')) {
        return rubValue;
    }

    // Сохраняем префиксы (from, ~, и т.д.)
    const prefixMatch = rubValue.match(/^(from|~|≈|от|около)\s*/i);
    const prefix = prefixMatch ? prefixMatch[0] : '';
    let result = rubValue.replace(/^(from|~|≈|от|около)\s*/i, '');

    // Сначала обрабатываем комбинации "K - million" (например, "526K - 1.05 million")
    const combinedPattern = /([\d.]+)\s*K\s*-\s*([\d.]+)\s*million/gi;
    result = result.replace(combinedPattern, (match, kValue, millionValue) => {
        const kNum = parseFloat(kValue.trim()) * 1000; // конвертируем K в единицы
        const millionNum = parseFloat(millionValue.trim()) * 1000000; // конвертируем million в единицы
        const kUSD = kNum / RUB_TO_USD_RATE;
        const millionUSD = millionNum / RUB_TO_USD_RATE;
        
        // Форматируем оба значения
        const kFormatted = kUSD < 1 ? `${(kUSD * 1000).toFixed(0)}K` : `${kUSD.toFixed(2)} million`;
        const millionFormatted = millionUSD < 1 ? `${(millionUSD * 1000).toFixed(0)}K` : `${millionUSD.toFixed(2)} million`;
        
        return `${kFormatted} - ${millionFormatted}`;
    });

    // Затем обрабатываем миллионы
    const millionPattern = /([\d.]+(?:\s*-\s*[\d.]+)?)\s*million/gi;
    result = result.replace(millionPattern, (match, numbers) => {
        if (numbers.includes('-')) {
            const [min, max] = numbers.split('-').map((s: string) => parseFloat(s.trim()));
            const minUSD = min / RUB_TO_USD_RATE;
            const maxUSD = max / RUB_TO_USD_RATE;
            
            // Если оба значения меньше 1, показываем в тысячах
            if (minUSD < 1 && maxUSD < 1) {
                return `${(minUSD * 1000).toFixed(0)}K-${(maxUSD * 1000).toFixed(0)}K`;
            } else if (minUSD < 1) {
                return `${(minUSD * 1000).toFixed(0)}K-${maxUSD.toFixed(2)} million`;
            } else {
                return `${minUSD.toFixed(2)}-${maxUSD.toFixed(2)} million`;
            }
        } else {
            const num = parseFloat(numbers.trim());
            const usd = num / RUB_TO_USD_RATE;
            
            // Если меньше 1 миллиона, показываем в тысячах
            if (usd < 1) {
                return `${(usd * 1000).toFixed(0)}K`;
            } else {
                return `${usd.toFixed(2)} million`;
            }
        }
    });

    // Затем обрабатываем тысячи (K) отдельно
    const thousandPattern = /([\d.]+)\s*K/gi;
    result = result.replace(thousandPattern, (match, number) => {
        const num = parseFloat(number.trim()) * 1000; // конвертируем K в единицы
        const usd = num / RUB_TO_USD_RATE;
        // Если результат меньше 1 миллиона, показываем в тысячах
        if (usd < 1) {
            return `${(usd * 1000).toFixed(0)}K`;
        } else {
            return `${usd.toFixed(2)} million`;
        }
    });

    // Обрабатываем "тыс" (тысячи на русском)
    const tysPattern = /([\d.]+)\s*тыс/gi;
    result = result.replace(tysPattern, (match, number) => {
        const num = parseFloat(number.trim()) * 1000; // конвертируем тысячи в единицы
        const usd = (num / RUB_TO_USD_RATE).toFixed(2);
        if (num / RUB_TO_USD_RATE < 1) {
            return `${(num / RUB_TO_USD_RATE * 1000).toFixed(0)}K`;
        }
        return `${usd} million`;
    });

    // Заменяем валюту
    result = result
        .replace(/RUB/gi, 'USD')
        .replace(/руб/gi, 'USD')
        .replace(/RUB\/month/gi, 'USD/month')
        .replace(/руб\/мес/gi, 'USD/month');

    // Убираем лишние пробелы
    result = result.replace(/\s+/g, ' ').trim();

    // Возвращаем с префиксом, если он был
    return prefix + result;
}

/**
 * Форматирует число в миллионах для отображения
 */
export function formatMillions(value: number): string {
    if (value >= 1) {
        return value.toFixed(2);
    } else {
        return (value * 1000).toFixed(0);
    }
}


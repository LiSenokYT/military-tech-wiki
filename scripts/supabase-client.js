// Настройка Supabase клиента
// ЗАМЕНИТЕ эти значения на свои из панели Supabase
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

// Инициализация клиента Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Проверка подключения
async function testConnection() {
    try {
        const { data, error } = await supabase.from('vehicle_types').select('*').limit(1);
        if (error) throw error;
        console.log('Supabase подключен успешно');
        return true;
    } catch (error) {
        console.error('Ошибка подключения к Supabase:', error);
        return false;
    }
}

// Экспортируем клиент для использования в других модулях
export { supabase, testConnection };

// Тестируем подключение при загрузке
document.addEventListener('DOMContentLoaded', async () => {
    const connected = await testConnection();
    if (!connected) {
        console.warn('Не удалось подключиться к Supabase. Проверьте настройки.');
    }
});

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Указываем базовый путь для корректной работы на GitHub Pages.
  // Если репозиторий называется 'tco-calc', то base должен быть '/tco-calc/'.
  // Замените на имя вашего репозитория или оставьте '/', если деплоите на кастомный домен.
  base: './', 
});

# Портфолио

Минималистичный сайт-портфолио на HTML + CSS + JS в Docker контейнере.

## 🎨 Особенности

- Тёмный минималистичный дизайн
- Адаптивная вёрстка
- Иконки соцсетей (LinkedIn, X.com, Telegram, GitHub)
- Счётчик посещений с fallback-механизмом
- Контейнеризация через Docker (nginx:alpine)

## 📁 Структура

```
portfolio/
├── index.html      # Основная страница
├── style.css       # Стили
├── script.js       # Счётчик посещений
├── Dockerfile      # Конфиг Docker
└── README.md       # Этот файл
```

## 🚀 Локальный запуск

### Без Docker

Просто открой `index.html` в браузере или используй любой локальный сервер:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```

### С Docker

```bash
# Сборка образа
docker build -t portfolio .

# Запуск контейнера
docker run -d -p 8080:80 --name portfolio portfolio

# Открой http://localhost:8080
```

**Управление контейнером:**

```bash
# Остановить
docker stop portfolio

# Запустить снова
docker start portfolio

# Удалить
docker rm -f portfolio
```

## 📦 Публикация в GitHub Container Registry (GHCR)

### 1. Создай Personal Access Token

1. Перейди в [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Нажми "Generate new token (classic)"
3. Выбери scope: `write:packages`, `read:packages`, `delete:packages`
4. Сохрани токен

### 2. Авторизуйся в GHCR

```bash
# Замени YOUR_GITHUB_USERNAME и YOUR_TOKEN
echo "YOUR_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

### 3. Собери и запуши образ

```bash
# Замени YOUR_GITHUB_USERNAME на свой логин
export GITHUB_USER=YOUR_GITHUB_USERNAME

# Сборка с тегом для GHCR
docker build -t ghcr.io/$GITHUB_USER/portfolio:latest .

# Пуш в реестр
docker push ghcr.io/$GITHUB_USER/portfolio:latest

# Можно добавить версионный тег
docker tag ghcr.io/$GITHUB_USER/portfolio:latest ghcr.io/$GITHUB_USER/portfolio:v1.0.0
docker push ghcr.io/$GITHUB_USER/portfolio:v1.0.0
```

### 4. Сделай пакет публичным (опционально)

1. Перейди на `https://github.com/users/YOUR_GITHUB_USERNAME/packages/container/portfolio/settings`
2. В разделе "Danger Zone" нажми "Change visibility"
3. Выбери "Public"

### 5. Использование образа

```bash
# Кто угодно может скачать и запустить (если публичный)
docker pull ghcr.io/YOUR_GITHUB_USERNAME/portfolio:latest
docker run -d -p 8080:80 ghcr.io/YOUR_GITHUB_USERNAME/portfolio:latest
```

## 🔧 Кастомизация

### Изменить ссылки на соцсети

Открой `index.html` и замени `href` в блоке `.social-links`:

```html
<a href="https://linkedin.com/in/YOUR_PROFILE" ...>
<a href="https://x.com/YOUR_HANDLE" ...>
<a href="https://t.me/YOUR_USERNAME" ...>
<a href="https://github.com/YOUR_USERNAME" ...>
```

### Изменить цвета

В `style.css` в блоке `:root`:

```css
:root {
    --bg-primary: #0a0a0b;      /* Основной фон */
    --accent: #6366f1;          /* Акцентный цвет */
    /* ... */
}
```

## 📝 Лицензия

MIT — делай что хочешь.

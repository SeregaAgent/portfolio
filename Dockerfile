FROM nginx:alpine

# Копируем статические файлы
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Открываем порт 80
EXPOSE 80

# nginx запускается автоматически
CMD ["nginx", "-g", "daemon off;"]

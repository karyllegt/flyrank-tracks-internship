FROM node:22-alpine AS runtime
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY assignments ./assignments
ENV NODE_ENV=production PORT=8000
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s CMD node -e "fetch('http://127.0.0.1:8000/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "src/server.js"]

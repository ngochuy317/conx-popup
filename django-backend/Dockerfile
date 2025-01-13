FROM python:3.12
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY . /code
WORKDIR /code

RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# # Install Node.js and npm
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# # FROM node:18-alpine AS frontend-build
# RUN apt-get install -y nodejs

# # Install npm dependencies
# COPY package.json package-lock.json* ./
# RUN npm install

# # Copy the rest of the application code
# COPY . /code
# WORKDIR /code

# # Build TailwindCSS styles
# RUN npm run tailwind:build


ENTRYPOINT ["./entrypoint.sh"]
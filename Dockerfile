FROM python:3.13.0-slim-bookworm AS docsbuild
ENV PYTHONUNBUFFERED 1

# Install mkdocs-material requirements
COPY / /docs

RUN pip install -r /docs/requirements.txt

WORKDIR /docs/

CMD ["mkdocs","serve","--dev-addr","0.0.0.0:8000"]

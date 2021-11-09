FROM python:3.8.6-slim-buster AS docsbuild
ENV PYTHONUNBUFFERED 1

# Install mkdocs-material requirements
COPY / /docs

RUN pip install -r /docs/requirements.txt

WORKDIR /docs/

# Install PDF Dependencies for Mkdocs
RUN apt-get update && apt-get install -y libcairo2-dev libpangocairo-1.0-0

# Prevent Development PDF to render unnecessary
RUN ENABLE_PDF_EXPORT=0 

CMD ["mkdocs","serve","--dev-addr","0.0.0.0:8000"]

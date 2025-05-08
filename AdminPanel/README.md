## Deploy on Azure:

To deploy this project run

```bash
az login
az acr login --name=sderp
docker build -t genai-admin .
docker tag genai-admin sderp.azurecr.io/genai-admin
docker push sderp.azurecr.io/genai-admin
```
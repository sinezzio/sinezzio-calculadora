# Sinezzio Commerce — Calculadora de marketplaces

Aplicação estática em português, sem dependências, para Shopee, Amazon e Mercado Livre. Abra `index.html` ou publique a raiz no GitHub Pages. Os dados ficam no localStorage do navegador; cada dispositivo tem seu próprio cenário. A primeira carga do site requer internet; o HTML baixado também pode ser usado localmente.

## Funcionalidades preservadas

Precificação por marketplace, comissão, logística, descontos próprios, impostos variáveis, rateio do DAS e despesas mensais, publicidade fixa e ACOS, reserva para perdas, lucro, margem, repasse, ROI, ROAS, preço mínimo e preço para margem-alvo. Presets, cópia do resultado, CSV, restauração e salvamento local.

## Testes

Execute `node tests/calculator.test.cjs` e `node tests/interface.test.cjs`. Para a comparação com o HTML original, use a variável ORIGINAL_HTML apontando para sua cópia. Não exige instalação de pacotes.

## Publicação

Repositório sugerido: `sinezzio-calculadora`. Na configuração Pages do repositório, selecione publicação da branch `main`, pasta `/ (root)`. O arquivo `.nojekyll` está incluído. Não existem chaves, servidor nem banco de dados. HTTPS é fornecido pelo GitHub Pages após a publicação.

## Premissas

As tarifas da base foram preservadas e continuam sendo estimativas que precisam ser conferidas nos painéis oficiais. A calculadora não consulta APIs dos marketplaces. Consulte AUDITORIA.md para as correções técnicas e limitações.

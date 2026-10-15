# Sinezzio Commerce — Calculadora financeira

https://sinezzio.github.io/sinezzio-calculadora/

HTML/JavaScript estático, sem dependências externas. Dados no navegador, sem sincronização. Nenhum custo é consultado automaticamente na conta dos marketplaces.

## Uso

1. Escolha produto e marketplace. Ajuste custo, embalagem, descontos, Ads e tributos.
2. Confira a base da comissão e confirme os custos na seção da plataforma. Zero precisa ser informado e confirmado; vazio não é zero.
3. ML: informe comissão efetiva do tipo de anúncio, tarifa fixa e frete líquido do vendedor. A ferramenta não presume 11% nem acrescenta 5 pontos no Premium.
4. Para tarifas manuais, informe a faixa de preços em que a cotação é válida. Sem faixa, só o preço atual tem resultado; fora da cotação a simulação fica incompleta.
5. Metas gerenciais exibem preços sugeridos junto dos campos. Use Aplicar para mudar o preço e confira novamente as condições do anúncio.
6. Queima de Estoque compara o piso variável (inclui produto e Ads) com o piso gerencial (inclui provisões e fixos selecionados).
7. Exporte PDF/CSV ou copie os resultados. Pendências também são exportadas; lucro desconhecido não aparece como lucro válido.

## Indicadores

- Repasse: receita após deduções da plataforma. Frete de transportadora própria não é dedução do marketplace.
- Operacional: após custos variáveis, antes de Ads, provisões e fixos.
- Após Ads: operacional menos publicidade.
- Gerencial: após Ads menos provisão e rateio opcional.
- Margem gerencial: gerencial dividido pela receita após desconto da loja, mais frete efetivamente creditado ao vendedor.
- ROI gerencial: gerencial dividido por produto, aquisição, operação própria e Ads.
- ROAS: receita do produto (sem frete recebido) dividida pelo teto total de Ads antes de consumir lucro gerencial.

O DAS do MEI é mensal. Não é percentual por venda. Resultado gerencial negativo não implica automaticamente perda de caixa em cada venda.

## Tarifas e limites

Amazon: tabela pública consultada em 15/10/2026; confirme categoria, elegibilidade, divisor cúbico, promoções e custos efetivos. FBA usa tarifa manual mais adicionais; envio próprio é separado.

Shopee: a tabela CNPJ anterior é referência não revalidada nesta auditoria, pois o conteúdo oficial não carregou integralmente. Há modo manual para a cotação efetiva. Pix informado é benefício ao comprador financiado pela plataforma, sem reduzir o repasse do vendedor nem criar receita adicional.

ML: custos dependem do anúncio, preço e logística. Insira os valores do painel; subsídios entram no frete líquido, uma única vez. Consulte AUDITORIA.md.

## Testes

`node tests/calculator.test.cjs`

`node tests/interface.test.cjs`

Os testes incluem quatro produtos, fronteiras de comissão, peso, Ads, metas, bloqueio de tarifas desconhecidas e migração segura. Cotações ML dos testes são dados sintéticos declarados; não são tarifas comerciais recomendadas.

## Publicação

GitHub Pages usa `main` e a pasta raiz; `.nojekyll` preservado. Arquivos: index.html e pdf-export.js. Abrir o HTML isolado sem o módulo PDF não permite exportar PDF.


Frete recebido no envio próprio/Flex tem campo separado; confirme sua incidência na base de comissão. Não inclua frete retido pela plataforma e não abata duas vezes o recebimento do custo de transporte. ACOS/provisão de perdas usam a receita do produto sem esse crédito.

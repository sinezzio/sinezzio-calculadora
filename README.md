# Sinezzio Commerce — Calculadora financeira

https://sinezzio.github.io/sinezzio-calculadora/

HTML/JavaScript estático, sem dependências externas. Dados no navegador, sem sincronização. Nenhum custo é consultado automaticamente na conta dos marketplaces.

## Uso

1. Automático é o padrão: escolha o produto e informe custo e margem (ou lucro em reais). O preço usado nos cálculos e todos os resultados atualizam juntos, sem Aplicar.
2. Ao mudar despesas, Ads, desconto, tributos, categoria ou logística, o preço é recalculado nas condições informadas. As despesas da loja são preservadas ao trocar os exemplos de produtos.
3. O preço atual fica separado para comparação. Para ofertas, selecione Manual; Queima de Estoque ativa esse modo e restaura o preço atual informado.
4. Taxas estimadas aparecem com aviso. Valores ausentes, dados inválidos e possíveis duplicidades continuam pendentes.
5. ML e demais tarifas manuais: informe comissão, tarifa e frete da conta e a faixa de preço em que a cotação é válida. O automático não extrapola a cotação. Sem faixa, apenas a simulação no preço informado é liberada.
6. Confira o resumo dos custos incluídos. Abra Ajustes da venda para alterar embalagem, anúncios, perdas e despesas mensais.
7. PDF, CSV e cópia levam o preço efetivamente usado, o modo de precificação, a meta e as pendências. Os botões Aplicar permanecem em Comparar outras metas para uso opcional no modo manual.

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


## Ferramentas de decisão — 23/10/2026

Abra **Analisar riscos e comparar simulações**, abaixo dos resultados:

- Custo máximo de compra por unidade para preservar a meta no preço simulado.
- Testes independentes de preço −5%, custo do produto +10% e Ads +R$5 por anúncio, recalculados pelo motor existente.
- Equilíbrio e projeção mensal na hipótese explícita de vender exclusivamente o produto simulado; kits completos e custos mensais contados uma única vez.
- Até 20 simulações nomeadas no navegador, com carregamento mediante confirmação e exportação JSON. Ao carregar, as confirmações de tarifas e embalagem são desmarcadas para nova conferência.
- Leitura de dados locais limitada aos campos conhecidos e tipos primitivos. Registros de simulações ilegíveis não são sobrescritos; a exportação preserva o conteúdo bruto para recuperação.

Os testes adicionais usam `node tests/decisions.test.cjs`. As ferramentas não estimam demanda, não alteram anúncios e não consultam contas. As tarifas comerciais anteriores continuam como referência e devem ser conferidas pelo usuário.

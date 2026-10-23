# Sinezzio Commerce — Calculadora financeira

https://sinezzio.github.io/sinezzio-calculadora/

HTML/JavaScript estático, com fonte Ubuntu e logo servidas no próprio projeto, sem dependências externas em tempo de execução. Dados no navegador, sem sincronização. Nenhum custo é consultado automaticamente na conta dos marketplaces.

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


## Revisão visual e financeira — 23/10/2026

Visual consolidado em um único tema claro, alinhado ao ERP: Ubuntu local (400/500/700), logo original proporcional, campos principais destacados, resultados positivos verdes e alertas distintos. O fluxo compacto da Shopee foi mantido.

A fórmula e a tabela de referência da Shopee não foram alteradas: os dois pedidos reais de R$ 99,90 continuam retornando R$ 69,91 de repasse e R$ 9,91 após custo de R$ 60, antes de despesas adicionais.

Correções: Centro-Oeste/Norte/Nordeste agora exigem cotação manual da logística Amazon; antes usavam indevidamente a matriz do interior Sul/Sudeste. Moedas informadas com mais de duas casas, fora dos limites numéricos, canal inválido e meta desconhecida não produzem resultado válido. Percentuais e rateios mantêm precisão interna; apenas a apresentação é arredondada.

Conferência comercial: https://venda.amazon.com.br/precos e https://venda.amazon.com.br/cresca/dba consultadas em 23/10/2026. Comissões exibidas e tarifas DBA abaixo de R$ 79 conferem com a referência. A matriz DBA acima de R$ 79 não foi integralmente revalidada: a página de detalhes direcionou a uma aplicação dinâmica. Continua identificada como estimativa de referência e exige conferência na conta. Mercado Livre permanece com cotação por anúncio; não foi introduzida uma taxa genérica.

Validação adicional: `node tests/revision-20261023.test.cjs`. Todos os arquivos: `node --test tests/*.test.cjs`. A fonte Ubuntu é distribuída com a licença em assets/ubuntu-LICENSE.txt. Nenhuma conta de marketplace é acessada.


## Acesso mobile e identidade dos canais — 23/10/2026

Campos monetários aceitam vírgula ou ponto decimal, inclusive `99,90`, `99.90` e `1.234,56`, com teclado decimal. Valores com frações de centavo continuam bloqueados. O HTML usa JavaScript compatível com ES2018; `hasOwn` e a montagem de objetos não exigem `Object.hasOwn` nem `Object.fromEntries`. A exportação PDF segue o mesmo alvo de compatibilidade.

Shopee, Amazon e Mercado Livre têm logos locais, cores de canal, seleção por toque e barra de canais acessível em telas estreitas. Resultados negativos permanecem vermelhos. Há mensagem inicial de recuperação se o JavaScript não iniciar; ela desaparece após a inicialização bem-sucedida. Os dados locais são preservados.

Para verificar layout, `tests/mobile-preview.html` abre o próprio aplicativo dentro de uma tela de 320, 390 ou 430 px. Isso testa os breakpoints e os controles, sem emular Safari/iOS. Não confirma acesso na rede ou no aparelho específico do usuário. O motivo exato da falha relatada no celular não foi identificado a partir da descrição disponível.

Regressão: `node --test tests/*.test.cjs`, incluindo inicialização e salvamento com APIs recentes ausentes, teclado com vírgula e verificação da Shopee. Os oito métodos financeiros principais foram comparados antes/depois como código normalizado e não mudaram.

Ativos: os símbolos Shopee/Amazon já utilizados no ERP foram reaproveitados para identificar os canais. A marca textual Mercado Livre vem de https://commons.wikimedia.org/wiki/File:Mercado_Livre_wordmark_(Portuguese_version).svg (arte atribuída ao Mercado Livre), servida localmente e sem scripts ou referências externas. As marcas identificam os canais simulados e não representam integração ou endosso.

# Auditoria financeira — revisão de 15/10/2026

Esta revisão substitui as premissas anteriores que divergirem abaixo. A arquitetura continua estática, no mesmo index.html. Não há conexão autenticada com contas dos marketplaces.

## Espremedor: R$ 12,60 reproduzidos

Com venda R$ 69,90, aquisição R$ 46,00, comissão R$ 18,48 e frete efetivo da loja R$ 27,00, o resultado é **−R$ 21,58**. O código não cobra o frete do comprador automaticamente.

A diferença até −R$ 34,18 é reproduzida exatamente com parâmetros que existiam nos padrões anteriores: embalagem R$ 3,00 + reserva de perdas de 2% (R$ 1,398) + DAS R$ 82,05 / 10 (R$ 8,205). Total adicional interno: R$ 12,603. Resultado interno: −R$ 34,183; apresentado: −R$ 34,18. Isso identifica uma configuração que explica o número; não é leitura dos dados locais do celular do usuário.

| Parcela exibida | Valor |
|---|---:|
| Venda | R$ 69,90 |
| Comissão percentual | −R$ 13,98 |
| Tarifa fixa | −R$ 4,50 |
| Produto | −R$ 46,00 |
| Frete efetivo da loja | −R$ 27,00 |
| Embalagem | −R$ 3,00 |
| Reserva de perdas | −R$ 1,40 |
| Rateio do DAS | −R$ 8,21 |
| Reconciliação de arredondamento da apresentação | +R$ 0,01 |
| **Resultado** | **−R$ 34,18** |

O ajuste de centavos não é receita nem despesa financeira: só reconcilia a soma das linhas arredondadas com o total arredondado. As contas internas preservam as casas do rateio e das provisões. A mesma lista de parcelas alimenta a tela, PDF, CSV e cópia, sem subtotais somados como despesas.

## Premissas atuais

- Shopee: tabela CNPJ fornecida pelo usuário para 01/10/2026 — 20% + R$ 4,50 até R$ 79,99; 14% + R$ 16 de R$ 80 a R$ 99,99; 14% + R$ 20 de R$ 100 a R$ 199,99; 14% + R$ 26 de R$ 200 a R$ 499,99. A regra especial anterior abaixo de R$ 9 não foi mantida, porque não consta da tabela solicitada. Acima de R$ 499,99, a referência fica bloqueada e exige cotação, sem extrapolação. Pix financiado pela plataforma não reduz o recebível nem é somado como receita.
- Frete Shopee: padrão R$ 0 de custo adicional da loja, editável. Nunca copiamos automaticamente o frete mostrado ao comprador. Trocar/limpar produto elimina frete e aquisição específicos do produto anterior; despesas gerais continuam salvas e discriminadas.
- MEI/SIMEI: padrão R$ 82,05 mensais, 10 unidades físicas/mês entre todas as lojas e rateio ativado. Não incide imposto percentual sobre a venda do MEI. DAS interno por unidade: R$ 8,205. Kit com 2 unidades recebe 2 parcelas. O rateio é gerencial, não dedução do marketplace nem saída de caixa a cada venda.
- Despesas mensais formam um único conjunto da empresa. Inclusive a mensalidade Amazon, quando devida e informada, é rateada pelo volume global; não reaparece como tarifa por item. Plano Individual tem R$ 2 por anúncio vendido e não adiciona mensalidade profissional. Na migração, ativa-se o rateio MEI solicitado; DAS e volume personalizados são preservados. Alterações futuras do usuário permanecem salvas.
- Amazon: comissões por categoria, mínimos e tarifas DBA conferidos na página oficial; cálculo pelo maior peso real/cubado do pacote. Região SP capital, outras capitais Sul/Sudeste, interior Sul/Sudeste e Centro-Oeste/Norte/Nordeste têm colunas próprias a partir de R$ 200. FBA, envio próprio e logística fora da referência exigem cotação; zero manual exige confirmação. Peso/categoria dos produtos predefinidos são parâmetros de simulação e devem ser conferidos na conta e no pacote real.
- Mercado Livre: disponível para simulação sem depender da situação da conta. Comissão da categoria/tipo, tarifa fixa e frete são cotados manualmente no anúncio; cotações só valem no preço ou intervalo declarado. A faixa genérica Clássico/Premium é informativa e nunca substitui tarifa específica no cálculo.

## Três preços

1. Mínimo operacional: cobre custos variáveis e Ads; exclui provisões e fixos mensais.
2. Mínimo com DAS e fixos: inclui reservas e o rateio global, mesmo se a visualização de rateio estiver desativada.
3. Aquecimento: inclui tudo acima e margem de segurança configurável, padrão 5% da receita efetiva. A margem/lucro desejados alternativos continuam nos ajustes.

Todos são estimativas condicionadas aos custos informados e ao escopo tarifário. Não há promessa de venda sem prejuízo. Um preço maior pode ser menos lucrativo quando cruza uma faixa. A busca percorre os intervalos das tarifas e testa centavos que podem ser viáveis; um limite contínuo com tolerância de arredondamento descarta apenas centavos impossíveis, sem assumir monotonicidade global.

## Conferência independente

Valores abaixo: embalagem, Ads, perdas, outros custos e frete extra zerados; DAS R$ 82,05 / 10; plano profissional Amazon isento. Não são cotações das contas. Testes em Python Decimal, com arredondamento HALF_UP e busca de cada centavo, geram os valores esperados antes da comparação com JavaScript.

| Produto | Canal | Venda | Comissão + fixa | DBA | Repasse | Operacional | Após DAS | Mín. operacional | Mín. com DAS | Aquecimento 5% |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Liquidificador Mondial | shopee | 119,00 | 36,66 | 0,00 | 82,34 | 27,34 | 19,14 | 74,37 | 92,10 | 97,79 |
| Liquidificador Mondial | amazon | 119,00 | 14,28 | 18,85 | 85,87 | 30,87 | 22,67 | 70,17 | 90,18 | 95,61 |
| Batedeira Mondial | shopee | 129,90 | 38,19 | 0,00 | 91,71 | 36,71 | 28,51 | 74,37 | 92,10 | 97,79 |
| Batedeira Mondial | amazon | 129,90 | 15,59 | 21,55 | 92,76 | 37,76 | 29,56 | 70,17 | 90,18 | 95,61 |
| Torneira gourmet | shopee | 169,90 | 43,79 | 0,00 | 126,11 | 41,11 | 32,91 | 122,09 | 131,64 | 139,77 |
| Torneira gourmet | amazon | 169,90 | 18,69 | 22,40 | 128,81 | 43,81 | 35,61 | 115,11 | 127,15 | 134,72 |
| Produto de teste | shopee | 99,90 | 29,99 | 0,00 | 69,91 | 9,91 | 1,71 | 88,37 | 97,92 | 108,89 |
| Produto de teste | amazon | 99,90 | 11,99 | 13,45 | 74,46 | 14,46 | 6,26 | 75,85 | 92,79 | 98,39 |
| Espremedor | shopee | 69,90 | 18,48 | 0,00 | 51,42 | 5,42 | -2,79 | 63,12 | 73,39 | 78,27 |
| Espremedor | amazon | 69,90 | 8,39 | 6,75 | 54,76 | 8,76 | 0,56 | 59,94 | 69,27 | 73,44 |

Na torneira Amazon, a categoria usada no teste é Ferramentas e Construção (11%), com peso tarifável de 2,5 kg: a R$ 169,90, comissão R$ 18,69 e DBA R$ 22,40; repasse R$ 128,81, operacional R$ 43,81, gerencial interno R$ 35,605 e apresentação R$ 35,61. Confirme a categoria do ASIN e as medidas reais antes de decidir.

O caso anterior de teste Shopee R$ 99,90 / custo R$ 60 / perdas 2% / DAS em 10 permanece: comissão R$ 29,99, repasse R$ 69,91, operacional R$ 9,91 e gerencial −R$ 0,293 (−R$ 0,29 exibidos), antes de outros custos.

Validações: 31 grupos de regressão + 8 grupos adicionais de auditoria; 10 cenários de produtos, 30 pisos independentes, fronteiras de tarifa, 24 combinações com busca exaustiva em centavos, 120 reconciliações completas, rateio único entre três lojas/kits, bloqueios por valores ausentes, duplicidade de Ads/frete e integração DOM com PDF/CSV/cópia e modos de preço. Integração também reproduz o espremedor e a alternância aquecimento/preço manual.

Execução reproduzível a partir do diretório do projeto:

```
python tests/manual-audit.py
node tests/calculator.test.cjs
node tests/audit.test.cjs
node tests/interface.test.cjs
```

## Fontes e limites da verificação

- MEI: https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/perguntas-frequentes — tabela 2026 consultada em 15/10/2026, R$ 82,05 para comércio/indústria.
- Amazon: https://venda.amazon.com.br/precos e https://venda.amazon.com.br/cresca/dba — páginas públicas consultadas em 15/10/2026. Incentivos e aplicação à conta requerem confirmação do vendedor.
- Shopee: https://seller.shopee.com.br/edu/article/26839 e artigo 18483 retornaram apenas estrutura da página na consulta. A tabela implementada nesta revisão é a fornecida explicitamente pelo usuário; não se afirma revalidação oficial de vigência.
- ML: https://developers.mercadolivre.com.br/pt_br/descricao-de-produtos/comissao-por-vender — documentação de cotação por contexto de anúncio/logística; página indisponível nesta consulta. Mantêm-se cotações informadas, sem taxas genéricas confirmadas nem tabela de envio inventada.

## Histórico de revisões anteriores

# Auditoria financeira — 15/10/2026

## Escopo e leitura

index.html integral do repositório sinezzio/sinezzio-calculadora revisado antes de editar. Mantidos HTML/JS estático, armazenamento local, presets e exportações. A vigência de tarifas depende de categoria, conta, logística e condições comerciais.

## Falhas identificadas

- Mercado Livre iniciava 11%, tarifa fixa e frete zero; só os inversores eram bloqueados. Lucro, margem, ROI, cenários e exportações ainda pareciam utilizáveis.
- Premium era Clássico + 5 pontos sem cotação específica. A categoria preenchia percentuais presumidos. Tarifa fixa era zerada automaticamente em ME2 e acima de R$79.
- Reserva de perdas era subtraída antes do indicador anterior a Ads, confundindo provisão com custo operacional.
- Resultado gerencial negativo era chamado apenas de prejuízo, sem distinguir recuperação dos custos variáveis.
- DBA tinha linha ausente em 9–10 kg e adicionais por kg presumidos. Elegibilidade de peso e dimensões não era validada antes das faixas baratas.
- Custos manuais de logística eram considerados aplicáveis a qualquer preço na busca de metas.
- Envio próprio Amazon era agrupado com FBA e subtraído do repasse da plataforma.
- Custos de Ads em valor fixo e ACOS eram somados sem confirmação de despesas distintas.
- Resultados sem preço/receita positivos podiam mostrar margem zero enganosa.

## Fontes oficiais consultadas

1. Amazon comissões, plano, parcelamento e FBA: https://venda.amazon.com.br/precos (acesso integral). Comissões específicas e mínimas por categoria; Individual R$2 por item; mensalidade profissional sujeita à promoção; parcelamento opcional por ASIN a partir de R$40. Custos FBA adicionais não podem ser omitidos.
2. Amazon DBA: https://venda.amazon.com.br/cresca/dba (acesso integral). A tabela pública tem linha de 9–10kg e adicionais por faixa de preço. A aplicação por origem, peso tarifável, embalagem, elegibilidade e promoções deve ser conferida no Seller Central. O divisor cúbico da base não foi revalidado nesta consulta: é parâmetro informado sujeito à confirmação.
3. Mercado Livre: https://developers.mercadolivre.com.br/pt_br/descricao-de-produtos/comissao-por-vender (conteúdo oficial indexado; abertura direta falhou). Atualização informada 03/09/2026: fixed_fee depende de logística, além de preço; parâmetros de logística/peso são relevantes. https://vendedores.mercadolivre.com.br/nota/como-funcionam-as-taxas-do-mercado-livre e https://www.mercadolivre.com.br/ajuda/870 não abriram integralmente. Portanto nenhuma tabela de comissão, frete ou tarifa fixa ML é presumida como confirmada. Usar cotação do anúncio.
4. Shopee: https://seller.shopee.com.br/edu/article/18483 e https://seller.shopee.com.br/edu/article/26839 (conteúdo não disponibilizado integralmente; consulta no navegador também não concluiu). Tabela CNPJ anteriormente fornecida preservada como referência não revalidada: confirmação explícita exigida. Pix financiado pela plataforma é tratado como benefício ao comprador, sem reduzir automaticamente a receita do vendedor nem criar receita adicional. Percentual informado manualmente e condicionado à confirmação da regra da conta.
5. MEI: https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/perguntas-frequentes/pagamento-da-contribuicao-mensal-carne-mensal/qual-o-valor-das-contribuicoes (conteúdo oficial indexado, atualizado 02/01/2026): comércio R$82,05/mês. Mantido rateio opcional. Não é alíquota por venda.

## Definições adotadas

Receita efetiva = preço anunciado menos desconto financiado pela loja. Repasse = receita menos deduções da plataforma; frete próprio não é dedução da plataforma. Operacional = receita menos plataforma, produto, frete próprio, embalagem, custos variáveis e tributos variáveis. Após Ads = operacional menos publicidade. Gerencial = após Ads menos provisão de perdas e rateio opcional de fixos. Margem gerencial = gerencial / receita efetiva. ROI gerencial usa como denominador produto + aquisição + operação própria + Ads. Valores calculados com precisão interna e apresentados em centavos; rateio e provisão são estimativas fracionárias.

## Confirmação e escopo

Tarifa desconhecida bloqueia lucro, margens, repasse, ROI, ROAS, metas e cenários, inclusive nas exportações. Informar zero é diferente de deixar vazio; zero só vale após confirmação. ML usa a comissão efetiva do tipo de anúncio, tarifa fixa e frete líquido realmente suportado. Custos variáveis de Full/Flex devem ser incluídos. Custos manuais têm faixa de preço confirmada: fora dela o cenário fica incompleto. Sem faixa, confirma-se apenas o preço atual e inversores ficam bloqueados. Nenhuma simulação representa promessa de lucro ou demanda.


## Validação executada

25 grupos matemáticos/estruturais passaram; inversores comparados com busca exaustiva de centavos em 24 configurações. Quatro produtos verificados na Shopee, Amazon e ML, com cotações ML sintéticas e explícitas. Integração em DOM simulado verificou migração, bloqueios em PDF/CSV/cópia, metas e aplicação, Queima, Ads, logística, presets e persistência. PDF gerado e páginas A4 inspecionadas após renderização.

Caso de referência sem embalagem/outros: preço R$99,90, custo R$60, comissão arredondada R$29,99, repasse R$69,91, operacional/após Ads R$9,91; provisão calculada R$1,998 e rateio R$8,205 levam a gerencial R$-0,293 (exibido -R$0,29). Com embalagem R$3, o gerencial é aproximadamente -R$3,29. As linhas aparecem separadas.

Tarifas manuais Shopee também têm escopo. Base de comissão antes/depois do desconto é configurável e precisa corresponder à regra conferida da conta. Tabelas DBA públicas substituem as extrapolações anteriores, incluindo 9–10kg e adicionais de R$3,05/R$3,50/R$4 conforme coluna.

Validação visual desktop e em celular físico deve ser distinguida: testes de CSS/estrutura não equivalem a um Safari real. Não se declara teste físico de iPhone quando o ambiente não o oferece.


Frete creditado: no envio próprio/Flex é possível registrar frete efetivamente recebido. A receita efetiva das margens inclui o crédito; a base da comissão tem opção explícita de incluir o frete conforme a regra conferida. ACOS e provisão incidem sobre o produto após desconto (sem esse frete), e ROAS usa a receita do produto. Frete recebido não pode ser descontado novamente do custo de transporte. No fluxo integrado Shopee/DBA/FBA/ME2 esse campo positivo é bloqueado para evitar crédito inventado.


Ajuste de usabilidade: confirmação deixa de ser requisito para visualizar estimativas quando há valores de referência ou valores manuais preenchidos. O estado `verified` permanece separado do cálculo e aparece em tela, PDF, CSV e cópia. Shopee não revalidada continua rotulada como referência. Tarifas ausentes, dados inválidos, possível duplicidade, frete ML zero não confirmado e preços fora do escopo continuam incompletos. Campos técnicos foram recolhidos em painéis expansíveis; margem desejada e preço sugerido permanecem acessíveis.


## Auditoria do fluxo automático

Obstáculos encontrados: metas apenas sugeriam um preço e exigiam Aplicar; presets apagavam despesas da loja; campos principais estavam dispersos; o preço atual e o sugerido não tinham papéis claros. O cálculo em si já respondia aos eventos, mas o preço usado nos resultados não acompanhava a meta.

Correção: modo automático padrão, por margem gerencial ou lucro por unidade. Custo, Ads, descontos, tributos, frete e despesas recalculam preço e resultados juntos, dentro dos limites das tabelas/cotações. Preço atual separado para comparar. Modo manual e Queima mantêm o preço escolhido, sem autoajuste. Aplicar uma meta alternativa passa explicitamente ao modo manual. Presets mantêm despesas, volume e metas; categorias/pesos são atualizados pelo exemplo e cotações de outro produto não são reutilizadas.

28 grupos matemáticos/estruturais e integração em DOM simulado passaram. Incluem atualização sem Aplicar, quatro produtos, efeito de custos e Ads, meta em reais, cotação fora do escopo, meta vazia, preservação de despesas e exportação do preço usado. Formatação monetária passou a reutilizar Intl.NumberFormat para reduzir custo das buscas de preço no celular.

As contas dos marketplaces não estão conectadas. A documentação oficial de listing_prices do ML usa autenticação e contexto do anúncio (categoria/produto, modalidade, preço e logística). Nenhum token ou segredo é colocado no HTML público; portanto, não se afirma consulta automática à conta ou tarifa ML oficial em tempo real. Fonte: https://developers.mercadolivre.com.br/pt_br/descricao-de-produtos/comissao-por-vender .


Simplificação da tela: produto em uma lista, custo e margem como únicos campos principais. Preço, lucro gerencial estimado e margem ficam juntos. Frete, Ads, tributos, modo manual, referências de preço e indicadores detalhados passam a um único painel fechado de Ajustes e detalhes. Dados antigos são preservados e o fluxo principal abre em cálculo por margem na migração desta versão. Campo de custo vazio não mantém um preço antigo como sugestão: preço e lucro ficam sem valor até preencher. Testes de integração cobrem seleção pela lista, retorno ao automático, dados faltantes e acesso às pendências. Regras de cálculo e tarifas não foram alteradas nesta simplificação.


Revisão de referência para kits: quantidade inteira por anúncio, com padrão de uma unidade. Custo e frete de aquisição multiplicam pela quantidade; embalagem, frete de entrega, Ads fixo e demais custos por venda não são duplicados. A quantidade representa peças de um kit cadastrado como um único produto, não quantidade de itens avulsos no pedido. Na Amazon, kits exigem confirmação de peso, dimensões e frete da embalagem inteira; cotações manuais devem ser revalidadas para o kit. Nenhuma porcentagem comercial de referência foi copiada como taxa confirmada. PDF e CSV incluem quantidade e custo dos produtos. A planilha de referência foi apenas lida, sem alteração.

Entrada por novo produto (15/10/2026): exemplos retirados da tela principal; novo produto inicia com custo vazio, sem categoria/peso emprestados de um exemplo. A migração elimina o produto demonstrativo e preserva custos operacionais da loja. Novo produto apaga as cotações específicas do anúncio anterior. Configuração nova não presume embalagem, perdas nem rateio: começa com esses itens desativados/zerados e permite inclusão explícita.

Shopee: preço e comissão de referência são calculados com custo + margem, sem prometer frete gratuito ao vendedor. Quando não há frete adicional informado, o resultado é identificado como estimativa sem frete extra confirmado, tanto na tela quanto nos relatórios. O campo de frete mostra 'A confirmar'. A existência de cupom ao comprador não comprova isenção para a loja. Artigos oficiais 18483, 26839, 23431 e 25794 retornaram apenas a estrutura da página nesta consulta; não foi possível revalidar valores ou coparticipação. Não foi adicionada nenhuma suposta taxa de frete obtida de terceiros.

Mercado Livre: categoria e tipo de anúncio passaram para o fluxo básico. A faixa geral pública (Clássico 10–14%, Premium 15–19%) aparece como faixa, nunca como taxa exata da categoria. Comissão específica, tarifa fixa e frete ainda exigem cotação; sem esses dados, preço/lucro completos permanecem bloqueados. Fonte oficial de faixa: https://vendedores.mercadolivre.com.br/nota/como-funcionam-as-taxas-do-mercado-livre . A documentação oficial de custos exige contexto de logística e anúncio. As páginas de ajuda 40538 e 48392 não ficaram acessíveis para leitura nesta consulta. Nenhuma tabela de frete não confirmada foi importada.

Validação: 31 grupos matemáticos/estruturais e integração de novo produto, migração, custos salvos, PDF, CSV, cópia, modos de preço e bloqueios passaram. A validação comercial depende das tarifas aplicáveis à conta; os testes não confirmam uma política que não pôde ser consultada.


## Avaliação comparativa e melhorias próprias — 23/10/2026

Referências públicas analisadas como funcionalidades, sem copiar implementação, instalar pacotes ou executar projetos externos:

- AIHM / BulkCalc: https://github.com/itsukiken1/aihm — comparação de produtos em lote e cálculos locais. Aproveitada a ideia de manter simulações identificadas; não foi adotada sua logística internacional.
- SourceCalc: https://github.com/itsukiken1/sourcecalc — decomposição de custo, margem e ROI no contexto de compra. Adotada análise de custo máximo aceitável usando nosso próprio motor. Não foi instalada extensão, não foi implementada coleta de páginas.
- FBATools: https://github.com/qq136692547-cmyk/fbatools-site — página tools/profit-calculator/index.html, comparação FBA/FBM e ponto de equilíbrio. Aproveitado o princípio de comparar condições de forma explícita, sem importar taxas estrangeiras nem fórmulas de terceiros.
- Referência oficial de escopo financeiro: https://venda.amazon.com.br/sellerblog/descubra-como-se-planejar-melhor-para-vender-em-datas-sazonais — distingue custo de aquisição, logística, publicidade e margem. Não usada para substituir tarifas da conta.

A base existente já cobria alterações de faixa, peso cúbico, cotações manuais delimitadas, Ads em dinheiro e percentual, DAS mensal, custo por peça de kit, exportação e memória de cálculo. Não foi reconstruída.

Implementação original: custo máximo unitário que preserva a meta atual; cenários isolados de variação do preço, custo e Ads; cobertura de custos mensais com hipótese de um único produto; registros locais de até 20 simulações e exportação JSON. Valores exibidos como estimativas. Em kits, volume mensal é convertido em vendas completas do anúncio, sem duplicar DAS/fixos. Resultados não aparecem enquanto o preço automático está pendente.

Proteções: campos locais são lidos por lista permitida, com tipos primitivos e sem chaves de protótipo; texto do usuário aparece por textContent; dados salvos ilegíveis não são sobrescritos. Carregar uma simulação exige confirmação para substituir os campos atuais e desmarca confirmações de tarifas. A calculadora permanece sem dependências externas, fetch, SDK ou credenciais de lojas. Nenhum dado da loja ou anúncio foi alterado.

Validação: 33 grupos matemáticos/estruturais anteriores, 8 grupos de auditoria com Decimal e reconciliação de 120 cenários, 11 grupos novos de decisões/segurança e integração de interface simulada com PDF, CSV, cópia, salvamento, carregamento e preservação de armazenamento inválido. A inspeção visual em navegador não foi concluída por bloqueio da política do ambiente. Os testes não atestam vigência comercial das tarifas nem garantem ausência de todos os defeitos.

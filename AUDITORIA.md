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

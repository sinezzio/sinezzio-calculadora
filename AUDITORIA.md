# Auditoria — 15/10/2026 UTC

## Base

Sinezzio_Calculadora_Shopee_Amazon_Mercado_Livre.html, versão 2026.10.1. Aplicação autônoma em HTML/CSS/JavaScript, com localStorage `sinezzio-calculator-v2` e migração do v1. Sem bibliotecas externas ou chamadas de rede para cálculos.

## Regras mantidas

Todas as tarifas, faixas, categorias, alíquotas, rateios e premissas comerciais existentes foram mantidas. Não houve revalidação da vigência fiscal/comercial em fontes externas nesta entrega. O layout identifica as premissas e mantém os links oficiais da base.

## Correções

1. DBA: a lista de limites tinha 12 faixas, mas as duas tabelas tinham 11 linhas. Para peso tarifável acima de 9 até 10 kg e receita a partir de R$79, o acesso à linha inexistente causava erro ou cálculo inválido. A aplicação agora sinaliza a lacuna, não calcula resultado com frete zero e solicita logística manual. Nenhuma tarifa foi criada.
2. Solver do preço mínimo: adicionado o corte de R$40 para o parcelamento Amazon. A cobrança causa uma descontinuidade e precisa separar os intervalos de busca. Ajustada tolerância de arredondamento de fronteiras para centavos.
3. Mercado Livre: trocar categoria agora invalida a confirmação das taxas, assim como já ocorria ao editar comissão e frete.
4. Ads: aviso explícito quando valor fixo e ACOS estão preenchidos simultaneamente; a soma original permanece.
5. Seletor de plataforma com estado aria-pressed, foco visível e preferência por movimento reduzido.

## Validação

13 grupos de testes matemáticos/estruturais passaram. Testes de integração em DOM simulado também passaram: inicialização, plataformas, edição, prejuízo, presets, lacuna DBA, frete manual, confirmação ML, cópia, CSV, restauração e persistência. A regressão comparou 972 combinações de plataforma, preço, desconto, regime e rateio, com 9 indicadores por combinação, sem diferenças nas faixas suportadas. O solver foi comparado com busca exaustiva em centavos em 18 configurações. Também verificados limites Shopee, tarifa mínima/escalonada Amazon, volume cúbico, parcelamento, MEI, imposto percentual e modalidades ML.

## Limites

A verificação visual em navegador real e de interação móvel ainda está pendente. O CSS contém layouts de quatro/dois cartões, duas/uma colunas e campos de 16px no celular. Dados não sincronizam entre aparelhos. O frete DBA acima de 10 kg segue a extrapolação já existente na base e continua sujeito a conferência; a origem alternativa/FBA permanece manual. Os percentuais ML e o adicional Premium continuam estimativas. Não foi criado repositório nem confirmada publicação enquanto o canal disponível não oferecer essas operações.

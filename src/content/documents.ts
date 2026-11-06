import type { DownloadContent, TemplateId } from '@/types/documents.types'

export const DOCUMENTS_CONTENT = {
  eyebrow: 'Diagnóstico, análise e downloads',
  title: 'Central de Documentos',
  description:
    'Anexe um documento do seu computador ou use um exemplo, solicite a análise simulada e baixe relatórios e modelos em PDF, DOCX ou TXT.',
  loading: 'Carregando documentos...',
  loadErrorTitle: 'Não foi possível carregar a Central de Documentos',
  loadErrorDescription: 'Tente novamente. Nenhum arquivo foi lido ou alterado.',
  retryLabel: 'Tentar novamente',
  shortcutsLabel: 'Atalhos da central',
  catalog: {
    title: 'Documentos de exemplo',
    description:
      'Também é possível usar um documento fictício desta lista. Nenhum arquivo do seu dispositivo é acessado nesse caso.',
    selectedLabel: 'Selecionado',
    analyzedLabel: 'Analisado nesta sessão',
    empty: 'Nenhum documento de exemplo disponível.',
  },
  intake: {
    title: 'Anexar e analisar documento',
    description:
      'Anexe um arquivo, confira os dados exibidos e peça a análise. O ATUE não envia o arquivo para nenhum servidor.',
    attachLabel: 'Anexar documento',
    replaceLabel: 'Trocar arquivo',
    removeLabel: 'Remover arquivo',
    attachedTitle: 'Arquivo anexado',
    acceptedHelp: 'PDF, DOC, DOCX ou TXT, até 10 MB. Apenas um arquivo por análise.',
    privacyNote:
      'O arquivo permanece no seu dispositivo. Nesta demonstração, apenas nome, tipo e tamanho são usados para simular a análise.',
    emptyTitle: 'Nenhum arquivo anexado',
    emptyDescription:
      'Use o botão de anexo ou escolha um documento de exemplo abaixo para habilitar a análise.',
    fileErrorTitle: 'Não foi possível anexar o arquivo',
    emptyFileError: 'O arquivo está vazio. Escolha outro documento.',
    unsupportedFileError: 'Formato não aceito. Use PDF, DOC, DOCX ou TXT.',
    tooLargeFileError: 'O arquivo ultrapassa o limite de 10 MB. Escolha um arquivo menor.',
    removedNotice: 'Arquivo removido. Nenhum dado foi mantido.',
    sampleTitle: 'Ou use um documento de exemplo',
    sampleDescription:
      'Escolha um documento fictício para demonstrar o fluxo sem anexar um arquivo do dispositivo.',
    sampleLabel: 'Documento de exemplo',
    sampleHelp: 'Lista fictícia. O seletor de arquivos do sistema não é aberto por este campo.',
    selectedSourceLabel: 'Origem da análise',
    sourceFileLabel: 'Arquivo anexado neste dispositivo',
    sourceSampleLabel: 'Documento de exemplo da demonstração',
    analyzeLabel: 'Analisar com IA',
    analyzeBusyLabel: 'Analisando com IA simulada...',
    demoNoticeTitle: 'A IA é uma simulação local',
    demoNoticeDescription:
      'Nenhum conteúdo é enviado ou processado por um modelo de IA real. A análise é determinística e serve apenas para demonstrar o fluxo do produto.',
    progressTitle: 'Processando documento',
    progressDescription: 'As etapas abaixo são simuladas e servem apenas para demonstrar o fluxo.',
    progressAriaLabel: 'Progresso da análise simulada',
    progressStatus: 'Etapa {current} de {total}: {label}',
    progressDone: 'Análise simulada concluída.',
    errorTitle: 'Não foi possível concluir a análise simulada',
    errorDescription: 'Tente novamente. Nenhum arquivo real foi lido ou alterado.',
  },
  result: {
    title: 'Resultado da análise simulada',
    description: 'Achados, explicações e recomendações gerados por uma simulação local.',
    completedAtLabel: 'Concluída em',
    documentLabel: 'Documento',
    sourceLabel: 'Origem',
    scoreLabel: 'Score de conformidade',
    findingsTitle: 'Achados identificados',
    findingsDescription: 'Abra cada achado para ver a explicação simulada e a recomendação.',
    emptyFindings: 'Nenhum achado foi identificado neste documento de exemplo.',
    summaryLabel: 'Resumo por severidade',
    downloadLink: 'Ir para a Central de Downloads',
    dashboardLink: 'Ver painel de controle',
    demoNoticeTitle: 'Resultado de demonstração',
    demoNoticeDescription:
      'Os achados, explicações e recomendações são fictícios. Eles não representam uma avaliação jurídica nem garantem conformidade com a LGPD.',
  },
  downloads: {
    title: 'Central de Downloads',
    description:
      'Relatórios e modelos com layout profissional, gerados no navegador em PDF, DOCX ou TXT, sempre com aviso de demonstração.',
    reportsTitle: 'Relatórios gerados',
    reportsDescription: 'Cada análise simulada adiciona um relatório a esta lista.',
    templatesTitle: 'Modelos de documentos',
    templatesDescription:
      'Estruturas de referência para a equipe preencher. Não são documentos aprovados.',
    emptyReports:
      'Nenhum relatório foi gerado ainda. Conclua uma análise simulada para criar o primeiro.',
    emptyTemplates: 'Nenhum modelo disponível.',
    downloadLabel: 'Baixar',
    downloadingLabel: 'Gerando {format}...',
    downloadAriaLabel: 'Escolher formato para baixar {title}',
    formatMenuLabel: 'Escolha o formato',
    formatMenuDescription: 'O arquivo é gerado localmente e não é enviado a um servidor.',
    generatedAtLabel: 'Gerado em',
    updatedAtLabel: 'Atualizado em',
    preparingTitle: 'Gerando arquivo de demonstração',
    preparingDescription:
      'O arquivo é montado localmente no navegador, com capa, sumário técnico e rodapé de demonstração.',
    successTitle: 'Arquivo de demonstração gerado',
    successDescription: 'O download foi criado localmente. Nenhum dado foi enviado a um servidor.',
    errorTitle: 'Não foi possível gerar o arquivo',
    errorDescription: 'Tente novamente. Nenhum dado foi alterado.',
    demoNotice:
      'Os arquivos contêm marca de demonstração, não substituem parecer jurídico e não têm validade legal.',
    preferencesLink: 'Ajustar preferências de relatório',
  },
} as const

export const DOWNLOAD_FORMATS = ['pdf', 'docx', 'txt'] as const

export const DOWNLOAD_FORMAT_CONTENT = {
  pdf: {
    label: 'PDF',
    title: 'PDF — pronto para compartilhar',
    description: 'Capa, métricas e paginação profissional para envio e arquivamento.',
  },
  docx: {
    label: 'DOCX',
    title: 'DOCX — editável',
    description: 'Estilos, cabeçalho e rodapé prontos para editar no Word ou Google Docs.',
  },
  txt: {
    label: 'TXT',
    title: 'TXT — texto simples',
    description: 'Layout em texto puro, útil para copiar, revisar e versionar rapidamente.',
  },
} as const

export const ANALYSIS_STEPS = [
  {
    id: 'preparing',
    label: 'Preparando documento',
    description: 'Validando o tipo e o tamanho informados e montando o contexto da análise.',
  },
  {
    id: 'extracting',
    label: 'Mapeando seções',
    description: 'Simulando a leitura de cláusulas, datas e referências ao tratamento de dados.',
  },
  {
    id: 'comparing',
    label: 'Comparando com a LGPD',
    description: 'Verificando a presença de controles esperados para o tipo de documento.',
  },
  {
    id: 'findings',
    label: 'Identificando achados',
    description: 'Agrupando lacunas por categoria, severidade e esforço de correção.',
  },
  {
    id: 'report',
    label: 'Gerando relatório',
    description: 'Montando o resultado, o plano de ação e o arquivo de demonstração.',
  },
] as const

export const SEVERITY_CONTENT = {
  alta: {
    label: 'Alta',
    description: 'Pode comprometer obrigações centrais da LGPD e deve ser tratada primeiro.',
  },
  media: {
    label: 'Média',
    description: 'Exige correção planejada e pode gerar dúvidas em uma revisão.',
  },
  baixa: {
    label: 'Baixa',
    description: 'Ajuste de clareza ou de documentação, com impacto limitado.',
  },
} as const

export const DOWNLOAD_CATEGORY_CONTENT = {
  report: {
    title: 'Relatórios gerados',
    description: 'Cada análise simulada adiciona um relatório a esta lista.',
  },
  template: {
    title: 'Modelos de documentos',
    description: 'Estruturas de referência para a equipe preencher. Não são documentos aprovados.',
  },
} as const

export const REPORT_DEMO_FOOTER =
  'Documento de demonstração gerado localmente pelo ATUE — não possui validade legal.'

export const TEMPLATE_PDF_CONTENT: Record<TemplateId, DownloadContent> = {
  'privacy-policy-template': {
    title: 'Política de Privacidade',
    subtitle: 'Modelo de referência para publicar no site e manter versão controlada.',
    documentType: 'Modelo de política',
    reference: 'ATUE-TPL-PP-01',
    organization: '[PREENCHER] Razão social e CNPJ',
    meta: [
      'Versão de demonstração · Revisar antes de publicar',
      'Documento fictício, sem validade legal.',
    ],
    sections: [
      {
        heading: '1. Identificação e escopo',
        paragraphs: [
          'Esta Política de Privacidade descreve como [PREENCHER] trata dados pessoais em seus sites, aplicativos, canais de atendimento e serviços contratados.',
          'O documento deve refletir as operações realmente executadas. Remova seções que não se aplicam e detalhe os fluxos específicos da organização.',
        ],
        bullets: [
          '[PREENCHER] Razão social, CNPJ, endereço e canais oficiais de atendimento.',
          '[PREENCHER] Produtos, serviços e canais abrangidos por esta política.',
          '[PREENCHER] Data da última revisão e responsável pela aprovação.',
        ],
      },
      {
        heading: '2. Papéis e contato do encarregado',
        paragraphs: [
          'Informe quem atua como controlador, quem são os operadores relevantes e como o titular pode contatar o encarregado pelo tratamento de dados pessoais (DPO).',
        ],
        bullets: [
          '[PREENCHER] Nome e canal de contato do DPO, com prazo estimado de resposta.',
          '[PREENCHER] Endereço para correspondência e canal para solicitações de titulares.',
          'Descreva o processo interno de triagem das solicitações e os responsáveis por cada etapa.',
        ],
      },
      {
        heading: '3. Dados pessoais tratados',
        paragraphs: [
          'Liste as categorias de dados por contexto de coleta. Evite termos genéricos como “dados cadastrais” sem explicar o conteúdo real.',
        ],
        bullets: [
          'Identificação e contato: nome, e-mail, telefone, cargo e organização.',
          'Dados contratuais e financeiros necessários à prestação do serviço.',
          'Registros de acesso, endereço IP, navegador e informações de segurança.',
          'Dados sensíveis: informe apenas se houver tratamento e qual é a finalidade específica.',
        ],
      },
      {
        heading: '4. Finalidades e bases legais',
        paragraphs: [
          'Para cada finalidade, informe a base legal correspondente e o que acontece se o titular não fornecer os dados. Não use “legítimo interesse” como justificativa automática.',
        ],
        bullets: [
          '[PREENCHER] Execução de contrato: prestação do serviço, suporte e cobrança.',
          '[PREENCHER] Cumprimento de obrigação legal ou regulatória.',
          '[PREENCHER] Consentimento: comunicações de marketing e recursos opcionais.',
          '[PREENCHER] Legítimo interesse: segurança, prevenção a fraude e melhoria controlada do serviço.',
        ],
      },
      {
        heading: '5. Cookies e tecnologias semelhantes',
        paragraphs: [
          'Descreva as categorias de cookies, a finalidade, a duração e quem fornece cada tecnologia. Informe como o titular pode aceitar, recusar ou alterar a escolha.',
        ],
        bullets: [
          'Essenciais: necessários para autenticação, segurança e funcionamento básico.',
          'Desempenho: métricas agregadas de uso e estabilidade.',
          'Marketing: personalização de campanhas, sempre após a escolha do titular.',
          '[PREENCHER] Nome do banner ou painel de preferências e como reabrir a escolha.',
        ],
      },
      {
        heading: '6. Compartilhamento e transferência internacional',
        paragraphs: [
          'Liste os fornecedores que recebem dados, a finalidade, as categorias compartilhadas e o mecanismo contratual adotado. Se houver transferência internacional, indique o país e a salvaguarda aplicável.',
        ],
        bullets: [
          '[PREENCHER] Fornecedores de hospedagem, CRM, e-mail, analytics e suporte.',
          '[PREENCHER] Países de destino e cláusulas contratuais ou normas corporativas aplicáveis.',
          'Explique como a organização avalia fornecedores e mantém o registro das transferências.',
        ],
      },
      {
        heading: '7. Retenção e eliminação',
        paragraphs: [
          'Defina prazos objetivos por categoria de dado e o critério usado para eliminá-los ou anonimizá-los. Prazos como “pelo tempo necessário” não demonstram controle.',
        ],
        bullets: [
          '[PREENCHER] Prazo de retenção para dados cadastrais, contratuais, fiscais e de marketing.',
          '[PREENCHER] Critério para encerramento do tratamento e forma de eliminação segura.',
          'Preveja exceções legais de retenção e o processo de revisão periódica.',
        ],
      },
      {
        heading: '8. Direitos dos titulares',
        paragraphs: [
          'Explique como o titular pode exercer cada direito previsto na LGPD, qual canal deve usar e em quanto tempo receberá resposta. O atendimento deve ser gratuito e acessível.',
        ],
        bullets: [
          'Confirmação da existência de tratamento e acesso aos dados.',
          'Correção de dados incompletos, inexatos ou desatualizados.',
          'Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.',
          'Portabilidade, informação sobre compartilhamentos e revogação do consentimento.',
          '[PREENCHER] Canal, prazo e responsável pela resposta às solicitações.',
        ],
      },
      {
        heading: '9. Segurança e resposta a incidentes',
        paragraphs: [
          'Resuma os controles técnicos e administrativos adotados, sem expor detalhes que aumentem o risco. Descreva como incidentes são detectados, avaliados e comunicados.',
        ],
        bullets: [
          'Controle de acesso, criptografia, registro de atividades e backups testados.',
          'Processo de triagem, contenção, comunicação e aprendizado após incidentes.',
          '[PREENCHER] Responsável pelo plano de resposta e canal interno de acionamento.',
        ],
      },
      {
        heading: '10. Alterações e contato',
        paragraphs: [
          'Informe como o titular será avisado sobre mudanças relevantes e onde a versão vigente pode ser consultada. Mantenha histórico de versões e registro de aprovação.',
        ],
        bullets: [
          '[PREENCHER] Data da versão, histórico de alterações e responsável pela publicação.',
          '[PREENCHER] Canal de contato para dúvidas sobre esta política.',
        ],
      },
    ],
    footer: 'Documento de demonstração — modelo sem validade legal.',
  },
  'consent-term-template': {
    title: 'Termo de Consentimento',
    subtitle: 'Modelo para registrar consentimento livre, informado e específico.',
    documentType: 'Modelo de termo',
    reference: 'ATUE-TPL-TC-01',
    organization: '[PREENCHER] Razão social e CNPJ',
    meta: [
      'Versão de demonstração · Revisar antes de usar',
      'Documento fictício, sem validade legal.',
    ],
    sections: [
      {
        heading: '1. Identificação do controlador',
        paragraphs: [
          '[PREENCHER] Razão social, CNPJ, endereço e canal de contato do controlador responsável pelo tratamento descrito neste termo.',
          'O termo deve ser apresentado antes da coleta, em linguagem clara, sem induzir o titular a aceitar para continuar usando o serviço.',
        ],
      },
      {
        heading: '2. Finalidade específica',
        paragraphs: [
          'Descreva exatamente para que os dados serão usados. Cada finalidade deve ter um consentimento próprio quando o titular puder escolher separadamente.',
        ],
        bullets: [
          '[PREENCHER] Finalidade principal e resultado esperado para o titular.',
          '[PREENCHER] Comunicações, personalização ou recursos opcionais incluídos.',
          'Não vincule o consentimento à execução de um serviço que não depende dele.',
        ],
      },
      {
        heading: '3. Dados tratados e origem',
        bullets: [
          '[PREENCHER] Categorias de dados incluídas neste consentimento.',
          '[PREENCHER] Origem dos dados e período de tratamento.',
          'Informe se há dados sensíveis e, se houver, a finalidade específica e o cuidado adicional adotado.',
        ],
      },
      {
        heading: '4. Compartilhamento e retenção',
        paragraphs: [
          '[PREENCHER] Liste os destinatários dos dados, a finalidade do compartilhamento e o prazo de retenção aplicável.',
          'Explique como o titular pode consultar a lista atualizada de fornecedores e as salvaguardas adotadas.',
        ],
      },
      {
        heading: '5. Registro e comprovação',
        paragraphs: [
          'Descreva o canal de coleta, a data e hora do registro, a versão do texto apresentado e os mecanismos técnicos que comprovam a manifestação.',
        ],
        bullets: [
          '[PREENCHER] Sistema ou processo usado como evidência do consentimento.',
          '[PREENCHER] Forma de armazenamento da versão aceita e do identificador do titular.',
          'Garanta que o registro permita demonstrar quando, como e para qual finalidade o consentimento foi dado.',
        ],
      },
      {
        heading: '6. Revogação e direitos do titular',
        paragraphs: [
          'O consentimento pode ser revogado a qualquer momento, sem prejuízo ao titular. A revogação deve ser tão simples quanto o consentimento original.',
        ],
        bullets: [
          '[PREENCHER] Canal de revogação, prazo de confirmação e efeito sobre tratamentos já realizados.',
          'Informe os demais direitos previstos na LGPD e como exercê-los.',
          '[PREENCHER] Contato do encarregado e prazo de resposta.',
        ],
      },
      {
        heading: '7. Declaração do titular',
        paragraphs: [
          'Declaro que li este termo, compreendi a finalidade e as condições do tratamento e concordo, de forma livre e informada, com o uso dos meus dados para as finalidades assinaladas.',
        ],
        bullets: [
          'Nome do titular: [PREENCHER]',
          'Data e hora: [PREENCHER]',
          'Versão do termo aceita: [PREENCHER]',
          'Canal e identificador do registro: [PREENCHER]',
        ],
      },
    ],
    footer: 'Documento de demonstração — modelo sem validade legal.',
  },
  'incident-response-template': {
    title: 'Plano de Resposta a Incidentes',
    subtitle: 'Modelo de referência para preparação, resposta e aprendizado.',
    documentType: 'Modelo operacional',
    reference: 'ATUE-TPL-PRI-01',
    organization: '[PREENCHER] Razão social e CNPJ',
    meta: [
      'Versão de demonstração · Revisar antes de adotar',
      'Documento fictício, sem validade legal.',
    ],
    sections: [
      {
        heading: '1. Objetivo e escopo',
        paragraphs: [
          'Estabelecer como a organização identifica, avalia, contém e comunica incidentes de segurança que possam afetar dados pessoais. O plano deve cobrir sistemas, fornecedores e canais de atendimento.',
        ],
        bullets: [
          '[PREENCHER] Sistemas, unidades e terceiros abrangidos.',
          'Defina contato primário e substituto para acionamento fora do horário comercial.',
          'Mantenha o plano acessível mesmo em cenários de indisponibilidade dos sistemas principais.',
        ],
      },
      {
        heading: '2. Papéis e responsabilidades',
        paragraphs: [
          'Nomeie os responsáveis por cada etapa e registre como as decisões serão tomadas. Evite concentrar todas as atribuições em uma única pessoa.',
        ],
        bullets: [
          '[PREENCHER] Coordenador de resposta, responsável técnico, jurídico, comunicação e DPO.',
          '[PREENCHER] Quem aprova a comunicação à ANPD e aos titulares.',
          'Defina o papel de terceiros e a forma de escalonamento.',
        ],
      },
      {
        heading: '3. Detecção e triagem',
        paragraphs: [
          'Descreva as fontes de detecção, os critérios de classificação e o prazo para triagem inicial. Registre data, hora, sistemas afetados e evidências desde o primeiro contato.',
        ],
        bullets: [
          'Fontes: alertas de segurança, relatos de usuários, fornecedores e auditorias.',
          'Critérios: confidencialidade, integridade, disponibilidade e risco aos titulares.',
          '[PREENCHER] Prazo máximo para triagem e responsável pelo registro inicial.',
        ],
      },
      {
        heading: '4. Contenção e mitigação',
        paragraphs: [
          'Documente as ações imediatas para reduzir o impacto, preservar evidências e restaurar a operação de forma segura.',
        ],
        bullets: [
          'Isolamento de sistemas, revogação de credenciais e bloqueio de acessos indevidos.',
          'Preservação de logs, imagens e demais evidências antes da correção.',
          'Critérios para restauração de backups e validação da integridade dos dados.',
        ],
      },
      {
        heading: '5. Avaliação de risco e comunicação',
        paragraphs: [
          'Avalie a probabilidade e a gravidade do dano aos titulares. Quando houver risco relevante, prepare a comunicação à ANPD e aos titulares com linguagem clara.',
        ],
        bullets: [
          '[PREENCHER] Critérios internos de avaliação de risco e responsável pela decisão.',
          '[PREENCHER] Prazo e canal de comunicação à ANPD.',
          '[PREENCHER] Conteúdo mínimo da comunicação: dados afetados, riscos e medidas adotadas.',
          'Registre a fundamentação quando a comunicação não for necessária.',
        ],
      },
      {
        heading: '6. Comunicação aos titulares',
        paragraphs: [
          'Explique o que aconteceu, quais dados foram afetados, quais medidas foram tomadas e o que o titular pode fazer. Evite jargão e não minimize o ocorrido.',
        ],
        bullets: [
          '[PREENCHER] Canal oficial e responsável pelo envio.',
          '[PREENCHER] Orientações de proteção e canal para dúvidas.',
          'Acompanhe reclamações e volume de contatos após a comunicação.',
        ],
      },
      {
        heading: '7. Evidências e registro',
        paragraphs: [
          'Mantenha um registro único por incidente, com linha do tempo, decisões, responsáveis, evidências e comunicações realizadas.',
        ],
        bullets: [
          '[PREENCHER] Local de armazenamento controlado e prazo de retenção.',
          'Restrinja o acesso ao registro e mantenha trilha de auditoria.',
          'Não armazene credenciais ou dados sensíveis desnecessários no registro.',
        ],
      },
      {
        heading: '8. Encerramento e lições aprendidas',
        paragraphs: [
          'Encerre formalmente o incidente após a contenção, a comunicação e a recuperação. Registre causas, falhas de controle e ações de melhoria com responsáveis e prazos.',
        ],
        bullets: [
          '[PREENCHER] Critérios de encerramento e responsável pela validação.',
          'Revisão pós-incidente com plano de ação acompanhado até a conclusão.',
          'Atualize este plano e os controles após cada exercício ou incidente relevante.',
        ],
      },
    ],
    footer: 'Documento de demonstração — modelo sem validade legal.',
  },
}

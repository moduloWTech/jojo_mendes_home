export const copy = {
  seo: {
    home: {
      title: 'Jojo Mendes | Site Oficial',
      description:
        'Conheça Jojo Mendes, confira a agenda de shows, assista aos vídeos e encontre informações para contratação de apresentações.',
    },
    booking: {
      title: 'Agendar Show | Jojo Mendes',
      description:
        'Solicite informações sobre disponibilidade e contratação de shows de Jojo Mendes.',
    },
    privacy: {
      title: 'Política de Privacidade | Jojo Mendes',
      description:
        'Informações sobre o tratamento de dados pessoais no site oficial de Jojo Mendes.',
    },
    notFound: {
      title: 'Página não encontrada | Jojo Mendes',
    },
  },
  nav: {
    home: 'Início',
    history: 'História',
    schedule: 'Agenda',
    videos: 'Vídeos',
    gallery: 'Galeria',
    musicians: 'Músicos',
    press: 'Material de divulgação',
    booking: 'Agendar show',
    logoAriaLabel: 'Ir para o início',
    openMenuAriaLabel: 'Abrir menu',
    closeMenuAriaLabel: 'Fechar menu',
    mainNavAriaLabel: 'Navegação principal',
    mobileNavAriaLabel: 'Menu principal mobile',
  },
  hero: {
    srOnlyHeading: 'Jojo Mendes | Site Oficial',
    pillBadge: 'Forró • Seresta • Sertanejo • Brega',
    desktopTaglineLine1: 'Música brasileira, alegria e emoção',
    desktopTaglineLine2: 'para o seu evento!',
    primaryCta: 'Agendar show',
    secondaryCta: 'Ver agenda',
    scrollText: 'scroll',
  },
  history: {
    eyebrow: 'A ARTISTA',
    title: 'Jojo Mendes',
    provisionalBadge: 'Conteúdo provisório — aguardando biografia oficial aprovada',
  },
  schedule: {
    eyebrow: 'ONDE NOS ENCONTRAR',
    title: 'Próximos shows',
    emptyTitle: 'Novas datas em breve.',
    emptyDescription:
      'Acompanhe as redes oficiais para saber das próximas apresentações.',
    detailsCta: 'Ver detalhes',
    showMoreCta: 'Ver mais datas',
    showLessCta: 'Ver menos datas',
    loadingText: 'Carregando agenda...',
  },
  videos: {
    eyebrow: 'NO PALCO E NAS TELAS',
    title: 'Vídeos',
    playButtonLabel: 'Assistir vídeo',
    watchOnYoutubeCta: 'Assistir no YouTube',
    demoBadge: 'Vídeo demonstrativo — substituir',
    emptyTitle: 'Vídeos em preparação.',
    emptyDescription: 'Em breve, novos conteúdos por aqui.',
    unavailableMessage: 'Este vídeo não está disponível no momento.',
  },
  gallery: {
    eyebrow: 'MOMENTOS',
    title: 'Galeria',
    openPhotoLabel: (index: number) => `Abrir foto ${index} da galeria`,
    prevPhotoLabel: 'Foto anterior',
    nextPhotoLabel: 'Próxima foto',
    closeGalleryLabel: 'Fechar galeria',
    showMoreCta: 'Ver mais fotos',
    showLessCta: 'Ver menos fotos',
    emptyTitle: 'Galeria em preparação.',
  },
  musicians: {
    eyebrow: 'QUEM FAZ O SHOW',
    title: 'Mapa de Palco',
    subtitle: 'Formação: Voz, Guitarra e Teclado',
    description:
      'Disposição cênica e técnica da banda nos palcos. Uma formação enxuta e potente com alta fidelidade sonora para eventos de todos os portes.',
    stageMapDiagramTitle: 'Diagrama de Palco — Jojo Mendes',
    audienceLabel: 'Frente do Palco / Público',
    fullTechnicalMapTitle: 'Mapa Técnico Oficial — Rider de Palco',
    viewTechnicalMapCta: 'Ver mapa técnico completo',
    downloadTechnicalMapCta: 'Baixar mapa em alta resolução',
    closeModalLabel: 'Fechar mapa técnico',
    emptyMessage: 'Formação musical em atualização.',
  },
  bookingBanner: {
    eyebrow: 'CONTRATE ESSE SHOW PARA O SEU EVENTO',
    bigStackedWord: ['CON', 'TRA', 'TE'] as const,
    title: 'A energia vibrante e a versatilidade da música brasileira no seu evento.',
    cta: 'Preencher formulário de contratação',
    subtext: 'Resposta rápida da produção executiva em até 24 horas úteis',
  },
  press: {
    eyebrow: 'PARA PRODUTORES & IMPRENSA',
    title: 'Material de divulgação',
    descriptionWithFiles:
      'Arquivos oficiais em alta resolução para cartazes, assessoria de imprensa e produção técnica de eventos.',
    downloadCta: 'Baixar arquivo',
    emptyMessage: 'Materiais em preparação.',
    loadingText: 'Carregando materiais...',
    releaseTitle: 'Release Oficial para Imprensa',
    releaseBadge: 'Texto pronto para divulgação',
    releaseText:
      'Com presença de palco marcante e interpretação autêntica, Jojo Mendes é uma das vozes mais versáteis da música popular brasileira. Seu show reúne uma potente celebração de ritmos com arranjos vibrantes de forró, seresta, sertanejo, brega e clássicos contagiantes que movimentam públicos de todas as idades em grandes festivais, praças e eventos corporativos.',
    copyReleaseCta: 'Copiar texto do release',
    copiedReleaseCta: 'Release copiado para a área de transferência!',
    categories: {
      all: 'Todos os materiais',
      logo: 'Identidade & Logos',
      foto: 'Fotos de Divulgação',
      rider: 'Rider & Mapa de Palco',
    },
  },
  footer: {
    tagline: 'Site oficial de Jojo Mendes.',
    navHeading: 'Navegação',
    socialHeading: 'Acompanhe',
    privacyLink: 'Política de privacidade',
    copyright: (year: number) =>
      `© ${year} Jojo Mendes. Todos os direitos reservados.`,
  },
  bookingPage: {
    title: 'Agendar show',
    description:
      'Preencha os dados para solicitar informações sobre disponibilidade.',
    editorialNote:
      'Conte um pouco sobre o seu evento. Essas informações ajudam a organizar o primeiro contato.',
    requiredLegend: '* Campos obrigatórios',
    submit: 'Enviar solicitação para o WhatsApp',
    submitting: 'Preparando mensagem...',
    successTitle: 'Solicitação gerada com sucesso!',
    successDescription:
      'Seu WhatsApp foi aberto com os dados preenchidos. Basta enviar a mensagem para a equipe de Jojo Mendes.',
    errorMessage:
      'Não foi possível enviar sua solicitação agora. Tente novamente.',
    validationErrorMessage: 'Revise os campos indicados e tente novamente.',
    demoModeMessage:
      'Formulário de demonstração: envio ainda não habilitado.',
    consentPrefix: 'Li a ',
    consentLinkText: 'Política de privacidade',
    consentSuffix:
      ' e concordo com o uso dos meus dados para o atendimento desta solicitação.',
    fields: {
      contractorName: {
        label: 'Nome do responsável',
        placeholder: 'Seu nome completo',
        error: 'Informe seu nome.',
      },
      whatsapp: {
        label: 'WhatsApp para contato',
        placeholder: '+55 (99) 99999-9999',
        error: 'Informe um WhatsApp válido.',
      },
      city: {
        label: 'Cidade do evento',
        placeholder: 'Cidade onde será o evento',
        error: 'Informe a cidade.',
      },
      state: {
        label: 'Estado',
        placeholder: 'Selecione o estado',
        error: 'Selecione o estado.',
      },
      eventDate: {
        label: 'Data pretendida',
        error: 'Selecione uma data válida.',
      },
      venue: {
        label: 'Local do evento',
        placeholder: 'Nome do espaço ou local',
        error: 'Informe o local do evento.',
      },
      eventTime: {
        label: 'Horário pretendido',
        error: 'Confira o horário informado.',
      },
      estimatedAudience: {
        label: 'Público estimado',
        placeholder: 'Quantidade aproximada de pessoas',
        error: 'Informe uma quantidade válida.',
      },
      additionalInfo: {
        label: 'Informações adicionais',
        placeholder:
          'Conte um pouco mais sobre o evento e a estrutura disponível.',
        error: 'Revise as informações adicionais.',
      },
      consent: {
        error: 'Confirme a leitura da Política de privacidade para prosseguir.',
      },
    },
  },
  privacyPage: {
    eyebrow: 'INFORMAÇÕES LEGAIS',
    title: 'Política de privacidade',
    provisionalBadge: 'Documento provisório — pendente de revisão jurídica',
    paragraphs: [
      'Este espaço é reservado à Política de Privacidade oficial do site de Jojo Mendes, que detalhará a coleta, a finalidade e o tratamento dos dados informados no formulário de solicitação de shows.',
      'Os dados informados na página de contratação (nome, WhatsApp, cidade, estado, data, local e observações do evento) destinam-se exclusivamente ao atendimento comercial e verificação de disponibilidade de agenda.',
      'Nota de implementação: o texto jurídico definitivo deverá ser validado e aprovado pelo responsável legal antes da ativação do envio em produção.',
    ],
    backCta: 'Voltar ao início',
  },
  notFoundPage: {
    title: 'Esta página não foi encontrada.',
    description: 'O endereço pode ter mudado ou não estar disponível.',
    cta: 'Voltar ao início',
  },
} as const;

export const destinations = {
  home: '/',
  homeAnchor: '/#inicio',
  history: '/#historia',
  schedule: '/#agenda',
  videos: '/#videos',
  gallery: '/#galeria',
  musicians: '/#musicos',
  bookingSection: '/#contratar',
  press: '/#imprensa',
  booking: '/contratacao',
  privacy: '/privacidade',
} as const;


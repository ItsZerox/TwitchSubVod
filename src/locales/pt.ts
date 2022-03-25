import { Locale } from './types'

const pt: Locale = {
  FEEDBACK: 'Feedback',
  FOLLOW: 'Seguir',
  DOWNLOAD: 'Download',
  ALL_STREAMER_VODS: 'Todos os VODs de {{streamer}}',
  SUB_ONLY_VODS: 'VODs pagos',
  DELETED_VODS: 'VODs deletados',
  OPEN_MENU: 'Abrir menu',
  PROFILE: 'Perfil',
  NOTIFICATIONS: 'Notificações',
  SEND_FEEDBACK: 'Enviar feedback',
  SEARCH: 'Buscar',
  FOLLOWERS: 'Seguidores',
  VIEWS: 'Visualizações',
  SHARE_THIS_VIDEO: 'Compartilhar este video',
  SHARE_TEXT: 'Assista esse vídeo de {{streamerName}} no pogu.live',
  IN_DEVELOPMENT_MESSAGE:
    '👀 Esta funcionalidade ainda está em desenvolvimento',
  FOLLOW_OUR_TWITTER: 'Siga nosso Twitter',
  SUPPORT_US_ON_KOFI: 'Apoie-nos no Ko-fi',
  STAR_US_ON_GITHUB: 'Deixe sua estrela no GitHub',
  FETCHING_STREAMER_VIDEOS: 'Buscando VODs - {{streamerName}}',
  STREAMER_NOT_FOUND: 'Não foi possível encontrar nenhum VOD deste streamer',
  MOST_POPULAR_VODS_TODAY: 'Vídeos mais populares hoje',
  OTHER_VIDEOS_OF_STREAMER: 'Outros vídeos de {{streamerName}}',
  POGU_LIVE_DESCRIPTION:
    'pogu.live é uma ferramenta grátis que permite que você assista qualquer VOD do Twitch. Não salvamos, armazenamos ou enviamos qualquer vídeo aqui, apenas linkamos a url da API da Twitch, qualquer pessoa pode obter este link, funciona porque o Twitch só valida o VOD no frontend e não no backend/API. Para vídeos deletados, funciona porque quando um streamer deleta um vídeo, ele não é deletado dos servidores da Twitch imediatamente. Ao invés disso, ele é marcado como deletado e depois removido da página após algumas semanas, então você ainda pode assistir e baixar o vídeo em meio ao tempo se você tem a url.',
  POGU_LIVE_BETA_DESCRIPTION: `Ainda estamos na fase de beta, então é possível que alguns recursos não funcionem como esperado. Se você encontrar algum problema, por favor, reporte-o no botão Feedback no canto superior direito ou no menu.`,
  REMOVED_USER_MESSAGE: 'Removido',
  YOUR_LAST_WATCHED_VODS: 'Seus últimos VODs assistidos',
  VIDEO_NOT_FOUND: 'Este vídeo foi deletado',
}

export default pt

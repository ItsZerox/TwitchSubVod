import { Locale } from './types'

const es: Locale = {
  FEEDBACK: 'Comentarios',
  FOLLOW: 'Seguir',
  DOWNLOAD: 'Descargar',
  ALL_STREAMER_VODS: 'Todos los VODs de {{streamer}}',
  SUB_ONLY_VODS: 'VODs pagos',
  DELETED_VODS: 'VODs eliminados',
  OPEN_MENU: 'Abrir menu',
  PROFILE: 'Perfil',
  NOTIFICATIONS: 'Notificaciones',
  SEND_FEEDBACK: 'Enviar comentarios',
  SEARCH: 'Buscar',
  FOLLOWERS: 'Seguidores',
  VIEWS: 'Visualizaciones',
  SHARE_THIS_VIDEO: 'Compartir este video',
  SHARE_TEXT: 'Ver este video de {{streamerName}} en pogu.live',
  IN_DEVELOPMENT_MESSAGE: '👀 Esta funcionalidad aún está en desarrollo',
  FOLLOW_OUR_TWITTER: 'Seguir nuestro Twitter',
  SUPPORT_US_ON_KOFI: 'Apoyanos en Ko-fi',
  STAR_US_ON_GITHUB: 'Deja tu estrella en GitHub',
  FETCHING_STREAMER_VIDEOS: 'Buscando VODs - {{streamerName}}',
  STREAMER_NOT_FOUND: 'No se pudo encontrar ningún VOD de este streamer',
  MOST_POPULAR_VODS_TODAY: 'Vídeos más populares hoy',
  OTHER_VIDEOS_OF_STREAMER: 'Otros vídeos de {{streamerName}}',
  POGU_LIVE_DESCRIPTION:
    "pogu.live es una herramienta gratuita que te permite ver cualquier VOD de Twitch. No guardamos, no almacenamos ni subimos ningún video aquí, solo vinculamos la url de Twitch's API, cualquiera puede obtener esta url, funciona porque Twitch solo valida el VOD en el frontend y no en el backend/API. Para vídeos eliminados funciona porque cuando un streamer elimina un video, no se elimina de Twitch's servers inmediatamente. En su lugar, se marca como eliminado y luego se elimina de la página web después de unos días, así puedes ver y descargarlo en el tiempo si tienes la url.",
  POGU_LIVE_BETA_DESCRIPTION: `Aún estamos en fase de beta, así que es posible que algunos recursos no funcionen como esperado. Si encuentras algún problema, por favor, reporta-lo en el botón Comentarios en la parte superior derecha o en el menú.`,
  REMOVED_USER_MESSAGE: 'Eliminado',
  YOUR_LAST_WATCHED_VODS: 'Tus últimos VODs vistos',
  VIDEO_NOT_FOUND: 'Este vídeo ha sido eliminado',
}

export default es

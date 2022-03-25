import { Locale } from './types'

const fr: Locale = {
  FEEDBACK: 'Feedback',
  FOLLOW: 'Suivre',
  DOWNLOAD: 'Télécharger',
  ALL_STREAMER_VODS: 'Tous les VODs de {{streamer}}',
  SUB_ONLY_VODS: 'VODs payés',
  DELETED_VODS: 'VODs supprimés',
  OPEN_MENU: 'Ouvrir le menu',
  PROFILE: 'Profil',
  NOTIFICATIONS: 'Notifications',
  SEND_FEEDBACK: 'Envoyer des commentaires',
  SEARCH: 'Rechercher',
  FOLLOWERS: 'Abonnés',
  VIEWS: 'Vues',
  SHARE_THIS_VIDEO: 'Partager cette vidéo',
  SHARE_TEXT: 'Regarder cette vidéo de {{streamerName}} sur pogu.live',
  IN_DEVELOPMENT_MESSAGE: '👀 Cette fonctionnalité est encore en développement',
  FOLLOW_OUR_TWITTER: 'Suivez notre Twitter',
  SUPPORT_US_ON_KOFI: 'Soutenez-nous sur Ko-fi',
  STAR_US_ON_GITHUB: 'Évaluez-nous sur GitHub',
  FETCHING_STREAMER_VIDEOS: 'Récupération des VODs - {{streamerName}}',
  STREAMER_NOT_FOUND: "Nous n'avons pas pu trouver de vidéo de ce streamer",
  MOST_POPULAR_VODS_TODAY: "Les plus populaires aujourd'hui",
  OTHER_VIDEOS_OF_STREAMER: 'Autres vidéos de {{streamerName}}',
  POGU_LIVE_DESCRIPTION:
    "pogu.live est un outil gratuit qui vous permet de regarder n'importe quelle VOD Twitch. Nous ne sauvegardons, nous n'enregistrons ou nous n'uploadons aucune vidéo ici, nous justifions juste l'url de l'API Twitch, n'importe qui peut obtenir cette url, elle fonctionne car Twitch valide seulement la vidéo en frontend et pas en backend/API. Pour les vidéos supprimées, elle fonctionne car quand un streamer supprime une vidéo, elle est marquée comme supprimée et ensuite supprimée du site après quelques semaines, donc vous pouvez toujours regarder et télécharger la vidéo en attendant si vous avez l'url.",
  POGU_LIVE_BETA_DESCRIPTION:
    'Nous sommes encore en phase de bêta, si vous trouvez un bug, merci de le signaler avec le bouton "Feedback" en haut à droite ou dans le menu si vous êtes sur mobile. Merci !',
  REMOVED_USER_MESSAGE: 'Supprimé',
  YOUR_LAST_WATCHED_VODS: 'Vos derniers VODs vus',
  VIDEO_NOT_FOUND: 'Cette vidéo a été supprimée',
}

export default fr

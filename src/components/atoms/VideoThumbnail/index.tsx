import * as S from './styles'

interface VideoThumbnailProps {
  src: string
  title: string
  width?: string
  watchedPercentage?: number
}

const VideoThumbnail = ({
  src,
  title,
  width,
  watchedPercentage,
}: VideoThumbnailProps) => {
  return (
    <>
      {typeof watchedPercentage === 'number' && (
        <S.WatchedVodProgressBar className="progress-bar">
          <S.WatchedVodProgressBarFill watchedPercentage={watchedPercentage} />
        </S.WatchedVodProgressBar>
      )}
      <S.VideoThumbnailImage
        src={src}
        alt={title}
        title={title}
        thumbnailWidth={width}
      />
    </>
  )
}

export default VideoThumbnail

import styled from 'styled-components'

export const VideoThumbnailImage = styled.img<{ thumbnailWidth?: string }>`
  display: flex;
  width: ${({ thumbnailWidth }) => thumbnailWidth || '100%'};
  height: auto;
  object-fit: cover;

  border-radius: 8px;
  overflow: hidden;
`

export const WatchedVodProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey700};
  border-radius: 0 0 8px 8px;
  overflow: hidden;
`

export const WatchedVodProgressBarFill = styled.div<{
  watchedPercentage: number
}>`
  position: absolute;
  bottom: 0;
  width: ${({ watchedPercentage }) => `${watchedPercentage * 100}%`};
  height: 4px;
  background-color: ${({ theme }) => theme.colors.pink700};
`

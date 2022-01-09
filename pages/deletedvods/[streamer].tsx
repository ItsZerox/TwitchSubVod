import { useCallback, useEffect, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import ReactGA from 'react-ga';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';

import api from '@/utils/services/api';
import VodModal from '@/components/VodModal';
import LoadingModal from '@/components/LoadingModal';
import SearchInput from '@/components/SearchInput';
import Footer from '@/components/Footer';
import LinkBox from '@/components/LinkBox';
import StreamerInformation from '@/components/StreamerInformation';
import dbConnect from '@/utils/backend/lib/dbConnect';

import { useGlobal } from '@/stores/GlobalContext';
import { Container } from '@/styles/Home';
import * as S from '@/styles/DeletedVods';
import getLastSearchedDeletedVods from '@/utils/backend/queries/getLastSearchedDeletedVods';
import getDeletedStreamerVods from '@/utils/backend/queries/getDeletedStreamerVods';
import { IUsers } from '..';
import { timeToHMS } from '@/utils/timeToHMS';
import { cors } from '@/utils/services/cors';

interface IDeletedVodsProps {
  twitchData: IUsers;
  deletedVods: IDeletedVods | null;
}

export interface TwitchVideoProps {
  videos: Array<{
    broadcast_id: number;
    channel: {
      _id: number;
      display_name: string;
      name: string;
      description: string;
      followers: number;
      logo: string;
      video_banner: string;
    };
    thumbnails: {
      large: Array<{ url: string }>;
    };
  }>;
}

interface IPlayedGame {
  _id: string;
  name: string;
  image: string;
}

interface IVods {
  url: string;
  date: string;
  length: number;
  playedGames: IPlayedGame[];
}

interface IDeletedVods {
  _id: string;
  streamer: string;
  displayName: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  vods: IVods[];
}

export const getStaticPaths = async () => {
  await dbConnect();
  const mostWatchedRanking = await getLastSearchedDeletedVods(100);

  console.log(
    'GET getLastSearchedDeletedVods fn(getStaticPaths) screen(/deletedvods)',
  );

  const paths = mostWatchedRanking.map((streamerPath) => {
    return { params: { streamer: streamerPath.streamer.toLowerCase() } };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();
  const streamer = params?.streamer as string;

  const response = await api.get(`users?login=${streamer}`);

  const twitchUser = response.data.users[0];

  const allBannedStreamers = process.env.BANNED_STREAMERS?.split(',') || [];
  const bannedStreamers = allBannedStreamers.map((bannedStreamer) => ({
    bannedStreamer,
  }));

  if (
    bannedStreamers.some(
      (blockedStreamer) => blockedStreamer.bannedStreamer === streamer,
    )
  ) {
    return {
      notFound: true,
    };
  }

  const streamers = await getDeletedStreamerVods(streamer);

  console.log(
    'GET getDeletedStreamerVods fn(getStaticPaths) screen(/deletedvods)',
  );

  const twitchData = twitchUser ? JSON.parse(JSON.stringify(twitchUser)) : null;

  const deletedVods: IDeletedVods = streamers
    ? JSON.parse(JSON.stringify(streamers))
    : null;

  return {
    props: {
      twitchData,
      deletedVods,
    },
    revalidate: 3 * 60 * 60, // 3 hour (in seconds)
  };
};

const DeletedVodsStreamer = ({
  twitchData,
  deletedVods,
}: IDeletedVodsProps) => {
  const [deletedVodsData, setDeletedVodsData] = useState<
    IDeletedVodsProps['deletedVods']
  >(null);
  const { videoQuality } = useGlobal();
  const [chosenVideo, setChosenVideo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const streamerName = twitchData?.name || deletedVodsData?.streamer || '';
  const videos = deletedVodsData?.vods;

  useEffect(() => {
    if (!deletedVodsData) {
      setDeletedVodsData(deletedVods);
    }

    ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_TRACKING}`, {
      testMode: process.env.NODE_ENV === 'test',
    });
    streamerName && ReactGA.pageview(`/deletedvods/${streamerName}`);
  }, [deletedVods]);

  const getOGUrl = () => {
    return `https://og-image.vercel.app/${streamerName}%20%7C%20Sub-only%20vods%20%7C%20**pogu.live**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg&images=https%3A%2F%2Fold.pogu.live%2Fandroid-chrome-192x192.png&images=${encodeURI(
      twitchData.logo,
    )}&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&widths=1&widths=300&widths=300&widths=1&heights=1&heights=300&heights=300&heights=1`;
  };

  const handleVideo = useCallback(
    async (video: IVods) => {
      const proxiedUrl = cors() + video.url;

      try {
        const videoHead = await axios.head(
          proxiedUrl.replace('index-dvr.m3u8', '3.ts'),
        );

        if (videoHead.status !== 403) {
          setChosenVideo(proxiedUrl);
          if (typeof window != 'undefined') {
            window.scrollTo({ behavior: 'smooth', top: 340 });
          }
        }
      } catch (error) {
        alert('Sorry, apparently this video just got deleted');
        // todo: delete this video from db
      }
    },
    [setChosenVideo],
  );

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/deleted-vods?username=${streamerName}&range=30`,
      );
      setDeletedVodsData(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, streamerName, setDeletedVodsData]);

  const renderVideos = useMemo(() => {
    return videos?.map((video, index) => {
      if (!video) {
        return null;
      }

      return (
        <S.DeletedVodsGroup
          key={index}
          title={video.date}
          onClick={() => handleVideo(video)}
          role="button"
        >
          <span>
            <span>Date: {new Date(video.date).toLocaleDateString()}</span>
            <span>Lenght: {timeToHMS(video.length * 60)}</span>
          </span>

          <S.CategoriesPlayed>
            {video.playedGames.map((playedGame, index) => (
              <img
                key={index}
                src={playedGame.image}
                width="auto"
                height="64px"
                title={playedGame.name}
                alt={playedGame.name}
              />
            ))}
          </S.CategoriesPlayed>
        </S.DeletedVodsGroup>
      );
    });
  }, [videos, videoQuality]);

  const renderVideo = useMemo(() => {
    return <VodModal videoUrl={chosenVideo} />;
  }, [chosenVideo]);

  if (!streamerName) {
    return (
      <Container>
        <LoadingModal />
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{`${streamerName} - PogU`}</title>
        <meta property="og:title" content={`${streamerName} - Deleted VODS`} />
        <meta
          property="og:url"
          content={`https://old.pogu.live/deletedvods/${streamerName}`}
        />
        <meta property="og:image" content={getOGUrl()} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`Watch ${streamerName}'s deleted Twitch VODs for free. PogU`}
        />
      </Head>
      <S.DeletedVodsStreamer>
        <span>
          <img src="/favicon.ico" alt="pogu.live" />
          <h1>PogU</h1>
        </span>
        <SearchInput isDeleted={true} />
        <LinkBox home />
        <LinkBox clips />
        <LinkBox download />
        <StreamerInformation
          displayName={twitchData.display_name}
          logo={twitchData.logo}
          description={twitchData.bio}
          url={`/videos/${twitchData.name}`}
        />
        <S.SearchButton onClick={handleSearch}>
          Get latest vods from {streamerName}
          {isLoading && <AiOutlineLoading3Quarters />}
        </S.SearchButton>
        {chosenVideo && renderVideo}
        <S.DeletedVodsGroupContainer>
          {renderVideos}
        </S.DeletedVodsGroupContainer>
        <Footer />
      </S.DeletedVodsStreamer>
    </>
  );
};

export default DeletedVodsStreamer;

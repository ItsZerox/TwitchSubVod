interface AdsContainerProps {
  adslot: string
}

const AdsContainer = ({ adslot }: AdsContainerProps) => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      try {
        // @ts-ignore
        ;(adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.log(e)
      }
    }, 1000)
  }

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        margin: '0 auto',
      }}
      data-ad-client="ca-pub-8414071548156466"
      data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      data-ad-slot={adslot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}

export default AdsContainer

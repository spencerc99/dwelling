const webring = [
  {
    url: "https://spencerchang.me",
    dimensions: {
      width: 999,
      height: 399,
    },
  },
  { url: "https://kayserifserif.place/" },
  { url: "https://henry.codes" },
  { url: "https://liuleslie.github.io" },
  { url: "https://anhvn.com" },
  { url: "https://mangotango.mmm.page" },
  { url: "https://ifyouknewmewouldyoulove.me" },
  { url: "https://jzhao.xyz" },
  { url: "https://index.niksethi.com/" },
  { url: "https://cloudlord.management/" },
  { url: "https://azlen.me" },
  { url: "https://ivanzhao.me" },
];

const QuiltWidth = 1600;
const QuiltHeight = 1280;
const QuiltPaddingX = 80;
const QuiltPaddingY = 64;

export default function Ring() {
  const frames = [...webring, ...webring, ...webring, ...webring];
  const width = QuiltWidth;
  const height = QuiltHeight;

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* <p style={{ fontSize: "2em", textAlign: "center", margin: "1em" }} className="serif">
        I am going to <kbd tabIndex={1}>Tab</kbd> through this quilt.
      </p> */}
      <div
        className="quiltContainer"
        style={{
          width: width,
          height: height,
        }}
      >
        {frames.map((frame, i) => {
          const currWidth = width - i * QuiltPaddingX;
          const currHeight = height - i * QuiltPaddingY;
          if (currWidth <= 0 || currHeight <= 0) {
            return null;
          }

          return (
            <iframe
              key={i}
              src={frame.url}
              className="iframe"
              width={currWidth}
              height={currHeight}
              scrolling="no"
              allowTransparency={false}
              style={{
                top: `${i * (QuiltPaddingX / 2)}px`,
                left: `${i * (QuiltPaddingY / 2)}px`,
              }}
            />
          );
        })}
      </div>
    </main>
  );
}

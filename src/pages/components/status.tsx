import { useEffect, useState } from "react";
import { jsxJoin } from "../../utils";
import { Dayjs } from "dayjs";

/**
 * example object for v0
 * listening -> last listened on spotify
 * reading -> last reading on goodreads
 * watching -> last watched on letterboxd
 * building -> last github repo commit
 * dancing to -> last song added to my dance playlist
 * moving -> last strava activity
 */

export enum ActivityType {
  Writing = "Writing",
  Listening = "Listening",
  Reciting = "Reciting",
  Building = "Building",
  Reading = "Reading",
  Moving = "Moving",
}

export interface Activity {
  category: ActivityType;
  name: string;
  link: string;
  displayHTML: string;
  metadata: object;
  date: Date;
  birthdayEpoch: string;
}

async function fetchStream() {
  const resp = await fetch("https://status.spencerchang.me/api/me");
  const data = await resp.json();
  return data;
}

export function Status() {
  const [stream, setStream] = useState<Activity[]>([]);

  useEffect(() => {
    void fetchStream().then((data) => {
      setStream(data);
    });
  });

  function renderContent() {
    return jsxJoin(
      stream.map((activity) => {
        return (
          <>
            [
            <span className="date">
              <span className="timestamp">
                {new Dayjs(activity.date).format("MM.DD|HH:mm")}
              </span>
              <span className="epoch">{activity.birthdayEpoch}</span>
            </span>
            ]{activity.displayHTML}
          </>
        );
      }),
      " • "
    );
  }

  return (
    <div
      className="marquee"
      title="this is a set of live attributes from what I consume and make streamed to this little status bar. The numbers represent Spencer epoch time, a play on UNIX epoch."
    >
      <span className="marqueeContent">
        {renderContent()}
        {renderContent()}
      </span>
    </div>
  );
}

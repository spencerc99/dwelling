import { useEffect, useState } from "react";
import { jsxJoin } from "../utils";
import dayjs from "dayjs";

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

export function Status({ stream }: { stream: Activity[] }) {
  function renderContent() {
    return jsxJoin(
      stream.map((activity) => {
        if (!activity.date) {
          return;
        }

        return (
          <>
            {" "}
            [
            <span className="date">
              <span className="timestamp">
                {dayjs(activity.date).format("MM.DD|HH:mm")}
              </span>
              <span className="epoch">{activity.birthdayEpoch}</span>
            </span>
            ]{" "}
            <span
              dangerouslySetInnerHTML={{ __html: activity.displayHTML }}
            ></span>
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

export default Status;

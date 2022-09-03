import Head from "next/head";

import { getFeaturedEvents } from "../helper/api-util";
import EventList from "../components/events/EventList";

export default function HomePage(props) {
  return (
    <div>
      {/* within <Head> it's like within html <head> */}
      <Head>
        <title>MextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

import Head from "next/head";
import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helper/api-util";

import EventSumary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { func } from "prop-types";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading</p>
      </div>
    );
  }

  //if there is an event
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSumary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

//getStaticPaths is mandatory to use in dynamic pages to tell nextjs which params pre-render
export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  //it creates an array of objects to be passed to paths
  //each object will have a params key with another object with an eventId key
  //it will be like: {params: {eventId: "e1"}}
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return { paths: paths, fallback: true };
}

export default EventDetailPage;

import Head from "next/head";

const metaDecorator = require("../helpers/data/metaDecorator.json");

const MetaDecorator = ({ title, description, imageUrl }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} key="desc" />
    <meta property="og:title" content={title} key="ogtitle" />
    <meta property="og:description" content={description} key="ogdesc" />
    <meta
      property="og:image"
      // content={metaDecorator + imageUrl}
      content={"https://jcwd200402api.purwadhikabootcamp.com" + imageUrl}
      key="ogimg"
    />
    <meta
      property="og:url"
      content={"https://jcwd200402.purwadhikabootcamp.com"}
      key="ogurl"
    />

    {/* TWITTER */}

    {/* <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={metaDecorator.twitterUsername} /> */}

    <link
      rel="icon"
      type="image/svg+xml"
      href="/healthymed-logo.svg"
      sizes="16x16"
    />
  </Head>
);

export default MetaDecorator;

import { Helmet } from "react-helmet";

const metaDecorator = require("../helpers/data/metaDecorator.json");

const MetaDecorator = ({ title, description, imageUrl }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={metaDecorator.hostname + imageUrl} />
    <meta
      property="og:url"
      content={
        metaDecorator.hostname +
        window.location.pathname +
        window.location.search
      }
    />
    {/* <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={metaDecorator.twitterUsername} /> */}
    <link
      rel="icon"
      type="image/svg+xml"
      href="/healthymed-logo.svg"
      sizes="16x16"
    />
  </Helmet>
);

export default MetaDecorator;

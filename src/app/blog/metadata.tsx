import Head from "next/head";

const MetaData = () => {
  return (
    <Head>
      <title>Email Marketing Blog - MailMaster</title>
      <meta
        name="description"
        content={
          "Learn about email marketing best practices, cold outreach strategies, and how to improve your email campaigns."
        }
      />
      <meta
        name="keywords"
        content={"Email Marketing, Cold Outreach, Email Campaigns"}
      />
      <meta name="author" content="Jash Agrawal" />
    </Head>
  );
};

export default MetaData;

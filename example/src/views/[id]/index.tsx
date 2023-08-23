import { createDynamicRoute, Component } from "rettle";
import { css } from "@emotion/react";
import { Helmet } from "react-helmet";
import { createClient } from "rettle/core";

const App = (props: any) => {
  return (
    <Component.div frame={"[fr]"} css={css({ fontSize: "32px" })}>
      <Helmet>
        <meta charSet={"utf-8"} />
      </Helmet>
      俺もコンビニ行ってくる
    </Component.div>
  );
};

export default createDynamicRoute((id) => {
  const data = {
    hoge: {
      text: "Hello, World!",
    },
    fuga: {
      text: "How are you?",
    },
  } as { [index: string]: any };
  return data[id];
}, App);

export const client = createClient(() => {
  console.log("Dynamic");
});

export const buildRequest = () => {
  return [];
};

import {compile} from "../../rettle";
import {css, Global} from "@emotion/react";

const App = () => {
  const style = css({
    color: "red",
  })

  const globalStyle = css({
    p: {
      color: "green"
    }
  })
  return (
    <>
      <Global styles={globalStyle}/>
      <div>Hello, World!</div>
    </>
  )
}


compile(App);
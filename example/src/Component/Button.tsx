import * as React from "react";
import {Component, RettleFrame} from "rettle";
import {css} from "@emotion/react";

interface ButtonProps {
  children: JSX.Element | string,
}
const Button:React.FC<ButtonProps> = (props) => {
  const buttonWrap = css({
    width: "100%",
    height: "100%",
    button: {
      border: "none",
      width: "100%",
      height: "100%",
      fontSize: "14px",
      backgroundColor: "white",
      transition: "background-color 0.2s ease",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#6CC8E7"
      }
    }
  })
  return (
    <Component.div frame={"[fr]"} css={buttonWrap}>
      <button type={"button"} rettle-click={"onClick"}>
      {props.children}
      </button>
    </Component.div>
  )
}


export const script:RettleFrame = ({onMounted}, props) => {
  const onClick = () => {
    props.handleCountUp();
  }

  return {
    onClick
  }
}
export default Button;
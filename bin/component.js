import { jsx as _jsx } from "react/jsx-runtime";
import { css } from "@emotion/react";
const Component = () => {
    const style = css({
        color: "blue"
    });
    return _jsx("div", { css: style, children: "This is Component" });
};
export default Component;

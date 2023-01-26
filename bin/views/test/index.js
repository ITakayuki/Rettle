import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { compile } from "../../rettle";
import { css, Global } from "@emotion/react";
const App = () => {
    const style = css({
        color: "red",
    });
    const globalStyle = css({
        p: {
            color: "green"
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(Global, { styles: globalStyle }), _jsx("div", { children: "Hello, World!" })] }));
};
compile(App);

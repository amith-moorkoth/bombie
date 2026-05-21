import React from "react";

const noop = () => {};

/**
 * Default tuple matches the shape consumers destructure:
 *   const [data, setdata, effect, seteffect] = useContext(bombieContext);
 *
 * Providing a default prevents "Cannot destructure undefined" crashes when
 * a consumer renders outside the provider (e.g. in tests or stories).
 */
const bombieContext = React.createContext([[], noop, {}, noop]);

export default bombieContext;
